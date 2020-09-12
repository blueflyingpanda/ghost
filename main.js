var mouseX, mouseY, follow, rect;

function on_mouse_move(event){
	if (window.innerWidth/2 > event.x)
		document.getElementById("face").style.left = "10px";
	else
		document.getElementById("face").style.left = "40px";
	mouseX = event.x;
	mouseY = event.y;
};

window.addEventListener('mousemove', on_mouse_move);
