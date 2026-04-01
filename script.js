
// ================= NAV TOGGLE =================
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("show");
  });
}


// ================= PROJECT MODAL =================
const modal = document.getElementById("projModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".open-project").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".proj-card");

    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalImage.src = card.dataset.image;
    modalLink.href = card.dataset.link;

    modal.classList.add("show");
  });
});

if (modalClose) {
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });
}


// ================= TYPING EFFECT =================
const textArray = ["Frontend Developer", "Java Developer", "React Learner"];
let i = 0, j = 0;

function typeEffect() {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;

  if (j < textArray[i].length) {
    typingEl.innerHTML += textArray[i][j];
    j++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(() => {
      typingEl.innerHTML = "";
      j = 0;
      i = (i + 1) % textArray.length;
      typeEffect();
    }, 1500);
  }
}

typeEffect();


// ================= EMAILJS =================
document.addEventListener("DOMContentLoaded", function () {

  // INIT EMAILJS
  emailjs.init("3wAMHJKyFtM1WHTeI");

  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("status");

  if (!form || !statusEl) {
    console.error("Form or status element not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    statusEl.style.color = "yellow";
    statusEl.innerText = "Sending... ⏳";

    emailjs.sendForm("service_bnd63oa", "template_wp520gm", this)
      .then(() => {
        statusEl.style.color = "lightgreen";
        statusEl.innerText = "✅ Message Sent Successfully!";
        form.reset();
      })
      .catch((error) => {
        statusEl.style.color = "red";
        statusEl.innerText = "❌ Failed! Try again";
        console.error("EmailJS Error:", error);
      });
  });

});