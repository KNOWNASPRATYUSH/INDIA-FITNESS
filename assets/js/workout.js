/**
 * Workout Generator Logic
 * Pre-defined splits and exercise data
 */

const workoutData = {
    muscle: {
        title: "Hypertrophy Mastery Split",
        desc: "Designed to maximize muscle fiber recruitment and volume for growth.",
        plans: {
            "3": [
                { day: "Day 1", muscle: "Full Body A", exercises: [
                    { name: "Bench Press", sets: "3x10", desc: "Compound chest movement" },
                    { name: "Squats", sets: "3x10", desc: "Primary leg builder" },
                    { name: "Rows", sets: "3x10", desc: "Back thickness" },
                    { name: "Overhead Press", sets: "2x12", desc: "Shoulder stability" }
                ]},
                { day: "Day 2", muscle: "Rest", exercises: [] },
                { day: "Day 3", muscle: "Full Body B", exercises: [
                    { name: "Incline Press", sets: "3x12", desc: "Upper chest focus" },
                    { name: "Deadlifts", sets: "3x8", desc: "Posterior chain" },
                    { name: "Lat Pulldowns", sets: "3x12", desc: "Back width" },
                    { name: "Leg Press", sets: "3x15", desc: "Quad fatigue" }
                ]}
            ],
            "4": [
                { day: "Day 1", muscle: "Upper Power", exercises: [
                    { name: "Bench Press", sets: "4x8", desc: "Chest focus" },
                    { name: "Rows", sets: "4x8", desc: "Back focus" },
                    { name: "Shoulder Press", sets: "3x10", desc: "Deltoid builder" }
                ]},
                { day: "Day 2", muscle: "Lower Power", exercises: [
                    { name: "Squats", sets: "4x8", desc: "Quad focus" },
                    { name: "Leg Curls", sets: "3x12", desc: "Hamstring focus" },
                    { name: "Calf Raises", sets: "4x15", desc: "Lower leg" }
                ]}
            ],
            "5": [
                { day: "Day 1", muscle: "Chest & Triceps", exercises: [
                    { name: "Incline DB Press", sets: "4x12", desc: "" },
                    { name: "Cable Flyes", sets: "3x15", desc: "" },
                    { name: "Tricep Pushdowns", sets: "4x12", desc: "" }
                ]},
                { day: "Day 2", muscle: "Back & Biceps", exercises: [
                    { name: "Deadlifts", sets: "3x8", desc: "" },
                    { name: "Pull-ups", sets: "3xMax", desc: "" },
                    { name: "Hammer Curls", sets: "3x12", desc: "" }
                ]}
            ]
        }
    },
    strength: {
        title: "Power & Strength Split",
        desc: "Focused on compound movements and nervous system adaptation.",
        plans: {
            "3": [
                { day: "Day 1", muscle: "Heavy Squat Day", exercises: [
                    { name: "Squats", sets: "5x5", desc: "Main lift" },
                    { name: "Overhead Press", sets: "3x5", desc: "Support lift" },
                    { name: "Chinups", sets: "3x8", desc: "Pulling power" }
                ]}
            ]
        }
    },
    fatloss: {
        title: "Metabolic Shred Split",
        desc: "High-intensity circuits to keep your heart rate up and calories burning.",
        plans: {
            "4": [
                { day: "Day 1", muscle: "Metabolic Conditioning", exercises: [
                    { name: "Burpees", sets: "4x15", desc: "" },
                    { name: "Mountain Climbers", sets: "4x30s", desc: "" },
                    { name: "Kettlebell Swings", sets: "4x20", desc: "" }
                ]}
            ]
        }
    }
};

// Fallback plan if a specific combo isn't defined
const fallbackPlan = [
    { day: "Day 1", muscle: "Full Body Essentials", exercises: [
        { name: "Pushups", sets: "3x15", desc: "" },
        { name: "Bodyweight Squats", sets: "3x20", desc: "" },
        { name: "Plank", sets: "3x60s", desc: "" }
    ]}
];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('workoutForm');
    const resultArea = document.getElementById('workout-result');
    const wizard = document.getElementById('workout-wizard');
    const daysContainer = document.getElementById('days-container');
    const planTitle = document.getElementById('plan-title');
    const planDesc = document.getElementById('plan-desc');
    const printBtn = document.getElementById('print-plan');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const goal = document.getElementById('goal').value;
            const days = document.getElementById('days').value;
            const time = document.getElementById('time').value;
            const equip = document.getElementById('equipment').value;

            generatePlan(goal, days, time, equip);
        });
    }

    function generatePlan(goal, days, time, equip) {
        // Selection Logic
        const goalData = workoutData[goal] || workoutData.muscle;
        let plan = goalData.plans[days] || goalData.plans["3"] || fallbackPlan;

        // UI Updates
        planTitle.innerText = goalData.title;
        planDesc.innerText = goalData.desc + ` (${time} min, ${equip} equipment)`;
        
        daysContainer.innerHTML = '';
        
        plan.forEach(dayInfo => {
            if(dayInfo.exercises.length === 0) return; // Skip rest days in card display

            const card = document.createElement('div');
            card.className = 'day-card';
            card.setAttribute('data-aos', 'fade-up');
            
            let exercisesHTML = dayInfo.exercises.map(ex => `
                <li class="exercise-item">
                    <div class="ex-info">
                        <h4>${ex.name}</h4>
                        <p>${ex.desc}</p>
                    </div>
                    <div class="ex-sets">${ex.sets}</div>
                </li>
            `).join('');

            card.innerHTML = `
                <div class="day-header">
                    <h3>${dayInfo.day}</h3>
                    <span class="muscle-group">${dayInfo.muscle}</span>
                </div>
                <ul class="exercise-list">
                    ${exercisesHTML}
                </ul>
            `;
            daysContainer.appendChild(card);
        });

        // Toggle visibility
        wizard.style.display = 'none';
        resultArea.style.display = 'block';

        // Scroll to top of result
        window.scrollTo({ top: resultArea.offsetTop - 100, behavior: 'smooth' });
    }

    if(printBtn) {
        printBtn.addEventListener('click', () => window.print());
    }
});
