let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    const offset = -currentSlide * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Initialize the slider
showSlide(currentSlide);




const menu=document.querySelector(".menu-toggle");
const nav=document.querySelector(".navbar");

menu.addEventListener("click",()=>{
nav.classList.toggle("active");
});



