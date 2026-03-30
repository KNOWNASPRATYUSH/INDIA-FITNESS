document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load Trainers
        const trainersResponse = await fetch('_data/trainers.json');
        if (trainersResponse.ok) {
            const data = await trainersResponse.json();
            const trainers = data.trainers_data?.trainers || data.trainers || [];
            const teamGrid = document.querySelector('.team-grid');
            if (teamGrid && trainers.length > 0) {
                teamGrid.innerHTML = ''; // Clear hardcoded
                trainers.forEach((trainer, index) => {
                    const delay = index * 100;
                    
                    let specializationsHtml = '';
                    if (trainer.specializations && trainer.specializations.length > 0) {
                        specializationsHtml = trainer.specializations.map(spec => `<span>${spec}</span>`).join('');
                    }

                    const card = `
                        <div class="team-card" data-aos="flip-left" data-aos-delay="${delay}">
                            <div class="team-img-wrapper">
                                <img src="${trainer.image}" alt="${trainer.name}">
                            </div>
                            <div class="team-info">
                                <h3>${trainer.name}</h3>
                                <p class="role">${trainer.role}</p>
                                <p class="exp">${trainer.exp}</p>
                                <div class="specialization">
                                    ${specializationsHtml}
                                </div>
                                <p class="bio">${trainer.bio}</p>
                            </div>
                        </div>
                    `;
                    teamGrid.insertAdjacentHTML('beforeend', card);
                });
            }
        }

        // Load Gallery
        const galleryResponse = await fetch('_data/gallery.json');
        if (galleryResponse.ok) {
            const data = await galleryResponse.json();
            const items = data.gallery_data?.items || data.items || [];
            const galleryGrid = document.querySelector('.gallery-grid');
            if (galleryGrid && items.length > 0) {
                galleryGrid.innerHTML = ''; // Clear hardcoded
                items.forEach((item) => {
                    const card = `
                        <div class="gallery-item" data-aos="zoom-in">
                            <img src="${item.image}" alt="${item.caption}">
                            <div class="overlay"><span>${item.caption}</span></div>
                        </div>
                    `;
                    galleryGrid.insertAdjacentHTML('beforeend', card);
                });
            }
        }

        // Load Plans
        const plansResponse = await fetch('_data/plans.json');
        if (plansResponse.ok) {
            const data = await plansResponse.json();
            const plans = data.plans_data?.plans || data.plans || [];
            const plansGrid = document.querySelector('.plans-grid');
            if (plansGrid && plans.length > 0) {
                plansGrid.innerHTML = ''; // Clear hardcoded
                plans.forEach((plan, index) => {
                    const delay = index * 100;
                    
                    let featuresHtml = '';
                    if (plan.features && plan.features.length > 0) {
                        featuresHtml = plan.features.map(f => {
                            if(f.startsWith('★')) return `<li><i class="fas fa-star"></i> ${f.replace('★', '')}</li>`;
                            return `<li><i class="fas fa-check"></i> ${f}</li>`;
                        }).join('');
                    }

                    const bonusHtml = plan.bonus ? `<p class="bonus-tag">${plan.bonus}</p>` : '';
                    const btnClass = plan.theme.includes('black-plan') ? 'btn-black' : plan.theme.includes('featured') ? 'btn-primary' : 'btn-outline';

                    const card = `
                        <div class="plan-card ${plan.theme || 'tilt-card'}" data-aos="fade-up" data-aos-delay="${delay}">
                            <div class="plan-header">
                                <h3>${plan.title}</h3>
                                <p class="plan-type">${plan.type}</p>
                            </div>
                            <div class="plan-price">${plan.price} <span>${plan.duration}</span></div>
                            ${bonusHtml}
                            <ul class="plan-features">
                                ${featuresHtml}
                            </ul>
                            <a href="tel:8544007735" class="btn ${btnClass}">${plan.button_text || 'Join Now'}</a>
                        </div>
                    `;
                    plansGrid.insertAdjacentHTML('beforeend', card);
                });
            }
        }

    } catch (error) {
        console.error("Error loading CMS data:", error);
    }
});
