let face, follow, rect, left, topp, mouseX, mouseY, step, dist;

const MID_X = 85;
const MID_Y = 75;
const REFRESH = 7;
const MAX_STEP = 10;

function onMouseMove(event){
	if (window.innerWidth > 1366)
	{
		if (left > mouseX + MID_X)
			document.getElementById("face").style.left = "10px";
		else if (left < mouseX - MID_X)
			document.getElementById("face").style.left = "40px";
		else 
			document.getElementById("face").style.left = face;
	}else{
		if (left > event.x)
			document.getElementById("face").style.left = "10px";
		else
			document.getElementById("face").style.left = "40px";
	}
	mouseX = event.x;
	mouseY = event.y;
}

function followMouse(){
	if (mouseX == left && mouseY == topp)
		return ;
	dist = Math.sqrt((mouseX - left)*(mouseX - left) + (mouseY - topp)*(mouseY - topp));
	step = (dist/10 > MAX_STEP) ? MAX_STEP : dist/10; 
	left= step/dist * (mouseX - left) + left;
	topp = step/dist * (mouseY - topp) + topp;
	follow.style.top = topp - MID_Y + "px";
	follow.style.left = left - MID_X + "px";
}

face = document.getElementById("face").style.left;
follow = document.getElementById("ghost");
rect = follow.getBoundingClientRect();
left = rect.x;
topp = rect.y;
follow.style.top = topp - MID_Y + "px";
follow.style.left = left - MID_X + "px";
mouseX = rect.x;
mouseY = rect.y;
window.setInterval(followMouse, REFRESH);
window.addEventListener('mousemove', onMouseMove);
