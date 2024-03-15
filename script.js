const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 30) {
	collisionsMap.push(collisions.slice(i, i + 30));
}
class Boundary {
	constructor(position) {
		this.position = position;
		this.width = 73;
		this.height = 73;
	}
	draw() {
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}
const boundaries = [];
const offset = {
	x: 0,
	y: 0,
};
const zoomFactor = 2.3; // 230% zoom

collisionsMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol === 856) {
			const boundaryX = j * 32 * zoomFactor + offset.x;
			const boundaryY = i * 32 * zoomFactor + offset.y;

			const newBoundary = new Boundary({
				position: { x: boundaryX, y: boundaryY },
			});

			boundaries.push(newBoundary);
		}
	});
});

console.log(boundaries);
const image = new Image();
image.src = './assets/pokemon_map_village.png';
const playerImage = new Image();
playerImage.src = './assets/walk2.png';

class Sprite {
	constructor({ position, velocity, image }) {
		this.position = position;
		this.image = image;
	}
	draw() {
		c.drawImage(this.image, this.position.x, this.position.y);
	}
}

const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y,
	},
	image: image,
});
const keys = {
	w: {
		pressed: false,
	},
	a: {
		pressed: false,
	},
	s: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
};
function animate() {
	window.requestAnimationFrame(animate);
	background.draw();
	boundaries.forEach((boundary) => {
		boundary.draw();
	});
	c.drawImage(
		playerImage,
		0,
		0,
		playerImage.width / 4,
		playerImage.height / 4,
		canvas.width / 4 - playerImage.width / 2,
		canvas.height / 2 - playerImage.height / 2,
		playerImage.width,
		playerImage.height
	);
	if (keys.w.pressed && lastKey === 'w') {
		background.position.y = background.position.y + 10;
	} else if (keys.s.pressed && lastKey === 's') {
		background.position.y = background.position.y - 10;
	} else if (keys.a.pressed && lastKey === 'a') {
		background.position.x = background.position.x + 10;
	} else if (keys.d.pressed && lastKey === 'd') {
		background.position.x = background.position.x - 10;
	}
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'w':
			keys.w.pressed = true;
			lastKey = 'w';
			break;
		case 'a':
			keys.a.pressed = true;
			lastKey = 'a';
			break;
		case 's':
			keys.s.pressed = true;
			lastKey = 's';
			break;
		case 'd':
			keys.d.pressed = true;
			lastKey = 'd';
			break;
	}
});
window.addEventListener('keyup', (e) => {
	switch (e.key) {
		case 'w':
			keys.w.pressed = false;
			break;
		case 'a':
			keys.a.pressed = false;
			break;
		case 's':
			keys.s.pressed = false;
			break;
		case 'd':
			keys.d.pressed = false;
			break;
	}
});
