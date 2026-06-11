/* =========================================
   MOBILE MENU TOGGLE (with animated burger)
========================================= */
const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');

const setMenuOpen = (open) => {
    menu.classList.toggle('menu--active', open);
    menuBtn.classList.toggle('is-active', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', open);
};

if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
        const open = !menu.classList.contains('menu--active');
        setMenuOpen(open);
    });

    document.querySelectorAll('.menu__link').forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
    });
}

/* =========================================
   STICKY HEADER ON SCROLL
========================================= */
const header = document.querySelector('.header');
const onScrollHeader = () => {
    if (!header) return;
    if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
    }
};
window.addEventListener('scroll', onScrollHeader, { passive: true });
onScrollHeader();

/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */
const revealTargets = [
    '.about__achievement',
    '.about__stats',
    '.about__progress-text',
    '.about__progress-box',
    '.products__title',
    '.products__item',
    '.products__link',
    '.slogan__text',
    '.slogan__title',
    '.partners__info',
    '.partners__box',
    '.blog__title',
    '.blog__item-big',
    '.blog__item-small',
    '.footer__top',
    '.footer__bottom',
];

const revealEls = document.querySelectorAll(revealTargets.join(','));
revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // staggered delay for items in lists
    const delayClass = `reveal-delay-${(i % 4) + 1}`;
    el.classList.add(delayClass);
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* =========================================
   ANIMATED COUNTERS FOR STATS
========================================= */
const parseNumber = (str) => {
    const match = str.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
};

const animateCounter = (el) => {
    const original = el.textContent.trim();
    const target = parseNumber(original);
    if (target === null) return;

    const decimals = (original.match(/\.(\d+)/) || [, ''])[1].length;
    const prefix = original.split(/[\d.]+/)[0] || '';
    const suffix = original.replace(prefix, '').replace(/^[\d.]+/, '');

    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        const text = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
        el.textContent = `${prefix}${text}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = original;
    };
    requestAnimationFrame(tick);
};

const statsItems = document.querySelectorAll('.about__stats-item dt');
if ('IntersectionObserver' in window && statsItems.length) {
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.6 }
    );
    statsItems.forEach((el) => statsObserver.observe(el));
}

/* =========================================
   SCROLL TO TOP BUTTON
========================================= */
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;
document.body.appendChild(scrollTopBtn);

const onScrollTopVisibility = () => {
    if (window.scrollY > 600) scrollTopBtn.classList.add('is-visible');
    else scrollTopBtn.classList.remove('is-visible');
};
window.addEventListener('scroll', onScrollTopVisibility, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================
   FOOTER YEAR
========================================= */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
