						/*******************VARIABLES GLOBALES*********************/

//sante
y_sante=50;
l_sante=202;
h_sante=20;
sante_max=50000;

//charge
y_charge=y_sante+2*h_sante;
l_charge=Math.floor(l_sante/2);
h_charge=h_sante;
charge_max=5000;

//gestion du jeu
fin=false;
debut=false;
restart=false;


							/************DEFINITIONS CLASSES***********/
function ElemGraphic () {
  this.image = new Image();
  this.image.addEventListener("load",loaded,false);
  this.image.loaded = false;
  this.image.src = "";
  this.x = 0;
  this.y = 0;
  this.rotation = 0;
}

function Joueur () {
  this.nom = "Default";
  this.num = 1;
  //Aspect graphique
  this.tete = new ElemGraphic();
  this.bras = new ElemGraphic();
  this.avant_bras = new ElemGraphic();
  this.buste = new ElemGraphic();
  this.touches = new ElemGraphic();

  //Caracteristiques
  this.sante = 50000;
  this.etat = "parade_bas"; //parade_haut,parade_bas,attaque_haut,_attaque_bas
  this.charge = 1;
  this.special = false;
  this.cpt_attaque = 0;
}

								/******KEYS******/
var keys = {
    UP: 38,
    LEFT: 37,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13,
    Z: 90,
    S: 83,
    D: 68
};

var keyStatus = {};

function keyDownHandler(event) {
    "use strict"; 
    var keycode = event.keyCode, 
        key; 
    for (key in keys) {
        if (keys[key] === keycode) {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}

function keyUpHandler(event) {
   var keycode = event.keyCode,
       key;
    for (key in keys){
        if (keys[key] === keycode) {
            keyStatus[keycode] = false;
        }
    }
}

							/*****************START, INIT et END*****************/

function loaded(evt){
	evt.target.loaded=true;
}

function start(res){
	var msg=document.getElementById("msg_gagnant");
	msg.innerHTML="";
	if(!res){//start classique
		btn_start=document.getElementById("btn_start");
		btn_start.style.display = 'none';
		debut=true;
	}
	else{//restart
		btn_restart=document.getElementById("btn_restart");
		btn_restart.style.display = 'none';
		restart=true;
	}
}

function init()
{
	//init Joueurs
	initJoueurUn();
	initJoueurDeux();

	//init canvas
	canvas = document.getElementById("canvas");
	canvas.width = get_largeur_page();
	canvas.height = get_hauteur_page();
	ctx = canvas.getContext("2d");//contexte

	//init interactions clavier
	window.addEventListener("keydown", keyDownHandler, false);
	window.addEventListener("keyup", keyUpHandler, false);

	//init fond
	initFond();

	// start the mainloop
	if(restart){//restart
		animFrame( recursiveGame );
		restart=false;
	}
	else//start classique
		animFrame( waitStart );
}

function initJoueurUn()
{
	joueur_un = new Joueur();
	joueur_un.nom="Default";
	joueur_un.num=1;

	initSourcesImages(joueur_un);

	initTouches(joueur_un);

	pos_parade_bas(joueur_un);
}

function initJoueurDeux()
{
	joueur_deux = new Joueur();
	joueur_deux.nom="John Cena";
	joueur_deux.num=2;

	initSourcesImages(joueur_deux);

	initTouches(joueur_deux);

	pos_parade_bas(joueur_deux);
}

function initSourcesImages(joueur)
{
	/*PERSONNAGE*/
	chemin = "characters/default/" //chemin d'acces aux images
	if(joueur.nom=="Default")
	{
		chemin = "characters/default/"
	}
	else if(joueur.nom=="John Cena")
	{
		chemin = "characters/john_cena/"
	}
	joueur.tete.image.src = chemin+"tete/normal.png";
	joueur.buste.image.src = chemin+"buste.png";
	joueur.avant_bras.image.src = chemin+"avant_bras.png";
	joueur.bras.image.src = chemin+"bras.png";

	/*IMAGE TOUCHES*/
	joueur.touches.image.src = "images/touches_j"+joueur.num+".png";
}

function initTouches(joueur){
	joueur.touches.width = 100;
	joueur.touches.height = 100;
	joueur.touches.y = 600;
	if(joueur.num==1)
		joueur.touches.x = 150;
	else//J2
		joueur.touches.x = 1000;
}

function initFond(){
	fond = new ElemGraphic();
	fond.image.src="images/ring.jpg";
	fond.width = 1100;
	fond.height = 700;
	fond.x = 570;
	fond.y = 370;
}

function end(){
	fin=false;
	animFrame( waitRestart );
}

							/********************POSITIONS*************************/

/*Fonction qui gère la position
  Paramètres:
  ja: joueur concerné
  pos: "parade_bas","parade_haut","attaque_bas","attaque_haut"
*/
function position(ja,pos)
{
	if(pos=="parade_bas")
		pos_parade_bas(ja);
	else if(pos=="parade_haut")
		pos_parade_haut(ja);
	else if(pos=="attaque_bas")
		pos_attaque_bas(ja);
	else if(pos=="attaque_haut")
		pos_attaque_haut(ja);
}

/*PARADE BAS*/

function pos_parade_bas(joueur)
{
	if(joueur.num==1)
	{
		if(joueur.nom=="Default")
			pos_parade_bas_default(joueur,false);
	}
	else//joueur.num=2
	{
		if(joueur.nom=="John Cena")
			pos_parade_bas_john_cena(joueur,true);
	}
}

//default
function pos_parade_bas_default(joueur,reversed)
{
	if(!reversed)
	{
		//tete
		joueur.tete.width = 250;
		joueur.tete.height = 330;
		joueur.tete.x = 370;
		joueur.tete.y = 290;
		joueur.tete.rotation = 0;

		//buste
		joueur.buste.width = 250;
		joueur.buste.height = 330;
		joueur.buste.x = 370;
		joueur.buste.y = 490;
		joueur.buste.rotation = 0;

		//avant_bras
		joueur.avant_bras.width = 125;
		joueur.avant_bras.height = 330;
		joueur.avant_bras.x = 310;
		joueur.avant_bras.y = 500;
		joueur.avant_bras.rotation = -10;

		//bras
		joueur.bras.width = 125;
		joueur.bras.height = 330;
		joueur.bras.x = 420;
		joueur.bras.y = 500;
		joueur.bras.rotation = -150;
	}
}

//john_cena
function pos_parade_bas_john_cena(joueur,reversed)
{
	if(reversed)
	{
		//tete
		joueur.tete.width = 200;
		joueur.tete.height = 260;
		joueur.tete.x = 750;
		joueur.tete.y = 270;
		joueur.tete.rotation = 0;

		//buste
		joueur.buste.width = 250;
		joueur.buste.height = 330;
		joueur.buste.x = 760;
		joueur.buste.y = 490;
		joueur.buste.rotation = 0;

		//avant_bras
		joueur.avant_bras.width = 125;
		joueur.avant_bras.height = 330;
		joueur.avant_bras.x = 830;
		joueur.avant_bras.y = 500;
		joueur.avant_bras.rotation = 30;

		//bras
		joueur.bras.width = 125;
		joueur.bras.height = 330;
		joueur.bras.x = 700;
		joueur.bras.y = 500;
		joueur.bras.rotation = 150;
	}
}

/*PARADE HAUT*/

function pos_parade_haut(joueur)
{
	if(joueur.num==1)
	{
		if(joueur.nom=="Default")
			pos_parade_haut_default(joueur,false);
	}
	else//joueur.num=2
	{
		if(joueur.nom=="John Cena")
			pos_parade_haut_john_cena(joueur,true);
	}
}

//default
function pos_parade_haut_default(joueur,reversed)
{
	if(!reversed)
	{
		//tete
		joueur.tete.width = 250;
		joueur.tete.height = 330;
		joueur.tete.x = 370;
		joueur.tete.y = 300;
		joueur.tete.rotation = 0;

		//buste
		joueur.buste.width = 250;
		joueur.buste.height = 330;
		joueur.buste.x = 370;
		joueur.buste.y = 490;
		joueur.buste.rotation = 0;

		//avant_bras
		joueur.avant_bras.width = 125;
		joueur.avant_bras.height = 330;
		joueur.avant_bras.x = 390;
		joueur.avant_bras.y = 440;
		joueur.avant_bras.rotation = -60;

		//bras
		joueur.bras.width = 125;
		joueur.bras.height = 330;
		joueur.bras.x = 520;
		joueur.bras.y = 350;
		joueur.bras.rotation = -170;
	}
}

//john_cena
function pos_parade_haut_john_cena(joueur,reversed)
{
	if(reversed)
	{
		//tete
		joueur.tete.width = 200;
		joueur.tete.height = 260;
		joueur.tete.x = 750;
		joueur.tete.y = 280;
		joueur.tete.rotation = 0;

		//buste
		joueur.buste.width = 250;
		joueur.buste.height = 330;
		joueur.buste.x = 760;
		joueur.buste.y = 490;
		joueur.buste.rotation = 0;

		//avant_bras
		joueur.avant_bras.width = 125;
		joueur.avant_bras.height = 330;
		joueur.avant_bras.x = 780;
		joueur.avant_bras.y = 460;
		joueur.avant_bras.rotation = 60;

		//bras
		joueur.bras.width = 125;
		joueur.bras.height = 330;
		joueur.bras.x = 630;
		joueur.bras.y = 380;
		joueur.bras.rotation = 170;
	}
}

/*ATTAQUE BAS*/

function pos_attaque_bas(joueur)
{
	if(joueur.num==1)
	{
		if(joueur.nom=="Default")
			pos_attaque_bas_default(joueur,false);
	}
	else//joueur.num=2
	{
		if(joueur.nom=="John Cena")
			pos_attaque_bas_john_cena(joueur,true);
	}
}

//default
function pos_attaque_bas_default(joueur,reversed)
{
	if(!reversed)
	{
		//tete
		joueur.tete.width = 250;
		joueur.tete.height = 330;
		joueur.tete.x = 370;
		joueur.tete.y = 290;
		joueur.tete.rotation = 0;

		//buste
		joueur.buste.width = 250;
		joueur.buste.height = 330;
		joueur.buste.x = 370;
		joueur.buste.y = 490;
		joueur.buste.rotation = 0;

		//avant_bras
		joueur.avant_bras.width = 125;
		joueur.avant_bras.height = 330;
		joueur.avant_bras.x = 360;
		joueur.avant_bras.y = 500;
		joueur.avant_bras.rotation = -30;

		//bras
		joueur.bras.width = 125;
		joueur.bras.height = 330;
		joueur.bras.x = 580;
		joueur.bras.y = 610;
		joueur.bras.rotation = -90;
	}
}

//john_cena
function pos_attaque_bas_john_cena(joueur,reversed)
{
	if(reversed)
	{
		//tete
		joueur.tete.width = 200;
		joueur.tete.height = 260;
		joueur.tete.x = 750;
		joueur.tete.y = 270;
		joueur.tete.rotation = 0;

		//buste
		joueur.buste.width = 250;
		joueur.buste.height = 330;
		joueur.buste.x = 760;
		joueur.buste.y = 490;
		joueur.buste.rotation = 0;

		//avant_bras
		joueur.avant_bras.width = 125;
		joueur.avant_bras.height = 330;
		joueur.avant_bras.x = 800;
		joueur.avant_bras.y = 470;
		joueur.avant_bras.rotation = 50;

		//bras
		joueur.bras.width = 125;
		joueur.bras.height = 330;
		joueur.bras.x = 580;
		joueur.bras.y = 600;
		joueur.bras.rotation = 90;
	}
}

/*ATTAQUE HAUT*/

function pos_attaque_haut(joueur)
{
	if(joueur.num==1)
	{
		if(joueur.nom=="Default")
			pos_attaque_haut_default(joueur,false);
	}
	else//joueur.num=2
	{
		if(joueur.nom=="John Cena")
			pos_attaque_haut_john_cena(joueur,true);
	}
}

//default
function pos_attaque_haut_default(joueur,reversed)
{
	if(!reversed)
	{
		//tete
		joueur.tete.width = 250;
		joueur.tete.height = 330;
		joueur.tete.x = 360;
		joueur.tete.y = 280;
		joueur.tete.rotation = -10;

		//buste
		joueur.buste.width = 250;
		joueur.buste.height = 330;
		joueur.buste.x = 370;
		joueur.buste.y = 490;
		joueur.buste.rotation = 0;

		//avant_bras
		joueur.avant_bras.width = 125;
		joueur.avant_bras.height = 330;
		joueur.avant_bras.x = 410;
		joueur.avant_bras.y = 380;
		joueur.avant_bras.rotation = -80;

		//bras
		joueur.bras.width = 125;
		joueur.bras.height = 330;
		joueur.bras.x = 650;
		joueur.bras.y = 360;
		joueur.bras.rotation = -100;
	}
}

//john_cena
function pos_attaque_haut_john_cena(joueur,reversed)
{
	if(reversed)
	{
		//tete
		joueur.tete.width = 200;
		joueur.tete.height = 260;
		joueur.tete.x = 770;
		joueur.tete.y = 260;
		joueur.tete.rotation = 20;

		//buste
		joueur.buste.width = 250;
		joueur.buste.height = 330;
		joueur.buste.x = 760;
		joueur.buste.y = 490;
		joueur.buste.rotation = 0;

		//avant_bras
		joueur.avant_bras.width = 125;
		joueur.avant_bras.height = 330;
		joueur.avant_bras.x = 730;
		joueur.avant_bras.y = 410;
		joueur.avant_bras.rotation = 90;

		//bras
		joueur.bras.width = 125;
		joueur.bras.height = 330;
		joueur.bras.x = 500;
		joueur.bras.y = 370;
		joueur.bras.rotation = 140;
	}
}

						/*****************************LOOP*************************/

var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;

var waitStart = function() {
	drawGame();
	if(debut)
		animFrame( recursiveGame );
	else
		animFrame( waitStart );
};

var mainloop = function() {
    updateGame();
    drawGame();
};

var recursiveGame = function() {
    mainloop();
    if(fin!=true)//tant que fin est vrai
    	animFrame( recursiveGame );
    else//fin de la partie
    	end();
};

var waitRestart = function() {
    if(restart!=true)//tant que l'on ne recommence pas
    	animFrame( waitRestart );
    else//bouton restart appuyé
    	init();
};

					/***************************UPDATE***************************/

function updateGame()
{
	//tempsPrec_update_game = Date.now();//debug

	// getStatusJoueurUn();
	// getStatusJoueurDeux();
	//testRAM();
	interactionsClavier();
	updateJoueurs();

	//tempsMs_update_game = Date.now();//debug
	//console.log("temps update game: "+(tempsMs_update_game-tempsPrec_update_game));//debug
}

var sens="down";

function testRAM()
{
	if(sens=="down")
	{
		joueur_un.sante=joueur_un.sante-200;
		if(joueur_un.sante<500){
			sens="up";
		}
	}
	else
	{
		joueur_un.sante=joueur_un.sante+200;
		if(joueur_un.sante>40000){
			sens="down";
		}
	}
}

function getStatusJoueurUn()
{
	return joueur_un.etat;
}

function getStatusJoueurDeux()
{
	return joueur_deux.etat;
}

function interactionsClavier()
{
    var keycode;

    for (keycode in keyStatus) {
        if(keyStatus[keycode] == true){
        	//J1
            if(keycode == keys.Z) {
            	console.log("Z PRESSED");
                joueur_un.etat="parade_haut";
                pos_parade_haut(joueur_un);
            }
            if(keycode == keys.S) {
            	console.log("S PRESSED");
                joueur_un.etat="parade_bas";
                pos_parade_bas(joueur_un);
            }
            if(keycode == keys.D) {
            	console.log("D PRESSED");
            	if(joueur_un.etat=="parade_bas")
            	{
	                joueur_un.etat="attaque_bas";
	                pos_attaque_bas(joueur_un);
	                joueur_un.cpt_attaque=0;
            	}
            	if(joueur_un.etat=="parade_haut")
            	{
	                joueur_un.etat="attaque_haut";
	                pos_attaque_haut(joueur_un);
	                joueur_un.cpt_attaque=0;
            	}
            }
            //J2
            if(keycode == keys.UP) {
            	console.log("UP PRESSED");
                joueur_deux.etat="parade_haut";
                pos_parade_haut(joueur_deux);
            }
            if(keycode == keys.DOWN) {
            	console.log("DOWN PRESSED");
                joueur_deux.etat="parade_bas";
                pos_parade_bas(joueur_deux);
            }
            if(keycode == keys.LEFT) {
            	console.log("LEFT PRESSED");
            	if(joueur_deux.etat=="parade_bas")
            	{
	                joueur_deux.etat="attaque_bas";
	                pos_attaque_bas(joueur_deux);
	                joueur_deux.cpt_attaque=0;
            	}
            	if(joueur_deux.etat=="parade_haut")
            	{
	                joueur_deux.etat="attaque_haut";
	                pos_attaque_haut(joueur_deux);
	                joueur_deux.cpt_attaque=0;
            	}
            }
        }
     	keyStatus[keycode] = false;
	}
}

function updateJoueurs()
{
	//attaque bas J1
	verifAttaque(joueur_un,"bas");

	//attaque haut J1
	verifAttaque(joueur_un,"haut");

	//attaque bas J2
	verifAttaque(joueur_deux,"bas");

	//attaque haut J2
	verifAttaque(joueur_deux,"haut");

	//verifier gagnant
	verifGagnant();

	//charge++
	augmenterCharge(joueur_un);
	augmenterCharge(joueur_deux);
}

/*Fonction qui vérifie si un des joueurs attaque
  et qui met à jour le jeu si c'est le cas
  Parametres:
	ja: joueur attaquant
	pos: "haut" ou "bas"
*/
function verifAttaque(ja,pos)
{
	var jb;//joueur adverse

	if(ja.num==1)
		jb=joueur_deux;
	else
		jb=joueur_un;

	//attaque JA
	if(ja.etat==("attaque_"+pos)){
		if(ja.cpt_attaque==0){
			if(jb.etat!=("parade_"+pos)){
				jb.sante=jb.sante-ja.charge;
				if(jb.sante<0)
					jb.sante=0;
				audio_coup();
			}
			else//jb en bonne parade
				audio_bloque();
			ja.cpt_attaque++;
			ja.charge=1;
		}
		else if(ja.cpt_attaque==5){
			ja.etat="parade_"+pos;
			position(ja,("parade_"+pos));
			ja.cpt_attaque=0;
		}
		else
			ja.cpt_attaque++;
	}
}

function verifGagnant()
{
	if(joueur_un.sante==0)
		gagnant(joueur_deux);
	else if(joueur_deux.sante==0)
		gagnant(joueur_un);
}

function gagnant(joueur)
{
	var msg=document.getElementById("msg_gagnant");
	msg.innerHTML=joueur.nom+" a gagné!";
	var btn_restart=document.getElementById("btn_restart");
	btn_restart.style.display="block";
	audio_applaudissements();
	fin=true;
}

function augmenterCharge(joueur)
{
	if(joueur.charge<charge_max/10)
		joueur.charge=joueur.charge+charge_max/500;
	else if(joueur.charge<charge_max/5)
		joueur.charge=joueur.charge+charge_max/250;
	else if(joueur.charge<charge_max/3)
		joueur.charge=joueur.charge+charge_max/125;
	else if(joueur.charge<charge_max/2)
		joueur.charge=joueur.charge+charge_max/80;
	else
		joueur.charge=joueur.charge+charge_max/50;
	if(joueur.charge>charge_max)
		joueur.charge=charge_max;
}

										/**********************DRAW**********************/

function drawGame()
{
	//tempsPrec_draw_game = Date.now();//debug

	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawEnvironnement();
	drawJoueurs();

	//tempsMs_draw_game = Date.now();//debug
	//console.log("temps draw game: "+(tempsMs_draw_game-tempsPrec_draw_game));//debug
}

function drawEnvironnement()
{
	//tempsPrec_draw_env = Date.now();//debug

	//fond
	drawRotatedImage(fond,false);

	//contour noir
	ctx.rect(20,20,1100,700);
	ctx.stroke();

	//touches joueurs
	drawRotatedImage(joueur_un.touches,false);
	drawRotatedImage(joueur_deux.touches,false);

	//carac joueurs
	drawCaracJoueur(joueur_un,270);
	drawCaracJoueur(joueur_deux,650);

	//tempsMs_draw_env = Date.now();//debug
	//console.log("temps draw environment: "+(tempsMs_draw_env-tempsPrec_draw_env));//debug
}

function drawCaracJoueur(joueur,x)
{
	//sante
	//ctx.rect(x,y_sante,l_sante,h_sante);	/**PROBLEME**/
	//ctx.stroke();							/**PROBLEME**/

	if(joueur.sante<sante_max/4)
		ctx.fillStyle="red";
	else if(joueur.sante<sante_max/2)
		ctx.fillStyle="orange";
	else if(joueur.sante<sante_max*3/4)
		ctx.fillStyle="yellow";
	else
		ctx.fillStyle="green";

	ctx.fillRect(x+1,y_sante+1,Math.floor(((l_sante-2)*joueur.sante)/sante_max),h_sante-2);/*safe*/

	//charge
	x=Math.floor(x+(l_sante-2)/4);/*safe*/

	//ctx.rect(x,y_charge,l_charge,h_charge);	/**PROBLEME**/
	//ctx.stroke();								/**PROBLEME**/

	ctx.fillStyle="blue";
	ctx.fillRect(x+1,y_charge+1,Math.floor(((l_charge-2)*joueur.charge)/charge_max),h_charge-2);/*safe*/
}

function drawJoueurs()
{
	//Draw buste
	drawRotatedImage(joueur_un.buste,false);
	drawRotatedImage(joueur_deux.buste,true);

	//Draw avant_bras
	drawRotatedImage(joueur_un.avant_bras,false);
	drawRotatedImage(joueur_deux.avant_bras,true);

	//Draw tete
	drawRotatedImage(joueur_un.tete,false);
	drawRotatedImage(joueur_deux.tete,true);

	//Draw bras
	drawRotatedImage(joueur_un.bras,false);
	drawRotatedImage(joueur_deux.bras,true);
}

//DRAW ROTATED IMAGE
function drawRotatedImage(elem,reversed) { 

	// save the current co-ordinate system 
	// before we screw with it
	ctx.save(); 
 
	// move to the middle of where we want to draw our image
	ctx.translate(elem.x, elem.y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	ctx.rotate(elem.rotation * Math.PI/180);

	if(reversed)
	{
		ctx.scale(-1,1);
	}
 
	// draw it up and to the left by half the width
	// and height of the image 
	if(elem.image.loaded)
		ctx.drawImage(elem.image, 0, 0, elem.image.width, elem.image.height, -(elem.width/2), -(elem.height/2), elem.width, elem.height);

	// and restore the co-ords to how they were when we began
	ctx.restore();
}

										/**********************AUDIO********************/


function audio_coup(){
	var num = random_int(1,5);
	var aud_coup = document.getElementById("coup_"+num);
	stop(aud_coup);
	aud_coup.play();
}

function audio_bloque(){
	var num = random_int(1,2);
	var aud_bloque = document.getElementById("bloque_"+num);
	stop(aud_bloque);
	aud_bloque.play();
}

function audio_applaudissements(){
	var aud_applaudissements = document.getElementById("applaudissements");
	stop(aud_applaudissements);
	aud_applaudissements.play();
}

function stop(aud){
	if(aud.currentTime!=0){
		aud.pause();
		aud.currentTime=0;
	}
}


										/**********************COMPLEMENTAIRES********************/

/*
Fonction qui génère un nombre aléatoire entre min et max
Paramètres: min: valeur minimale incluse
			max: valeur maximale incluse
*/
function random_int(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

/*
Fonction qui renvoit la largeur de la page
*/
function get_largeur_page()
{
	/*si on a un body, on renvoit sa largeur*/
	if (document.body)
	{
		var larg = (document.body.clientWidth);
	}
	/*sinon, on renvoit la largeur de la fenêtre*/
	else
	{
		var larg = (window.innerWidth);
	}

	return larg;
}

/*
Fonction qui renvoit la hauteur de la page
*/
function get_hauteur_page()
{
	// /*si on a un body, on renvoit sa hauteur*/
	// if (document.body)
	// {
	// 	var haut = (document.body.clientHeight);
	// }
	// /*sinon, on renvoit la hauteur de la fenêtre*/
	// else
	// {
	// 	var haut = (window.innerHeight);
	// }
	
	// var haut = (document.body.clientHeight);
	var haut = (window.innerHeight)-25;
	return haut;
}