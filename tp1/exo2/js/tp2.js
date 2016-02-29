var intervalId;
var left = 0;

function deplacer()
{
	intervalId = setInterval(deplacer_droite, 100);
}

function deplacer_droite()
{
	left += 10;
	carre = document.getElementById("carre");
	carre.style.left = left+"px";
}