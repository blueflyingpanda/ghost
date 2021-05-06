let face, follow, rect, left, topp, mouseX, mouseY, step, dist, load, login, nickname, btn;
let bg = ["grey", "#2c3a47", "#2c2c47", "#472c42", "#2c3f47", "#2c473e", "#472c2c"];
let pumpkins = document.getElementsByClassName("pumpkin");
let i = 0;

const MID_X = 75;
const MID_Y = 75;
const REFRESH = 7;
const MAX_STEP = 10;
const SLOWNESS = 50;
const LOADING = 2000;

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
	step = (dist/SLOWNESS > MAX_STEP) ? MAX_STEP : dist/SLOWNESS;
	left= step/dist * (mouseX - left) + left;
	topp = step/dist * (mouseY - topp) + topp;
	follow.style.top = topp - MID_Y + "px";
	follow.style.left = left - MID_X + "px";
}

function changeBgColor(event){
	if(event.keyCode == 32){
		document.getElementsByTagName("body")[0].style.backgroundColor = bg[i%bg.length]; //bg[Math.floor(Math.random()*bg.length)];
		i++;
	}
}

var canChange = false;

function chbgcolor(canChange){
	if (canChange){
		document.getElementsByTagName("body")[0].style.backgroundColor = bg[i%bg.length];
			i++;
	}
}

function start(){
	load.style.display = "None";
	login.style.display = "Block";
	follow.style.display = "Block";
	for (let index = 0; index < pumpkins.length; index++) {
		pumpkins[index].style.display = "block";
	}
}

function submitHandler(){
	nickname = document.getElementById("nickname").value;
	if (nickname === ""){
		alert("Enter your name!");
		return;
	}
	login.style.display = "None";
	pumpkins[0].style.transform = "translate(30%, -100%)";
	pumpkins[1].style.transform = "translate(0%, 200%)";
	pumpkins[2].style.transform = "translate(0%, -250%)";
	pumpkins[3].style.transform = "translate(-80%, 50%)";
	pumpkins[4].style.transform = "translate(30%, -100%)";
	pumpkins[5].style.transform = "translate(0%, 200%)";
	pumpkins[6].style.transform = "translate(0%, -250%)";
	pumpkins[7].style.transform = "translate(-80%, 50%)";
	pumpkins[8].style.transform = "translate(-80%, -100%)";
	pumpkins[9].style.transform = "translate(-80%, 250%)";
	pumpkins[10].style.transform = "translate(-100%, 50%)";
	pumpkins[11].style.transform = "translate(-200%, -200%)";
	pumpkins[12].style.transform = "translate(0%, -200%)";
	pumpkins[13].style.transform = "translate(0%, +200%)";
	pumpkins[14].style.transform = "translate(150%, -250%)";
	pumpkins[15].style.transform = "translate(-100%, -50%)";
	pumpkins[16].style.transform = "translate(-50%, 250%)";
	pumpkins[17].style.transform = "translate(0%, +200%)";
	pumpkins[18].style.transform = "translate(150%, -250%)";
	pumpkins[19].style.transform = "translate(-100%, -50%)";
	pumpkins[20].style.transform = "translate(-50%, 250%)";
	window.setInterval(followMouse, REFRESH);
	window.addEventListener('mousemove', onMouseMove);
}

////////////////////////////////////////////////////////////
var begin;

function buttonPressed(b) {
	if (typeof(b) == "object") {
	  return b.pressed;//for buttons
	}
	return b != 0.0;//for triggers
}

window.addEventListener("gamepadconnected", function(e) {
	console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
	gameLoop();
});

window.addEventListener("gamepaddisconnected", function(e) {
	console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
	cancelAnimationFrame(begin);
});

function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if (gp) {
      gameLoop();
    }
  }
}

function gameLoop() {
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	if (!gamepads) {
	  return;
	}

	var gp = gamepads[0];
	if (buttonPressed(gp.buttons[0])) {

		setTimeout(function() {canChange = true}, 250);
		chbgcolor(canChange);
		canChange = false;
	}

	begin = requestAnimationFrame(gameLoop);
}
/////////////////////////////////////////////////////////////

window.addEventListener("keydown", changeBgColor);
face = document.getElementById("face").style.left;
follow = document.getElementById("ghost");
btn = document.getElementById("btn");
btn.onclick = submitHandler;
login = document.getElementsByClassName("box")[0];
load = document.getElementsByClassName("loadingScreen")[0];
rect = follow.getBoundingClientRect();
left = rect.x;
topp = rect.y;
follow.style.top = topp - MID_Y + "px";
follow.style.left = left - MID_X + "px";
mouseX = rect.x;
mouseY = rect.y;
follow.style.display = "None";

if(document.readyState === 'ready' || document.readyState === 'complete') {
  start();
} else {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      start();
    }
  }
}

