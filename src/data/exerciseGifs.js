// ─── EXERCISE ANIMATIONS (SVG-based animated GIF URLs from public sources) ──
const EXERCISE_GIFS = {
    // Strength / Glutes / Core
    "Glute Bridge": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3p6cDJ5em10a2Z2Z3JqbGpnajVzdzl0cjEzMDExbTQzaWcxdzVvZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oOGc4pXsX22XjE2eTA/giphy.gif",
    "Hip Thrust": "https://www.ryderwear.com/blogs/news/how-to-do-the-perfect-hip-thrust",
    "Bulgarian Split Squat": "https://www.healthline.com/health/fitness-exercise/bulgarian-split-squat",
    "Bodyweight Squat": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjEyYnBtdzRveTdqbjk1dmZxMG90d3hra2pldnptYzRmdW5zNnR4ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1C1ipHPEs4Vjwglwza/giphy.gif",
    "Sumo Squat": "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYms3NGdnbjl1bGo2M3ZqcXZpZG1xa2pscjBvcDhzOGtteHZlMmxqbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/f7er6B14y1C5yG0fNw/giphy.gif",
    "Jump Squat": "https://www.jefit.com/exercises/476/jump-squat",
    "Wall Sit": "https://media.self.com/photos/62d08fd44adf27f43f076447/master/w_1600%2Cc_limit/Nikki_wall-sit%2520(1).jpg",
    "Lunge": "https://media.hearstapps.com/loop/video/2022-bicycling-loops-ep13-lunges-dm-reverse-lunge-v01-1647979408.mp4",
    "Reverse Lunge": "https://media.hearstapps.com/loop/video/14-reverse-lunge-1534791784.mp4",
    "Side Lunge": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHJpOWNxaW95ZGp6ajJydHhnbWFjdnhnbTRvazY4MjJuZ3lmdmxibiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cLOeR79kY2E9pEJUUE/giphy.gif",
    "Romanian Deadlift": "https://fitnessprogramer.com/exercise/dumbbell-romanian-deadlift/",
    "Push-Up": "https://fitnessfaqs.com/articles/8-best-push-ups-for-beginners-master-the-basics/",
    "Modified Push-Up": "https://www.self.com/story/push-up-modifications",
    "Chest Press": "https://www.self.com/gallery/best-chest-exercises",
    "Tricep Dip": "https://www.healthline.com/health/chair-dips",
    "Plank": "https://www.shape.com/thmb/T2GyvzFah3XYR8_L8W16ANWBTXs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/low-plank-hold-b8a63da1ef844f00b6f6a21141ba1d87.jpg",
    "Side Plank": "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm1pd2FnMHFra2Z5ZXR0ZDltY3lhM2hiOHVwOTlxbXNpMG52OHBqZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7m70b4wcZOOstmKCE8/giphy.gif",
    "Donkey Kick": "https://images-prod.healthline.com/hlcmsresource/images/topic_centers/Fitness-Exercise/400x400_Donkey_Kick_Exercises_Donkey_Kick.gif",
    "Fire Hydrant": "https://www.popsugar.com/fitness/how-do-fire-hydrant-exercise-gif-43439294",
    "Glute Kickback": "https://media.post.rvohealth.io/wp-content/uploads/sites/2/2022/05/GRT-BandedKickback.gif",
    "Mountain Climber": "https://www.today.com/health/diet-fitness/mountain-climbers-exercise-rcna25346",
    "Bicycle Crunch": "https://www.self.com/story/the-right-way-to-do-bicycle-crunches",

    // New Additions
    "Bird Dog": "https://www.self.com/story/bird-dog-exercise",
    "Dead Bug": "https://www.verywellfit.com/thmb/MHZjRAV_-B8M38m5mHnX75EmA1c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/105-Dead-Bug-ExerciseGIF-407d0bbb6d8742be855b219e74c18bd0.gif",
    "Sit-Up": "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_21/1723907/modified_situp.gif",
    "Superman": [
        "http://www.dmoose.com/cdn/shop/articles/Main_Image_d5d725e7-6fd2-4ccb-be6f-da57baf9767a.jpg?v=1670249944",
        "https://www.jefit.com/exercises/94/superman"
    ],
    "Calf Raise": "https://bodyweighttrainingarena.com/wp-content/uploads/2020/06/Floor-Calf-Raise-Two-Legs.gif",
    "Inner Thigh Squeeze": "https://www.popsugar.com/fitness/inner-thigh-workout-gifs-34428432",
    "Cat-Cow Stretch": "https://images.squarespace-cdn.com/content/v1/5ea57caad08f387b2e9827bd/1646684033447-IOYIVKJ5IK87700YUVV9/Narrow+Cat+Cow+GIF.gif",
    "Child's Pose": "https://www.yogajournal.com/wp-content/uploads/2021/10/Childs-Pose_Andrew-Clark_1.jpg",
    "Downward Dog": "http://www.powerflow-yoga.com/wp-content/uploads/AdobeStock_142783397.jpeg",
    "Cobra Pose": "https://www.yogajournal.com/wp-content/uploads/2007/08/Cobra-Pose_Andrew-Clark.gif",
    "Warrior I": "https://cdn.yogajournal.com/wp-content/uploads/2021/10/Warrior-1-Pose_Andrew-Clark_2400x1350.jpeg?auto=webp&width=3840&quality=75&fit=cover",
    "Warrior II": "http://liforme.com/cdn/shop/articles/0019_Warrior_II_-_Virabhadrasana_II_08_Laruga_31ba9e6e-26d7-42d2-b673-724fbd06a4f5.jpg?v=1750946478",
    "Bridge Pose": "https://www.yogajournal.com/wp-content/uploads/2021/11/YJ_Bridge-Pose_Andrew-Clark_2400x1350.png",
    "Pigeon Pose": "https://bodybyyoga.training/yoga-for-beginners/modifications/pigeon-pose-modifications-how-to-modify-pigeon-pose-when-you-are-an-inflexible-beginner/?srsltid=AfmBOooswEnG2lHKiqtm8b64-OVN0FUcn8WCPfNzbsOs8GXTUl52t7z-",
    "Legs Up Wall": "https://www.yogajournal.com/wp-content/uploads/2021/12/Legs-Up-the-Wall-Pose_Andrew-Clark_2400x1350.jpeg",
    "Neck Roll": "https://phoenixphysicaltherapy.com/full-body-daily-stretching-routine/",
    "Shoulder Stretch": [
        "https://spotebi.com/wp-content/uploads/2014/10/shoulder-stretch-exercise-illustration.jpg",
        "https://www.onepeloton.com/blog/shoulder-stretches"
    ],
    "Butterfly Stretch": "https://res.cloudinary.com/peloton-cycle/image/fetch/f_auto,c_limit,w_3840,q_90/https://images.ctfassets.net/6ilvqec50fal/1mtimJahhs8aiGfG7EMRbK/1dfdcec20fa289ff5994b76df38941ce/butterfly-stretch.jpg",
    "Knee Hug": [
        "https://media1.popsugar-assets.com/files/thumbor/djabL52rAgosXLjz67bytgXb8dk=/fit-in/792x528/top/filters:format_auto():upscale()/2017/03/27/769/n/1922729/2c84e89353d79cb9_EXAMPLE.Knee-Hugs.gif",
        "https://www.popsugar.com/fitness/how-do-standing-knee-hugs-43359009"
    ],
    "Seated Twist": "https://dorsumtech.com/blogs/better-posture/seated-spinal-twist-to-increase-mobility?srsltid=AfmBOorFWUvumkl3nfL1Tcpgo0axPhntT4cr5CyP-jY-YgbI5djwzREW",
    "Hip Circle": [
        "https://media.giphy.com/media/BWvrfSGW1zgdkaHpnW/giphy.gif",
        "https://www.self.com/gallery/hip-stretches-your-body-really-needs-slideshow",
        "https://in.pinterest.com/pin/227994799873250610/"
    ],
    "Arm & Wrist Circles": [
        "https://d2culxnxbccemt.cloudfront.net/bowl/content/uploads/2021/03/18124955/wrist-1.gif",
        "https://www.daniwinksflexibility.com/bendy-blog/wrist-warm-up-for-bridges"
    ]
};

export default EXERCISE_GIFS;
