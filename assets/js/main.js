/**
 * India Fitness - Premium Logic
 * Handles Loading, Counters, Map, and Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Loading Screen Logic
    const loader = document.getElementById('loading-screen');
    const body = document.body;
    
    // Duration: ~2.5 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        body.style.overflow = 'visible';
    }, 2500);

    // 2. Header Scroll & Progress Bar
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 3. Hero Parallax & Magnetic Buttons
    const hero = document.getElementById('hero');
    const magneticBtns = document.querySelectorAll('.magnetic');

    window.addEventListener('mousemove', (e) => {
        // Magnetic Buttons attraction
        magneticBtns.forEach(btn => {
            const rect = btn.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const btnX = rect.left + rect.width / 2;
            const btnY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(mouseX - btnX, 2) + Math.pow(mouseY - btnY, 2));
            const limit = 80;

            if (distance < limit) {
                const moveX = (mouseX - btnX) * 0.4;
                const moveY = (mouseY - btnY) * 0.4;
                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                btn.style.transform = `translate(0, 0)`;
            }
        });
    });

    // 4. 3D Tilt Card Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // 5. Staggered Text Reveal
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const text = title.innerText;
        title.innerHTML = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.classList.add('char');
            span.style.transitionDelay = `${i * 0.05}s`;
            title.appendChild(span);
        });
    });

    // Observe characters for animation
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chars = entry.target.querySelectorAll('.char');
                chars.forEach(char => char.classList.add('visible'));
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => titleObserver.observe(title));

    // 6. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if(navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.padding = '20px';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // 7. Counter Animation (Intersection Observer)
    const counters = document.querySelectorAll('.counter-value');
    const counterOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const count = +entry.target.innerText;
                const speed = 200; // lower is slower
                const increment = target / speed;

                const updateCount = () => {
                    const current = +entry.target.innerText;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, counterOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // 5. Reviews Slider Logic
    const track = document.querySelector('.review-track');
    const dots = document.querySelectorAll('.dot');
    let currentIdx = 0;

    const moveSlider = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
        currentIdx = index;
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => moveSlider(index));
    });

    // Auto slide
    setInterval(() => {
        currentIdx = (currentIdx + 1) % dots.length;
        moveSlider(currentIdx);
    }, 5000);

    // 6. Map Integration (Leaflet)
    // Coordinates: 25.5825166, 85.1282286 (India Fitness, Sipara)
    const map = L.map('map', {
        scrollWheelZoom: false
    }).setView([25.5825166, 85.1282286], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const gymIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Simple map pin
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });

    L.marker([25.5825166, 85.1282286]).addTo(map)
        .bindPopup('<b>India Fitness</b><br>Sipara, Patna.<br><a href="https://www.google.com/maps/dir/?api=1&destination=25.5825166,85.1282286" target="_blank" style="color: #e63946; font-weight: bold; text-decoration: underline;">Get Directions</a>')
        .openPopup();

    // 7. Scroll Fade Animations (Simple implementation)
    const fadeElements = document.querySelectorAll('[data-aos]');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
                if (entry.target.classList.contains('flip-left')) {
                    entry.target.style.transform = 'rotateY(0)';
                }
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        // Set initial transform based on AOS type
        if(el.getAttribute('data-aos') === 'fade-up') el.style.transform = 'translateY(50px)';
        else if(el.getAttribute('data-aos') === 'fade-right') el.style.transform = 'translateX(-50px)';
        else if(el.getAttribute('data-aos') === 'fade-left') el.style.transform = 'translateX(50px)';
        else if(el.getAttribute('data-aos') === 'zoom-in') el.style.transform = 'scale(0.8)';
        else if(el.getAttribute('data-aos') === 'flip-left') {
            el.style.transform = 'rotateY(-90deg)';
            el.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s';
        }
        
        el.style.transition = `transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s`;
        fadeObserver.observe(el);
    });

    // 8. Contact Form Handling (Vercel Backend API)
    const contactForm = document.getElementById('contactForm');
    const contactSubmitBtn = document.getElementById('contactSubmit');
    
    if(contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Gather data
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const message = document.getElementById('contactMessage').value;
            
            const originalText = contactSubmitBtn.innerText;
            contactSubmitBtn.innerText = 'Sending...';
            contactSubmitBtn.disabled = true;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, message })
                });

                const data = await response.json();
                
                if(response.ok) {
                    alert('Thank you! Your message has been sent to India Fitness.');
                    contactForm.reset();
                } else {
                    alert('Oops! Something went wrong: ' + data.message);
                }
            } catch (error) {
                alert('Connection error. Please try again later.');
                console.error('Contact Form Error:', error);
            } finally {
                contactSubmitBtn.innerText = originalText;
                contactSubmitBtn.disabled = false;
            }
        });
    }

});
