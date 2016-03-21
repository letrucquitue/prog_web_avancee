function init()
{
	var elem = document.getElementById("carre");
	var timer;
	var curDate, lastDate;
	lastDate = new Date();
	var y = 0;
	// Move the element 10px on the left every 16ms
	timer = setInterval(function() {
		pausecomp(100);
		curDate = new Date();
		delta = curDate-lastDate;
		lastDate = curDate;
		y = y + (delta*10/16);
		elem.style.right = y + "px";
		// clear the timer at 400px to stop the animation
		if ( y < 0 ) {
			clearInterval( timer );
		}
	}, 1000/60);
}

function pausecomp(millis) 
{
	var date = new Date();
	var curDate = null;
	do { 
		curDate = new Date(); 
	} while(curDate-date < millis);
}