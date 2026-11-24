/**
 * FitFlex Modern Interactive Engine for India Fitness
 * Replicates https://fitflex-react.vercel.app/ features & animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Dynamic Slider
    initFitFlexHeroSlider();

    // 2. Animated Stats Counters
    initFitFlexCounters();

    // 3. Header Scroll Effect
    initHeaderScroll();
});

function initFitFlexHeroSlider() {
    const slides = [
        {
            title: "Bring the Gym Home",
            desc: "Discover the best workout routines to stay fit without leaving your house.",
            img: "assets/images/fitflex-home/homeImg1.jpg"
        },
        {
            title: "Build Your Dream Muscles",
            desc: "Sculpt every muscle group with Patna's #1 elite certified trainers.",
            img: "assets/images/fitflex-home/homeImg2.avif"
        },
        {
            title: "Let Yoga Lead Our Health",
            desc: "Find balance, flexibility, and inner power with dedicated guidance.",
            img: "assets/images/fitflex-home/flexible.jpg"
        },
        {
            title: "Shape Your Best Self",
            desc: "Join 1,500+ happy members in Sipara, Kurthaul & Sampatchak transforming daily.",
            img: "assets/images/fitflex-home/getinshape.jpg"
        }
    ];

    const rightContainer = document.querySelector('.ff-hero-right');
    if (!rightContainer) return;

    // Create background layers
    slides.forEach((slide, index) => {
        const bgDiv = document.createElement('div');
        bgDiv.className = `ff-slider-bg ${index === 0 ? 'active' : 'inactive'}`;
        bgDiv.style.backgroundImage = `url('${slide.img}')`;
        bgDiv.dataset.index = index;
        rightContainer.prepend(bgDiv);
    });

    const titleEl = document.getElementById('ff-slider-title');
    const descEl = document.getElementById('ff-slider-desc');
    const dotsContainer = document.getElementById('ff-slider-dots');

    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `ff-indicator-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => setSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    let currentIndex = 0;
    let timer = setInterval(nextSlide, 4500);

    function setSlide(index) {
        currentIndex = index;
        const bgEls = rightContainer.querySelectorAll('.ff-slider-bg');
        bgEls.forEach((el, idx) => {
            if (idx === index) {
                el.classList.add('active');
                el.classList.remove('inactive');
            } else {
                el.classList.remove('active');
                el.classList.add('inactive');
            }
        });

        if (titleEl) titleEl.textContent = slides[index].title;
        if (descEl) descEl.textContent = slides[index].desc;

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.ff-indicator-dot');
            dots.forEach((d, idx) => {
                if (idx === index) d.classList.add('active');
                else d.classList.remove('active');
            });
        }
    }

    function nextSlide() {
        const next = (currentIndex + 1) % slides.length;
        setSlide(next);
    }
}

function initFitFlexCounters() {
    const counterEls = document.querySelectorAll('.ff-stat-number[data-target]');
    if (!counterEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                const suffix = entry.target.getAttribute('data-suffix') || '';
                animateValue(entry.target, 0, target, 1500, suffix);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counterEls.forEach(el => observer.observe(el));

    function animateValue(obj, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
