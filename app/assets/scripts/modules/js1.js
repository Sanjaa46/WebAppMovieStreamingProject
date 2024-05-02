const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});

// Slider big sized
let searchMobile = document.getElementById("search-mobile");

// To access the Close button element 
let closebtn = document.getElementById("closebtn");

// To acces the popup element 
let popup = document.querySelector(".popup");
let subp = document.getElementById("sub-p");

// To show the popup on click 
showbtn.addEventListener("click", () => {
    popup.style.display = "block";
    showbtn.style.display = "none";
    document.body.style.backgroundColor = "#9EA9B1";
    subp.style.display = "none";
});

// To close the popup on click 
closebtn.addEventListener("click", () => {
    popup.style.display = "none";
    showbtn.style.display = "block";
    document.body.style.backgroundColor = "#0a0a0a";
    subp.style.display = "block";
});