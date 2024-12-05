const gifs = document.querySelectorAll(".bouncing-gif");

// Function to generate a random number within a range
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Apply random animations to each GIF
gifs.forEach((gif) => {
  const horDuration = getRandom(0, 1); // Random horizontal duration
  const verDuration = getRandom(0, 1); // Random vertical duration

  const horTiming = Math.random() > 0.5 ? "ease-in-out" : "linear"; // Random timing function
  const verTiming = Math.random() > 0.5 ? "ease-in-out" : "linear";

  const horDirection = Math.random() > 0.5 ? "alternate" : "alternate-reverse"; // Random direction
  const verDirection = Math.random() > 0.5 ? "alternate" : "alternate-reverse";

  // Assign unique animations
  gif.style.animationName = "hor-movement, ver-movement";
  gif.style.animationDuration = `${horDuration}s, ${verDuration}s`;
  gif.style.animationTimingFunction = `${horTiming}, ${verTiming}`;
  gif.style.animationIterationCount = "infinite";
  gif.style.animationDirection = `${horDirection}, ${verDirection}`;
});
