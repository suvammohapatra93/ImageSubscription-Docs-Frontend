const scriptURL =
  "https://script.google.com/macros/s/AKfycbxGjEr7-G6VIQewFFyJ4lDI-HQru_Ud_O0g-UQ9q4-IJW8jsViR8w3AyZjDogPNRwvs1Q/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Thank You For Subscribing!";
      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      msg.innerHTML = "Oops! Something went wrong. Please try again.";
    });
});
