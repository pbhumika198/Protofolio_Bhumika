// ===== Image Slider (Only on Home Page) =====
let currentSlide = 0;
const slides = [
  "images/tour.jpg",
  "images/beach.jpg",
  "images/mountain.jpg",
  "images/city.jpg"
];

const hero = document.querySelector('.hero');
if (hero) {
  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    hero.style.background = `url('${slides[currentSlide]}') no-repeat center center/cover`;
  }
  setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
  }, 4000); // changes every 4s
}

// ===== Contact Form Validation =====
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
      alert("⚠️ Please enter a valid email!");
      return;
    }

    alert("✅ Thank you for contacting us! We will get back to you soon.");
    form.reset();
  });
}

// ===== Scroll to Top Button =====
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "⬆";
scrollBtn.classList.add("scroll-top");
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
