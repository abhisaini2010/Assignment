
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";

import connectDB from "../config/db.js";
import Profile from "../models/Profile.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

// ==========================================
// EXISTING 30 PROFILES
// ==========================================

const profiles = [
    {
        name: "Aarav",
        age: 22,
        bio: "Love travelling and photography.",
        city: "Delhi",
        interests: ["Travel", "Music", "Photography"],
        likedUser: true
    },
    {
        name: "Riya",
        age: 21,
        bio: "Coffee lover and book enthusiast.",
        city: "Mumbai",
        interests: ["Books", "Coffee", "Art"],
        likedUser: false
    },
    {
        name: "Kabir",
        age: 23,
        bio: "Gym, cricket and good food.",
        city: "Chandigarh",
        interests: ["Fitness", "Cricket", "Food"],
        likedUser: true
    },
    {
        name: "Ananya",
        age: 22,
        bio: "Exploring new places every weekend.",
        city: "Bangalore",
        interests: ["Travel", "Dance", "Music"],
        likedUser: false
    },
    {
        name: "Arjun",
        age: 24,
        bio: "Tech enthusiast and gamer.",
        city: "Pune",
        interests: ["Gaming", "Technology", "Movies"],
        likedUser: true
    },
    {
        name: "Meera",
        age: 21,
        bio: "Artist who loves sunsets.",
        city: "Jaipur",
        interests: ["Art", "Painting", "Travel"],
        likedUser: false
    },
    {
        name: "Ishaan",
        age: 23,
        bio: "Football is my life.",
        city: "Delhi",
        interests: ["Football", "Fitness", "Music"],
        likedUser: true
    },
    {
        name: "Diya",
        age: 22,
        bio: "Dancing through life.",
        city: "Mumbai",
        interests: ["Dance", "Fashion", "Movies"],
        likedUser: false
    },
    {
        name: "Reyansh",
        age: 25,
        bio: "Adventure seeker and foodie.",
        city: "Dehradun",
        interests: ["Hiking", "Food", "Travel"],
        likedUser: true
    },
    {
        name: "Sanya",
        age: 20,
        bio: "Music makes everything better.",
        city: "Chandigarh",
        interests: ["Music", "Singing", "Books"],
        likedUser: false
    },
    {
        name: "Vivaan",
        age: 22,
        bio: "Coding by day, gaming by night.",
        city: "Bangalore",
        interests: ["Coding", "Gaming", "Movies"],
        likedUser: true
    },
    {
        name: "Aditi",
        age: 23,
        bio: "Nature lover and coffee addict.",
        city: "Shimla",
        interests: ["Nature", "Coffee", "Photography"],
        likedUser: false
    },
    {
        name: "Karan",
        age: 24,
        bio: "Always ready for a road trip.",
        city: "Gurgaon",
        interests: ["Cars", "Travel", "Music"],
        likedUser: true
    },
    {
        name: "Ira",
        age: 21,
        bio: "Creative mind, happy soul.",
        city: "Jaipur",
        interests: ["Painting", "Art", "Dance"],
        likedUser: false
    },
    {
        name: "Aditya",
        age: 22,
        bio: "Cricket, movies and chill.",
        city: "Lucknow",
        interests: ["Cricket", "Movies", "Food"],
        likedUser: false
    },
    {
        name: "Kiara",
        age: 23,
        bio: "Living life one adventure at a time.",
        city: "Goa",
        interests: ["Beach", "Travel", "Swimming"],
        likedUser: true
    },
    {
        name: "Rohan",
        age: 25,
        bio: "Fitness enthusiast and runner.",
        city: "Delhi",
        interests: ["Running", "Gym", "Cycling"],
        likedUser: false
    },
    {
        name: "Tara",
        age: 22,
        bio: "Books, plants and peaceful evenings.",
        city: "Pune",
        interests: ["Books", "Gardening", "Music"],
        likedUser: false
    },
    {
        name: "Dev",
        age: 24,
        bio: "Love exploring new restaurants.",
        city: "Mumbai",
        interests: ["Food", "Travel", "Cooking"],
        likedUser: true
    },
    {
        name: "Nisha",
        age: 21,
        bio: "Photography is my passion.",
        city: "Agra",
        interests: ["Photography", "Art", "Travel"],
        likedUser: false
    },
    {
        name: "Yash",
        age: 23,
        bio: "Sports lover and movie buff.",
        city: "Sonipat",
        interests: ["Football", "Movies", "Gaming"],
        likedUser: false
    },
    {
        name: "Myra",
        age: 22,
        bio: "Dancing, travelling and smiling.",
        city: "Bangalore",
        interests: ["Dance", "Travel", "Fashion"],
        likedUser: true
    },
    {
        name: "Atharv",
        age: 24,
        bio: "A little nerdy, a lot adventurous.",
        city: "Hyderabad",
        interests: ["Technology", "Hiking", "Gaming"],
        likedUser: false
    },
    {
        name: "Pari",
        age: 20,
        bio: "Music and long conversations.",
        city: "Delhi",
        interests: ["Music", "Singing", "Books"],
        likedUser: false
    },
    {
        name: "Dhruv",
        age: 23,
        bio: "Weekend cyclist and traveller.",
        city: "Chandigarh",
        interests: ["Cycling", "Travel", "Fitness"],
        likedUser: true
    },
    {
        name: "Avni",
        age: 22,
        bio: "Love art, culture and coffee.",
        city: "Jaipur",
        interests: ["Art", "Culture", "Coffee"],
        likedUser: false
    },
    {
        name: "Manav",
        age: 25,
        bio: "Entrepreneurial mind and sports fan.",
        city: "Gurgaon",
        interests: ["Business", "Cricket", "Fitness"],
        likedUser: false
    },
    {
        name: "Sara",
        age: 21,
        bio: "Exploring life with a smile.",
        city: "Mumbai",
        interests: ["Travel", "Movies", "Food"],
        likedUser: true
    },
    {
        name: "Neil",
        age: 24,
        bio: "Music producer and night owl.",
        city: "Pune",
        interests: ["Music", "Technology", "Gaming"],
        likedUser: false
    },
    {
        name: "Kiara",
        age: 23,
        bio: "Nature, books and beautiful places.",
        city: "Dehradun",
        interests: ["Nature", "Books", "Hiking"],
        likedUser: false
    }
].map((profile, index) => ({
    ...profile,
    photo: `https://i.pravatar.cc/400?img=${index + 1}`
}));

// ==========================================
// ADDITIONAL 150 PROFILES
// ==========================================

const firstNames = [
    "Aarush", "Vihaan", "Advik", "Krish", "Shaurya",
    "Rudra", "Arnav", "Daksh", "Parth", "Samar",
    "Ayaan", "Laksh", "Raghav", "Aarav", "Kabir",
    "Aadhya", "Anika", "Kavya", "Shanaya", "Ira",
    "Saanvi", "Prisha", "Vanya", "Rhea", "Navya",
    "Meher", "Aanya", "Tanvi", "Naina", "Pihu"
];

const surnames = [
    "Sharma", "Verma", "Kapoor", "Malhotra", "Mehta"
];

const cities = [
    "Delhi", "Mumbai", "Bangalore", "Pune", "Chandigarh",
    "Jaipur", "Hyderabad", "Gurgaon", "Noida", "Lucknow",
    "Dehradun", "Kolkata", "Ahmedabad", "Indore", "Goa"
];

const bios = [
    "Love exploring new places and meeting new people.",
    "Coffee, music and meaningful conversations.",
    "Always ready for a new adventure.",
    "Finding happiness in little things.",
    "Fitness enthusiast and weekend explorer.",
    "Movies, food and endless laughter.",
    "A creative soul who loves photography.",
    "Life is better with good music.",
    "Book lover and nature enthusiast.",
    "Making memories one day at a time."
];

const interestSets = [
    ["Travel", "Music", "Photography"],
    ["Books", "Coffee", "Art"],
    ["Fitness", "Cricket", "Food"],
    ["Gaming", "Technology", "Movies"],
    ["Dance", "Fashion", "Music"],
    ["Nature", "Hiking", "Photography"],
    ["Cooking", "Travel", "Food"],
    ["Football", "Fitness", "Movies"],
    ["Painting", "Books", "Culture"],
    ["Cycling", "Adventure", "Travel"]
];

const additionalProfiles = firstNames.flatMap(
    (firstName, firstIndex) =>
        surnames.map((surname, surnameIndex) => {

            const index = firstIndex * surnames.length + surnameIndex;

            return {
                name: `${firstName} ${surname}`,
                age: 20 + (index % 7),

                bio: bios[index % bios.length],

                city: cities[index % cities.length],

                interests: interestSets[index % interestSets.length],

                likedUser: index % 5 === 0,

                photo: `https://i.pravatar.cc/400?img=${((index + 30) % 70) + 1}`
            };
        })
);

// ==========================================
// SEED DATABASE SAFELY
// ==========================================

const seedProfiles = async () => {
    try {
        await connectDB();

        const allProfiles = [
            ...profiles,
            ...additionalProfiles
        ];

        const operations = allProfiles.map((profile) => ({
            updateOne: {
                filter: {
                    name: profile.name,
                    bio: profile.bio
                },
                update: {
                    $setOnInsert: profile
                },
                upsert: true
            }
        }));

        const result = await Profile.bulkWrite(operations);

        const totalProfiles = await Profile.countDocuments();

        console.log("--------------------------------");
        console.log("Coy Discover Database Seeded!");
        console.log("--------------------------------");
        console.log(`Original profiles: ${profiles.length}`);
        console.log(`Additional profiles: ${additionalProfiles.length}`);
        console.log(`New profiles added: ${result.upsertedCount}`);
        console.log(`Total profiles in database: ${totalProfiles}`);
        console.log("--------------------------------");

    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;

    } finally {
        await mongoose.disconnect();
    }
};

seedProfiles();
