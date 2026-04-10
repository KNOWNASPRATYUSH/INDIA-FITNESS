/**
 * Workout Generator Logic
 * Comprehensive splits and exercise database with equipment adaptation
 */

// Exercise Alternatives for different equipment levels
const exerciseAlternatives = {
    "Bench Press": { basic: "Dumbbell Press", bodyweight: "Pushups (3xMax)" },
    "Incline Press": { basic: "Incline DB Press", bodyweight: "Decline Pushups" },
    "Squats": { basic: "DB Goblet Squats", bodyweight: "Air Squats (3x20)" },
    "Deadlifts": { basic: "DB RDLs", bodyweight: "Glute Bridges" },
    "Overhead Press": { basic: "DB Shoulder Press", bodyweight: "Pike Pushups" },
    "Rows": { basic: "One Arm DB Rows", bodyweight: "Inverted Rows (using table/bar)" },
    "Lat Pulldowns": { basic: "DB Pullovers", bodyweight: "Superman Pulls" },
    "Leg Press": { basic: "DB Lunges", bodyweight: "Walking Lunges" },
    "Leg Curls": { basic: "DB Leg Curls", bodyweight: "Nordic Curls (assisted)" },
    "Calf Raises": { basic: "Single Leg DB Calf Raises", bodyweight: "Calf Raises" },
    "Tricep Pushdowns": { basic: "DB Overhead Extension", bodyweight: "Bench Dips" },
    "Pull-ups": { basic: "DB Rows", bodyweight: "Pull-ups" },
    "Hammer Curls": { basic: "DB Hammer Curls", bodyweight: "Towel Bicep Curls" },
    "Cable Flyes": { basic: "DB Flyes", bodyweight: "Wide Pushups" }
};

const compoundExercises = [
    "Bench Press", "Squats", "Deadlifts", "Overhead Press", 
    "Rows", "Leg Press", "Pull-ups", "Lat Pulldowns", 
    "Incline Press", "Lunges", "Burpees"
];

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
                ]},
                { day: "Day 4", muscle: "Rest", exercises: [] },
                { day: "Day 5", muscle: "Full Body C", exercises: [
                    { name: "Pull-ups", sets: "3xMax", desc: "Upper body pulling" },
                    { name: "Dumbbell Press", sets: "3x12", desc: "Chest isolation" },
                    { name: "Lunges", sets: "3x12", desc: "Unilateral leg work" },
                    { name: "Plank", sets: "3x60s", desc: "Core stability" }
                ]}
            ],
            "4": [
                { day: "Day 1", muscle: "Upper Power", exercises: [
                    { name: "Bench Press", sets: "4x8", desc: "Heavier loads for chest" },
                    { name: "Rows", sets: "4x8", desc: "Power pulling" },
                    { name: "Overhead Press", sets: "3x10", desc: "Vertical pressing" },
                    { name: "Pull-ups", sets: "3xMax", desc: "Vertical pulling" }
                ]},
                { day: "Day 2", muscle: "Lower Power", exercises: [
                    { name: "Squats", sets: "4x8", desc: "Quadriceps focus" },
                    { name: "Deadlifts", sets: "3x8", desc: "Hinge pattern" },
                    { name: "Leg Curls", sets: "3x12", desc: "Hamstrings" },
                    { name: "Calf Raises", sets: "4x15", desc: "Lower leg" }
                ]},
                { day: "Day 3", muscle: "Rest", exercises: [] },
                { day: "Day 4", muscle: "Upper Hypertrophy", exercises: [
                    { name: "Incline Press", sets: "3x12", desc: "Upper chest pump" },
                    { name: "Lat Pulldowns", sets: "3x12", desc: "Back width" },
                    { name: "Hammer Curls", sets: "3x12", desc: "Arm thickness" },
                    { name: "Tricep Pushdowns", sets: "3x15", desc: "Tricep volume" }
                ]},
                { day: "Day 5", muscle: "Lower Hypertrophy", exercises: [
                    { name: "Leg Press", sets: "3x15", desc: "Constant tension" },
                    { name: "Lunges", sets: "3x12", desc: "Glute/Quad focus" },
                    { name: "Leg Extensions", sets: "3x15", desc: "Quad isolation" },
                    { name: "Plank", sets: "3x60s", desc: "Core" }
                ]}
            ],
            "5": [
                { day: "Day 1", muscle: "Chest", exercises: [
                    { name: "Bench Press", sets: "4x10", desc: "" },
                    { name: "Incline Press", sets: "3x12", desc: "" },
                    { name: "Cable Flyes", sets: "3x15", desc: "" }
                ]},
                { day: "Day 2", muscle: "Back", exercises: [
                    { name: "Deadlifts", sets: "3x8", desc: "" },
                    { name: "Rows", sets: "4x10", desc: "" },
                    { name: "Lat Pulldowns", sets: "3x12", desc: "" }
                ]},
                { day: "Day 3", muscle: "Shoulders", exercises: [
                    { name: "Overhead Press", sets: "4x10", desc: "" },
                    { name: "Lateral Raises", sets: "4x15", desc: "" }
                ]},
                { day: "Day 4", muscle: "Legs", exercises: [
                    { name: "Squats", sets: "4x10", desc: "" },
                    { name: "Leg Press", sets: "3x15", desc: "" },
                    { name: "Leg Curls", sets: "3x12", desc: "" }
                ]},
                { day: "Day 5", muscle: "Arms", exercises: [
                    { name: "Hammer Curls", sets: "3x12", desc: "" },
                    { name: "Tricep Pushdowns", sets: "3x12", desc: "" }
                ]}
            ],
            "6": [
                { day: "Day 1", muscle: "Push A", exercises: [
                    { name: "Bench Press", sets: "4x8", desc: "" },
                    { name: "Overhead Press", sets: "3x10", desc: "" },
                    { name: "Cable Flyes", sets: "3x15", desc: "" }
                ]},
                { day: "Day 2", muscle: "Pull A", exercises: [
                    { name: "Deadlifts", sets: "3x8", desc: "" },
                    { name: "Pull-ups", sets: "3xMax", desc: "" },
                    { name: "Rows", sets: "3x12", desc: "" }
                ]},
                { day: "Day 3", muscle: "Legs A", exercises: [
                    { name: "Squats", sets: "4x8", desc: "" },
                    { name: "Leg Curls", sets: "3x12", desc: "" },
                    { name: "Calf Raises", sets: "4x20", desc: "" }
                ]},
                { day: "Day 4", muscle: "Push B", exercises: [
                    { name: "Incline Press", sets: "3x12", desc: "" },
                    { name: "Lateral Raises", sets: "4x15", desc: "" },
                    { name: "Tricep Pushdowns", sets: "3x12", desc: "" }
                ]},
                { day: "Day 5", muscle: "Pull B", exercises: [
                    { name: "Lat Pulldowns", sets: "3x12", desc: "" },
                    { name: "Face Pulls", sets: "3x15", desc: "" },
                    { name: "Hammer Curls", sets: "3x12", desc: "" }
                ]},
                { day: "Day 6", muscle: "Legs B", exercises: [
                    { name: "Leg Press", sets: "3x15", desc: "" },
                    { name: "Lunges", sets: "3x12", desc: "" },
                    { name: "Plank", sets: "3x60s", desc: "" }
                ]}
            ]
        }
    },
    strength: {
        title: "Power & Strength Split",
        desc: "Focused on compound movements and nervous system adaptation for maximum output.",
        plans: {
            "3": [
                { day: "Day 1", muscle: "Squat Priority", exercises: [
                    { name: "Squats", sets: "5x5", desc: "Heavy core lift" },
                    { name: "Bench Press", sets: "3x8", desc: "Support push" },
                    { name: "Rows", sets: "3x8", desc: "Stability pull" }
                ]},
                { day: "Day 2", muscle: "Rest", exercises: [] },
                { day: "Day 3", muscle: "Bench Priority", exercises: [
                    { name: "Bench Press", sets: "5x5", desc: "Heavy push" },
                    { name: "Overhead Press", sets: "3x8", desc: "Support shoulder" },
                    { name: "Lat Pulldowns", sets: "3x8", desc: "Pulling" }
                ]},
                { day: "Day 4", muscle: "Rest", exercises: [] },
                { day: "Day 5", muscle: "Deadlift Priority", exercises: [
                    { name: "Deadlifts", sets: "5x5", desc: "Heavy hinge" },
                    { name: "Squats", sets: "3x8", desc: "Support legs" },
                    { name: "Rows", sets: "3x8", desc: "Back power" }
                ]}
            ],
            "4": [
                { day: "Day 1", muscle: "Max Effort Upper", exercises: [
                    { name: "Bench Press", sets: "5x5", desc: "" },
                    { name: "Rows", sets: "3x8", desc: "" }
                ]},
                { day: "Day 2", muscle: "Max Effort Lower", exercises: [
                    { name: "Squats", sets: "5x5", desc: "" },
                    { name: "Deadlifts", sets: "5x3", desc: "" }
                ]},
                { day: "Day 3", muscle: "Rest", exercises: [] },
                { day: "Day 4", muscle: "Dynamic Upper", exercises: [
                    { name: "Overhead Press", sets: "5x5", desc: "" },
                    { name: "Pull-ups", sets: "3x8", desc: "" }
                ]},
                { day: "Day 5", muscle: "Dynamic Lower", exercises: [
                    { name: "Deadlifts", sets: "5x5", desc: "" },
                    { name: "Leg Press", sets: "3x10", desc: "" }
                ]}
            ],
            "5": [
                { day: "Day 1", muscle: "Heavy Squat", exercises: [
                    { name: "Squats", sets: "5x5", desc: "" },
                    { name: "Leg Press", sets: "3x10", desc: "" }
                ]},
                { day: "Day 2", muscle: "Heavy Bench", exercises: [
                    { name: "Bench Press", sets: "5x5", desc: "" },
                    { name: "Incline Press", sets: "3x8", desc: "" }
                ]},
                { day: "Day 3", muscle: "Rest", exercises: [] },
                { day: "Day 4", muscle: "Heavy Deadlift", exercises: [
                    { name: "Deadlifts", sets: "5x3", desc: "" },
                    { name: "Rows", sets: "3x8", desc: "" }
                ]},
                { day: "Day 5", muscle: "Heavy Overhead", exercises: [
                    { name: "Overhead Press", sets: "5x5", desc: "" },
                    { name: "Pull-ups", sets: "3xMax", desc: "" }
                ]},
                { day: "Day 6", muscle: "Accessories", exercises: [
                    { name: "Hammer Curls", sets: "3x12", desc: "" },
                    { name: "Tricep Pushdowns", sets: "3x12", desc: "" },
                    { name: "Plank", sets: "3x60s", desc: "" }
                ]}
            ],
            "6": [
                { day: "Day 1", muscle: "Power Push", exercises: [
                    { name: "Bench Press", sets: "5x5", desc: "" },
                    { name: "Overhead Press", sets: "3x8", desc: "" }
                ]},
                { day: "Day 2", muscle: "Power Pull", exercises: [
                    { name: "Deadlifts", sets: "5x3", desc: "" },
                    { name: "Rows", sets: "3x8", desc: "" }
                ]},
                { day: "Day 3", muscle: "Power Legs", exercises: [
                    { name: "Squats", sets: "5x5", desc: "" },
                    { name: "Leg Press", sets: "3x10", desc: "" }
                ]},
                { day: "Day 4", muscle: "Hypertrophy Push", exercises: [
                    { name: "Incline Press", sets: "3x12", desc: "" },
                    { name: "Cable Flyes", sets: "3x15", desc: "" }
                ]},
                { day: "Day 5", muscle: "Hypertrophy Pull", exercises: [
                    { name: "Lat Pulldowns", sets: "3x12", desc: "" },
                    { name: "Hammer Curls", sets: "3x12", desc: "" }
                ]},
                { day: "Day 6", muscle: "Hypertrophy Legs", exercises: [
                    { name: "Lunges", sets: "3x12", desc: "" },
                    { name: "Leg Curls", sets: "3x12", desc: "" }
                ]}
            ]
        }
    },
    fatloss: {
        title: "Metabolic Shred Split",
        desc: "High-intensity circuits to keep your heart rate up and calories burning long after you leave.",
        plans: {
            "3": [
                { day: "Day 1", muscle: "Full Body Circuit A", exercises: [
                    { name: "Squats", sets: "3x15", desc: "" },
                    { name: "Pushups", sets: "3x15", desc: "" },
                    { name: "Mountain Climbers", sets: "3x45s", desc: "" }
                ]},
                { day: "Day 2", muscle: "Full Body Circuit B", exercises: [
                    { name: "Burpees", sets: "3x12", desc: "" },
                    { name: "Lunges", sets: "3x15", desc: "" },
                    { name: "Plank", sets: "3x60s", desc: "" }
                ]},
                { day: "Day 3", muscle: "Full Body Circuit C", exercises: [
                    { name: "Rows", sets: "3x12", desc: "" },
                    { name: "Overhead Press", sets: "3x12", desc: "" },
                    { name: "Jumping Jacks", sets: "3x60s", desc: "" }
                ]}
            ],
            "4": [
                { day: "Day 1", muscle: "Upper Body Circuit", exercises: [
                    { name: "Pushups", sets: "4x15", desc: "" },
                    { name: "Rows", sets: "4x12", desc: "" },
                    { name: "Burpees", sets: "4x10", desc: "" }
                ]},
                { day: "Day 2", muscle: "Lower Body Circuit", exercises: [
                    { name: "Squats", sets: "4x20", desc: "" },
                    { name: "Lunges", sets: "4x12", desc: "" },
                    { name: "Mountain Climbers", sets: "4x45s", desc: "" }
                ]},
                { day: "Day 3", muscle: "Core & Cardio", exercises: [
                    { name: "Plank", sets: "3x60s", desc: "" },
                    { name: "Bicycle Crunches", sets: "3x20", desc: "" },
                    { name: "Jumping Jacks", sets: "3x60s", desc: "" }
                ]},
                { day: "Day 4", muscle: "Full Body Burn", exercises: [
                    { name: "Deadlifts", sets: "3x12", desc: "" },
                    { name: "Overhead Press", sets: "3x12", desc: "" },
                    { name: "Pushups", sets: "3xMax", desc: "" }
                ]}
            ],
            "5": [
                { day: "Day 1", muscle: "Chest & Back Circuit", exercises: [
                    { name: "Bench Press", sets: "4x12", desc: "" },
                    { name: "Rows", sets: "4x12", desc: "" }
                ]},
                { day: "Day 2", muscle: "Legs Circuit", exercises: [
                    { name: "Squats", sets: "4x15", desc: "" },
                    { name: "Leg Curls", sets: "4x15", desc: "" }
                ]},
                { day: "Day 3", muscle: "Conditioning A", exercises: [
                    { name: "Burpees", sets: "5x10", desc: "" },
                    { name: "Mountain Climbers", sets: "5x45s", desc: "" }
                ]},
                { day: "Day 4", muscle: "Shoulders & Arms", exercises: [
                    { name: "Overhead Press", sets: "4x12", desc: "" },
                    { name: "Hammer Curls", sets: "4x12", desc: "" }
                ]},
                { day: "Day 5", muscle: "Conditioning B", exercises: [
                    { name: "Jumping Jacks", sets: "5x60s", desc: "" },
                    { name: "Plank", sets: "5x60s", desc: "" }
                ]}
            ],
            "6": [
                { day: "Day 1", muscle: "Metabolic PUSH", exercises: [
                    { name: "Pushups", sets: "4x20", desc: "" },
                    { name: "Overhead Press", sets: "4x12", desc: "" }
                ]},
                { day: "Day 2", muscle: "Metabolic PULL", exercises: [
                    { name: "Rows", sets: "4x15", desc: "" },
                    { name: "Pull-ups", sets: "3xMax", desc: "" }
                ]},
                { day: "Day 3", muscle: "Metabolic LEGS", exercises: [
                    { name: "Squats", sets: "4x20", desc: "" },
                    { name: "Lunges", sets: "4x15", desc: "" }
                ]},
                { day: "Day 4", muscle: "HIIT Session A", exercises: [
                    { name: "Burpees", sets: "6x10", desc: "" },
                    { name: "Plank", sets: "4x60s", desc: "" }
                ]},
                { day: "Day 5", muscle: "HIIT Session B", exercises: [
                    { name: "Mountain Climbers", sets: "6x45s", desc: "" },
                    { name: "Jumping Jacks", sets: "6x60s", desc: "" }
                ]},
                { day: "Day 6", muscle: "Total Body Shred", exercises: [
                    { name: "Deadlifts", sets: "3x15", desc: "" },
                    { name: "Bench Press", sets: "3x15", desc: "" }
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
    const resetBtn = document.getElementById('drawer-reset-plan');

    // Load existing plan from localStorage (Silent load for drawer only)
    const savedPlan = localStorage.getItem('indiaFitnessWorkoutPlan');
    if (savedPlan) {
        try {
            const data = JSON.parse(savedPlan);
            renderPlan(data.plan, data.goalData, data.inputs, true); // true = silent load (populates but stays hidden)
        } catch (e) {
            console.error("Error loading saved plan", e);
        }
    }

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const goal = document.getElementById('goal').value;
            const days = document.getElementById('days').value;
            const time = document.getElementById('time').value;
            const equip = document.getElementById('equipment').value;

            // AI Simulation Logic
            const aiLoading = document.getElementById('ai-loading');
            const statusText = aiLoading.querySelector('.ai-status');
            const steps = [
                "ANALYZING YOUR BIOMETRICS...",
                "CALCULATING OPTIMAL VOLUME...",
                "SELECTING BEST EXERCISES...",
                "ADAPTING FOR " + equip.toUpperCase() + " EQUIPMENT...",
                "FINALIZING YOUR AI PLAN..."
            ];

            aiLoading.style.display = 'flex';
            
            let stepIdx = 0;
            const stepInterval = setInterval(() => {
                if(stepIdx < steps.length) {
                    statusText.innerText = steps[stepIdx];
                    stepIdx++;
                } else {
                    clearInterval(stepInterval);
                }
            }, 700);

            setTimeout(() => {
                aiLoading.style.display = 'none';
                const inputs = { goal, days, time, equip };
                generatePlan(goal, days, time, equip, true); // true means save to storage
            }, 3500);
        });
    }

    function generatePlan(goal, days, time, equip, shouldSave = false) {
        // Selection Logic
        const goalData = workoutData[goal] || workoutData.muscle;
        let originalPlan = goalData.plans[days] || goalData.plans["4"] || goalData.plans["3"] || fallbackPlan;
        
        // Standardize to a 7-day week schedule (Professional Standard)
        const weeklySchedule = coach_distributeWeek(originalPlan, days);

        const inputs = { goal, days, time, equip };
        renderPlan(weeklySchedule, goalData, inputs);

        if (shouldSave) {
            localStorage.setItem('indiaFitnessWorkoutPlan', JSON.stringify({
                plan: weeklySchedule,
                goalData: goalData,
                inputs: inputs
            }));
        }
    }

    // Helper to distribute training days across a 7-day week logically
    function coach_distributeWeek(trainingDays, dayCount) {
        const week = Array(7).fill(null).map((_, i) => ({ day: `Day ${i+1}`, muscle: "Rest", exercises: [] }));
        const count = parseInt(dayCount);
        
        // Mapping for logical training day distribution
        const schema = {
            "3": [0, 2, 4],       // Mon, Wed, Fri
            "4": [0, 1, 3, 4],    // Mon, Tue, Thu, Fri
            "5": [0, 1, 2, 4, 5], // Mon, Tue, Wed, Fri, Sat
            "6": [0, 1, 2, 3, 4, 5] // Mon - Sat
        }[dayCount] || [0, 1, 2, 3, 4, 5, 6];

        trainingDays.forEach((td, idx) => {
            if (schema[idx] !== undefined) {
                const dayIdx = schema[idx];
                week[dayIdx] = { ...td, day: `Day ${dayIdx + 1}` };
            }
        });

        return week;
    }

    function renderPlan(originalPlan, goalData, inputs, silent = false) {
        // Deep clone the plan to avoid modifying source workoutData
        const planToRender = JSON.parse(JSON.stringify(originalPlan));
        
        const { goal, days, time, equip } = inputs;
        const duration = parseInt(time);

        // UI Updates for Main Results
        if (planTitle) planTitle.innerText = goalData.title;
        
        let subTitle = goalData.desc;
        if (duration <= 30) subTitle = "🚀 Metabolic Express: High intensity, minimal rest (30 min).";
        else if (duration >= 90) subTitle = "🛡️ Optimized Volume: Advanced growth and hypertrophy focus (90 min).";
        else subTitle = "⚡ Standard Performance: Balanced volume and recovery (45-60 min).";
        
        if (planDesc) planDesc.innerText = subTitle;
        
        if (daysContainer) {
            daysContainer.innerHTML = '';
        }
        
        // Always build the plan DOM so it's ready when 'VIEW FULL PLAN' is clicked
        if (daysContainer) {
            planToRender.forEach((dayInfo, index) => {
                // In the main grid, we only show training days as cards 
                // to match the user's requested 'days per week' count.
                if(dayInfo.exercises.length === 0) return;
                
                const card = document.createElement('div');
                card.className = 'day-card';
                card.setAttribute('data-aos', 'fade-up');
                card.style.animationDelay = `${index * 0.1}s`;
                
                let exercisesHTML = dayInfo.exercises.map((ex, exIndex) => {
                    // Adapt exercise based on equipment
                    let exerciseName = ex.name;
                    let exerciseDesc = ex.desc;
                    let sets = ex.sets;
                    let method = "";

                    if (equip !== 'full' && exerciseAlternatives[ex.name]) {
                        if (equip === 'bodyweight') {
                            exerciseName = exerciseAlternatives[ex.name].bodyweight;
                        } else if (equip === 'basic') {
                            exerciseName = exerciseAlternatives[ex.name].basic;
                        }
                    }

                    // Scientific Protocol logic based on Goal and Duration
                    let repRange = "8-12";
                    let restTime = "60s";
                    let intensityNote = "Controlled tempo.";

                    if (goal === 'strength') {
                        repRange = "3-6";
                        restTime = duration >= 60 ? "120-180s" : "90s";
                        intensityNote = "Maximum force on concentric.";
                    } else if (goal === 'fatloss') {
                        repRange = "15-20";
                        restTime = "30-45s";
                        intensityNote = "Keep heart rate elevated.";
                    }

                    // Master Scaling Logic (Coach Grade)
                    const isCompound = compoundExercises.includes(ex.name);
                    
                    if (duration <= 30) {
                        sets = isCompound ? "3x" : "2x";
                        method = "EXPRESS CIRCUIT";
                        if (exIndex % 2 !== 0 && exIndex > 0) method = "SUPERSET";
                    } else if (duration >= 90) {
                        sets = sets.replace(/(\d+)x/, (match, p1) => {
                            let s = parseInt(p1);
                            if (s < 5) s += 1;
                            return s + "x";
                        });
                        
                        if (isCompound) {
                            method = "TIME-UNDER-TENSION";
                            if (exIndex === 0) {
                                method = "CLUSTER SETS";
                                intensityNote = "Rest 10-15s between 3-rep clusters.";
                            }
                        } else {
                            method = "REST-PAUSE (RP)";
                            if (exIndex === dayInfo.exercises.length - 1) {
                                method = "DROPSET TO FAILURE";
                                intensityNote = "Drop weight 20% and continue for max reps.";
                            }
                        }
                    } else {
                        method = isCompound ? "POWER FOCUS" : "VOLUME FOCUS";
                    }

                    const finalSets = sets.includes('x') ? sets.split('x')[0] + 'x' + repRange : sets;

                    return `
                        <li class="exercise-item ${method ? 'has-method' : ''}">
                            <div class="ex-info">
                                <div class="ex-header">
                                    <h4>${exerciseName}</h4>
                                    ${method ? `<span class="method-badge">${method}</span>` : ''}
                                </div>
                                <p>${exerciseDesc || intensityNote}</p>
                                <div class="ex-rest"><i class="fas fa-clock"></i> Rest: ${restTime}</div>
                            </div>
                            <div class="ex-sets">${finalSets}</div>
                        </li>
                    `;
                }).join('');

                // Icons based on Muscle Group
                let icon = 'dumbbell';
                const m = dayInfo.muscle.toLowerCase();
                if(m.includes('chest')) icon = 'shield-halved';
                if(m.includes('back')) icon = 'arrows-up-down';
                if(m.includes('leg')) icon = 'person-running';
                if(m.includes('shoulder')) icon = 'up-down-left-right';
                if(m.includes('arm')) icon = 'hand-fist';
                if(m.includes('core') || m.includes('shred') || m.includes('hiit')) icon = 'fire';

                card.innerHTML = `
                    <div class="day-header">
                        <h3><i class="fas fa-${icon}"></i> ${dayInfo.day}</h3>
                        <span class="muscle-group">${dayInfo.muscle}</span>
                    </div>
                    <ul class="exercise-list">
                        ${exercisesHTML}
                    </ul>
                `;
                daysContainer.appendChild(card);
            });

            // Weekly Overview Summary (Compact)
            const scheduleBar = document.createElement('div');
            scheduleBar.className = 'weekly-schedule-bar';
            const daysMap = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
            let barHTML = `<div class="schedule-title"><i class="fas fa-calendar-week"></i> 7-DAY WEEKLY SCHEDULE</div><div class="bar-items">`;
            planToRender.forEach((day, i) => {
                const isTraining = day.exercises.length > 0;
                barHTML += `
                    <div class="bar-day ${isTraining ? 'training' : 'rest'}">
                        <span class="day-name">${daysMap[i]}</span>
                        <span class="day-status">${isTraining ? '💪' : '🛌'}</span>
                    </div>
                `;
            });
            barHTML += `</div>`;
            scheduleBar.innerHTML = barHTML;
            daysContainer.prepend(scheduleBar);

            // Add Tips Card
            const tipsCard = document.createElement('div');
            tipsCard.className = 'tips-card';
            tipsCard.innerHTML = `
                <h3><i class="fas fa-lightbulb"></i> PRO TIPS FOR ${goal.toUpperCase()}</h3>
                <ul class="tips-list">
                    <li><i class="fas fa-glass-water"></i> Drink at least 4 liters of water daily.</li>
                    <li><i class="fas fa-sleep"></i> Aim for 7-9 hours of quality sleep.</li>
                    <li><i class="fas fa-check"></i> Prioritize form over heavy weights to prevent injury.</li>
                    <li><i class="fas fa-plate-wheat"></i> Consistency in nutrition is 70% of the battle.</li>
                </ul>
            `;
            daysContainer.appendChild(tipsCard);

            // Add Diet CTA Card
            const dietCard = document.createElement('div');
            dietCard.className = 'diet-cta-card';
            dietCard.innerHTML = `
                <div class="diet-content">
                    <span class="diet-badge">LIMITED OFFER</span>
                    <h3>🥗 Personalized Diet Chart (₹0)</h3>
                    <p>You've generated your ${goalData.title}. Now get the nutrition plan that powers it. Join India Fitness today and get your custom diet chart for FREE!</p>
                    <div class="diet-actions">
                        <a href="https://wa.me/918544007735?text=Hey!%20I%20just%20generated%20my%20${goalData.title}%20on%20the%20website%20and%20I%20want%20the%20FREE%20Diet%20Chart.%20How%20can%20I%20join?" target="_blank" class="btn btn-primary magnetic">CLAIM MY FREE DIET CHART</a>
                    </div>
                </div>
            `;
            daysContainer.appendChild(dietCard);
        }

        // Update Drawer Summary
        const drawerSummaryContainer = document.getElementById('drawer-summary-container');
        const drawerGoal = document.getElementById('drawer-goal');
        const drawerDaysList = document.getElementById('drawer-days-list');
        const drawerViewFull = document.getElementById('drawer-view-full');

        if (drawerSummaryContainer) {
            drawerSummaryContainer.style.display = 'block';
            drawerGoal.innerText = goal.charAt(0).toUpperCase() + goal.slice(1);
            
            drawerDaysList.innerHTML = '';
            originalPlan.forEach(day => {
                if (day.exercises.length > 0) {
                    const li = document.createElement('li');
                    li.innerHTML = `${day.day} <span>${day.muscle}</span>`;
                    drawerDaysList.appendChild(li);
                }
            });

            drawerViewFull.onclick = () => {
                resultArea.style.display = 'block';
                window.scrollTo({ top: resultArea.offsetTop - 100, behavior: 'smooth' });
                // If on mobile, close the menu
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    document.querySelector('.menu-toggle').click();
                }
            };
        }

        if (!silent) {
            // Toggle visibility
            if (wizard) wizard.style.display = 'none';
            if (resultArea) resultArea.style.display = 'block';

            // Scroll to top of result
            const scrollTarget = resultArea.offsetTop - 100;
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }
    }

    // Move generatePlan declaration outside DOMContentLoaded or ensure it's accessible
    window.generatePlan = generatePlan;
    window.renderPlan = renderPlan;

    if(printBtn) {
        printBtn.addEventListener('click', () => window.print());
    }

    if(resetBtn) {
        resetBtn.addEventListener('click', () => {
            if(confirm('Are you sure you want to reset your current plan?')) {
                localStorage.removeItem('indiaFitnessWorkoutPlan');
                location.reload();
            }
        });
    }
});

