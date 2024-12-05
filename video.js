const video = document.createElement("video");
video.src = "KABOOM.mp4";
video.autoplay = true;
video.muted = true;
video.loop = false;
video.playsInline = true;
video.setAttribute("muted", "true");
video.setAttribute("playsinline", "true");
video.setAttribute("autoplay", "true");
video.muted = true;  // Programmatically ensure it's muted

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

video.addEventListener("play", () => {
	function removeGreenScreen() {
		if (video.paused || video.ended) return;
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const len = frame.data.length;

		for (let i = 0; i < len; i += 4) {
			const r = frame.data[i];
			const g = frame.data[i + 1];
			const b = frame.data[i + 2];

			// Basic green detection and removal
			if (g > 100 && r < 150 && b < 150 && g > r && g > b) {
				frame.data[i + 3] = 0; // Set alpha to 0 (transparent)
			}
		}

		ctx.putImageData(frame, 0, 0);
		requestAnimationFrame(removeGreenScreen);
	}

	removeGreenScreen();
});

// Fade out canvas after 3.5 seconds
setTimeout(() => {
	canvas.style.animation = "fadeOut 1.5s forwards";
	document.getElementById("content").style.opacity = "1";
}, 3500);

// Remove canvas after fade-out
setTimeout(() => {
	canvas.remove();
}, 5000);

video.play().catch(() => {
    const overlay = document.createElement("div");
    overlay.innerHTML = "<button style='font-size:20px;'>Tap to Start</button>";
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      display: flex; justify-content: center; align-items: center;
      background: black; color: white; z-index: 10000;
    `;
    document.body.appendChild(overlay);
  
    overlay.addEventListener("click", () => {
      video.play();
      overlay.remove();
    });
  });