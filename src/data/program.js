// ─── 12-WEEK WORKOUT PROGRAM ──────────────────────────────────────────────────

const EXERCISE_LIBRARY = {
    "Glute Bridge": { benefits: "Strengthens glutes & hamstrings, relieves lower back pain, improves posture." },
    "Hip Thrust": { benefits: "Maximizes glute hypertrophy (muscle growth) and builds explosive power." },
    "Bulgarian Split Squat": { benefits: "Fixes muscle imbalances, builds strong quads, and deeply stretches glutes." },
    "Bodyweight Squat": { benefits: "Fundamental lower body strength, improves mobility and ankle flexibility." },
    "Sumo Squat": { benefits: "Targets inner thighs (adductors) and lifts the glutes from a wider angle." },
    "Jump Squat": { benefits: "Builds explosive power, burns fat rapidly, and increases cardiovascular endurance." },
    "Wall Sit": { benefits: "Builds intense quad endurance and strengthens knees without joint impact." },
    "Lunge": { benefits: "Improves balance, tones the entire leg, and strengthens the core." },
    "Reverse Lunge": { benefits: "Easier on the knees than forward lunges while heavily targeting the glute max." },
    "Side Lunge": { benefits: "Tones inner/outer thighs and improves lateral agility." },
    "Romanian Deadlift": { benefits: "Sculpts the posterior chain (hamstrings, glutes, lower back) for a lifted look." },
    "Push-Up": { benefits: "Total upper body builder — chest, shoulders, triceps, and core." },
    "Modified Push-Up": { benefits: "Builds foundational chest and arm strength safely from the knees." },
    "Chest Press": { benefits: "Isolates the chest muscles for natural lift and support." },
    "Tricep Dip": { benefits: "Tones the back of the arms, eliminating 'bat wings'." },
    "Plank": { benefits: "Total core stabilization, protects the spine, flattens the stomach." },
    "Side Plank": { benefits: "Sculpts the obliques (side abs) and cinches the waist." },
    "Donkey Kick": { benefits: "Isolates the gluteus maximus for targeted lifting and firming." },
    "Fire Hydrant": { benefits: "Targets the gluteus medius (side glute) to create a rounder shape." },
    "Glute Kickback": { benefits: "Constant tension on the upper glutes for exceptional toning." },
    "Mountain Climber": { benefits: "High-intensity cardio that simultaneously torches the core." },
    "Bicycle Crunch": { benefits: "Activates both upper/lower abs and obliques for a defined waistline." },
    "Bird Dog": { benefits: "Improves spinal stability, core control, and relieves back pain." },
    "Cat-Cow Stretch": { benefits: "Massages the spine, relieves tension, and aids digestion." },
    "Child's Pose": { benefits: "Deeply decompresses the lower back and calms the nervous system." },
    "Downward Dog": { benefits: "Full body stretch that relieves tight hamstrings and shoulder tension." },
    "Sit-Up": { benefits: "Builds core strength and definition in the rectus abdominis." },
    "Superman": { benefits: "Strengthens the lower back, improving posture and reducing back pain." },
    "Butterfly Stretch": { benefits: "Opens tight hips and deeply stretches inner thighs." },
    "Neck Roll": { benefits: "Relieves tension headaches and stiff neck muscles from sitting." },
    "Shoulder Stretch": { benefits: "Releases trapped upper body tension and improves mobility." },
    "Knee Hug": { benefits: "Gently stretches the lower back and glutes for recovery." },
    "Seated Twist": { benefits: "Aids digestion and improves spinal rotation and flexibility." },
    "Cobra Pose": { benefits: "Opens the chest, improving oxygen intake and posture." },
    "Warrior I": { benefits: "Builds stamina, stretches hips, and strengthens legs gently." },
    "Warrior II": { benefits: "Tones thighs, shapes arms, and builds steady endurance." },
    "Bridge Pose": { benefits: "A restorative posture that opens the chest while lightly toning glutes." },
    "Legs Up Wall": { benefits: "Reverses blood flow, reducing leg swelling, fatigue, and headaches." },
    "Pigeon Pose": { benefits: "The ultimate hip opener — releases deep-seated tension and stress." },
    "Calf Raise": { benefits: "Tones lower legs, improves ankle stability, and pumps blood back to the heart." },
    "Inner Thigh Squeeze": { benefits: "Visibly tones the hard-to-reach adductor muscles." },
    "Dead Bug": { benefits: "Intense core activation without putting any strain on the lower back." },
    "Hip Circle": { benefits: "Lubricates the hip joints and warms up fluid mobility." },
    "Arm & Wrist Circles": { benefits: "Increases blood flow to the upper extremities, preventing joint stiffness and injury." }
};

function getDays(week) {
    const isEarly = week <= 2;
    const isMid = week >= 3 && week <= 6;

    const yogaDay = {
        label: "Sunday",
        type: "yoga",
        focus: "Recovery & Healing Yoga",
        color: "#d4c5a9",
        exercises: [
            { name: "Neck Roll", sets: "1", reps: "5 each side", time: 60, rest: 30, tip: "Keep movements slow and smooth.", targets: "Neck, Shoulders" },
            { name: "Cat-Cow Stretch", sets: "1", reps: "10 slow", time: 90, rest: 20, tip: "Inhale looking up, exhale rounding back.", targets: "Spine, Core" },
            { name: "Child's Pose", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Breathe deeply into your lower back.", targets: "Back, Hips" },
            { name: "Downward Dog", sets: "2", reps: "Hold 30s", time: 30, rest: 20, tip: "Push hips up and back. Bend knees if needed.", targets: "Full Body" },
            { name: "Cobra Pose", sets: "2", reps: "Hold 20s", time: 20, rest: 20, tip: "Keep shoulders down away from ears.", targets: "Chest, Back" },
            { name: "Warrior I", sets: "1", reps: "30s each", time: 30, rest: 20, tip: "Keep front knee stacked over ankle.", targets: "Legs, Core" },
            { name: "Warrior II", sets: "1", reps: "30s each", time: 30, rest: 20, tip: "Gaze over your front fingertips.", targets: "Thighs, Arms" },
            { name: "Seated Twist", sets: "1", reps: "5 each side", time: 60, rest: 20, tip: "Sit tall before twisting.", targets: "Spine, Digestion" },
            { name: "Bridge Pose", sets: "2", reps: "Hold 20s", time: 20, rest: 20, tip: "Press firmly through your heels.", targets: "Glutes, Back" },
            { name: "Legs Up Wall", sets: "1", reps: "Hold 3 mins", time: 180, rest: 0, tip: "Close your eyes and fully relax.", targets: "Full Body Recovery" },
            { name: "Pigeon Pose", sets: "1", reps: "60s each", time: 60, rest: 20, tip: "Breathe into the tight hip.", targets: "Hips, Glutes" },
        ]
    };

    let days = [];

    if (isEarly) {
        days = [
            {
                label: "Monday", type: "lower", focus: "Glutes & Legs — Foundation", color: "#b8a89a", exercises: [
                    { name: "Glute Bridge", sets: "3", reps: "12", time: 30, rest: 45, tip: "Squeeze glutes hard at the top.", targets: "Glutes, Hamstrings" },
                    { name: "Bodyweight Squat", sets: "3", reps: "10", time: 30, rest: 45, tip: "Sit back like into a chair. Knees behind toes.", targets: "Quads, Glutes" },
                    { name: "Donkey Kick", sets: "3", reps: "10 each", time: 30, rest: 40, tip: "Keep your core tight. Don't arch your back.", targets: "Glutes" },
                    { name: "Side Lunge", sets: "2", reps: "8 each", time: 25, rest: 40, tip: "Push hips back on the bending leg.", targets: "Inner Thighs, Quads" },
                    { name: "Calf Raise", sets: "3", reps: "15", time: 20, rest: 30, tip: "Rise up onto toes and hold for 1s.", targets: "Calves" },
                    { name: "Cat-Cow Stretch", sets: "1", reps: "10 slow", time: 60, rest: 20, tip: "Cool down carefully.", targets: "Spine" },
                ]
            },
            {
                label: "Tuesday", type: "upper", focus: "Chest & Arms — Foundation", color: "#a89898", exercises: [
                    { name: "Modified Push-Up", sets: "3", reps: "8", time: 30, rest: 45, tip: "On knees is fine. Keep body in a straight line.", targets: "Chest, Triceps" },
                    { name: "Shoulder Stretch", sets: "1", reps: "5 each", time: 30, rest: 20, tip: "Pull arm gently across chest.", targets: "Shoulders" },
                    { name: "Tricep Dip", sets: "3", reps: "8", time: 25, rest: 40, tip: "Use a chair. Keep back close to the edge.", targets: "Triceps" },
                    { name: "Cobra Pose", sets: "2", reps: "Hold 20s", time: 20, rest: 20, tip: "Look slightly upward.", targets: "Chest, Back" },
                    { name: "Dead Bug", sets: "2", reps: "8 each", time: 30, rest: 40, tip: "Press lower back flat into the floor.", targets: "Core" },
                ]
            },
            {
                label: "Wednesday", type: "active-rest", focus: "Light Walk + Stretch", color: "#a8b89a", exercises: [
                    { name: "Neck Roll", sets: "1", reps: "5 each side", time: 60, rest: 20, tip: "Move slowly and breathe.", targets: "Neck" },
                    { name: "Cat-Cow Stretch", sets: "1", reps: "10", time: 60, rest: 20, tip: "Warm up the spine.", targets: "Spine" },
                    { name: "Butterfly Stretch", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Gently press knees downward.", targets: "Hips, Thighs" },
                    { name: "Knee Hug", sets: "1", reps: "Hold 30s each", time: 30, rest: 20, tip: "Pull knee securely to chest.", targets: "Back, Hips" },
                ]
            },
            {
                label: "Thursday", type: "glute", focus: "Glute Focus Day", color: "#b8a89a", exercises: [
                    { name: "Hip Thrust", sets: "3", reps: "12", time: 30, rest: 45, tip: "Feet on floor, upper back on sofa.", targets: "Glutes, Hamstrings" },
                    { name: "Fire Hydrant", sets: "3", reps: "10 each", time: 25, rest: 40, tip: "Lift leg out to the side like a dog.", targets: "Glutes, Hips" },
                    { name: "Glute Kickback", sets: "3", reps: "12 each", time: 30, rest: 40, tip: "Kick straight back and squeeze.", targets: "Glutes" },
                    { name: "Sumo Squat", sets: "3", reps: "12", time: 30, rest: 45, tip: "Take a wide stance, toes pointed out.", targets: "Glutes, Inner Thighs" },
                    { name: "Plank", sets: "2", reps: "Hold 20s", time: 20, rest: 30, tip: "Keep hips level. Squeeze core.", targets: "Core" },
                ]
            },
            {
                label: "Friday", type: "full-body", focus: "Gentle Full Body", color: "#9898a8", exercises: [
                    { name: "Bodyweight Squat", sets: "3", reps: "10", time: 30, rest: 45, tip: "Keep chest up.", targets: "Quads, Glutes" },
                    { name: "Modified Push-Up", sets: "3", reps: "8", time: 25, rest: 45, tip: "Controlled lowering.", targets: "Chest, Triceps" },
                    { name: "Glute Bridge", sets: "3", reps: "12", time: 30, rest: 40, tip: "Push through heels.", targets: "Glutes" },
                    { name: "Bird Dog", sets: "3", reps: "8 each", time: 25, rest: 40, tip: "Reach opposite arm and leg out.", targets: "Core, Back" },
                    { name: "Seated Twist", sets: "1", reps: "8 each", time: 40, rest: 20, tip: "Exhale as you twist.", targets: "Core, Digestion" },
                ]
            },
            {
                label: "Saturday", type: "rest", focus: "Full Rest", color: "#a8a898", exercises: [
                    { name: "Knee Hug", sets: "1", reps: "Hold 30s each", time: 30, rest: 20, tip: "Light squeeze, don't force it.", targets: "Back, Hips" },
                    { name: "Butterfly Stretch", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Maintain a tall spine.", targets: "Hips" },
                ]
            },
            yogaDay,
        ];
    } else if (isMid) {
        days = [
            {
                label: "Monday", type: "glute-power", focus: "Glutes & Strength Power", color: "#b8a89a", exercises: [
                    { name: "Hip Thrust", sets: "4", reps: "15", time: 35, rest: 45, tip: "Hold a heavy book or water bottle on hips.", targets: "Glutes, Hamstrings" },
                    { name: "Bulgarian Split Squat", sets: "3", reps: "10 each", time: 35, rest: 50, tip: "Rest back foot proudly on sofa.", targets: "Glutes, Quads" },
                    { name: "Sumo Squat", sets: "4", reps: "15", time: 30, rest: 45, tip: "Go lower than last week.", targets: "Glutes, Inner Thighs" },
                    { name: "Donkey Kick", sets: "3", reps: "15 each", time: 30, rest: 40, tip: "Deliberate squeeze at the peak.", targets: "Glutes" },
                    { name: "Romanian Deadlift", sets: "3", reps: "12", time: 30, rest: 45, tip: "Hinge at hips, keep back flat.", targets: "Glutes, Hamstrings" },
                    { name: "Calf Raise", sets: "3", reps: "20", time: 20, rest: 30, tip: "Try lifting one leg at a time.", targets: "Calves" },
                ]
            },
            {
                label: "Tuesday", type: "chest-arms", focus: "Chest, Arms & Posture", color: "#a89898", exercises: [
                    { name: "Push-Up", sets: "4", reps: "10", time: 30, rest: 45, tip: "Try doing full push-ups on your toes.", targets: "Chest, Triceps" },
                    { name: "Chest Press", sets: "3", reps: "12", time: 30, rest: 45, tip: "Use water bottles in each hand.", targets: "Chest, Shoulders" },
                    { name: "Tricep Dip", sets: "3", reps: "12", time: 25, rest: 40, tip: "Extend legs straight for more difficulty.", targets: "Triceps" },
                    { name: "Shoulder Stretch", sets: "2", reps: "5 each", time: 30, rest: 20, tip: "Breathe through tightness.", targets: "Shoulders" },
                    { name: "Plank", sets: "3", reps: "Hold 30s", time: 30, rest: 35, tip: "Body in a straight line.", targets: "Core" },
                    { name: "Dead Bug", sets: "3", reps: "10 each", time: 30, rest: 35, tip: "Move slow and steady.", targets: "Core" },
                ]
            },
            {
                label: "Wednesday", type: "legs-thighs", focus: "Legs & Inner Thighs", color: "#a8b89a", exercises: [
                    { name: "Lunge", sets: "4", reps: "12 each", time: 30, rest: 45, tip: "Keep chest proud, step far out.", targets: "Quads, Glutes" },
                    { name: "Side Lunge", sets: "3", reps: "12 each", time: 30, rest: 40, tip: "Keep straight leg flat on the floor.", targets: "Inner Thighs" },
                    { name: "Wall Sit", sets: "3", reps: "Hold 30s", time: 30, rest: 45, tip: "Thighs parallel to the floor.", targets: "Quads" },
                    { name: "Inner Thigh Squeeze", sets: "3", reps: "20", time: 20, rest: 30, tip: "Squeeze a sturdy pillow rapidly.", targets: "Inner Thighs" },
                    { name: "Calf Raise", sets: "3", reps: "20", time: 20, rest: 30, tip: "Explode up, control down.", targets: "Calves" },
                ]
            },
            {
                label: "Thursday", type: "full-strength", focus: "Full Body Strength", color: "#9898a8", exercises: [
                    { name: "Bodyweight Squat", sets: "4", reps: "15", time: 30, rest: 40, tip: "Quick pace for cardio.", targets: "Quads, Glutes" },
                    { name: "Push-Up", sets: "4", reps: "10", time: 30, rest: 45, tip: "Drop to knees only when necessary.", targets: "Chest" },
                    { name: "Glute Bridge", sets: "4", reps: "20", time: 30, rest: 40, tip: "Squeeze for 2s at the top.", targets: "Glutes" },
                    { name: "Bird Dog", sets: "3", reps: "12 each", time: 30, rest: 35, tip: "Hold peak lift for 1s.", targets: "Core, Back" },
                    { name: "Bicycle Crunch", sets: "3", reps: "20", time: 30, rest: 35, tip: "Twist elbow to opposite knee.", targets: "Core, Obliques" },
                    { name: "Mountain Climber", sets: "3", reps: "20", time: 30, rest: 40, tip: "Drive knees aggressively.", targets: "Core, Full Body" },
                ]
            },
            {
                label: "Friday", type: "glute-sculpt", focus: "Glute Sculpt & Thighs", color: "#b8a89a", exercises: [
                    { name: "Hip Thrust", sets: "4", reps: "15", time: 35, rest: 45, tip: "Full range of motion.", targets: "Glutes" },
                    { name: "Reverse Lunge", sets: "3", reps: "12 each", time: 30, rest: 45, tip: "Step firmly backwards.", targets: "Glutes, Quads" },
                    { name: "Fire Hydrant", sets: "3", reps: "15 each", time: 30, rest: 35, tip: "Don't lean away from the lifting leg.", targets: "Glutes, Hips" },
                    { name: "Sumo Squat", sets: "3", reps: "15", time: 30, rest: 40, tip: "Keep knees pushing outwards.", targets: "Inner Thighs, Glutes" },
                    { name: "Glute Kickback", sets: "3", reps: "15 each", time: 30, rest: 35, tip: "Keep head neutral looking down.", targets: "Glutes" },
                ]
            },
            {
                label: "Saturday", type: "active-rest", focus: "Stretch & Walk", color: "#a8a898", exercises: [
                    { name: "Cat-Cow Stretch", sets: "1", reps: "10", time: 60, rest: 20, tip: "Deep breaths on every move.", targets: "Spine, Digestion" },
                    { name: "Butterfly Stretch", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Relax heavy hips.", targets: "Hips, Inner Thighs" },
                    { name: "Child's Pose", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Let gravity pull hips to heels.", targets: "Back, Hips" },
                ]
            },
            yogaDay,
        ];
    } else {
        // Advanced weeks 7–12
        days = [
            {
                label: "Monday", type: "glute-power", focus: "Advanced Glute Power", color: "#b8a89a", exercises: [
                    { name: "Hip Thrust", sets: "5", reps: "20", time: 40, rest: 45, tip: "Go heavy and squeeze fiercely.", targets: "Glutes" },
                    { name: "Bulgarian Split Squat", sets: "4", reps: "12 each", time: 40, rest: 50, tip: "Hold a weight if you have one.", targets: "Glutes, Quads" },
                    { name: "Jump Squat", sets: "3", reps: "15", time: 30, rest: 45, tip: "Land softly absorbing the shock.", targets: "Glutes, Quads, Cardio" },
                    { name: "Romanian Deadlift", sets: "4", reps: "15", time: 35, rest: 45, tip: "Keep back perfectly flat.", targets: "Glutes, Hamstrings" },
                    { name: "Donkey Kick", sets: "4", reps: "20 each", time: 30, rest: 35, tip: "Pulse slightly at the top.", targets: "Glutes" },
                    { name: "Side Plank", sets: "3", reps: "Hold 30s", time: 30, rest: 35, tip: "Don't let hips sag.", targets: "Core, Hips" },
                ]
            },
            {
                label: "Tuesday", type: "chest-arms", focus: "Chest & Arms Advanced", color: "#a89898", exercises: [
                    { name: "Push-Up", sets: "5", reps: "15", time: 30, rest: 40, tip: "Full range, chest inches from floor.", targets: "Chest, Triceps" },
                    { name: "Chest Press", sets: "4", reps: "15", time: 30, rest: 40, tip: "Squeeze chest at peak of press.", targets: "Chest" },
                    { name: "Tricep Dip", sets: "4", reps: "15", time: 25, rest: 40, tip: "Keep elbows tucked backwards.", targets: "Triceps" },
                    { name: "Plank", sets: "4", reps: "Hold 45s", time: 45, rest: 30, tip: "Strong mind, strong core.", targets: "Core" },
                    { name: "Mountain Climber", sets: "3", reps: "30", time: 30, rest: 40, tip: "Sprint pace.", targets: "Core, Cardio" },
                ]
            },
            {
                label: "Wednesday", type: "legs", focus: "Thighs & Legs Advanced", color: "#a8b89a", exercises: [
                    { name: "Bulgarian Split Squat", sets: "4", reps: "15 each", time: 40, rest: 50, tip: "Push through front heel to return.", targets: "Quads, Glutes" },
                    { name: "Jump Squat", sets: "4", reps: "15", time: 30, rest: 45, tip: "Explode up high.", targets: "Legs, Cardio" },
                    { name: "Wall Sit", sets: "4", reps: "Hold 45s", time: 45, rest: 40, tip: "Breathe through the burn.", targets: "Quads" },
                    { name: "Side Lunge", sets: "4", reps: "15 each", time: 30, rest: 40, tip: "Deep sink into the hip.", targets: "Inner Thighs" },
                    { name: "Calf Raise", sets: "4", reps: "25", time: 20, rest: 25, tip: "Pause at absolute peak.", targets: "Calves" },
                ]
            },
            {
                label: "Thursday", type: "full-body", focus: "Peak Full Body", color: "#9898a8", exercises: [
                    { name: "Jump Squat", sets: "4", reps: "15", time: 30, rest: 45, tip: "Non-stop pace.", targets: "Full Body" },
                    { name: "Push-Up", sets: "4", reps: "15", time: 30, rest: 40, tip: "Perfect form only.", targets: "Chest, Arms" },
                    { name: "Romanian Deadlift", sets: "4", reps: "15", time: 35, rest: 45, tip: "Push hips way back.", targets: "Posterior Chain" },
                    { name: "Bicycle Crunch", sets: "4", reps: "30", time: 30, rest: 35, tip: "Shoulder blades off floor entirely.", targets: "Core, Obliques" },
                    { name: "Mountain Climber", sets: "4", reps: "30", time: 30, rest: 35, tip: "Fast feet.", targets: "Core, Cardio" },
                    { name: "Plank", sets: "3", reps: "Hold 60s", time: 60, rest: 30, tip: "One minute to victory.", targets: "Core" },
                ]
            },
            {
                label: "Friday", type: "glute-sculpt", focus: "Glute Sculpture Day", color: "#b8a89a", exercises: [
                    { name: "Hip Thrust", sets: "5", reps: "20", time: 40, rest: 45, tip: "Highest volume day. Go hard.", targets: "Glutes" },
                    { name: "Donkey Kick", sets: "4", reps: "20 each", time: 30, rest: 35, tip: "Slow eccentric lowering.", targets: "Glutes" },
                    { name: "Fire Hydrant", sets: "4", reps: "20 each", time: 30, rest: 35, tip: "Pause at the top of the lift.", targets: "Glutes, Hips" },
                    { name: "Sumo Squat", sets: "4", reps: "20", time: 30, rest: 40, tip: "Inner thighs engage.", targets: "Inner Thighs, Glutes" },
                    { name: "Glute Bridge", sets: "4", reps: "25", time: 30, rest: 35, tip: "Final burn out.", targets: "Glutes" },
                ]
            },
            {
                label: "Saturday", type: "cardio-core", focus: "Core & Light Cardio", color: "#a8a898", exercises: [
                    { name: "Mountain Climber", sets: "3", reps: "30", time: 30, rest: 40, tip: "Keep hips down.", targets: "Core, Cardio" },
                    { name: "Bicycle Crunch", sets: "3", reps: "25", time: 30, rest: 35, tip: "Control the twist.", targets: "Core" },
                    { name: "Side Plank", sets: "3", reps: "Hold 30s each", time: 30, rest: 30, tip: "Stack feet on top of each other.", targets: "Obliques" },
                    { name: "Cat-Cow Stretch", sets: "1", reps: "10", time: 60, rest: 20, tip: "Recover deeply.", targets: "Spine" },
                ]
            },
            yogaDay,
        ];
    }

    const baseWarmup = [
        { name: "Shoulder Stretch", sets: "1", reps: "15s each", time: 15, rest: 5, tip: "Prepare shoulders for movement.", targets: "Warmup: Shoulders" },
        { name: "Arm & Wrist Circles", sets: "1", reps: "30s", time: 30, rest: 5, tip: "Rotate arms and wrists forward, then backward.", targets: "Warmup: Hands & Arms" },
        { name: "Hip Circle", sets: "1", reps: "20s", time: 20, rest: 5, tip: "Big hip circles to lubricate joints.", targets: "Warmup: Hips" },
        { name: "Knee Hug", sets: "1", reps: "15s each", time: 15, rest: 10, tip: "Stretch the glutes and legs dynamically.", targets: "Warmup: Legs" }
    ];

    // Inject the specific benefit string into every exercise object across all days
    days.forEach(day => {
        // Prepend warmup to active workout days
        if (day.type !== "yoga" && day.type !== "rest" && day.type !== "active-rest") {
            day.exercises = [...baseWarmup.map(w => ({ ...w })), ...day.exercises];
        }

        day.exercises.forEach(ex => {
            ex.benefits = EXERCISE_LIBRARY[ex.name]?.benefits || "Builds strength and improves overall fitness.";
        });
    });

    return days;
}

export const PROGRAM = {
    weeks: [
        { week: 1, phase: "Foundation", theme: "Gentle Awakening", days: getDays(1) },
        { week: 2, phase: "Foundation", theme: "Building Awareness", days: getDays(2) },
        { week: 3, phase: "Build", theme: "Strength Begins", days: getDays(3) },
        { week: 4, phase: "Build", theme: "Progressive Load", days: getDays(4) },
        { week: 5, phase: "Build", theme: "Power & Shape", days: getDays(5) },
        { week: 6, phase: "Build", theme: "Sculpting", days: getDays(6) },
        { week: 7, phase: "Transform", theme: "Intensify", days: getDays(7) },
        { week: 8, phase: "Transform", theme: "Peak Strength", days: getDays(8) },
        { week: 9, phase: "Transform", theme: "Full Power", days: getDays(9) },
        { week: 10, phase: "Transform", theme: "Elite Form", days: getDays(10) },
        { week: 11, phase: "Transform", theme: "Final Push", days: getDays(11) },
        { week: 12, phase: "Transform", theme: "Completion", days: getDays(12) },
    ]
};
