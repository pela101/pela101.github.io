document.addEventListener("DOMContentLoaded", function () {
  const base64Input = document.getElementById("base64Input");
  const convertButton = document.getElementById("convertButton");
  const outputBox = document.getElementById("output");
  const gifs = document.querySelectorAll(".bounds");
  let clickCounter = 0; // Track the number of clicks

  convertButton.addEventListener("click", function () {
    clickCounter++; // Increment the click counter

    if (clickCounter === 1) {
      convertButton.textContent = "Ups, jednak tutaj!";
      moveButtonRandomly();
    } else if (clickCounter === 2) {
      convertButton.textContent = "A może tu?";
      moveButtonRandomly();
    } else if (clickCounter === 3) {
      // Now perform the conversion
      try {
        const base64Value = base64Input.value.trim();

        if (base64Value === "") {
          outputBox.textContent = "Proszę wklej wiadomość powyżej";
        } else {
          // Decode Base64 safely using TextDecoder
          const byteArray = new Uint8Array(
            atob(base64Value)
              .split("")
              .map((char) => char.charCodeAt(0))
          );
          const decodedText = new TextDecoder("utf-8").decode(byteArray);
          revealText(decodedText, outputBox, 50);
        }

        // Make the output visible
        outputBox.classList.remove("hidden");
        convertButton.textContent = "rozkoduj"; // Reset button text
        convertButton.style.position = "static"; // Fix the button in place
        setTimeout(() => {
          gifs.forEach((gif) => {
            gif.classList.remove("hidden");
          });
        }, 5000);
      } catch (error) {
        // Handle errors for invalid Base64
        outputBox.textContent = "Proszę wklej wiadomość powyżej";
        outputBox.classList.remove("hidden");
        convertButton.textContent = "Convert"; // Reset button text
        convertButton.style.position = "static"; // Fix the button in place
      }
      clickCounter = 0;
    }
  });

  function moveButtonRandomly() {
    // Generate random positions within the viewport
    const randomX = Math.random() * 80; // Percentage of viewport width
    const randomY = Math.random() * 80; // Percentage of viewport height

    // Apply new positions
    convertButton.style.position = "absolute";
    convertButton.style.left = `${randomX}vw`;
    convertButton.style.top = `${randomY}vh`;
  }
  function revealText(text, container, delay) {
    let index = 0;

    function typeCharacter() {
      if (index < text.length) {
        container.textContent += text[index];
        index++;
        if (text[index - 1] == ":") {
          setTimeout(typeCharacter, 750);
        } else {
          setTimeout(typeCharacter, delay);
        }
      }
    }

    typeCharacter();
  }
});
