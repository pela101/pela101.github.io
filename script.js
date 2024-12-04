document.addEventListener("DOMContentLoaded", function () {
  const base64Input = document.getElementById("base64Input");
  const convertButton = document.getElementById("convertButton");
  const outputBox = document.getElementById("output");
  const gif = document.getElementById("gif");

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
          outputBox.textContent = "Please enter a Base64 string.";
        } else {
          // Decode Base64 safely using TextDecoder
          const byteArray = new Uint8Array(
            atob(base64Value)
              .split("")
              .map((char) => char.charCodeAt(0))
          );
          const decodedText = new TextDecoder("utf-8").decode(byteArray);
          outputBox.textContent = decodedText;
        }

        // Make the output visible
        outputBox.classList.remove("hidden");
        convertButton.textContent = "Convert"; // Reset button text
        convertButton.style.position = "static"; // Fix the button in place
      } catch (error) {
        // Handle errors for invalid Base64
        outputBox.textContent =
          "Invalid Base64 input. Please check your string.";
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
});
