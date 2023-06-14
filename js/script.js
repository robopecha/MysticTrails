const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70));
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
        }
      }));
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

const appleImage = new Image();
appleImage.src = './images/apple.png';

const keyImage = new Image();
keyImage.src = './images/key.png';

const senseiImage = new Image();
senseiImage.src = './images/sensei.png';


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

const apple = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: appleImage
});

const key = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: keyImage
});

const sensei = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: senseiImage
});


const keys = {
  up: {
    pressed: false
  },
  left: {
    pressed: false
  },
  down: {
    pressed: false
  },
  right: {
    pressed: false
  }
}

let lastKey = '';
window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowUp':
      keys.up.pressed = true;
      lastKey = 'up';
      break;
    case 'ArrowLeft':
      keys.left.pressed = true;
      lastKey = 'left';
      break;
    case 'ArrowDown':
      keys.down.pressed = true;
      lastKey = 'down';
      break;
    case 'ArrowRight':
      keys.right.pressed = true;
      lastKey = 'right';
      break;
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowUp':
      keys.up.pressed = false;
      break;
    case 'ArrowLeft':
      keys.left.pressed = false;
      break;
    case 'ArrowDown':
      keys.down.pressed = false;
      break;
    case 'ArrowRight':
      keys.right.pressed = false;
      break;
  }
})

function collectionCompleted() {
  return (
    fish.taken &&
    apple.taken &&
    pumpkin.taken &&
    pinecone.taken &&
    carrot.taken
  );
}

const movables = [background, ...boundaries, foreground, fish, carrot, pinecone, pumpkin, apple, key, sensei];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
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

  if ((apple.position.x >= -3754 && apple.position.x <= -3718) && (apple.position.y >= -1542 && apple.position.y <= -1512)) {
    apple.taken = true;
    // make apple appear in inventory
  };
  if (apple.taken === false) apple.draw();

  sensei.draw();
  if (collectionCompleted()) key.draw();
  player.draw();
  foreground.draw();

  let moving = true;
  player.moving = false;

  if (keys.up.pressed && lastKey === 'up' && visible === false) {
    player.moving = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
          }
        }
      })) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach(movable => movable.position.y += 3);
  }

  else if (keys.left.pressed && lastKey === 'left' && visible === false) {
    player.moving = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + 3,
            y: boundary.position.y
          }
        }
      })) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach(movable => movable.position.x += 3);
  }

  else if (keys.down.pressed && lastKey === 'down' && visible === false) {
    player.moving = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y - 3
          }
        }
      })) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach(movable => movable.position.y -= 3);
  }

  else if (keys.right.pressed && lastKey === 'right' && visible === false) {
    player.moving = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x - 3,
            y: boundary.position.y
          }
        }
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

// counter = 0;
// [1,2,3,4]
// arr[counter]
const dialogue = document.createElement("div");
dialogue.textContent = "This is a pop-up dialogue";
dialogue.style.display = "none";
dialogue.style.position = "absolute";
dialogue.style.top = "50%";
dialogue.style.left = "50%";
dialogue.style.transform = "translate(-50%, -50%)";
dialogue.style.backgroundColor = "white";
dialogue.style.padding = "10px";
dialogue.style.border = "1px solid black";

document.body.appendChild(dialogue);

let visible = false;
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if((sensei.position.x >= -694 && sensei.position.x <= -670) &&
    (sensei.position.y >= -897 && sensei.position.y <= -894)) {
      if (visible === false) {
        dialogue.style.display = "block";
        visible = true;
      } else {
        dialogue.style.display = "none";
        visible = false;
      }
    }

  }
})
