document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('active');
            mobileBtn.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileBtn.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
