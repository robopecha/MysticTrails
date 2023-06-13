const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i+70));
}

const boundaries = [];
const offset = {
  x: -1000,
  y: -1500
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 951) {
     boundaries.push(new Boundary({
      position: {
        x: j * Boundary.width + offset.x,
        y: i * Boundary.height + offset.y
     }}));
    }
  })
})

const image = new Image();
image.src = './images/the game.png';

const foregroundImage = new Image();
foregroundImage.src = './images/foregroundObjects.png';

const playerDownImage = new Image();
playerDownImage.src = './images/player_down.png';

const playerUpImage = new Image();
playerUpImage.src = './images/player_up.png';

const playerLeftImage = new Image();
playerLeftImage.src = './images/player_left.png';

const playerRightImage = new Image();
playerRightImage.src = './images/player_right.png';

const fishImage = new Image();
fishImage.src = './images/fish.png';

const carrotImage = new Image();
carrotImage.src = './images/carrot.png';

const pineconeImage = new Image();
pineconeImage.src = './images/pinecone.png';

const pumpkinImage = new Image();
pumpkinImage.src = './images/pumpkin.png';

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 224 / 4 / 2,
    y: canvas.height / 2 - 64 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
});

const fish = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: fishImage
});

const carrot = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: carrotImage
});

const pinecone = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: pineconeImage
});

const pumpkin = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: pumpkinImage
});

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const movables = [background, ...boundaries, foreground, fish, carrot, pinecone, pumpkin];

function rectangularCollision({rectangle1, rectangle2}) {
  return(rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y);
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach(boundary => {
    boundary.draw();
  })
  if ((fish.position.x >= -3178 && fish.position.x <= -3166) && (fish.position.y >= -2055 && fish.position.y <= -2010)) {
    fish.taken = true;
    // make fish appear in inventory
  };
  if (fish.taken === false) fish.draw();

  if ((carrot.position.x >= -958 && carrot.position.x <= -904) && (carrot.position.y >= -480 && carrot.position.y <= -417)) {
    carrot.taken = true;
    // make carrot appear in inventory
  };
  if (carrot.taken === false) carrot.draw();

  if ((pinecone.position.x >= 383 && pinecone.position.x <= 434) && (pinecone.position.y >= -285 && pinecone.position.y <= -228)) {
    pinecone.taken = true;
    // make pinecone appear in inventory
  };
  if (pinecone.taken === false) pinecone.draw();

  if ((pumpkin.position.x >= -316 && pumpkin.position.x <= -286) && (pumpkin.position.y >= -2181 && pumpkin.position.y <= -2178)) {
    pumpkin.taken = true;
    // make pumpkin appear in inventory
  };
  if (pumpkin.taken === false) pumpkin.draw();

  player.draw();
  foreground.draw();

  let moving = true;
  player.moving = false;
  if (keys.w.pressed && lastKey === 'w') {
    player.moving = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
        }}
      })) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach(movable => movable.position.y += 3);
    }
  else if (keys.a.pressed && lastKey === 'a') {
    player.moving = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary,
          position: {
            x: boundary.position.x + 3,
            y: boundary.position.y
        }}
      })) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach(movable => movable.position.x += 3);
    }
  else if (keys.s.pressed && lastKey === 's') {
    player.moving = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y - 3
        }}
      })) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach(movable => movable.position.y -= 3);
    }
  else if (keys.d.pressed && lastKey === 'd') {
    player.moving = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary,
          position: {
            x: boundary.position.x - 3,
            y: boundary.position.y
        }}
      })) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach(movable => movable.position.x -= 3);
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
})

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
})
