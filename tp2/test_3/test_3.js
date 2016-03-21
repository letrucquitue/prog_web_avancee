function init()
{
	requestAnimationFrame(loop);
}

var right = 0;
function loop()
{
	var elem = document.getElementById("carre");
	elem.style.right = (right+=10)+"px";
	if ( elem.offsetLeft > 0 ) {
		requestAnimationFrame(loop);
	}
}
var start = null;

function step(timestamp) {
	var progress;
	var elem = document.getElementById("carre");
	if (start === null) start = timestamp;
	progress = timestamp - start;
	elem.style.left = Math.min(progress/10, 200) + "px";
	if (progress < 2000) {
		requestAnimationFrame(step);
	}
}

function pausecomp(millis) 
{
	var date = new Date();
	var curDate = null;
	do { 
		curDate = new Date(); 
	} while(curDate-date < millis);
}