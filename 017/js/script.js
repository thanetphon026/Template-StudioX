// ===== NAVBAR =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        }
    });
});

// Close menu on click outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        }
    }
});

// ===== PARALLAX =====
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar background
    navbar.classList.toggle('scrolled', scrollY > 50);

    // Parallax backgrounds
    document.querySelectorAll('.parallax-section').forEach(section => {
        const speed = parseFloat(section.dataset.speed) || 0.5;
        const bg = section.querySelector('.parallax-bg');
        if (bg) {
            const rect = section.getBoundingClientRect();
            const offset = rect.top * speed;
            bg.style.transform = `translateY(${offset}px)`;
        }
    });
});

// ===== FLOOR PLAN TABS =====
const fpData = {
    sky: { title: 'Sky Residence', bed: '2 Bedrooms', bath: '2 Bathrooms', size: '1,450 sqft', price: 'From $1.2M', desc: 'Open-concept living with floor-to-ceiling windows and Italian marble finishes. Individual climate control and smart home integration throughout.' },
    grand: { title: 'Grand Residence', bed: '3 Bedrooms', bath: '3 Bathrooms', size: '2,200 sqft', price: 'From $2.4M', desc: 'Expansive layouts with a private terrace, chef\'s kitchen with Sub-Zero appliances, and a dedicated home office with city views.' },
    penthouse: { title: 'Penthouse Collection', bed: '4 Bedrooms', bath: '4.5 Bathrooms', size: '4,500 sqft', price: 'From $6.8M', desc: 'The pinnacle of luxury. Double-height ceilings, private elevator entry, rooftop terrace with plunge pool, and 360° panoramic views.' }
};

// ===== FAQ TOGGLE =====
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentNode;
        item.classList.toggle('active');

        // Optional: Close other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
    });
});

document.querySelectorAll('.fp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.fp-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const data = fpData[tab.dataset.tab];
        document.getElementById('fpTitle').textContent = data.title;
        document.getElementById('fpBed').textContent = data.bed;
        document.getElementById('fpBath').textContent = data.bath;
        document.getElementById('fpSize').textContent = data.size;
        document.getElementById('fpPrice').textContent = data.price;
        document.getElementById('fpDesc').textContent = data.desc;
    });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
    '.residence-card, .amenity-card, .gallery-item, .section-header, .inquiry-grid, .floorplan-content'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), i * 60);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => observer.observe(el));

// ===== FORM =====
const form = document.getElementById('inquiryForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.textContent = 'Request Submitted ✓';
        btn.style.background = '#059669';
        btn.disabled = true;
        setTimeout(() => { btn.textContent = 'Schedule Private Viewing'; btn.style.background = ''; btn.disabled = false; form.reset(); }, 4000);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === "#") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
