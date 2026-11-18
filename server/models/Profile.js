
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            required: true,
            min: 18
        },
        photo: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        interests: {
            type: [String],
            required: true
        },
        likedUser: {
            type: Boolean,
            default: false,
            select: false
        }
    },
    {
        timestamps: true
    }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
