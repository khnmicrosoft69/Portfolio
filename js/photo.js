const faders = document.querySelectorAll(".fade-in");

const options = {
  threshold: 0.3,
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.style.animationPlayState = "running";
    observer.unobserve(entry.target);
  });
}, options);

faders.forEach((fader) => {
  fader.style.animationPlayState = "paused";
  appearOnScroll.observe(fader);
});

// Image sources
const images = [
  "img/portraits/1.JPG",
  "img/portraits/2.JPG",
  "img/portraits/3.JPG",
  "img/portraits/4.JPG",
  "img/portraits/5.JPG",
  "img/portraits/6.JPG",
  "img/portraits/7.JPG",
  "img/portraits/8.JPG",
  "img/portraits/9.JPG",
  "img/portraits/portrait1.JPG",
  "img/candids/10.JPG",
  "img/candids/11.JPG",
  "img/candids/12.JPG",
  "img/candids/13.JPG",
  "img/candids/14.JPG",
  "img/candids/15.JPG",
  "img/candids/16.JPG",
  "img/candids/candid1.JPG",
  "img/candids/event1.JPG",
  "img/candids/20.JPG",
];

// Shuffle array function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Render grid
const shuffled = shuffle([...images]);
const grid = document.getElementById("grid");

shuffled.forEach((src) => {
  const div = document.createElement("div");
  div.classList.add("grid-item");
  div.innerHTML = `<img src="${src}" alt="Photo">`;
  grid.appendChild(div);
});

// Modal elements
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("close-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;

// Open modal
function openModal(index) {
  currentIndex = index;
  modalImg.src = shuffled[currentIndex];
  modal.style.display = "flex";
}

// Show next/prev image
function showNext() {
  currentIndex = (currentIndex + 1) % shuffled.length;
  modalImg.src = shuffled[currentIndex];
}

function showPrev() {
  currentIndex = (currentIndex - 1 + shuffled.length) % shuffled.length;
  modalImg.src = shuffled[currentIndex];
}

// Grid click event
grid.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const index = Array.from(grid.querySelectorAll("img")).indexOf(e.target);
    openModal(index);
  }
});

// Modal buttons
closeBtn.addEventListener("click", () => (modal.style.display = "none"));
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// Close modal by clicking background
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Keyboard navigation
window.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") modal.style.display = "none";
  }
});

document.querySelectorAll(".fields a").forEach((card) => {
  const bg = card.getAttribute("data-bg");
  if (bg) {
    card.style.backgroundImage = `url(${bg})`;
  }
});

