var intervalId;
var timeoutId;

function init()
{
	for (var i = 1; i <= 10; i++)
	{
		timeoutId = setTimeout(deplacer,(i-1)*1000+4000,i);
	}
}

function deplacer(id_c)
{
	intervalId = setInterval(deplacer_droite,100,id_c);
}

function deplacer_droite(id_c)
{
	console.log(id_c);
	c = document.getElementById("c"+id_c);
	c.style.left = (c.offsetLeft+10)+"px";
}