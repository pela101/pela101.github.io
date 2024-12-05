const gifSources = [
  "nyan-cat-nyan.gif",
  "explosion-missile.gif",
  "dancing-cat.gif",
  "cat-vibe.gif",
];
const numberOfGifs = 7; // Change this to generate more/less GIFs

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function createGifElement() {
  const src = gifSources[Math.floor(Math.random() * gifSources.length)];
  const img = document.createElement("img");
  img.src = src;
  img.className = "bouncing-gif hidden";
  img.alt = "Bouncing GIF";
  document.body.appendChild(img);
  return img;
}

const gifs = Array.from({ length: numberOfGifs }, () => createGifElement());
gifs.forEach((gif, index) => {
  let posX = getRandom(0, window.innerWidth - gif.offsetWidth);
  let posY = getRandom(0, window.innerHeight - gif.offsetHeight);
  let speedX = getRandom(2, 5) * (Math.random() < 0.5 ? 1 : -1);
  let speedY = getRandom(2, 5) * (Math.random() < 0.5 ? 1 : -1);

  gif.style.left = `${posX}px`;
  gif.style.top = `${posY}px`;

  function move() {
    posX += speedX;
    posY += speedY;

    // Reverse direction when hitting horizontal boundaries
    if (posX <= 0 || posX >= window.innerWidth - gif.offsetWidth) {
      speedX = -speedX;
    }

    // Reverse direction when hitting vertical boundaries
    if (posY <= 0 || posY >= window.innerHeight - gif.offsetHeight) {
      speedY = -speedY;
    }

    gif.style.left = `${posX}px`;
    gif.style.top = `${posY}px`;

    requestAnimationFrame(move);
  }

  move();
});

window.addEventListener("resize", () => {
  gifs.forEach((gif) => {
    gif.style.left = `${Math.min(
      parseFloat(gif.style.left),
      window.innerWidth - gif.offsetWidth
    )}px`;
    gif.style.top = `${Math.min(
      parseFloat(gif.style.top),
      window.innerHeight - gif.offsetHeight
    )}px`;
  });
});
