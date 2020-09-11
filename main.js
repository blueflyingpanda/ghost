function on_mouse_move(event){
	console.log(`x = ${event.x}		y = ${event.y}`);
	if (window.innerWidth/2 > event.x)
		document.getElementById("face").style.left = "10px";
	else
		document.getElementById("face").style.left = "40px";
	//var follow = document.getElementById("ghost");
	//follow.style.top = event.clientY - 50 + "px";
	//follow.style.left = event.clientX - 50 + "px";
};

window.addEventListener('mousemove', on_mouse_move);


