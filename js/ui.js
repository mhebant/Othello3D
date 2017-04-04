function addEvent(element, event, func) {
    if (element.addEventListener) {
        element.addEventListener(event, func, false);
    } else {
        element.attachEvent('on' + event, func);
    }
}
function removeEvent(element, event, func) {
    if (element.removeEventListener) {
        element.removeEventListener(event, func, false);
    } else {
        element.detachEvent('on' + event, func);
    }
}

var html = {};
var STATE = { MAIN: 0, GAME: 1, PLAYER_PLAY: 2, IA_PLAY: 3 };
var state = STATE.MAIN;

var currentMenu;

function load() {
	html.canvas = document.getElementById("canvas"); //Récuprère les elements html
	html.fpsdisplay = document.getElementById("fpsdisplay");
	html.fps = document.getElementById("fps");
	html.realfps = document.getElementById("realfps");
	html.popbox = document.getElementById("popbox");
	html.opac = document.getElementById("opac");
	html.mainmenu = document.getElementById("mainmenu");
	html.solomenu = document.getElementById("solomenu");
	html.multimenu = document.getElementById("multimenu");
	html.localmenu = document.getElementById("localmenu");
	html.buttonmenu = document.getElementById("buttonmenu");
	html.pausemenu = document.getElementById("pausemenu");
	
	html.b = {}; //Récupères les bouttons d'action des menus
	html.b.soloplayer = document.getElementById("b_soloplayer");
	html.b.soloia = document.getElementById("b_soloia");
	html.b.solohelp = document.getElementById("b_solohelp");
	html.b.solostart = document.getElementById("b_solostart");
	html.b.localblack = document.getElementById("b_localblack");
	html.b.localwhite = document.getElementById("b_localwhite");
	html.b.localstart = document.getElementById("b_localstart");
	html.b.mainmenu = document.getElementById("b_mainmenu");

	addEvent(html.canvas, "mousedown", mouseDown); //Ajoute les evenement de la suris sur le canvas
	addEvent(html.canvas, "mousemove", mouseMove);
	addEvent(html.canvas, "mouseup", mouseUp);
	
	iniMenu(html.mainmenu); //Place les menus
	iniMenu(html.solomenu);
	iniMenu(html.multimenu);
	iniMenu(html.localmenu);
	iniMenu(html.buttonmenu);
	iniMenu(html.pausemenu);
	currentMenu = html.mainmenu;
	
	var h3 = document.getElementsByTagName("h3"); //Ajoute les évenement sur les bouttons de navigation des menus
	for(var i = 0; i < h3.length; i++)
		if(h3[i].id == "")
			addEvent(h3[i], "click", buttonClick);
	addEvent(html.buttonmenu, "click", buttonClick); //Ajoute l'évenement de boutton de navigation sur le buttonmenu
	
	loadOthello3D(); //Charge le necessaire à la 3D
	
	newGame(iaPlay, iaPlay, false, false, "mainState"); //Lance une partie ia contre ia, sans aide, en présisant que cette partie n'est pas une partie lancé par le joueur
}
function resize() {
	html.canvas.width = window.innerWidth;
	html.canvas.height = window.innerHeight;
	
	resizeOthello3D();
	
	iniMenu(html.mainmenu); //Relace les menus
	iniMenu(html.solomenu);
	iniMenu(html.multimenu);
	iniMenu(html.localmenu);
	iniMenu(html.buttonmenu);
	iniMenu(html.pausemenu);
}

function iniMenu(menu) {
	menu.style.top = window.innerHeight / 2 - menu.offsetHeight / 2;
}

//Solo
var soloplayer = -1;
function soloplayerClick() {
	soloplayer *= -1;
	if(soloplayer == 1)
		html.b.soloplayer.innerHTML = "Player: White"; 
	else
		html.b.soloplayer.innerHTML = "Player: Black"; 
}
var soloia = iaPlay;
function soloiaClick() {
	if(soloia == iaPlay)
	{
		soloia = ia0Play;
		html.b.soloia.innerHTML = "IA Level: Medium";
	}
	else if(soloia == ia0Play)
	{
		soloia = ia1Play;
		html.b.soloia.innerHTML = "IA Level: Hard";
	}
	else
	{
		soloia = iaPlay;
		html.b.soloia.innerHTML = "IA Level: Easy";
	}
}
var solohelp = false;
function solohelpClick() {
	if(solohelp)
	{
		solohelp = false;
		html.b.solohelp.innerHTML = "Help: No";
	}
	else
	{
		solohelp = true;
		html.b.solohelp.innerHTML = "Help: Yes";
	}
}
function solostartClick() {
	animation = [];
	buttonClick("buttonmenu");
	if(soloplayer == -1)
		newGame(playerPlay, soloia, solohelp, false);
	else
		newGame(soloia, playerPlay, false, solohelp);
}

//Local
var localblack = false;
function localblackClick() {
	if(localblack)
	{
		localblack = false;
		html.b.localblack.innerHTML = "Black Help: No";
	}
	else
	{
		localblack = true;
		html.b.localblack.innerHTML = "Black Help: Yes";
	}
}
var localwhite = false;
function localwhiteClick() {
	if(localwhite)
	{
		localwhite = false;
		html.b.localwhite.innerHTML = "White Help: No";
	}
	else
	{
		localwhite = true;
		html.b.localwhite.innerHTML = "White Help: Yes";
	}
}
function localstartClick() {
	animation = [];
	buttonClick("buttonmenu");
	newGame(playerPlay, playerPlay, localblack, localwhite, false);
}

//Resume
function mainmenuClick() {
	animation = [];
	state =STATE.MAIN;
	newGame(ia0Play, ia0Play, false, false, "mainState");
	buttonClick("mainmenu");
}

//Boutton de navigation
function buttonClick(e) {
	if(!newMenu)
	{
		var menu;
		if(typeof e == "string")
			menu = e;
		else
			menu = e.target.className;
		newMenu = document.getElementById(menu);
		openTimer = setInterval(openMenu, 30);
	}
}
var newMenu;
var openTimer;
function openMenu() {
	var left = currentMenu.style.left;
	left = parseInt(left.substring(0, left.length - 2));
	if(left > -350)
		currentMenu.style.left = left - 50 + "px";
	else
	{
		left = newMenu.style.left;
		left = parseInt(left.substring(0, left.length - 2));
		if(left < 0)
			newMenu.style.left = left + 50 + "px";
		else
		{
			currentMenu = newMenu;
			newMenu = null;
			clearInterval(openTimer);
		}
	}
}

//PopBox
var popbox = false;
var popboxTimer;
var popboxOnClose;
function showPopBox(msg, onClose) {
	if(popbox)
		popboxOnClose();

	popbox = true;
	html.popbox.innerHTML = msg;
	html.popbox.style.top = - html.popbox.offsetHeight;
	html.popbox.style.left = (window.innerWidth / 2) - (html.popbox.offsetWidth / 2);
	
	if(onClose)
		popboxOnClose = onClose;
	else
		popboxOnClose = function() {};
	popboxTimer = setInterval(downPopBox, 30);
}
function downPopBox() {
	var top = html.popbox.style.top;
	top = parseInt(top.substring(0, top.length - 2));
	if(top < window.innerHeight / 2 - html.popbox.offsetHeight / 2)
		html.popbox.style.top = top + 50 + "px";
	else
		clearInterval(popboxTimer);
}
function hidePopBox() {
	if(popbox)
	{
		popboxTimer = setInterval(upPopBox, 30);
		popbox = false;
		popboxOnClose();
	}
}
function upPopBox() {
	var top = html.popbox.style.top;
	top = parseInt(top.substring(0, top.length - 2));
	if(top > -html.popbox.offsetHeight)
		html.popbox.style.top = top - 50 + "px";
	else
		clearInterval(popboxTimer);
}

//Opac
var opac = false;
var opacTimer;
function putOpac() {
	opac = true;
	html.opac.style.display = "block";
	html.opac.style.opacity = 0;
	
	opacTimer = setInterval(moreOpac, 30);
}
function moreOpac() {
	var opacity = parseFloat(html.opac.style.opacity);
	if(opacity < 0.49)
		html.opac.style.opacity = opacity + 0.05;
	else
		clearInterval(opacTimer);
}
function pullOpac() {
	if(opac)
	{
		opacTimer = setInterval(lessOpac, 30);
		opac = false;
	}
}
function lessOpac() {
	var opacity = parseFloat(html.opac.style.opacity);
	if(opacity > 0.06)
		html.opac.style.opacity = opacity - 0.05;
	else
	{
		html.opac.style.opacity = 0;
		html.opac.style.display = "none";
		clearInterval(opacTimer);
	}
}


//DEBUG
function debug(com) {
	switch(com)
	{
		case "fps":
			if(fpsdisplay.style.display == "none")
				fpsdisplay.style.display = "block";
			else
				fpsdisplay.style.display = "none";
			break;
		case "ray":
			if(ray.meVisible)
				ray.meVisible = false;
			else
				ray.meVisible = true;
			break;
			break;
	}
} 
