let face, follow, rect, left, topp, mouseX, mouseY, step, dist, load, login, nickname, btn, timerWrap, timer, counterWrap, counter, result;
let bg = ["grey", "#2c3a47", "#2c2c47", "#472c42", "#2c3f47", "#2c473e", "#472c2c"];
let pumpkins = document.getElementsByClassName("pumpkin");
let i = 0;
let pumpkinsLeft;
let interval_timer, interval_mouse;
let hits = [];

const MID_X = 35;
const MID_Y = 35;
const REFRESH = 7;
const UPD_TIMER = 100;
const MAX_STEP = 10;
const SLOWNESS = 50;
const LOADING = 2000;
const HIT_BOX = 50;

function onMouseMove(event){
	if (window.innerWidth > 1366)
	{
		if (left > mouseX + MID_X)
			document.getElementById("face").style.left = "5px";
		else if (left < mouseX - MID_X)
			document.getElementById("face").style.left = "20px";
		else
			document.getElementById("face").style.left = face;
	}else{
		if (left > event.x)
			document.getElementById("face").style.left = "5px";
		else
			document.getElementById("face").style.left = "20px";
	}
	mouseX = event.x;
	mouseY = event.y;
}

function checkColission(){
	for (let index = 0; index < hits.length; index++) {
		if(pumpkins[index].style.visibility != "hidden" && left - MID_X  > hits[index][0] - HIT_BOX && left - MID_X  < hits[index][0] + HIT_BOX && topp - MID_Y > hits[index][1] - HIT_BOX && topp - MID_Y < hits[index][1] + HIT_BOX){
			console.log("if for index:", index);
			pumpkins[index].style.visibility = "hidden";
			counter.textContent = "left: " + --pumpkinsLeft;
		}
 	}
}

function displayResults(){
	var res = document.getElementById("res");
	var score = document.getElementById("score");
	result.style.display = "block";
	res.textContent = nickname + res.textContent;
	score.textContent = parseFloat(timer.textContent, 10) + " s";
	var rebtn =document.getElementById("rebtn");
	rebtn.onclick = resubmitHandler;
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
	checkColission();
	if (pumpkinsLeft == 0){
		clearInterval(interval_timer);
		window.clearInterval(interval_mouse);
		displayResults();
	}
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

function updTimer(){
	let num = parseFloat(timer.textContent, 10);
	if (isNaN(num))
		num = 0;
	timer.textContent = (num + UPD_TIMER / 1000).toFixed(1) + " s";
}

function resubmitHandler(){
	var res = document.getElementById("res");
	res.textContent = ", catching the pumpkins took you:";
	result.style.display = "None";
	for (let index = 0; index < pumpkins.length; index++) {
		pumpkins[index].style.visibility = "visible";
	}
	pumpkinsLeft = pumpkins.length;
	counter.textContent = "left: " + pumpkinsLeft;
	timer.textContent = "0.0 s";
	interval_timer = setInterval(updTimer, UPD_TIMER);
	interval_mouse = window.setInterval(followMouse, REFRESH);
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

	hits.push([Math.round(pumpkins[0].getBoundingClientRect().x), Math.round(pumpkins[0].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[1].getBoundingClientRect().x), Math.round(pumpkins[1].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[2].getBoundingClientRect().x), Math.round(pumpkins[2].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[3].getBoundingClientRect().x), Math.round(pumpkins[3].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[4].getBoundingClientRect().x), Math.round(pumpkins[4].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[5].getBoundingClientRect().x), Math.round(pumpkins[5].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[6].getBoundingClientRect().x), Math.round(pumpkins[6].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[7].getBoundingClientRect().x), Math.round(pumpkins[7].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[8].getBoundingClientRect().x), Math.round(pumpkins[8].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[9].getBoundingClientRect().x), Math.round(pumpkins[9].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[10].getBoundingClientRect().x), Math.round(pumpkins[10].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[11].getBoundingClientRect().x), Math.round(pumpkins[11].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[12].getBoundingClientRect().x), Math.round(pumpkins[12].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[13].getBoundingClientRect().x), Math.round(pumpkins[13].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[14].getBoundingClientRect().x), Math.round(pumpkins[14].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[15].getBoundingClientRect().x), Math.round(pumpkins[15].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[16].getBoundingClientRect().x), Math.round(pumpkins[16].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[17].getBoundingClientRect().x), Math.round(pumpkins[17].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[18].getBoundingClientRect().x), Math.round(pumpkins[18].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[19].getBoundingClientRect().x), Math.round(pumpkins[19].getBoundingClientRect().y)]);
	hits.push([Math.round(pumpkins[20].getBoundingClientRect().x), Math.round(pumpkins[20].getBoundingClientRect().y)]);

	interval_timer = setInterval(updTimer, UPD_TIMER);
	pumpkinsLeft = pumpkins.length;
	counter.textContent = "left: " + pumpkinsLeft;
	interval_mouse = window.setInterval(followMouse, REFRESH);
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

window.addEventListener('mousemove', onMouseMove);

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
timerWrap = document.getElementById("timerWrap");
timer = document.getElementById("timer");
counterWrap = document.getElementById("counterWrap");
counter = document.getElementById("counter");
btn.onclick = submitHandler;
login = document.getElementsByClassName("box")[0];
result = document.getElementsByClassName("box")[1];
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

