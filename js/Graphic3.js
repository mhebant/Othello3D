/* v0.1.3 24/12/13 
Avec l'aide des tuto learningwebgl.com et OpenGl 3.3 d'openclassrooms.com
Voir http://learningwebgl.com/blog/?page_id=1217
Et http://fr.openclassrooms.com/informatique/cours/developpez-vos-applications-3d-avec-opengl-3-3 */

var DRAW = { TRIANGLES: 4, LINES: 1 };

function Object() {
	this.position = vec3.create(); //vec3
	this.rotation = mat4.identity(mat4.create()); //mat4
	
	this.vertex; //array
	this.vertexBuffer; //buffer
	this.color; //array
	this.colorBuffer; //buffer
	this.index; //array
	this.indexBuffer; //buffer
	
	this.drawMode = DRAW.TRIANGLES;
	
	this.meVisible = true;
	this.childVisible = true;
	
	this.childRef = [];
	this.child = {};
	
	this.draw = function(screen, camera) {
		this.drawP(screen.gl, camera.shaderProgram, camera.perspective, camera.world);
	};
	this.drawP = function(gl, shaderProgram, perspective, world) {
		var saveWorld = mat4.create(world);
		
		mat4.translate(world, this.position);
		mat4.multiply(world, this.rotation);
		
		if(this.meVisible)
		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexAttribute, 3, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
			gl.vertexAttribPointer(shaderProgram.colorAttribute, 4, gl.FLOAT, false, 0, 0);

			gl.uniformMatrix4fv(shaderProgram.perspectiveUniform, false, perspective);
			gl.uniformMatrix4fv(shaderProgram.worldUniform, false, world);
			
			if(this.indexBuffer)
			{
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
				gl.drawElements(this.drawMode, this.indexBuffer.length, gl.UNSIGNED_SHORT, 0);
			}
			else
				gl.drawArrays(this.drawMode, 0, this.vertexBuffer.length);
		}
		if(this.childVisible)
		{
			var test = mat4.create(); mat4.set(world, test);
			for(var i = 0; i < this.childRef.length; i++)
				this.childRef[i].drawP(gl, shaderProgram, perspective, world);
		}
		
		mat4.set(saveWorld, world);
	};
	
	this.iniVertexBuffer = function(gl) {
		if(gl instanceof Screen)
			gl = gl.gl;
			
		this.vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertex), gl.STATIC_DRAW);
		this.vertexBuffer.length = this.vertex.length / 3;
	};
	this.iniColorBuffer = function(gl) {
		if(gl instanceof Screen)
			gl = gl.gl;
			
		this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color), gl.STATIC_DRAW);
	};
	this.iniIndexBuffer = function(gl) {
		if(gl instanceof Screen)
			gl = gl.gl;
			
		this.indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index), gl.STATIC_DRAW);
		this.indexBuffer.length = this.index.length;
	};
	this.iniBuffers = function(gl) {
		this.iniVertexBuffer(gl);
        this.iniColorBuffer(gl);
		if(this.index)
		{
			this.iniIndexBuffer(gl);
		}
	};
	
	this.addChild = function(objectRef) {
		this.childRef.push(objectRef);
	};
	this.removeChild = function(objectRef) {
		this.childRef.splice(this.childRef.indexOf(objectRef), 1);
	};
	this.delChild = function(object) {
		this.childRef.splice(this.childRef.indexOf(object), 1);
		delete object;
	};
}

function Screen(canvas) {
    this.element = canvas;
	this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl"); //Context WebGl
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.BLEND);
	this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
            
	
	this.clear = function(color) {
		if(color)
			this.gl.clearColor(color[0], color[1], color[2], color[3]);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
	}
	this.resize = function() {
		this.gl.viewportWidth = this.element.width;  
        this.gl.viewportHeight = this.element.height;
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
	};
	this.start = function(camera) {
		this.gl.useProgram(camera.shaderProgram);
	};
	this.stop = function() {
		this.gl.useProgram(null);
	};
	
	this.resize();
}

function Camera() {
	this.position = vec3.create();
	this.look = vec3.create();
	this.up = [0,1,0];
	
	this.perspective = mat4.create();
	this.world = mat4.create();
	this.shaderProgram;
	
	this.setPerspective = function(gl, fov, near, far) {
		if(gl instanceof Screen)
			gl = gl.gl;
	
		mat4.perspective(fov || 45, gl.viewportWidth / gl.viewportHeight, near || 0.1, far || 100.0, this.perspective);
	};
	this.lookAt = function(position, look, up) {
		mat4.lookAt(position || this.position, look || this.look, up || this.up, this.world);
	};
	this.loadShader = function(gl, scriptId) {
        var shaderScript = document.getElementById(scriptId);

        var code = "";
        var k = shaderScript.firstChild;
        while (k) 
		{
            if (k.nodeType == 3) 
			{
                code += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") 
		{
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
		else if (shaderScript.type == "x-shader/x-vertex") 
		{
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
		else 
		{
            return null;
        }

        gl.shaderSource(shader, code);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
		{
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    };
	this.iniShaderProgram = function(gl, vertexShaderId, fragShaderId) {
		if(gl instanceof Screen)
			gl = gl.gl;
			
		var fragmentShader = this.loadShader(gl, fragShaderId);
		var vertexShader = this.loadShader(gl, vertexShaderId);

		this.shaderProgram = gl.createProgram();
		gl.attachShader(this.shaderProgram, vertexShader);
		gl.attachShader(this.shaderProgram, fragmentShader);
		gl.linkProgram(this.shaderProgram);

		if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS))
		{
			alert("ERROR: initialisation shader");
		}

		gl.useProgram(this.shaderProgram);

		this.shaderProgram.vertexAttribute = gl.getAttribLocation(this.shaderProgram, "vertexAttribute");
		gl.enableVertexAttribArray(this.shaderProgram.vertexAttribute);

		this.shaderProgram.colorAttribute = gl.getAttribLocation(this.shaderProgram, "colorAttribute");
		gl.enableVertexAttribArray(this.shaderProgram.colorAttribute);

		this.shaderProgram.perspectiveUniform = gl.getUniformLocation(this.shaderProgram, "perspectiveUniform");
		this.shaderProgram.worldUniform = gl.getUniformLocation(this.shaderProgram, "worldUniform");
	};
}

vec3.unproject = function (vec, view, proj, viewport, dest) { //Inspiré de https://github.com/toji/gl-matrix/issues/16
    if (!dest) { dest = vec; }

    var m = mat4.create();
    var v = new glMatrixArrayType(4);

    v[0] = (vec[0] - viewport[0]) * 2.0 / viewport[2] - 1.0;
    v[1] = -((vec[1] - viewport[1]) * 2.0 / viewport[3] - 1.0);
    v[2] = 2.0 * vec[2] - 1.0;
    v[3] = 1.0;

    mat4.multiply(proj, view, m);
    if(!mat4.inverse(m)) { return null; }

    mat4.multiplyVec4(m, v);
    if(v[3] === 0.0) { return null; }

    dest[0] = v[0] / v[3];
    dest[1] = v[1] / v[3];
    dest[2] = v[2] / v[3];

    return dest;
};

window.requestAnimFrame = (function() { //Inspiré de https://code.google.com/p/webglsamples/source/browse/book/webgl-utils.js?r=41401f8a69b1f8d32c6863ac8c1953c8e1e8eba0
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
})();