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

    // 2. Header Scroll & Sticky Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Hero Parallax & Magnetic Buttons
    const hero = document.getElementById('hero');
    const magneticBtns = document.querySelectorAll('.magnetic');

    window.addEventListener('mousemove', (e) => {
        // No magnetic logic here
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

    // 6. Side Drawer Navigation Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        document.body.appendChild(overlay);
    }
    
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'visible';
        
        // Change icon to X when open
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) toggleMenu();
        });
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
        iconUrl: 'assets/images/logo_real_2.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });

    L.marker([25.5825166, 85.1282286], { icon: gymIcon }).addTo(map)
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
    const phoneInput = document.getElementById('contactPhone');
    
    let iti;
    if (phoneInput) {
        iti = window.intlTelInput(phoneInput, {
            initialCountry: "in",
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
            preferredCountries: ["in", "us", "gb"]
        });
    }

    if(contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            // 1. Honeypot Check (Bot Protection)
            const hpField = document.getElementById('hp_field').value;
            if (hpField) {
                console.warn("Bot detected via honeypot.");
                return; // Silent fail for bots
            }

            // 2. Client-side Rate Limiting
            const lastSub = localStorage.getItem('last_sub');
            const now = Date.now();
            if (lastSub && (now - lastSub < 10000)) { // 10 second cool down
                alert("Please wait a moment before sending another message.");
                return;
            }

            // 3. Phone Validation Check
            if (iti && !iti.isValidNumber()) {
                phoneInput.classList.add('error-shake');
                alert("Please enter a valid phone number for the selected country.");
                setTimeout(() => phoneInput.classList.remove('error-shake'), 500);
                return;
            }

            const originalText = contactSubmitBtn.innerText;
            contactSubmitBtn.innerText = 'SENDING...';
            contactSubmitBtn.disabled = true;

            // Append explicit IDs if they don't have name attributes
            formData.append('name', document.getElementById('contactName').value);
            formData.append('email', document.getElementById('contactEmail').value);
            // Get full international phone number
            const fullPhone = iti ? iti.getNumber() : document.getElementById('contactPhone').value;
            formData.append('phone', fullPhone);
            formData.append('message', document.getElementById('contactMessage').value);

            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                const data = await response.json();
                
                if(response.ok) {
                    localStorage.setItem('last_sub', Date.now());
                    contactSubmitBtn.innerText = 'MESSAGE SENT ✓';
                    contactSubmitBtn.classList.add('btn-success');
                    contactForm.reset();
                    if(iti) iti.setCountry("in"); // Reset phone input too
                    
                    setTimeout(() => {
                        contactSubmitBtn.innerText = originalText;
                        contactSubmitBtn.classList.remove('btn-success');
                    }, 3000);
                } else {
                    const errMsg = data.message || "Submission failed.";
                    alert('Submission Error: ' + errMsg);
                }
            } catch (error) {
                alert('Connection error. Please check your internet.');
                console.error('Web3Forms Error:', error);
            } finally {
                if(!contactSubmitBtn.classList.contains('btn-success')) {
                    contactSubmitBtn.innerText = originalText;
                    contactSubmitBtn.disabled = false;
                }
            }
        });
    }

    // 9. Motivation Scroller Logic
    const motivationText = document.getElementById('motivation-text');
    const phrases = [
        "Build a Stronger You",
        "Push Your Limits Every Day",
        "Join the Elite Patna Fitness Club",
        "Unleash Your Inner Potential",
        "Consistency is the Key to Success",
        "Train Hard, Stay Focused"
    ];
    let phraseIdx = 0;

    if (motivationText) {
        setInterval(() => {
            motivationText.style.opacity = '0';
            motivationText.style.transition = 'opacity 0.6s ease';
            
            setTimeout(() => {
                phraseIdx = (phraseIdx + 1) % phrases.length;
                motivationText.innerText = phrases[phraseIdx];
                motivationText.style.opacity = '1';
            }, 600); // 0.6s for fade out
        }, 4000);
    }

});
