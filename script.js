// ===== TYPING ANIMATION =====
const phrases = [
  "I build with Java & Python",
  "I design databases with SQL",
  "I'm open to internships",
  "I love problem solving"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 85;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

type();


// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  ".skill-card, .project-card, .about-grid, .contact-container"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

const style = document.createElement("style");
style.textContent = `
  .hidden {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);


// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll(".skill-fill");

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => {
  const targetWidth = bar.style.width;
  bar.style.width = "0";
  setTimeout(() => {
    barObserver.observe(bar);
    bar.style.width = targetWidth;
  }, 100);
});


// ===== NAVBAR ACTIVE LINK =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.color = "var(--accent)";
    }
  });
});


// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById("navToggle");
const navLinksMenu = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinksMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksMenu.classList.remove("open");
  });
});
