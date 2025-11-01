// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// State management using JavaScript variables (no localStorage)
let currentTheme = 'light';

function setTheme(theme) {
  currentTheme = theme;
  if (theme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    htmlElement.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Word-by-Word Typing Animation for Rotating Titles
const rotatingTitle = document.getElementById('rotatingTitle');
const titles = [
  'Java Full Stack Developer',
  'React Developer',
  'Full Stack Engineer',
  'Backend Developer',
  'Frontend Enthusiast'
];

let currentTitleIndex = 0;
let isTyping = false;

// Typing animation settings
const CHAR_SPEED = 100;      // milliseconds per character
const WORD_PAUSE = 250;       // pause between words
const PHRASE_PAUSE = 2000;    // pause after complete phrase
const DELETE_SPEED = 50;      // speed of deletion

function typeWords() {
  if (isTyping) return;
  isTyping = true;
  
  const currentTitle = titles[currentTitleIndex];
  const words = currentTitle.split(' ');
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let displayText = '';
  
  rotatingTitle.textContent = '';
  
  function typeNextChar() {
    if (currentWordIndex >= words.length) {
      // All words typed, pause then delete
      setTimeout(() => {
        deleteText();
      }, PHRASE_PAUSE);
      return;
    }
    
    const currentWord = words[currentWordIndex];
    
    if (currentCharIndex < currentWord.length) {
      // Type next character of current word
      displayText += currentWord[currentCharIndex];
      rotatingTitle.textContent = displayText;
      currentCharIndex++;
      setTimeout(typeNextChar, CHAR_SPEED);
    } else {
      // Word complete, add space and move to next word
      if (currentWordIndex < words.length - 1) {
        displayText += ' ';
        rotatingTitle.textContent = displayText;
      }
      currentWordIndex++;
      currentCharIndex = 0;
      setTimeout(typeNextChar, WORD_PAUSE);
    }
  }
  
  function deleteText() {
    const currentText = rotatingTitle.textContent;
    
    if (currentText.length > 0) {
      rotatingTitle.textContent = currentText.slice(0, -1);
      setTimeout(deleteText, DELETE_SPEED);
    } else {
      // Text deleted, move to next title
      currentTitleIndex = (currentTitleIndex + 1) % titles.length;
      isTyping = false;
      setTimeout(typeWords, 500);
    }
  }
  
  // Start typing
  typeNextChar();
}

// Start the typing animation after page load
setTimeout(typeWords, 1000);

// Animated Particles Background
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    // Old money colors - muted and elegant
    const colors = ['var(--primary-color)', 'var(--accent-color)', 'var(--secondary-color)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.3 + 0.1; // More subtle opacity
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${Math.random() * 15 + 10}s ease-in-out infinite`; // Slower, more elegant
    particle.style.animationDelay = Math.random() * 5 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Add floating animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(10px, -10px);
    }
    50% {
      transform: translate(-10px, 10px);
    }
    75% {
      transform: translate(10px, 10px);
    }
  }
`;
document.head.appendChild(style);

createParticles();

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
const animatedElements = document.querySelectorAll(
  '.skill-category, .project-card, .timeline-item, .stat-card, .experience-card'
);

animatedElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const countUpOptions = {
  threshold: 0.5
};

const countUpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const target = parseInt(entry.target.getAttribute('data-target'));
      let current = 0;
      const increment = target / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          entry.target.textContent = target + '+';
          clearInterval(timer);
        } else {
          entry.target.textContent = Math.floor(current) + '+';
        }
      }, 30);
    }
  });
}, countUpOptions);

statNumbers.forEach(stat => {
  countUpObserver.observe(stat);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Show success message (in a real application, you would send this data to a server)
  alert('Thank you for your message! I will get back to you soon.');
  
  // Reset form
  contactForm.reset();
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollPosition = window.pageYOffset + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Console message for developers
console.log('%cArjun Pandey - Portfolio', 'color: #2C5F2D; font-size: 20px; font-weight: bold;');
console.log('%cJava Full Stack Developer', 'color: #B8860B; font-size: 14px;');
console.log('%cGitHub: https://github.com/the-axoduss', 'color: #800020; font-size: 12px;');