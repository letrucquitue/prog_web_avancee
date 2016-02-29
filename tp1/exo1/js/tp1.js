var intervalId;

function decompte()
{
	intervalId = setInterval(decompter_un, 1000);
}

function decompter_un()
{
	h1 = document.getElementById("h1");
	if(h1.innerHTML > 0)
	{
		h1.innerHTML = h1.innerHTML-1;
		console.log(h1.innerHTML);
	}
	else
	{
		clearInterval(intervalId);
	}
}