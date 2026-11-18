
import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema(
    {
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            required: true
        },
        action: {
            type: String,
            enum: ["like", "pass"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

// One swipe per profile for our single logged-in user
swipeSchema.index({ profileId: 1 }, { unique: true });

const Swipe = mongoose.model("Swipe", swipeSchema);

export default Swipe;
