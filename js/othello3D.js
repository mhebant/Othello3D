var screen3D, camera, othello, ray; //ray DEBUG

function loadOthello3D() { //Initialise la 3D
	
	html.canvas.width = window.innerWidth;
	html.canvas.height = window.innerHeight;
	
	try
	{
		screen3D = new Screen(html.canvas);
	}
	catch(error)
	{
		screen3D = false;
		putOpac();
		showPopBox('Impossible to get WebGL !<br>Please get a web browser witch have WebGL, like <a href="https://www.google.com/intl/en/chrome/browser/">Google Chrome</a>.<br><h3 id="0" onclick="hidePopBox();">Retry</h3>', function() { pullOpac(); location.reload();})
	}

	if (screen3D) // Si WebGL OK
	{
	camera = new Camera();
	camera.setPerspective(screen3D);
	camera.position = [0,8,8];
	camera.lookAt();
	camera.iniShaderProgram(screen3D, "vertexShader", "fragShader");
	
	//ray DEBUUG
	ray = new Object();
	ray.position = [0,0,0];
	ray.vertex = [0,0,0, 0,0,0];
	ray.color = [1,0,0,1, 1,0,0,1];
	ray.drawMode = DRAW.LINES;
	ray.meVisible = false;
	ray.iniBuffers(screen3D);

	othello = new Object();
	othello.position = [-3.5,0,-3.5];
	othello.vertex = [-0.5,0,-0.5, 7.5,0,-0.5, 7.5,0,7.5, -0.5,0,7.5,    -0.5,0,-0.5, 7.5,0,-0.5, 7.5,0,7.5, -0.5,0,7.5,    -1,0.2,-1, 8,0.2,-1, 8,0.2,8, -1,0.2,8,    -1,-0.2,-1, 8,-0.2,-1, 8,-0.2,8, -1,-0.2,8,];
	othello.color = [0,1,0,1,  0,1,0,1,  0,1,0,1,  0,1,0,1,    0.1,0.1,0.1,1, 0.1,0.1,0.1,1, 0.1,0.1,0.1,1, 0.1,0.1,0.1,1,    0.1,0.1,0.1,1, 0.1,0.1,0.1,1, 0.1,0.1,0.1,1, 0.1,0.1,0.1,1,    0.1,0.1,0.1,1, 0.1,0.1,0.1,1, 0.1,0.1,0.1,1, 0.1,0.1,0.1,1];
	othello.index = [0,2,1,2,0,3,    4,5,8,8,5,9, 5,6,9,9,6,10, 6,7,10,10,7,11, 7,4,11,11,4,8,    8,9,12,12,9,13, 9,10,13,13,10,14, 10,11,14,14,11,15, 11,8,15,15,8,12,    12,13,14,12,14,15];
	othello.iniBuffers(screen3D);

	othello.child.grid = new Object();
	othello.child.grid.position = [0,0,0];
	othello.child.grid.vertex = [0.5,0.01,-0.5, 0.5,0.01,7.5, 1.5,0.01,-0.5, 1.5,0.01,7.5, 2.5,0.01,-0.5, 2.5,0.01,7.5, 3.5,0.01,-0.5, 3.5,0.01,7.5, 4.5,0.01,-0.5, 4.5,0.01,7.5, 5.5,0.01,-0.5, 5.5,0.01,7.5, 6.5,0.01,-0.5, 6.5,0.01,7.5,    -0.5,0.01,0.5, 7.5,0.01,0.5, -0.5,0.01,1.5, 7.5,0.01,1.5, -0.5,0.01,2.5, 7.5,0.01,2.5, -0.5,0.01,3.5, 7.5,0.01,3.5, -0.5,0.01,4.5, 7.5,0.01,4.5, -0.5,0.01,5.5, 7.5,0.01,5.5, -0.5,0.01,6.5, 7.5,0.01,6.5];
	othello.child.grid.color = [0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1,    0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1];
	othello.child.grid.drawMode = DRAW.LINES;
	othello.child.grid.iniBuffers(screen3D);
	othello.addChild(othello.child.grid);

	othello.child.piece = new Object();
	othello.child.piece.position = [0,0.25,0];
	othello.child.piece.vertex = [0,0.25,0,    0.125,0.125,-0.375, -0.125,0.125,-0.375, -0.375,0.125,-0.125, -0.375,0.125,0.125, -0.125,0.125,0.375, 0.125,0.125,0.375, 0.375,0.125,0.125, 0.375,0.125,-0.125,    0.125,0,-0.375, -0.125,0,-0.375, -0.375,0,-0.125, -0.375,0,0.125, -0.125,0,0.375, 0.125,0,0.375, 0.375,0,0.125, 0.375,0,-0.125,    0.125,0,-0.375, -0.125,0,-0.375, -0.375,0,-0.125, -0.375,0,0.125, -0.125,0,0.375, 0.125,0,0.375, 0.375,0,0.125, 0.375,0,-0.125,    0.125,-0.125,-0.375, -0.125,-0.125,-0.375, -0.375,-0.125,-0.125, -0.375,-0.125,0.125, -0.125,-0.125,0.375, 0.125,-0.125,0.375, 0.375,-0.125,0.125, 0.375,-0.125,-0.125,    0,-0.25,0];
	othello.child.piece.color = [1,1,1,1,    1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1,    1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1,    0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1,    0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1,    0,0,0,1];
	othello.child.piece.index = [0,1,2, 0,2,3, 0,3,4, 0,4,5, 0,5,6, 0,6,7, 0,7,8, 0,8,1,    1,9,2, 2,9,10, 2,10,3, 3,10,11, 3,11,4, 4,11,12, 4,12,5, 5,12,13, 5,13,6, 6,13,14, 6,14,7, 7,14,15, 7,15,8, 8,15,16, 8,16,1, 1,16,9,    17,25,18, 18,25,26, 18,26,19, 19,26,27, 19,27,20, 20,27,28, 20,28,21, 21,28,29, 21,29,22, 22,29,30, 22,30,23, 23,30,31, 23,31,24, 24,31,32, 24,32,17, 17,32,25,    33,26,25, 33,27,26, 33,28,27, 33,29,28, 33,30,29, 33,31,30, 33,32,31, 33,25,32];
	othello.child.piece.iniBuffers(screen3D);
	othello.child.piece.meVisible = false;
	othello.addChild(othello.child.piece);

	othello.child.ghostPiece = new Object();
	othello.child.ghostPiece.position = [0,0.25,0];
	othello.child.ghostPiece.color = [1,1,1,0.5,    1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5,    1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5, 1,1,1,0.5,    0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5,    0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5, 0,0,0,0.5,    0,0,0,0.5];
	othello.child.ghostPiece.vertexBuffer = othello.child.piece.vertexBuffer;
	othello.child.ghostPiece.indexBuffer = othello.child.piece.indexBuffer;
	othello.child.ghostPiece.iniColorBuffer(screen3D);
	othello.child.ghostPiece.meVisible = false;
	othello.addChild(othello.child.ghostPiece);
	
	iniPieces();
	
	draw();
	
	setTimeout(testFps, 500);
	}
}
var startTime = new Date().getTime();
var fps = 0;
var realfps = 0;
function draw() { //Boucle d'affichage
	realfps = (10*realfps + new Date().getTime() - startTime)/11;
	startTime = new Date().getTime();
	requestAnimFrame(draw);
	
	
	screen3D.clear([0.2,0.2,0.2,1]);
	screen3D.start(camera);
		othello.draw(screen3D, camera);
		ray.draw(screen3D, camera);
	screen3D.stop();
	anime();
	
	
	fps = (10*fps + new Date().getTime() - startTime)/11;
}
setInterval(function() {html.fps.innerHTML = parseInt(1000/fps) + "(" + fps + "ms)"; html.realfps.innerHTML = parseInt(1000/realfps) + "(" + realfps + "ms)";}, 500);

function testFps() {
	if (parseInt(1000/realfps) < 25)
	{
		putOpac();
		showPopBox('Your computeur is slow !<h3 id="0" onclick="hidePopBox();">OK<h3/>', function() { pullOpac(); });
	}
}

var animation = [];
function anime() { //Animation
	animSpeed = parseInt(1000/realfps/2);
	if(state == STATE.MAIN)
	{
		mat4.rotateY(camera.world, 0.005);
	}
	for(var i = 0; i < animation.length; i++)
	{
		if(animation[i].t > 0)
		{
			mat4.rotateX(animation[i].piece.rotation, Math.PI/animSpeed);
			animation[i].t--;
		}
		else
		{
			mat4.identity(animation[i].piece.rotation);
			if(animation[i].player == -1)
				mat4.rotateX(animation[i].piece.rotation, Math.PI);
			animation.splice(i, 1);
		}
	}
}

function resizeOthello3D() {
	screen3D.resize();
	camera.setPerspective(screen3D);
}

var clickTime;

var mouse;
function mouseDown(e) {
	clickTime = new Date().getTime();
	mouse = { x: e.clientX, y: e.clientY };
}
function mouseMove(e) {
	if(mouse)
	{
		mat4.rotate(camera.world, (mouse.y - e.clientY) * 0.01, vec3.cross([0,1,0], vec3.subtract([0,0,0], vec3.unproject([1, 1, 0], camera.world, camera.perspective, [0,0,2,2]))));
		mat4.rotateY(camera.world, (e.clientX - mouse.x) * 0.01);
		mouse = { x: e.clientX, y: e.clientY };
	}
}
function mouseUp(e) {
	mouse = null;
	if(new Date().getTime() - clickTime < 250 && state == STATE.PLAYER_PLAY) { //Click rapide
		var near = vec3.create();
		var far = vec3.create();
		vec3.unproject([e.clientX, e.clientY, 0], camera.world, camera.perspective, [0,0,screen3D.gl.viewportWidth,screen3D.gl.viewportHeight], near);
		vec3.unproject([e.clientX, e.clientY, 1], camera.world, camera.perspective, [0,0,screen3D.gl.viewportWidth,screen3D.gl.viewportHeight], far);
		var direction = [0,0,0];
		vec3.subtract(far, near, direction);
		
		vec3.normalize(direction);
		
		//ray DEBUG
		ray.vertex = [near[0], near[1], near[2], far[0], far[1], far[2]];
		ray.iniVertexBuffer(screen3D);
		
		var x = parseInt(near[0] - (near[1] * direction[0]) / direction[1] + 4);
		var y = parseInt(near[2] - (near[1] * direction[2]) / direction[1] + 4);
		
		playerClick(x, y);
	}
}

var piece;
var gostPiece;
function iniPieces() {
	piece = Array2.create(8, 8, null);
	ghostPiece = Array2.create(8, 8, null);
	
	for(var x = 0; x < 8; x++)
		for(var y = 0; y < 8; y++)
		{
			piece[x][y] = new Object();
			piece[x][y].position = [x, 0.25, y];
			piece[x][y].vertexBuffer = othello.child.piece.vertexBuffer;
			piece[x][y].colorBuffer = othello.child.piece.colorBuffer;
			piece[x][y].indexBuffer = othello.child.piece.indexBuffer;
			piece[x][y].meVisible = false;
			othello.addChild(piece[x][y]);
			ghostPiece[x][y] = new Object();
			ghostPiece[x][y].position = [x, 0.25, y];
			ghostPiece[x][y].vertexBuffer = othello.child.ghostPiece.vertexBuffer;
			ghostPiece[x][y].colorBuffer = othello.child.ghostPiece.colorBuffer;
			ghostPiece[x][y].indexBuffer = othello.child.ghostPiece.indexBuffer;
			ghostPiece[x][y].meVisible = false;
			othello.addChild(ghostPiece[x][y]);
		}
}
function addPiece(x, y, player) {
	mat4.identity(piece[x][y].rotation);
	if(player == -1)
		mat4.rotateX(piece[x][y].rotation, Math.PI);
	piece[x][y].meVisible = true;
}
function returnPiece(x, y, player) {
	animation.push({ piece: piece[x][y], player: player, t: animSpeed });
}
function clearPieces() {
	for(var x = 0; x < 8; x++)
		for(var y = 0; y < 8; y++)
			piece[x][y].meVisible = false;
}
function addGhostPiece(x, y, player) {
	mat4.identity(ghostPiece[x][y].rotation);
	if(player == -1)
		mat4.rotateX(ghostPiece[x][y].rotation, Math.PI);
	ghostPiece[x][y].meVisible = true;
}
function clearGhostPieces() {
	for(var x = 0; x < 8; x++)
		for(var y = 0; y < 8; y++)
			ghostPiece[x][y].meVisible = false;
}