// Elements
const compare = document.getElementById("compare");
const slider = document.getElementById("compare-slider");
const surname = document.querySelector(".split");

// Update everything
function setPosition(value) {
    compare.style.setProperty("--pos", value + "%");
    surname.style.setProperty("--split", value + "%");
}

// Slider movement
slider.addEventListener("input", function (event) {
    setPosition(event.target.value);
});

// Starting position
setPosition(slider.value);