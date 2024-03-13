import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true,
    },

    title: {
        type: String,
        required: true,
        maxlength: [40, "Title cannot be more than 40 characters"],
    },

    comment: {
        type: String,
        required: true,
        maxlength: [200, "Comment cannot be more than 200 characters"],
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("Feedback", FeedbackSchema);