// Initialize Lucide Icons
lucide.createIcons();

// 5 Cool Theme Colors Selector Logic
const colorPickers = document.querySelectorAll('.color-picker-btn');
const htmlElement = document.documentElement;

colorPickers.forEach(picker => {
  picker.addEventListener('click', () => {
    const selectedColor = picker.getAttribute('data-color');
    
    // Remove existing theme classes from HTML
    htmlElement.classList.remove('theme-blue', 'theme-coffee', 'theme-purple', 'theme-orange', 'theme-green');
    
    // Add new theme class
    htmlElement.classList.add(`theme-${selectedColor}`);
    
    // Save choice
    localStorage.setItem('theme-color', selectedColor);

    // Update picker active style
    colorPickers.forEach(p => p.classList.remove('ring-2', 'ring-msblue', 'scale-110'));
    picker.classList.add('ring-2', 'ring-msblue', 'scale-110');

    // Force redraw particle connections with new primary color
    initParticles();
  });
});

// Restore Theme Color on load
const savedThemeColor = localStorage.getItem('theme-color') || 'blue';
htmlElement.classList.remove('theme-blue');
htmlElement.classList.add(`theme-${savedThemeColor}`);
colorPickers.forEach(p => {
  if (p.getAttribute('data-color') === savedThemeColor) {
    p.classList.add('ring-2', 'ring-msblue', 'scale-110');
  } else {
    p.classList.remove('ring-2', 'ring-msblue', 'scale-110');
  }
});

// Dark/Light Theme System
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
});

if (localStorage.getItem('theme') === 'light') {
  htmlElement.classList.remove('dark');
}

// Scroll Progress Indicator & Header Resize
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalHeight) * 100;
  scrollProgress.style.width = `${progress}%`;

  const header = document.getElementById('main-header');
  if (window.pageYOffset > 50) {
    header.classList.add('py-2', 'shadow-md');
    header.classList.remove('py-4');
  } else {
    header.classList.add('py-4');
    header.classList.remove('py-2', 'shadow-md');
  }
});

// Mobile Menu Drawer Toggle
const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
  mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
  mobileMenu.querySelector('.absolute').classList.remove('translate-x-full');
}

function closeMobileMenu() {
  mobileMenu.classList.add('opacity-0', 'pointer-events-none');
  mobileMenu.querySelector('.absolute').classList.add('translate-x-full');
}

mobileMenuTrigger.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMobileMenu();
});
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// Research Hub Sub-page Switcher Logic
const hubTabBtns = document.querySelectorAll('.hub-tab-btn');
const workspacePanels = document.querySelectorAll('.workspace-panel');

function switchHubTab(targetPanelId) {
  // Hide all sub-page panels
  workspacePanels.forEach(panel => panel.classList.add('hidden'));
  
  // Show target sub-page panel
  const targetPanel = document.getElementById(targetPanelId);
  if (targetPanel) {
    targetPanel.classList.remove('hidden');
  }

  // Update button visual states
  hubTabBtns.forEach(btn => {
    if (btn.getAttribute('data-target') === targetPanelId) {
      btn.classList.remove('text-gray-500', 'hover:text-gray-900', 'dark:text-gray-400', 'dark:hover:text-white', 'border-transparent');
      btn.classList.add('border-msblue', 'text-msblue');
    } else {
      btn.classList.remove('border-msblue', 'text-msblue');
      btn.classList.add('text-gray-500', 'hover:text-gray-900', 'dark:text-gray-400', 'dark:hover:text-white', 'border-transparent');
    }
  });

  // If user is scrolled below the hub tab bar, scroll back to the hub tab bar position
  const hubElement = document.getElementById('research-hub');
  const offsetTop = hubElement.offsetTop - 72; // height of main navigation header
  if (window.pageYOffset > offsetTop) {
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
}

hubTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    switchHubTab(btn.getAttribute('data-target'));
  });
});

// Scroll Reveal implementation
const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// Animated Statistics Counters
const statCounters = document.querySelectorAll('.stat-counter');
const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let count = 0;
      const duration = 2000;
      const step = target / (duration / 16);

      const counter = setInterval(() => {
        count += step;
        if (count >= target) {
          el.innerText = target;
          clearInterval(counter);
        } else {
          el.innerText = Math.floor(count);
        }
      }, 16);

      observer.unobserve(el);
    }
  });
}, {
  threshold: 0.5
});

statCounters.forEach(counter => countObserver.observe(counter));

// Streams Accordion
const accordionBtns = document.querySelectorAll('.stream-accordion-btn');
accordionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.accordion-icon');

    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
      icon.style.transform = 'rotate(180deg)';
    } else {
      content.classList.add('hidden');
      icon.style.transform = 'rotate(0deg)';
    }
  });
});

// Roadmap card toggle
const roadmapCards = document.querySelectorAll('.roadmap-card');
roadmapCards.forEach(card => {
  card.addEventListener('click', () => {
    const extra = card.querySelector('.roadmap-extra');
    const icon = card.querySelector('.roadmap-toggle-icon');

    if (extra.classList.contains('hidden')) {
      extra.classList.remove('hidden');
      icon.setAttribute('data-lucide', 'minus-circle');
      lucide.createIcons();
    } else {
      extra.classList.add('hidden');
      icon.setAttribute('data-lucide', 'plus-circle');
      lucide.createIcons();
    }
  });
});

// Publications Filter
const filterBtns = document.querySelectorAll('.pub-filter-btn');
const pubCards = document.querySelectorAll('.pub-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('bg-msblue', 'text-white', 'shadow-md', 'shadow-msblue/20'));
    filterBtns.forEach(b => b.classList.add('bg-white', 'dark:bg-msdark', 'border', 'border-gray-200', 'dark:border-white/10', 'text-gray-700', 'dark:text-gray-300'));
    btn.classList.remove('bg-white', 'dark:bg-msdark', 'border', 'border-gray-200', 'dark:border-white/10', 'text-gray-700', 'dark:text-gray-300');
    btn.classList.add('bg-msblue', 'text-white', 'shadow-md', 'shadow-msblue/20');

    const filterValue = btn.getAttribute('data-filter');

    pubCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-year') === filterValue) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Contact Form Submission Mockup
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formFeedback.classList.remove('hidden', 'text-red-500', 'text-green-500');
  formFeedback.innerText = "Submitting message...";

  setTimeout(() => {
    formFeedback.classList.add('text-green-500');
    formFeedback.innerText = "Thank you! Your message was submitted successfully.";
    contactForm.reset();
  }, 1500);
});

// Search Engine Overlay
const searchTrigger = document.getElementById('search-trigger');
const searchClose = document.getElementById('search-close');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const searchableDatabase = [
  { title: "About the Project", text: "Background, social isolation stats, gap analysis, and clinical research context.", link: "hub-about" },
  { title: "Project Goals", text: "Dataset curation, machine learning, safety guardrails, and embedded runtimes.", link: "hub-goals" },
  { title: "System Engineering", text: "Data layer, AI layer, decision classifications, and dialogue interventions.", link: "hub-system" },
  { title: "Enterprise Cloud", text: "Azure SQL databases, Azure machine learning models, and GitHub integrations.", link: "hub-cloud" },
  { title: "Academic Streams", text: "Active research streams led by Elizabeth, Newton, Wayne, and Joseph.", link: "hub-streams" },
  { title: "Academic Roadmap", text: "Literature review, milestones, and semester timeline details.", link: "hub-roadmap" }
];

function openSearch() {
  searchOverlay.classList.remove('opacity-0', 'pointer-events-none');
  searchOverlay.querySelector('.scale-95').classList.remove('scale-95');
  searchInput.focus();
}

function closeSearch() {
  searchOverlay.classList.add('opacity-0', 'pointer-events-none');
  searchOverlay.querySelector('.transform').classList.add('scale-95');
  searchInput.value = "";
  searchResults.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Type something to search...</p>';
}

searchTrigger.addEventListener('click', openSearch);
searchClose.addEventListener('closeSearch', closeSearch);
if(searchClose) {
  searchClose.addEventListener('click', closeSearch);
}
searchOverlay.addEventListener('click', (e) => {
  if (e.target === searchOverlay) closeSearch();
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  if (query === "") {
    searchResults.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Type something to search...</p>';
    return;
  }

  const matches = searchableDatabase.filter(item => 
    item.title.toLowerCase().includes(query) || item.text.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    searchResults.innerHTML = '<p class="text-sm text-red-500 font-medium">No results found. Try another search query.</p>';
  } else {
    searchResults.innerHTML = matches.map(item => `
      <button class="block w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" onclick="switchHubTab('${item.link}'); closeSearch(); document.getElementById('research-hub').scrollIntoView({behavior: 'smooth'});">
        <h5 class="text-sm font-bold text-msblue dark:text-mscyan mb-1">${item.title}</h5>
        <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">${item.text}</p>
      </button>
    `).join("");
  }
});

// Particle Background Canvas implementation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    const activeThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    ctx.fillStyle = htmlElement.classList.contains('dark') ? `${activeThemeColor}26` : `${activeThemeColor}14`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 12), 100);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Draw connections
  ctx.beginPath();
  const maxDistance = 120;
  const activeThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
      if (dist < maxDistance) {
        const alphaVal = Math.floor((1 - dist / maxDistance) * 25.5);
        const hexAlpha = alphaVal.toString(16).padStart(2, '0');
        ctx.strokeStyle = `${activeThemeColor}${hexAlpha}`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
      }
    }
  }
  ctx.stroke();

  requestAnimationFrame(animate);
}

initParticles();
animate();
window.addEventListener('resize', initParticles);