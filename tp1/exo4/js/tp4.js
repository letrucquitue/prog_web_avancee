var intervalId1,intervalId2,intervalId3;
var timeoutId1,timeoutId2,timeoutId3;
var left_c1 = 0;
var left_c2 = 0;
var left_c3 = 0;

function init()
{
	timeoutId1 = setTimeout(deplacer_c1,4000);
	timeoutId2 = setTimeout(deplacer_c2,5000);
	timeoutId3 = setTimeout(deplacer_c3,6000);
}

function deplacer_c1()
{
	console.log("deplacer_c1");
	intervalId1 = setInterval(deplacer_droite_c1, 100);
}

function deplacer_c2()
{
	console.log("deplacer_c2");
	intervalId2 = setInterval(deplacer_droite_c2, 100);
}

function deplacer_c3()
{
	console.log("deplacer_c3");
	intervalId3 = setInterval(deplacer_droite_c3, 100);
}

function deplacer_droite_c1()
{
	console.log("deplacer_droite_c1");
	left_c1 += 10;
	c1 = document.getElementById("c1");
	c1.style.left = left_c1+"px";
}

function deplacer_droite_c2()
{
	left_c2 += 10;
	c2 = document.getElementById("c2");
	c2.style.left = left_c2+"px";
}

function deplacer_droite_c3()
{
	left_c3 += 10;
	c3 = document.getElementById("c3");
	c3.style.left = left_c3+"px";
}