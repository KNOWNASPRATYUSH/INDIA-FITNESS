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
        title: "Hypertrophy Mastery",
        desc: "Designed to maximize muscle fiber recruitment and volume for growth.",
        splits: {
            "1": { // Isolation (1 Body Part)
                "3": [
                    { day: "Day 1", muscle: "Chest Focus", exercises: [{ name: "Bench Press", sets: "4x10" }, { name: "Incline Press", sets: "3x12" }, { name: "Cable Flyes", sets: "3x15" }] },
                    { day: "Day 2", muscle: "Back Focus", exercises: [{ name: "Deadlifts", sets: "3x8" }, { name: "Rows", sets: "4x10" }, { name: "Lat Pulldowns", sets: "4x12" }] },
                    { day: "Day 3", muscle: "Legs Focus", exercises: [{ name: "Squats", sets: "4x10" }, { name: "Leg Press", sets: "4x12" }, { name: "Calf Raises", sets: "4x15" }] }
                ],
                "4": [
                    { day: "Day 1", muscle: "Chest Focus", exercises: [{ name: "Bench Press", sets: "4x10" }, { name: "Incline Press", sets: "3x12" }, { name: "Pushups", sets: "3xMax" }] },
                    { day: "Day 2", muscle: "Back Focus", exercises: [{ name: "Pull-ups", sets: "3xMax" }, { name: "Deadlifts", sets: "4x8" }, { name: "Rows", sets: "4x10" }] },
                    { day: "Day 3", muscle: "Shoulders Focus", exercises: [{ name: "Overhead Press", sets: "4x10" }, { name: "Lateral Raises", sets: "4x15" }, { name: "Front Raises", sets: "3x12" }] },
                    { day: "Day 4", muscle: "Legs Focus", exercises: [{ name: "Squats", sets: "4x10" }, { name: "Leg Curls", sets: "4x12" }, { name: "Calf Raises", sets: "4x15" }] }
                ],
                "5": [
                    { day: "Day 1", muscle: "Chest Focus", exercises: [{ name: "Bench Press", sets: "4x10" }, { name: "Incline Press", sets: "3x12" }, { name: "Cable Flyes", sets: "3x15" }] },
                    { day: "Day 2", muscle: "Back Focus", exercises: [{ name: "Deadlifts", sets: "3x8" }, { name: "Rows", sets: "4x10" }, { name: "Lat Pulldowns", sets: "3x12" }] },
                    { day: "Day 3", muscle: "Shoulders Focus", exercises: [{ name: "Overhead Press", sets: "4x10" }, { name: "Lateral Raises", sets: "4x15" }] },
                    { day: "Day 4", muscle: "Legs Focus", exercises: [{ name: "Squats", sets: "4x10" }, { name: "Leg Press", sets: "3x15" }, { name: "Leg Curls", sets: "3x12" }] },
                    { day: "Day 5", muscle: "Arms Focus", exercises: [{ name: "Hammer Curls", sets: "3x12" }, { name: "Tricep Pushdowns", sets: "3x12" }] }
                ],
                "6": [
                    { day: "Day 1", muscle: "Chest Focus", exercises: [{ name: "Bench Press", sets: "4x8" }, { name: "Cable Flyes", sets: "4x12" }] },
                    { day: "Day 2", muscle: "Back Focus", exercises: [{ name: "Rows", sets: "4x8" }, { name: "Lat Pulldowns", sets: "4x12" }] },
                    { day: "Day 3", muscle: "Legs Focus", exercises: [{ name: "Squats", sets: "4x8" }, { name: "Leg Curls", sets: "4x12" }] },
                    { day: "Day 4", muscle: "Shoulders Focus", exercises: [{ name: "Overhead Press", sets: "4x10" }, { name: "Lateral Raises", sets: "4x15" }] },
                    { day: "Day 5", muscle: "Arms Focus", exercises: [{ name: "Hammer Curls", sets: "3x12" }, { name: "Tricep Pushdowns", sets: "3x12" }] },
                    { day: "Day 6", muscle: "Core/Calves", exercises: [{ name: "Calf Raises", sets: "5x15" }, { name: "Plank", sets: "4x60s" }] }
                ]
            },
            "2": { // Standard (2 Body Parts)
                "3": [
                    { day: "Day 1", muscle: "Chest & Back", exercises: [{ name: "Bench Press", sets: "3x10" }, { name: "Rows", sets: "3x10" }, { name: "Incline Press", sets: "3x12" }] },
                    { day: "Day 2", muscle: "Legs & Shoulders", exercises: [{ name: "Squats", sets: "3x10" }, { name: "Overhead Press", sets: "3x10" }, { name: "Leg Press", sets: "3x15" }] },
                    { day: "Day 3", muscle: "Arms & Core", exercises: [{ name: "Hammer Curls", sets: "3x12" }, { name: "Tricep Pushdowns", sets: "3x12" }, { name: "Plank", sets: "3x60s" }] }
                ],
                "4": [
                    { day: "Day 1", muscle: "Chest & Triceps", exercises: [{ name: "Bench Press", sets: "4x8" }, { name: "Incline Press", sets: "3x12" }, { name: "Tricep Pushdowns", sets: "3x12" }] },
                    { day: "Day 2", muscle: "Back & Biceps", exercises: [{ name: "Deadlifts", sets: "3x8" }, { name: "Rows", sets: "3x10" }, { name: "Hammer Curls", sets: "3x12" }] },
                    { day: "Day 3", muscle: "Legs & Core", exercises: [{ name: "Squats", sets: "4x10" }, { name: "Leg Press", sets: "3x15" }, { name: "Plank", sets: "3x60s" }] },
                    { day: "Day 4", muscle: "Shoulders & Abs", exercises: [{ name: "Overhead Press", sets: "4x10" }, { name: "Lateral Raises", sets: "4x15" }] }
                ],
                "5": [
                    { day: "Day 1", muscle: "Chest & Triceps", exercises: [{ name: "Bench Press", sets: "4x10" }, { name: "Incline Press", sets: "3x12" }, { name: "Tricep Pushdowns", sets: "3x12" }, { name: "Skull Crushers", sets: "3x12" }] },
                    { day: "Day 2", muscle: "Back & Biceps", exercises: [{ name: "Rows", sets: "4x10" }, { name: "Lat Pulldowns", sets: "3x12" }, { name: "Hammer Curls", sets: "3x12" }, { name: "Preacher Curls", sets: "3x12" }] },
                    { day: "Day 3", muscle: "Shoulders & Abs", exercises: [{ name: "Overhead Press", sets: "4x10" }, { name: "Lateral Raises", sets: "4x12" }, { name: "Plank", sets: "3x60s" }, { name: "Leg Raises", sets: "3x15" }] },
                    { day: "Day 4", muscle: "Legs & Calves", exercises: [{ name: "Squats", sets: "4x10" }, { name: "Leg Press", sets: "3x12" }, { name: "Calf Raises", sets: "4x15" }] },
                    { day: "Day 5", muscle: "Upper Body Power", exercises: [{ name: "Pushups", sets: "3xMax" }, { name: "Pull-ups", sets: "3xMax" }, { name: "Dips", sets: "3xMax" }] }
                ],
                "6": [
                    { day: "Day 1", muscle: "Chest & Triceps", exercises: [{ name: "Bench Press", sets: "4x8" }, { name: "Cable Flyes", sets: "3x12" }, { name: "Tricep Pushdowns", sets: "3x12" }, { name: "Overhead Tricep Extension", sets: "3x12" }] },
                    { day: "Day 2", muscle: "Back & Biceps", exercises: [{ name: "Rows", sets: "4x8" }, { name: "Lat Pulldowns", sets: "3x12" }, { name: "Hammer Curls", sets: "3x12" }, { name: "Bicep Curls", sets: "3x12" }] },
                    { day: "Day 3", muscle: "Legs & Shoulders", exercises: [{ name: "Squats", sets: "4x8" }, { name: "Leg Curls", sets: "3x12" }, { name: "Overhead Press", sets: "4x10" }, { name: "Lateral Raises", sets: "4x12" }] },
                    { day: "Day 4", muscle: "Chest & Triceps", exercises: [{ name: "Incline Press", sets: "3x12" }, { name: "Dumbbell Flyes", sets: "3x12" }, { name: "Skull Crushers", sets: "3x12" }, { name: "Dips", sets: "3xMax" }] },
                    { day: "Day 5", muscle: "Back & Biceps", exercises: [{ name: "Deadlifts", sets: "3x8" }, { name: "Pull-ups", sets: "3xMax" }, { name: "Face Pulls", sets: "3x12" }, { name: "Preacher Curls", sets: "3x12" }] },
                    { day: "Day 6", muscle: "Legs & Shoulders", exercises: [{ name: "Leg Press", sets: "3x12" }, { name: "Calf Raises", sets: "4x15" }, { name: "Rear Delt Flyes", sets: "3x12" }, { name: "Front Raises", sets: "3x12" }] }
                ]
            },
            "3": { // Full Body (3+ Parts)
                "3": [
                    { day: "Day 1", muscle: "Full Body A", exercises: [{ name: "Bench Press", sets: "3x10" }, { name: "Squats", sets: "3x10" }, { name: "Rows", sets: "3x10" }] },
                    { day: "Day 2", muscle: "Full Body B", exercises: [{ name: "Incline Press", sets: "3x12" }, { name: "Deadlifts", sets: "3x8" }, { name: "Lat Pulldowns", sets: "3x12" }] },
                    { day: "Day 3", muscle: "Full Body C", exercises: [{ name: "Overhead Press", sets: "3x12" }, { name: "Leg Press", sets: "3x15" }, { name: "Pull-ups", sets: "3xMax" }] }
                ],
                "4": [
                    { day: "Day 1", muscle: "Full Body Push Focus", exercises: [{ name: "Bench Press", sets: "4x8" }, { name: "Squats", sets: "4x8" }, { name: "Tricep Pushdowns", sets: "3x12" }] },
                    { day: "Day 2", muscle: "Full Body Pull Focus", exercises: [{ name: "Deadlifts", sets: "4x5" }, { name: "Rows", sets: "4x8" }, { name: "Hammer Curls", sets: "3x12" }] },
                    { day: "Day 3", muscle: "Full Body Shoulder Focus", exercises: [{ name: "Overhead Press", sets: "4x8" }, { name: "Lunges", sets: "3x12" }, { name: "Pull-ups", sets: "3xMax" }] },
                    { day: "Day 4", muscle: "Full Body Accessory", exercises: [{ name: "Dips", sets: "3xMax" }, { name: "Leg Curls", sets: "3x12" }, { name: "Lateral Raises", sets: "3x15" }] }
                ],
                "6": [
                    { day: "Day 1", muscle: "Total Body Heavy", exercises: [{ name: "Squats", sets: "5x5" }, { name: "Bench Press", sets: "5x5" }, { name: "Rows", sets: "5x5" }] },
                    { day: "Day 2", muscle: "Metabolic Circuit", exercises: [{ name: "Burpees", sets: "4x12" }, { name: "Pushups", sets: "4x15" }, { name: "Mountain Climbers", sets: "4x45s" }] },
                    { day: "Day 3", muscle: "Accessory Focus", exercises: [{ name: "Hammer Curls", sets: "3x12" }, { name: "Lateral Raises", sets: "3x15" }, { name: "Calf Raises", sets: "3x20" }] },
                    { day: "Day 4", muscle: "Total Body Volume", exercises: [{ name: "Leg Press", sets: "3x15" }, { name: "Incline Press", sets: "3x12" }, { name: "Lat Pulldowns", sets: "3x12" }] },
                    { day: "Day 5", muscle: "Functional Core", exercises: [{ name: "Plank", sets: "4x60s" }, { name: "Bicycle Crunches", sets: "4x20" }, { name: "Deadlifts", sets: "3x12" }] },
                    { day: "Day 6", muscle: "Stability & Mobility", exercises: [{ name: "Lunges", sets: "3x12" }, { name: "Face Pulls", sets: "3x15" }, { name: "Overhead Press", sets: "3x12" }] }
                ]
            }
        }
    },
    strength: {
        title: "Power & Strength",
        desc: "Focused on compound movements and nervous system adaptation for maximum output.",
        splits: {
            "1": { 
                "3": [
                    { day: "Day 1", muscle: "Bench Focus", exercises: [{ name: "Bench Press", sets: "5x5" }, { name: "Pushups", sets: "3xMax" }] },
                    { day: "Day 2", muscle: "Squat Focus", exercises: [{ name: "Squats", sets: "5x5" }, { name: "Leg Press", sets: "3x10" }] },
                    { day: "Day 3", muscle: "Deadlift Focus", exercises: [{ name: "Deadlifts", sets: "5x3" }, { name: "Rows", sets: "3x8" }] }
                ],
                "5": [
                    { day: "Day 1", muscle: "Heavy Squat", exercises: [{ name: "Squats", sets: "5x5" }] },
                    { day: "Day 2", muscle: "Heavy Bench", exercises: [{ name: "Bench Press", sets: "5x5" }] },
                    { day: "Day 3", muscle: "Heavy Deadlift", exercises: [{ name: "Deadlifts", sets: "5x3" }] },
                    { day: "Day 4", muscle: "Heavy Overhead", exercises: [{ name: "Overhead Press", sets: "5x5" }] },
                    { day: "Day 5", muscle: "Accessory Focus", exercises: [{ name: "Rows", sets: "3x8" }, { name: "Plank", sets: "3x60s" }] }
                ]
            },
            "2": {
                "3": [
                    { day: "Day 1", muscle: "Squat & Push", exercises: [{ name: "Squats", sets: "5x5" }, { name: "Bench Press", sets: "3x8" }] },
                    { day: "Day 2", muscle: "Bench & Pull", exercises: [{ name: "Bench Press", sets: "5x5" }, { name: "Rows", sets: "3x8" }] },
                    { day: "Day 3", muscle: "Deadlift & Press", exercises: [{ name: "Deadlifts", sets: "5x3" }, { name: "Overhead Press", sets: "3x8" }] }
                ],
                "4": [
                    { day: "Day 1", muscle: "Max Effort Upper", exercises: [{ name: "Bench Press", sets: "5x5" }, { name: "Rows", sets: "3x8" }] },
                    { day: "Day 2", muscle: "Max Effort Lower", exercises: [{ name: "Squats", sets: "5x5" }, { name: "Deadlifts", sets: "5x3" }] },
                    { day: "Day 3", muscle: "Dynamic Upper", exercises: [{ name: "Overhead Press", sets: "5x5" }, { name: "Pull-ups", sets: "3x8" }] },
                    { day: "Day 4", muscle: "Dynamic Lower", exercises: [{ name: "Deadlifts", sets: "5x5" }, { name: "Leg Press", sets: "3x10" }] }
                ],
                "6": [
                    { day: "Day 1", muscle: "Power Push", exercises: [{ name: "Bench Press", sets: "5x5" }, { name: "Overhead Press", sets: "3x8" }] },
                    { day: "Day 2", muscle: "Power Pull", exercises: [{ name: "Deadlifts", sets: "5x3" }, { name: "Rows", sets: "3x8" }] },
                    { day: "Day 3", muscle: "Power Legs", exercises: [{ name: "Squats", sets: "5x5" }, { name: "Leg Curls", sets: "3x10" }] },
                    { day: "Day 4", muscle: "Accessory Push", exercises: [{ name: "Dips", sets: "3xMax" }, { name: "Lateral Raises", sets: "3x12" }] },
                    { day: "Day 5", muscle: "Accessory Pull", exercises: [{ name: "Pull-ups", sets: "3xMax" }, { name: "Hammer Curls", sets: "3x12" }] },
                    { day: "Day 6", muscle: "Accessory Legs", exercises: [{ name: "Leg Press", sets: "3x15" }, { name: "Plank", sets: "3x60s" }] }
                ]
            },
            "3": {
                "3": [
                    { day: "Day 1", muscle: "Full Body Strength A", exercises: [{ name: "Squats", sets: "5x5" }, { name: "Bench Press", sets: "5x5" }, { name: "Rows", sets: "3x8" }] },
                    { day: "Day 2", muscle: "Full Body Strength B", exercises: [{ name: "Deadlifts", sets: "5x3" }, { name: "Overhead Press", sets: "5x5" }, { name: "Pull-ups", sets: "3x8" }] },
                    { day: "Day 3", muscle: "Full Body Strength C", exercises: [{ name: "Squats", sets: "3x8" }, { name: "Incline Press", sets: "3x8" }, { name: "Leg Press", sets: "3x10" }] }
                ]
            }
        }
    },
    fatloss: {
        title: "Metabolic Shred",
        desc: "High-intensity circuits to keep your heart rate up and calories burning.",
        splits: {
            "1": {
                "3": [
                    { day: "Day 1", muscle: "Upper Body Isolation", exercises: [{ name: "Pushups", sets: "4x15" }, { name: "Rows", sets: "4x12" }] },
                    { day: "Day 2", muscle: "Lower Body Isolation", exercises: [{ name: "Squats", sets: "4x20" }, { name: "Lunges", sets: "4x12" }] },
                    { day: "Day 3", muscle: "Core Focus", exercises: [{ name: "Plank", sets: "4x60s" }, { name: "Mountain Climbers", sets: "4x45s" }] }
                ]
            },
            "2": {
                "3": [
                    { day: "Day 1", muscle: "Push & Quads", exercises: [{ name: "Pushups", sets: "3x15" }, { name: "Squats", sets: "3x15" }, { name: "Mountain Climbers", sets: "3x45s" }] },
                    { day: "Day 2", muscle: "Pull & Hams", exercises: [{ name: "Rows", sets: "3x12" }, { name: "Lunges", sets: "3x15" }, { name: "Plank", sets: "3x60s" }] },
                    { day: "Day 3", muscle: "Shoulders & Core", exercises: [{ name: "Overhead Press", sets: "3x12" }, { name: "Bicycle Crunches", sets: "3x20" }, { name: "Burpees", sets: "3x12" }] }
                ],
                "4": [
                    { day: "Day 1", muscle: "Upper Circuit", exercises: [{ name: "Pushups", sets: "4x15" }, { name: "Rows", sets: "4x12" }] },
                    { day: "Day 2", muscle: "Lower Circuit", exercises: [{ name: "Squats", sets: "4x20" }, { name: "Lunges", sets: "4x12" }] },
                    { day: "Day 3", muscle: "Post-Chain & Core", exercises: [{ name: "Deadlifts", sets: "3x12" }, { name: "Plank", sets: "3x60s" }] },
                    { day: "Day 4", muscle: "Total Burn", exercises: [{ name: "Burpees", sets: "4x10" }, { name: "Mountain Climbers", sets: "4x45s" }] }
                ]
            },
            "3": {
                "3": [
                    { day: "Day 1", muscle: "Full Body Circuit A", exercises: [{ name: "Squats", sets: "3x15" }, { name: "Pushups", sets: "3x15" }, { name: "Burpees", sets: "3x12" }] },
                    { day: "Day 2", muscle: "Full Body Circuit B", exercises: [{ name: "Lunges", sets: "3x15" }, { name: "Rows", sets: "3x12" }, { name: "Mountain Climbers", sets: "3x45s" }] },
                    { day: "Day 3", muscle: "Full Body Circuit C", exercises: [{ name: "Deadlifts", sets: "3x12" }, { name: "Overhead Press", sets: "3x12" }, { name: "Plank", sets: "3x60s" }] }
                ],
                "6": [
                    { day: "Day 1", muscle: "Full Body HIIT 1", exercises: [{ name: "Burpees", sets: "5x12" }, { name: "Pushups", sets: "5x15" }] },
                    { day: "Day 2", muscle: "Functional Strength", exercises: [{ name: "Deadlifts", sets: "3x12" }, { name: "Rows", sets: "3x12" }] },
                    { day: "Day 3", muscle: "Stability & Core", exercises: [{ name: "Plank", sets: "4x60s" }, { name: "Mountain Climbers", sets: "4x45s" }] },
                    { day: "Day 4", muscle: "Full Body HIIT 2", exercises: [{ name: "Jumping Jacks", sets: "5x60s" }, { name: "Squats", sets: "5x20" }] },
                    { day: "Day 5", muscle: "Athletic Mobility", exercises: [{ name: "Lunges", sets: "3x12" }, { name: "Lateral Raises", sets: "3x15" }] },
                    { day: "Day 6", muscle: "Max Output Burn", exercises: [{ name: "Pushups", sets: "3xMax" }, { name: "Burpees", sets: "3xMax" }] }
                ]
            }
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

// Professional Volume Expansion Pool (Coach Grade)
const extraExercisesPool = {
    "chest": [
        { name: "Dumbbell Flyes", sets: "3x12", desc: "Focus on the deep stretch." },
        { name: "Pushups", sets: "3xMax", desc: "Finish with high volume." },
        { name: "Pec Deck", sets: "3x15", desc: "Constant tension." }
    ],
    "back": [
        { name: "Face Pulls", sets: "3x15", desc: "Rear delt and trap focus." },
        { name: "Dumbbell Shrugs", sets: "3x12", desc: "Upper trap focus." },
        { name: "Straight Arm Pulldowns", sets: "3x12", desc: "Lat isolation." }
    ],
    "legs": [
        { name: "Leg Curls", sets: "3x12", desc: "Hamstring isolation." },
        { name: "Leg Extension", sets: "3x15", desc: "Quad isolation." },
        { name: "Calf Raises", sets: "4x15", desc: "Don't skip calves." }
    ],
    "shoulders": [
        { name: "Lateral Raises", sets: "3x15", desc: "Side delt focus." },
        { name: "Front Raises", sets: "3x12", desc: "Front delt focus." },
        { name: "Reverse Flyes", sets: "3x15", desc: "Rear delt focus." }
    ],
    "biceps": [
        { name: "Concentration Curls", sets: "3x12", desc: "Peak contraction focus." },
        { name: "Hammer Curls", sets: "3x12", desc: "Brachialis focus." }
    ],
    "triceps": [
        { name: "Overhead Tricep Extension", sets: "3x12", desc: "Long head focus." },
        { name: "Dips", sets: "3xMax", desc: "Power finisher." }
    ],
    "abs": [
        { name: "Leg Raises", sets: "3x15", desc: "Lower ab focus." },
        { name: "Bicycle Crunches", sets: "3x20", desc: "Oblique focus." }
    ]
};


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
            const splitPref = document.getElementById('splitPreference').value;
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
                const inputs = { goal, days, time, equip, splitPref };
                generatePlan(goal, days, time, equip, splitPref, true); // true means save to storage
            }, 3500);
        });
    }

    function generatePlan(goal, days, time, equip, splitPref = "2", shouldSave = false) {
        // Selection Logic
        const goalData = workoutData[goal] || workoutData.muscle;
        
        // Intelligent Split Selection (Restructured)
        let originalPlan;
        const requestedDays = days;
        const duration = parseInt(time);
        
        const focusCategory = goalData.splits[splitPref] || goalData.splits["2"];
        originalPlan = focusCategory[days] || focusCategory[Object.keys(focusCategory)[0]] || fallbackPlan;

        // Dynamic Volume Scaling (Coach Logic)
        const expandedPlan = coach_expandVolume(originalPlan, duration);

        // Standardize to a 7-day week schedule (Professional Standard)
        const weeklySchedule = coach_distributeWeek(expandedPlan, days);


        const inputs = { goal, days, time, equip, splitPref };
        renderPlan(weeklySchedule, goalData, inputs);

        if (shouldSave) {
            localStorage.setItem('indiaFitnessWorkoutPlan', JSON.stringify({
                plan: weeklySchedule,
                goalData: goalData,
                inputs: inputs
            }));
        }
    }

    // Helper to intelligently inject volume based on duration
    function coach_expandVolume(plan, duration) {
        // Clone to avoid mutation
        const newPlan = JSON.parse(JSON.stringify(plan));
        
        // Determine target exercise count per session based on duration
        // 30m: 3-4 (Current matches base)
        // 45-60m: 5-6 (+1 or 2)
        // 90m: 7-8 (+3 or 4)
        let extrasCount = 0;
        if (duration >= 90) extrasCount = 3;
        else if (duration >= 60) extrasCount = 2;
        else if (duration >= 45) extrasCount = 1;

        if (extrasCount === 0) return newPlan;

        newPlan.forEach(day => {
            const muscleNames = day.muscle.toLowerCase();
            const muscleKeys = Object.keys(extraExercisesPool).filter(k => muscleNames.includes(k));
            
            // If no clear muscle key matches, use random selection from general pool
            if (muscleKeys.length === 0) muscleKeys.push(Object.keys(extraExercisesPool)[Math.floor(Math.random() * 7)]);

            for (let i = 0; i < extrasCount; i++) {
                const key = muscleKeys[i % muscleKeys.length];
                const pool = extraExercisesPool[key];
                // Select an exercise not already in the day's list
                const existingNames = day.exercises.map(e => e.name);
                const candidates = pool.filter(e => !existingNames.includes(e.name));
                
                if (candidates.length > 0) {
                    day.exercises.push(candidates[Math.floor(Math.random() * candidates.length)]);
                }
            }
        });

        return newPlan;
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
        
        const { goal, days, time, equip, splitPref } = inputs;
        const duration = parseInt(time);

        // UI Updates for Main Results
        if (planTitle) planTitle.innerText = goalData.title;
        
        let subTitle = goalData.desc;
        if (duration <= 30) subTitle = "🚀 Metabolic Express: High intensity, minimal rest (30 min).";
        else if (duration >= 90) subTitle = "🛡️ Optimized Volume: Advanced growth and hypertrophy focus (90 min).";
        else subTitle = "⚡ Standard Performance: Balanced volume and recovery (45-60 min).";
        
        // Add split style info to subtitle
        const splitText = {
            "1": "Single Muscle Focus (1 part)",
            "2": "Standard Split (2 parts)",
            "3": "Full Body Intensity (3+ parts)"
        }[splitPref] || "Custom Split";
        subTitle += ` | Mode: ${splitText}`;

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

            // Add Trainer's Note Card based on split/frequency efficiency
            let trainersNote = "";
            const dayNum = parseInt(days);
            if (splitPref === "1" && dayNum < 5) {
                trainersNote = "⚠️ <strong>TRAINER'S NOTE:</strong> You chose to train 1 body part per session but only " + days + " days per week. This split may leave some muscle groups untrained. Consider increasing to 5+ days for this specific focus.";
            } else if (splitPref === "3" && dayNum > 4) {
                trainersNote = "⚠️ <strong>TRAINER'S NOTE:</strong> Full Body training " + days + " days a week is very high frequency. Ensure your nutrition and sleep are elite to recover from this volume!";
            } else {
                trainersNote = "✅ <strong>TRAINER'S NOTE:</strong> Your " + days + "-day frequency is well-paired with a " + splitText + " focus for optimal recovery.";
            }

            const tipsCard = document.createElement('div');
            tipsCard.className = 'tips-card';
            tipsCard.innerHTML = `
                <div class="trainers-note">${trainersNote}</div>
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

