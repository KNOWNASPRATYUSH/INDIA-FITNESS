/**
 * India Fitness - Premium Logic
 * Handles Loading, Counters, Map, and Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Loading Screen Logic
    const loader = document.getElementById('loading-screen');
    const body = document.body;
    
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            body.style.overflow = 'visible';
        }, 2200);
    } else {
        body.style.overflow = 'visible';
    }

    // 2. Header Scroll & Sticky Effect
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. 3D Tilt Card Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    if (tiltCards.length > 0) {
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
    }

    // 4. Side Drawer Navigation Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
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
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        };

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) toggleMenu();
            });
        });

        // 4.1 Global Plan Loader for Drawer Summary
        const savedPlan = localStorage.getItem('indiaFitnessWorkoutPlan');
        if (savedPlan) {
            try {
                const data = JSON.parse(savedPlan);
                const summaryContainer = document.getElementById('drawer-summary-container');
                const drawerGoal = document.getElementById('drawer-goal');
                const drawerDaysList = document.getElementById('drawer-days-list');
                const drawerViewFull = document.getElementById('drawer-view-full');

                if (summaryContainer && drawerGoal && drawerDaysList) {
                    summaryContainer.style.display = 'block';
                    drawerGoal.innerText = data.inputs.goal.charAt(0).toUpperCase() + data.inputs.goal.slice(1);
                    
                    drawerDaysList.innerHTML = '';
                    data.plan.forEach(day => {
                        if (day.exercises.length > 0) {
                            const li = document.createElement('li');
                            li.innerHTML = `${day.day} <span>${day.muscle}</span>`;
                            drawerDaysList.appendChild(li);
                        }
                    });

                    if (drawerViewFull) {
                        drawerViewFull.addEventListener('click', () => {
                            if (window.location.pathname.includes('workout.html')) {
                                const resultArea = document.getElementById('workout-result');
                                if (resultArea) {
                                    resultArea.style.display = 'block';
                                    window.scrollTo({ top: resultArea.offsetTop - 100, behavior: 'smooth' });
                                }
                            } else {
                                window.location.href = 'workout.html#workout-result';
                            }
                        });
                    }
                }
            } catch (e) {
                console.error("Error loading global plan", e);
            }
        }
    }

    // 5. Staggered Text Reveal
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length > 0) {
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
    }

    // 6. Counter Animation
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = +entry.target.getAttribute('data-target');
                    const increment = target / 200;
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
        }, { threshold: 0.5 });
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // 7. Reviews Slider Logic
    const track = document.querySelector('.review-track');
    const dots = document.querySelectorAll('.dot');
    if (track && dots.length > 0) {
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
        setInterval(() => {
            currentIdx = (currentIdx + 1) % dots.length;
            moveSlider(currentIdx);
        }, 5000);
    }

    // 8. Map Integration (Leaflet)
    const mapContainer = document.getElementById('map');
    if (mapContainer && typeof L !== 'undefined') {
        const map = L.map('map', { scrollWheelZoom: false }).setView([25.5825166, 85.1282286], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        const gymIcon = L.icon({
            iconUrl: 'assets/images/logo_real_2.png',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });
        L.marker([25.5825166, 85.1282286], { icon: gymIcon }).addTo(map)
            .bindPopup('<b>India Fitness</b><br>Sipara, Patna.')
            .openPopup();
    }

    // 9. Motivation Scroller
    const motivationText = document.getElementById('motivation-text');
    if (motivationText) {
        const phrases = ["Build a Stronger You", "Push Your Limits Every Day", "Join the Elite Patna Fitness Club", "Unleash Your Inner Potential", "Consistency is the Key to Success", "Train Hard, Stay Focused"];
        let phraseIdx = 0;
        setInterval(() => {
            motivationText.style.opacity = '0';
            setTimeout(() => {
                phraseIdx = (phraseIdx + 1) % phrases.length;
                motivationText.innerText = phrases[phraseIdx];
                motivationText.style.opacity = '1';
            }, 600);
        }, 4000);
    }

    // 10. Contact Form
    // 10. Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const phoneInput = document.getElementById('contactPhone');
        const contactSubmitBtn = document.getElementById('contactSubmit');
        let iti;
        if (phoneInput && window.intlTelInput) {
            iti = window.intlTelInput(phoneInput, {
                initialCountry: "in",
                separateDialCode: true,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
            });
        }
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const hpField = document.getElementById('hp_field').value;
            if (hpField) return;
            const originalText = contactSubmitBtn.innerText;
            contactSubmitBtn.innerText = 'SENDING...';
            contactSubmitBtn.disabled = true;
            try {
                const formData = new FormData(contactForm);
                formData.append('phone', iti ? iti.getNumber() : (phoneInput ? phoneInput.value : ''));
                
                // Securely fetch via our own serverless proxy
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });

                if (response.ok) {
                    contactSubmitBtn.innerText = 'MESSAGE SENT ✓';
                    contactSubmitBtn.classList.add('btn-success');
                    contactForm.reset();
                } else {
                    const err = await response.json();
                    console.error('Submission failed:', err.message);
                    contactSubmitBtn.innerText = (err.message || 'FIX ERRORS').toUpperCase();
                    // If it's too long, truncate it
                    if (contactSubmitBtn.innerText.length > 20) {
                        contactSubmitBtn.innerText = 'CONFIG ERROR';
                    }
                }


            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    contactSubmitBtn.innerText = originalText;
                    contactSubmitBtn.classList.remove('btn-success');
                    contactSubmitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // 11. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic');
    if (magneticBtns.length > 0) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Strength of the magnetic pull
                const strength = 15;
                btn.style.transform = `translate(${x / strength}px, ${y / strength}px) scale(1.05)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

});
