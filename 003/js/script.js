const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

function calculateSavings() {
    const billInput = document.getElementById('monthly-bill');
    const savingRateInput = document.getElementById('usage-type');
    
    if (!billInput || !savingRateInput) return;

    const bill = parseFloat(billInput.value) || 0;
    const savingRate = parseFloat(savingRateInput.value);
    
    const monthlySave = Math.round(bill * savingRate);
    const yearlySave = monthlySave * 12;
    
    const monthlySaveEl = document.getElementById('monthly-save');
    const yearlySaveEl = document.getElementById('yearly-save');
    
    if (monthlySaveEl) monthlySaveEl.innerText = monthlySave.toLocaleString('th-TH');
    if (yearlySaveEl) yearlySaveEl.innerText = yearlySave.toLocaleString('th-TH');
}

document.addEventListener('DOMContentLoaded', () => {
    calculateSavings();

    const faqBtns = document.querySelectorAll('.faq-btn');
    
    faqBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer) {
                    ans.classList.remove('open');
                    const prevIcon = ans.previousElementSibling.querySelector('.faq-icon');
                    if (prevIcon) prevIcon.classList.remove('open');
                    ans.previousElementSibling.classList.remove('active');
                }
            });

            if (answer) answer.classList.toggle('open');
            this.classList.toggle('active');
            if (icon) icon.classList.toggle('open');
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });
});
