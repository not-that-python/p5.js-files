let ufos
let stars

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	restart()
}

function draw() {
	noStroke()
	background(0)
	drawStars(stars)
	drawUfos(ufos);
	moveUfos(ufos)
}

function restart(){
	createUfos()
	createStars()
}

function createUfos() {
	ufos = []
	for (let i = 0; i < 20; i++) {
		let ufo = {
			pos: createVector(random(0, width), random(0, height)),
			col: random(["#0DFF78", "#0CE82F", "#26FF00", "#7AE80C", "#DAFF0D"]),
			vel: createVector(random(-1, 1), random(-1, 1)),
			name: randomName(),
			eyes: random([1, 2, 2, 2, 3])
		}
		ufos.push(ufo)
	}
}

function drawUfos(ufos) {
	for (let ufo of ufos) {
		drawUfo(ufo)
	}
}

function drawUfo(ufo) {
	drawAlien(ufo.pos.x, ufo.pos.y, ufo.eyes)
	
	//ufo hull
	fill(255, 120)
	strokeWeight(1.5)
	stroke(255)
	ellipse(ufo.pos.x, ufo.pos.y - 12, 50, 35)
	noStroke()
	
	//ufo ship
	fill(ufo.col)
	ellipse(ufo.pos.x, ufo.pos.y, 70, 35)
	
	//name
	fill("white")
	text(ufo.name, ufo.pos.x + 5, ufo.pos.y - 30)
}

function drawAlien(x, y, eyes){
	//alien blob
	fill("#22401A")
	circle(x, y - 18, 15)
	
	//alien eyes
	if (eyes === 2) {
		drawEye(x - 5, y - 24)
		drawEye(x + 5, y - 24)
	} else if (eyes === 1) {
		drawEye(x, y - 26)
	} else {
		drawEye(x - 5, y - 24)
		drawEye(x, y - 26)
		drawEye(x + 5, y - 24)
	}
}

function moveUfos(ufos) {
	for (let ufo of ufos) {
		ufo.pos.add(ufo.vel)
		
		if (ufo.pos.x > width) {
			ufo.pos.x = 0
		}
		if (ufo.pos.x < 0) {
			ufo.pos.x = width
		}
		if (ufo.pos.y > height) {
			ufo.pos.y = 0
		}
		if (ufo.pos.y < 0) {
			ufo.pos.y = height
		}
	}
}



function randomName() {
	vowels = ["a", "e", "i", "o", "u"]
	consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]
	name1 = random(consonants).toUpperCase() + random(vowels) + random(vowels) + random(consonants)
	name2 = random(consonants).toUpperCase() + random(vowels) + random(consonants) + random(vowels)
	name3 = random(consonants).toUpperCase() + random(vowels) + random(consonants) + random(vowels) + random(consonants)
	name4 = random(consonants).toUpperCase() + random(vowels) + random(consonants)
	return random([name1, name2, name3, name4])
}

function drawEye(x, y) {
//  blinking:
//	if(random()<0.01){
//		fill("#22401A")
//		circle(x, y, 7)
//		return
//	} 
	fill(255)
	circle(x, y, 7)
	fill(0)
	circle(x, y, 3)
}

function createStars(){
	stars = []
	for (let i=0; i<75; i++){
		let star = {
			pos: createVector(random(width), random(height)),
			size: random(1, 10)
		}
		stars.push(star)
	}
}

function drawStars(stars){
	for (let star of stars){
		fill(255)
		circle(star.pos.x, star.pos.y, star.size)
	}
}

function mousePressed(){
	restart()
}

function keyPressed(){
	if (key==="s"){
		save("aliens")
	}
}
