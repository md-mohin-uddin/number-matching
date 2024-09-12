let remainingTries = 3;

function getPin() {
  const pin = Math.round(Math.random() * 10000);
  const pinString = pin + "";
  if (pinString.length == 4) {
    return pin;
  } else {
    return getPin();
  }
}

function generatePin() {
  const pin = getPin();
  document.querySelector("#display-pin").value = pin;
  resetInputs();
  remainingTries = 3;
  document.querySelector("#tries-left").innerText = remainingTries;
}

document.querySelector("#key-pad").addEventListener("click", function (event) {
  const number = event.target.innerText;
  const calcInput = document.querySelector("#typed-numbers");
  if (isNaN(number)) {
    if (number == "C") {
      calcInput.value = "";
    }
  } else {
    const previousNumber = calcInput.value;
    const newNumber = previousNumber + number;
    calcInput.value = newNumber;
  }
});

function verifyPin() {
  const pin = document.querySelector("#display-pin").value;
  const typedNumbers = document.querySelector("#typed-numbers").value;
  if (pin == typedNumbers) {
    document.querySelector("#matched").style.display = "block";
    document.querySelector("#not-matched").style.display = "none";
  } else {
    remainingTries--;
    document.querySelector("#not-matched").style.display = "block";
    document.querySelector("#matched").style.display = "none";
    document.querySelector("#tries-left").innerText = remainingTries;
    if (remainingTries === 0) {
      disableInput();
    }
  }
}

function resetInputs() {
  document.querySelector("#typed-numbers").value = "";
  document.querySelector("#matched").style.display = "none";
  document.querySelector("#not-matched").style.display = "none";
}

function disableInput() {
  document.querySelector("#key-pad").style.pointerEvents = "none";
  document.querySelector(".submit-btn").disabled = true;
  document.querySelector("#not-matched").innerText =
    "❌ You've run out of tries. Please generate a new pin.";
}
