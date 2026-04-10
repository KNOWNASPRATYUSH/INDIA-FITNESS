/**
 * India Fitness - Membership Finder Quiz Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('finder-quiz');
    if (!quizContainer) return;

    const steps = document.querySelectorAll('.quiz-step');
    const progressBar = document.querySelector('.quiz-progress-fill');
    const stepIndicator = document.querySelector('.step-indicator');
    const resultArea = document.getElementById('quiz-result-node');
    
    let currentStep = 0;
    let answers = {
        goal: '',
        time: '',
        level: '',
        style: ''
    };

    const totalSteps = steps.length - 1; // Last one is result

    // Initialize
    updateProgress();

    // Attach click listeners to all option cards
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const stepId = card.closest('.quiz-step').dataset.step;
            const value = card.dataset.value;

            // Save answer
            answers[stepId] = value;

            // Move to next step
            nextStep();
        });
    });

    function nextStep() {
        if (currentStep < totalSteps) {
            steps[currentStep].classList.remove('active');
            currentStep++;
            steps[currentStep].classList.add('active');
            
            if (currentStep === totalSteps) {
                calculateResult();
            }
            
            updateProgress();
        }
    }

    window.resetFinderQuiz = function() {
        steps[currentStep].classList.remove('active');
        currentStep = 0;
        steps[currentStep].classList.add('active');
        answers = { goal: '', time: '', level: '', style: '' };
        updateProgress();
    };

    function updateProgress() {
        if (progressBar) {
            const percentage = (currentStep / totalSteps) * 100;
            progressBar.style.width = `${percentage}%`;
        }
        if (stepIndicator) {
            stepIndicator.innerText = `Question ${currentStep + 1} of ${totalSteps}`;
            if (currentStep === totalSteps) {
                stepIndicator.innerText = "Your Recommendation";
            }
        }
    }

    function calculateResult() {
        const resultNode = document.getElementById('quiz-result-node');
        if (!resultNode) return;

        let recommendation = {
            title: "Standard Membership",
            price: "₹1,100",
            duration: "Monthly",
            badge: "Most Popular",
            features: ["Full Gym Access", "Evening Session", "Locker Room", "Expert Trainers"],
            cta: "Join Now",
            icon: "fa-dumbbell"
        };

        // Logic Mapping
        if (answers.style === 'pt' || answers.level === 'beginner') {
            recommendation = {
                title: "Transformation Plan",
                price: "₹3,500",
                duration: "Per Month",
                badge: "Results Guaranteed",
                features: ["1-on-1 Personal Trainer", "Custom Diet Chart", "Morning & Evening Access", "Weekly Progress Review"],
                cta: "Book Consultation",
                icon: "fa-user-ninja"
            };
        } else if (answers.time === 'morning') {
            recommendation = {
                title: "Early Bird Special",
                price: "₹800",
                duration: "Monthly",
                badge: "Best Value",
                features: ["Morning Gym Access", "Cardio Specialized", "Strength Equipment", "Peaceful Environment"],
                cta: "Join Morning Batch",
                icon: "fa-sun"
            };
        } else if (answers.goal === 'muscle' && answers.level === 'advanced') {
            recommendation = {
                title: "Elite Athlete Plan",
                price: "₹12,000",
                duration: "Annual",
                badge: "Best for Pros",
                features: ["Full Year Access", "Weight Lifting Focus", "Advanced Supplement Guide", "Free Gym Apparel"],
                cta: "Upgrade to Elite",
                icon: "fa-crown"
            };
        }

        // Render Result
        resultNode.innerHTML = `
            <div class="result-card">
                <span class="badge">${recommendation.badge}</span>
                <i class="fas ${recommendation.icon}" style="font-size: 50px; color: var(--primary); margin-bottom: 20px;"></i>
                <h2>${recommendation.title}</h2>
                <p>Based on your profile, we recommend:</p>
                <div class="price">${recommendation.price} <span style="font-size: 16px; color: var(--text-dim);">${recommendation.duration}</span></div>
                <ul class="result-features">
                    ${recommendation.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                </ul>
                <div class="quiz-actions">
                    <a href="https://wa.me/918544007735?text=Hi! I just took the quiz and you recommended the ${recommendation.title}. I want to join!" target="_blank" class="btn btn-primary">${recommendation.cta}</a>
                    <button onclick="resetFinderQuiz()" class="btn-quiz-reset">Start Over</button>
                </div>
            </div>
        `;
    }
});
