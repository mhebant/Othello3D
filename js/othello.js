var Array2 = {};
Array2.create = function(xlen, ylen, object) { // Crée un tableau 2D avec les dimensions précisées et le remplit avec l'objet précisé
	var array = [];
	xlen || (xlen = 0);
	ylen || (ylen = 0);
	for(var x = 0; x < xlen; x++)
	{
		var row = [];
		for(var y = 0; y < ylen; y++)
			row.push(object || 0);
		array.push(row);
	}
	return array;
};
Array2.count = function(array, object) { // Compte le nombre d'ocurrence de l'objet dans un tableau 2D. Si aucun objet précisé, retourne la taille du tableau.
	var count = 0;
	
	if(object)
	{
		for(var x = 0; x < array.length; x++)
			for(var y = 0; y < array[x].length; y++)
				if(array[x][y] == object)
					count++;
	}
	else
	{
		count = array.length * array[0].length;
	}
	
	return count;
}
Array2.clone = function(array) { // Crée une copie du tableau 2D
	var clone = [];
	for(var x = 0; x < array.length; x++)
	{
		var row = [];
		for(var y = 0; y < array[x].length; y++)
			row.push(array[x][y]);
		clone.push(row);
	}
	
	return clone;
}



// Couleurs des pions:
// -1 => Noir
// 0 => Vide
// 1 => Blanc
function iniTable() { // Initialise le plateau
	var table = Array2.create(8, 8);
	
	table[3][3] = 1;
	table[4][3] = -1;
	table[3][4] = -1;
	table[4][4] = 1;
	return table;
}
function play(table, player, X, Y) { // Joue un coup (X,Y Pion qui est joué) (x,y Pion actuellement testé, dans une direction) (xr,yr Pion entrain d'etre retourné). Voir documentation
	table[X][Y] = player;
	var count = 0;
	
	if(X+1 < 8 && table[X+1][Y] == -player)		// --o Verrification vers la droite
	{											//
		for(var x = X+1; x < 8; x++) // On parcour le plateau dans cette direction
		{
			if(table[x][Y] == 0) // Si la case est vide, il n'y a aucun pion à renversé dans cette direction
				break;
			else if(table[x][Y] ==  player) // Si la case est de la couleur du joueur, on retourne les pions entre le pion qui a été posé et celui-ci
			{
				for(var xr = X+1; xr < x; xr++) // On part de X (le pion joué) vers x (le pions ou l'on s'est arrèter dans cette direction)...
				{
					table[xr][Y] = player; // ... Et on retourne les pions. 
					count++; // On compte les pions retournés.
				}	
				break;
			}
		}
	}
	if(X-1 >= 0 && table[X-1][Y] == -player)	// o-- Verrification vers la gauche
	{											// 
		for(var x = X-1; x >= 0; x--)
		{
			if(table[x][Y] == 0)
				break;
			else if(table[x][Y] ==  player)
			{
				for(var xr = X-1; xr > x; xr--)
				{
					table[xr][Y] = player;
					count++;
				}	
				break;
			}
		}
	}
	if(Y+1 < 8 && table[X][Y+1] == -player)		//  |  Verrification vers le bas
	{											//  o
		for(var y = Y+1; y < 8; y++)
		{
			if(table[X][y] == 0)
				break;
			else if(table[X][y] ==  player)
			{
				for(var yr = Y+1; yr < y; yr++)
				{
					table[X][yr] = player;
					count++;
				}	
				break;
			}
		}
	}
	if(Y-1 >= 0 && table[X][Y-1] == -player)	//  o  Verrification vers le haut
	{											//  |
		for(var y = Y-1; y >= 0; y--)
		{
			if(table[X][y] == 0)
				break;
			else if(table[X][y] ==  player)
			{
				for(var yr = Y-1; yr > y; yr--)
				{
					table[X][yr] = player;
					count++;
				}	
				break;
			}
		}
	}
	
	if(Y+1 < 8 && X+1 < 8 && table[X+1][Y+1] == -player)	//  \   Verrification vers le bas droite
	{														//   o
		for(var x = X+1, y = Y+1; x < 8; x++, y++)
		{
			if(table[x][y] == 0)
				break;
			else if(table[x][y] ==  player)
			{
				for(var xr = X+1, yr = Y+1; xr < x; xr++, yr++)
				{
					table[xr][yr] = player;
					count++;
				}	
				break;
			}
		}
	}
	if(Y-1 >= 0 && X-1 >= 0 && table[X-1][Y-1] == -player)	//  o   Verrification vers le haut gauche
	{														//   \ 
		for(var x = X-1, y = Y-1; x >= 0; x--, y--)
		{
			if(table[x][y] == 0)
				break;
			else if(table[x][y] ==  player)
			{
				for(var xr = X-1, yr = Y-1; xr > x; xr--, yr--)
				{
					table[xr][yr] = player;
					count++;
				}	
				break;
			}
		}
	}
	if(Y-1 >= 0 && X+1 < 8 && table[X+1][Y-1] == -player)	//   o  Verrification vers le haut droit
	{														//  /
		for(var x = X+1, y = Y-1; x < 8; x++, y--)
		{
			if(table[x][y] == 0)
				break;
			else if(table[x][y] ==  player)
			{
				for(var xr = X+1, yr = Y-1; xr < x; xr++, yr--)
				{
					table[xr][yr] = player;
					count++;
				}	
				break;
			}
		}
	}
	if(Y+1 < 8 && X-1 >= 0 && table[X-1][Y+1] == -player)	//   /  Verrification vers le bas gauche
	{														//  o
		for(var x = X-1, y = Y+1; x >= 0; x--, y++)
		{
			if(table[x][y] == 0)
				break;
			else if(table[x][y] ==  player)
			{
				for(var xr = X-1, yr = Y+1; xr > x; xr--, yr++)
				{
					table[xr][yr] = player;
					count++;
				}	
				break;
			}
		}
	}
	
	return { table: table, count: count };
}
function possibility(table, player) { // Donne les diférentes possibilités de jeu pour un joueur. Voir documentation
	var result = []; // Possibilités sous la forme { x:positionX, y:positionY, count:nombre de pion retourné si l'on jou ici}
	var count; // Stocke temporairement le nombre de pions retournés si l'on joue la case testé. Ci ce nombre est superieur à 0, il sera enregistrer dans result[].count
	
	for(var y = 0; y < 7; y++)
	{
		// On parcourt les cases correspondant aux ronds Rouges sur le shéma de la documentation
		if(table[0][y] == 0) { // Si la case qu'on test est vide, ...
			if((table[1][y] == -player || table[0][y+1] == -player || table[1][y+1] == -player) && (count = play(Array2.clone(table), player, 0, y).count) > 0) // ... On cherche si il y a des pions de couleur opposé sur les case adjacentes. Si oui on regarde si joué ici retourne au moins 1 pion.
				result.push( { x: 0, y: y, count: count } ); // Si cela retourne au moins un pion alors on peut jouer ici (on retounre aussi le nombre de pions que cela raporte)
				}
		else if(table[0][y] == -player) { // Si la case qu'on test a un pion de couleur opposé, ...
			if(table[1][y] == 0 && (count = play(Array2.clone(table), player, 1, y).count) > 0) // ... On test pour chaqu'une des cases adjacentes si elles sont vides. Si oui on regarde si joué dedans retourne au moins 1 pion.
				result.push( { x: 1, y: y, count: count } ); // Si cela retourne au moins un pion alors on peut jouer dans cette case (on retounre aussi le nombre de pions que cela raporte)
			if(table[0][y+1] == 0 && (count = play(Array2.clone(table), player, 0, y+1).count) > 0) // ... On test pour chaqu'une des cases adjacentes si elles sont vides. Si oui on regarde si joué dedans retourne au moins 1 pion.
				result.push( { x: 0, y: y+1, count: count } ); // Si cela retourne au moins un pion alors on peut jouer dans cette case (on retounre aussi le nombre de pions que cela raporte)
			if(table[1][y+1] == 0 && (count = play(Array2.clone(table), player, 1, y+1).count) > 0) // ... On test pour chaqu'une des cases adjacentes si elles sont vides. Si oui on regarde si joué dedans retourne au moins 1 pion.
				result.push( { x: 1, y: y+1, count: count } ); // Si cela retourne au moins un pion alors on peut jouer dans cette case (on retounre aussi le nombre de pions que cela raporte)
		}
		
		// Bleu
		if(table[7][y] == 0) { 
			if((table[7][y+1] == -player || table[6][y+1] == -player) && (count = play(Array2.clone(table), player, 7, y).count) > 0)
				result.push( { x: 7, y: y, count: count } );
		}
		else if(table[7][y] == -player) {
			if(table[7][y+1] == 0 && (count = play(Array2.clone(table), player, 7, y+1).count) > 0)
				result.push( { x: 7, y: y+1, count: count } );
			if(table[6][y+1] == 0 && (count = play(Array2.clone(table), player, 6, y+1).count) > 0)
				result.push( { x: 6, y: y+1, count: count } );
		}
		
		for(var x = 1; x < 7; x++)
		{
			// Vert
			if(table[x][y] == 0) { 
				if((table[x+1][y] == -player || table[x][y+1] == -player || table[x+1][y+1] == -player || table[x-1][y+1]) && (count = play(Array2.clone(table), player, x, y).count) > 0)
					result.push( { x: x, y: y, count: count } );
			}
			else if(table[x][y] == -player) {
				if(table[x+1][y] == 0 && (count = play(Array2.clone(table), player, x+1, y).count) > 0)
					result.push( { x: x+1, y: y, count: count } );
				if(table[x][y+1] == 0 && (count = play(Array2.clone(table), player, x, y+1).count) > 0)
					result.push( { x: x, y: y+1, count: count } );
				if(table[x+1][y+1] == 0 && (count = play(Array2.clone(table), player, x+1, y+1).count) > 0)
					result.push( { x: x+1, y: y+1, count: count } );
				if(table[x-1][y+1] == 0 && (count = play(Array2.clone(table), player, x-1, y+1).count) > 0)
					result.push( { x: x-1, y: y+1, count: count } );
			}
		}
	}
					
	for(var x = 0; x < 7; x++)
	{
		// Orange
		if(table[x][7] == 0) { 
			if(table[x+1][7] == -player && (count = play(Array2.clone(table), player, x, 7).count) > 0)
				result.push( { x: x, y: 7, count: count } );
		}
		else if(table[x][7] == -player) {
			if(table[x+1][7] == 0 && (count = play(Array2.clone(table), player, x+1, 7).count) > 0)
				result.push( { x: x+1, y: 7, count: count } );
		}
	}
	
	return result;
}




var oldTable; // Tableau 2D contenant le dernier plateau qui a été affiché.
function drawGameboard(table) { // Compare oldTable et table, et modifie l'affichage en conséquence.
	for(var x = 0; x < 8; x++)
		for(var y = 0; y < 8; y++) // On parcour le tableaux
			if(table[x][y] != oldTable[x][y]) // Si il y a une différence ...
				if(oldTable[x][y] == 0) // ... et que avant la case était vide ...
					addPiece(x, y, table[x][y]); // ... alors il faut en placé une de la couleur de la nouvelle case (table[x][y])
				else
					returnPiece(x, y, table[x][y]); // Sinon c'est que le pion était de la couleur opposé donc il faut le retourner
	
	oldTable = Array2.clone(table);
}




//Jeu
var table; // Tableau 2D contenant les pion sur le plateau de jeu
var player; // Couleur du joueur qui joue actuellement
var cantPlay; // true si le dernier joueur n'a pas pu jouer
var black; // Fonction qu'il faut appeler pour que les noirs jouent
var white; // Fonction qu'il faut appeler pour que les blancs jouent
var blackHelp; // true si l'aide est activée pour le joueur noir (L'aide affiche les possibilités de jeu)
var whiteHelp; // true si l'aide est activée pour le joueur blanc (L'Aide affiche les possibilités de jeu)
//Joueur
var playerPlay = function(table, player, poss) { // Fait jouer le joueur phisique
	possPlayer = poss; // Enregistre les possibilité (serviront à playerClick)
	if(player == 1?whiteHelp:blackHelp) // On test si le joueur quii joue a activer l'aide (On teste la couleur du joueur qui joue pour tester la variable help corespondant à la couleur de ce joueur)
		for(var i = 0; i < poss.length; i++) // Pour chaque possibilité ...
			addGhostPiece(poss[i].x, poss[i].y, player); // ... On affiche un pion semi-transparent
}
var possPlayer; // Garde en mémoire les différentes possiblilités du joueur physique qui est entrain de jouer
function playerClick(x, y) { // Callback de la fonction playerPlay, appelée lorsque le joueur clic (voir mouseUp() dans othello3D.js)
	var index = -1;
	for(var i = 0; i < possPlayer.length; i++) // On cherche parmis toute les possibilités de jeu, si la case selectioner par le joueur y est
		if(possPlayer[i].x == x && possPlayer[i].y == y)
			index = i;
	
	if(index != -1) // Si le joueur à jouer sur une case possible, on joue le coup. Sinon, c'est qu'il à joué à un endroit interdit, et on attend une nouvelle entrer
	{
		play(table, player, x, y); // On joue le coup ...
		player *= -1; // ... puis on change de joueur ...
		game(); // ... et on continu le jeu
	}
}
var iaPlay = function(table, player, poss) { // IA qui joue alléatoirement sur une des cases possibles
	var rd = Math.floor(Math.random() * (poss.length-1));
	
	return { x: poss[rd].x, y: poss[rd].y }; // Joue une des possibilité au hasard
}
var ia0Play = function(table, player, poss) { // IA qui joue là ou cela lui raporte le plus de pion
	var x;
	var y;
	var count = 0;
	for(var i = 0; i < poss.length; i++) // Pour chaque possibilité, ...
		if(poss[i].count >= count) // ... on retien celle qui retourne le plus de pion
		{
			count = poss[i].count;
			x = poss[i].x;
			y = poss[i].y;
		}
	
	return { x: x, y: y };
}
var ia1Play = function(table, player, poss) { // IA qui joue là ou cela lui rapporte le plus de pion après que l'adversaire est joué. Utilise ia0Play pour prédire le jeu de l'adversaire.
	var x;
	var y;
	var count = 0;
	for(var i = 0; i < poss.length; i++)  // Pour chaque possibilité...
	{
		var tableB = play(Array2.clone(table), player, poss[i].x, poss[i].y).table; // ... on fait comme si on y jouait, ...
		var possB = possibility(tableB, -player);
		if(possB.length > 0)
		{
			var ia = ia0Play(table, -player, possB); // ... et on fait jouer ia0Play pour simuler le jeu de l'adversaire.
			play(tableB, -player, ia.x, ia.y);
		}
		
		if(Array2.count(tableB, player) >= count) // On retien la solution qui nous rapporte le plus de pion au final.
		{
			count = Array2.count(tableB, player);
			x = poss[i].x;
			y = poss[i].y;
		}
	}
	
	if(count == 0)
		return ia0Play(table, player, poss);
	else
		return { x: x, y: y };
}
var iaTimer; // Contient un timeOut qui permet de faire jouer les IA au bout d'une seconde

function newGame(p1, p2, p1Help, p2Help, mainState) { // Initialise une nouvelle partie, en précisant qui jouera les noirs , qui jouera les blancs (p1 et p2 qui doivent etre une des fonctions joueur), si les aides son activées (p1Help et p2Help) et si la partie sert d'arrière plan au menu principal
	clearPieces();
	clearGhostPieces();
	
	if(iaTimer)
		clearTimeout(iaTimer); // On arrete l'IA entrain de joué si il y en a une
	
	oldTable = Array2.create(8, 8, 0); // On nettoit les tableaux
	table = iniTable();
	player = -1; //Les noir commencent
	cantPlay = false;
	black = p1;
	white = p2;
	blackHelp = p1Help;
	whiteHelp = p2Help;
	
	if(!mainState)
		state = STATE.GAME; // A moin que le parametre mainState soit présent, on est maintenant en jeu
	
	game(); // On lance le jeu
}
function game() { // Boucle de jeu
	iaTimer = null;
	clearGhostPieces();
	drawGameboard(table);
	var poss = possibility(table, player); // On cherche les possibilités de jeu qu'a le joueur actuel.
	if(poss.length > 0) // Si il y en a, on fait jouer le joueur concerné en appelant la fonction qui lui est associé (black ou white)
	{
		if(player == -1) // Joueur noir
		{
			if(black == playerPlay)
			{
				state = STATE.PLAYER_PLAY;
				black(table, player, poss);
			}
			else
			{
				if(state != STATE.MAIN) 
					state = STATE.IA_PLAY; // Si on est pas actuellement dans le menu principale c'est que une IA est entrain de jouer
				var ia = black(table, player, poss);
				play(table, player, ia.x, ia.y);
				player *= -1;
				iaTimer = setTimeout(game, 1000);
			}
		}
		else // Joueur blanc
		{
			if(white == playerPlay)
			{
				state = STATE.PLAYER_PLAY;
				white(table, player, poss);
			}
			else
			{
				if(state != STATE.MAIN)
					state = STATE.IA_PLAY; // Si on est pas actuellement dans le menu principale c'est que une IA est entrain de jouer
				var ia = white(table, player, poss);
				play(table, player, ia.x, ia.y);
				player *= -1;
				iaTimer = setTimeout(game, 1000);
			}
		}
	}
	else // On ne peu pas jouer on passe donc le tour
	{
		if(cantPlay)
			endGame(); // Mais si le joueur précédant n'avait déja pas pu joué c'est que la partie est terminé
		else
		{
			cantPlay = true;
			player *= -1;
			game();
		}
	}
}
function endGame() { // Appelée à la fin d'une partie
	if(state != STATE.MAIN)
	{
		// On affiche les resultats
		var msg;
		if(Array2.count(table, -1) > 32)
			msg = "Black Wins !!";
		else
			msg = "White Wins !!";
		showPopBox('Black: ' + Array2.count(table, -1) + ' White: ' + Array2.count(table, 1) + '<br>' + msg + '<h3 id="0" onclick="hidePopBox();">OK</h3>', function() { pullOpac(); buttonClick("mainmenu"); state = STATE.MAIN; newGame(ia0Play, ia0Play, false, false, "mainState"); }); // Affiche une boite de dialogue
		putOpac(); // Assombri le reste de la page
	}
	else
		newGame(ia0Play, ia0Play, false, false, "mainState"); // Si on était dans le menu principale, on relance une parti ia contre ia
}