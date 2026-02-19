'use strict';

// --- STICKY NAVBAR & MOBILE MENU ---
const topNav = document.getElementById('topNav');
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky background on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    topNav.classList.add('scrolled');
  } else {
    topNav.classList.remove('scrolled');
  }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('nav-open');
  const icon = mobileToggle.querySelector('ion-icon');
  if(navLinksContainer.classList.contains('nav-open')) {
    icon.setAttribute('name', 'close-outline');
  } else {
    icon.setAttribute('name', 'menu-outline');
  }
});

// --- SCROLL SPY (Active Nav Link Updates) ---
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Adjust trigger point
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('nav-open');
    mobileToggle.querySelector('ion-icon').setAttribute('name', 'menu-outline');
  });
});

// --- SCROLL REVEAL ANIMATIONS ---
const revealElements = document.querySelectorAll('.scroll-reveal');
const progressFills = document.querySelectorAll('.progress-fill');

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    
    // Add visible class to text/containers
    entry.target.classList.add('visible');
    
    // If the revealed element contains skill bars, animate them
    if (entry.target.classList.contains('skills-wrap')) {
       progressFills.forEach(bar => {
         const width = bar.style.width;
         bar.style.transform = 'scaleX(1)';
       });
    }
    
    observer.unobserve(entry.target);
  });
}, revealOptions);

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});

// Initialize progress bars to 0 scale before animation
progressFills.forEach(bar => {
  bar.style.transform = 'scaleX(0)';
});


// --- PORTFOLIO FILTERING ---
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active state toggling
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    // Filter logic
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
});

// --- MODAL LOGIC ---
const modal = document.getElementById('projectModal');
const closeModalBtn = document.querySelector('.close-modal');
const modalImg = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const modalCategory = document.querySelector('.modal-category');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    // Extract data from clicked item
    const imgSrc = item.querySelector('img').src;
    const title = item.querySelector('h3').innerText;
    const category = item.querySelector('span').innerText;

    // Populate modal
    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalCategory.innerText = category;

    // Show modal
    modal.classList.add('active');
  });
});

// Close Modal Events
closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Smooth scroll to top
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

