function init()
{
	var elem = document.getElementById("carre");
	var right = 0;
	var timer;
	// Move the element 10px on the left every 16ms
	timer = setInterval(function() {
		elem.style.right = ( right += 10 ) + "px";
		pausecomp(100);
		// clear the timer at 400px to stop the animation
		if ( right > 400 ) {
			clearInterval( timer );
		}
	}, 16);
}

function pausecomp(millis) 
{
	var date = new Date();
	var curDate = null;
	do { 
		curDate = new Date(); 
	} while(curDate-date < millis);
}