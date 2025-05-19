const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";

function updateDisplay() {
  display.textContent = currentInput;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "C") {
      currentInput = "0";
    } else if (value === "←") {
      currentInput = currentInput.slice(0, -1) || "0";
    } else if (value === "=") {
      try {
        currentInput = eval(currentInput).toString();
      } catch {
        currentInput = "Error";
      }
    } else {
      if (currentInput === "0" || currentInput === "Error") {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }

    updateDisplay();
  });
});

// Optional: keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  const validKeys = "0123456789+-*/.=cC";

  if (validKeys.includes(key)) {
    const button = [...buttons].find(b => b.dataset.value === key || b.dataset.value === key.toUpperCase());
    if (button) button.click();
  } else if (key === "Backspace") {
    const backBtn = [...buttons].find(b => b.dataset.value === "←");
    if (backBtn) backBtn.click();
  } else if (key === "Enter") {
    const equalBtn = [...buttons].find(b => b.dataset.value === "=");
    if (equalBtn) equalBtn.click();
  }
});
