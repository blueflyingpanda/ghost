function on_mouse_move(event){
	console.log(`x = ${event.x}		y = ${event.y}`);
	if (window.innerWidth/2 > event.x)
		document.getElementById("face").style.left = "10px";
	else
		document.getElementById("face").style.left = "50px";
}

window.addEventListener('mousemove', on_mouse_move);


