const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const startScreen = document.querySelector('#overlay');
const endScreen = document.querySelector('#ending');
endScreen.style.display = 'none';

const backgroundMusic = document.getElementById('backgroundMusic');
const itemCollectSound = document.getElementById('itemCollectSound');
const textSound = document.getElementById('textSound');
const successSound = document.getElementById('successSound');

backgroundMusic.volume = 0.8;

const soundOn = document.querySelector('#on');
const soundOff = document.querySelector('#off');
soundOn.style.display = 'none';
soundOff.style.display = 'none';

let isMusicPlaying = false;

let ending = false;

const button = document.querySelector('button');
button.addEventListener('click', () => {
  startScreen.style.display = 'none';
  backgroundMusic.play();
  soundOn.style.display = 'block';
  isMusicPlaying = true;
});

const sound = document.querySelector('#sound');
sound.addEventListener('click', () => {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    soundOn.style.display = 'none';
    soundOff.style.display = 'block';
    isMusicPlaying = false;
  } else {
    backgroundMusic.play();
    soundOn.style.display = 'block';
    soundOff.style.display = 'none';
    isMusicPlaying = true;
  }
})


const inventoryFish = document.querySelector('#fish');
inventoryFish.style.display = 'none';

const inventoryCarrot = document.querySelector('#carrot');
inventoryCarrot.style.display = 'none';

const inventoryPinecone = document.querySelector('#pinecone');
inventoryPinecone.style.display = 'none';

const inventoryPumpkin = document.querySelector('#pumpkin');
inventoryPumpkin.style.display = 'none';

const inventoryApple = document.querySelector('#apple');
inventoryApple.style.display = 'none';

const inventoryKey = document.querySelector('#key');
inventoryKey.style.display = 'none';

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
image.src = './images/map.png';

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

const signSquareImage = new Image();
signSquareImage.src = './images/sign_square.png';

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

const signSquare = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: signSquareImage
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


let missionStarted = false;

function collectionCompleted() {
  return (
    missionStarted &&
    fish.taken &&
    apple.taken &&
    pumpkin.taken &&
    pinecone.taken &&
    carrot.taken
  );
}

let rewardTime = false;

const speechBefore = [
  'Ah, young adventurer!',
  'Would you lend an old man a hand?',
  "I've been craving my favorite fish stew...",
  "and I need you to gather a few ingredients for me.",
  "I need a fish, a carrot, a pumpkin, an apple...",
  "and then there's one final ingredient...",
  "I've forgotten... I need that one, too...",
  'Return to me, once you gathered all five ingredients...',
  'and your efforts will be rewarded!'
];

const speechAfter = [
  'Thank you, dear adventurer!',
  'Please take this key as a reward for your efforts.',
  'I think I found it somewhere around here...'
];

const dialogue = document.createElement("div");
dialogue.style.display = "none";
dialogue.style.position = "absolute";
dialogue.style.top = "65%";
dialogue.style.left = "50%";
dialogue.style.transform = "translate(-50%, -50%)";
dialogue.style.backgroundColor = "rgb(254, 230, 191)";
dialogue.style.padding = "10px";
dialogue.style.border = "4px solid rgb(113, 53, 69)";
dialogue.style.borderRadius = '10px';
dialogue.style.color = 'rgb(113, 53, 69)';
dialogue.style.fontSize = '35px';
dialogue.style.fontFamily = 'pixel';

document.body.appendChild(dialogue);

let indexCounter = 0;
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if((sensei.position.x >= -694 && sensei.position.x <= -670) &&
    (sensei.position.y >= -897 && sensei.position.y <= -894)) {
      if (collectionCompleted() === false) {
        if (indexCounter < speechBefore.length) {
          dialogue.textContent = speechBefore[indexCounter];
          dialogue.style.display = "block";
          textSound.play();
          indexCounter++;
          if (indexCounter === speechBefore.length) missionStarted = true;
        } else {
          dialogue.style.display = "none";
          indexCounter = 0;
        }
      } else {
        if (indexCounter < speechAfter.length) {
          dialogue.textContent = speechAfter[indexCounter];
          dialogue.style.display = "block";
          textSound.play();
          indexCounter++;
          if (indexCounter === speechAfter.length - 1) rewardTime = true;
        } else {
          dialogue.style.display = "none";
          indexCounter = 0;
        }
      }
    }
  }
})

const signSquareText = 'Welcome to our town, enjoy your stay!';

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if((signSquare.position.x >= -1375 && signSquare.position.x <= -1258) &&
    (signSquare.position.y >= -1026 && signSquare.position.y <= -903)) {
      if (dialogue.style.display === "none") {
        dialogue.textContent = signSquareText;
        dialogue.style.display = "block";
        textSound.play();
      } else {
        dialogue.style.display = "none";
      }
    }
  }
})




const movables = [background, ...boundaries, foreground, fish, carrot, pinecone, pumpkin, apple, key, sensei, signSquare];

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
    if (missionStarted) {
      if (fish.taken === false) itemCollectSound.play();
      fish.taken = true;
      inventoryFish.style.display = 'block';
    } else fish.draw();
  };
  if (fish.taken === false) fish.draw();

  if ((carrot.position.x >= -958 && carrot.position.x <= -904) && (carrot.position.y >= -480 && carrot.position.y <= -417)) {
    if (missionStarted) {
      if (carrot.taken === false) itemCollectSound.play();
      carrot.taken = true;
      inventoryCarrot.style.display = 'block';
    } else carrot.draw();
  };
  if (carrot.taken === false) carrot.draw();

  if ((pinecone.position.x >= 383 && pinecone.position.x <= 434) && (pinecone.position.y >= -285 && pinecone.position.y <= -228)) {
    if (missionStarted) {
      if (pinecone.taken === false) itemCollectSound.play();
      pinecone.taken = true;
      inventoryPinecone.style.display = 'block';
    } else pinecone.draw();
  };
  if (pinecone.taken === false) pinecone.draw();

  if ((pumpkin.position.x >= -316 && pumpkin.position.x <= -286) && (pumpkin.position.y >= -2181 && pumpkin.position.y <= -2178)) {
    if (missionStarted) {
      if (pumpkin.taken === false) itemCollectSound.play();
      pumpkin.taken = true;
      inventoryPumpkin.style.display = 'block';
    } else pumpkin.draw();
  };
  if (pumpkin.taken === false) pumpkin.draw();

  if ((apple.position.x >= -3754 && apple.position.x <= -3718) && (apple.position.y >= -1542 && apple.position.y <= -1512)) {
    if (missionStarted) {
      if (apple.taken === false) itemCollectSound.play();
      apple.taken = true;
      inventoryApple.style.display = 'block';
    } else apple.draw();
  };
  if (apple.taken === false) apple.draw();

  sensei.draw();
  signSquare.draw();

  if (rewardTime) {
    inventoryFish.style.display = 'none';
    inventoryCarrot.style.display = 'none';
    inventoryPinecone.style.display = 'none';
    inventoryPumpkin.style.display = 'none';
    inventoryApple.style.display = 'none';
    key.draw();
  }
  if (rewardTime && (key.position.x >= -748 && key.position.x <= -724) && (key.position.y >= -903 && key.position.y <= -897)) {
    inventoryKey.style.display = 'block';
    successSound.play();
    rewardTime = false;
    ending = true;
  };

  if (ending === true) {
    setTimeout(() => {
      backgroundMusic.pause();
      canvas.style.display = 'none';
      endScreen.style.display = 'block';
    }, 2000);
  }

  player.draw();

  foreground.draw();

  let moving = true;
  player.moving = false;

  if (keys.up.pressed && lastKey === 'up' && dialogue.style.display === "none") {
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

  else if (keys.left.pressed && lastKey === 'left' && dialogue.style.display === "none") {
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

  else if (keys.down.pressed && lastKey === 'down' && dialogue.style.display === "none") {
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

  else if (keys.right.pressed && lastKey === 'right' && dialogue.style.display === "none") {
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
