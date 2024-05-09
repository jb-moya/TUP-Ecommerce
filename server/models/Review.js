import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, "Please provide rating"],
        },
        title: {
            type: String,
            trim: true,
            required: [true, "Please provide review title"],
            maxlength: 100,
        },
        comment: {
            type: String,
            required: [true, "Please provide review text"],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "Customer",
            required: true,
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    { timestamps: true }
);
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
    const result = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
                numOfReviews: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0, // Exclude _id field from the result
                averageRating: { $round: ["$averageRating", 1] }, // Round averageRating to one decimal place
                numOfReviews: 1, // Preserve numOfReviews field
            },
        },
    ]);

    try {
        await this.model("Product").findOneAndUpdate(
            { _id: productId },
            {
                averageRating:
                    parseFloat(result[0]?.averageRating.toFixed(1)) || 0,
                numOfReviews: result[0]?.numOfReviews || 0,
            }
        );
    } catch (error) {
        // console.log(error);
    }
};

ReviewSchema.post("save", async function () {
    await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("deleteOne", { document: true }, async function () {
    // IT"S NOT A FUNCTION NYENYENYENYENYUEEEEE

    await this.constructor.calculateAverageRating(this.product);
});

export default mongoose.model("Review", ReviewSchema);
