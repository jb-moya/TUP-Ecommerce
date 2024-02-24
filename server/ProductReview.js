export default class ProductReview {
    static QUERY;
    static TABLE_product_comments = "product_rating_comments";
    static TABLE_product_likes = "student_product_likes";

    static initialize(query) {
        ProductReview.QUERY = query;
    }

    static async createProductReview(details) {
        const {
            product_common_attributes_id,
            student_id,
            rating_comment_content,
        } = details;

        try {
            const product_comment_record = {
                product_common_attributes_id: product_common_attributes_id,
                student_id: student_id,
                rating_comment_content: rating_comment_content,
            };

            const result = await ProductReview.QUERY.createRecord(
                ProductReview.TABLE,
                product_comment_record
            );

            return result;
        } catch (error) {
            console.log("error: ", error);
            throw new Error(`Error creating comment: ${error.message}`);
        }
    }

    static async togglelikeProductReview(details) {
        const { rating_comment_id } = details;

        const checkQuery = `
            SELECT * FROM ${ProductReview.TABLE_product_likes}
            WHERE student_id = ? AND rating_comment_id = ?;
        `;

        const toggleQuery = `
            INSERT INTO student_product_likes (student_id, rating_comment_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE student_id = student_id;
        `;

        try {
            const like_record = {
                rating_comment_id: rating_comment_id,
                rating_comment_like: rating_comment_like + 1,
            };

            const result = await ProductReview.QUERY.updateRecord(
                ProductReview.TABLE,
                like_record
            );

            return result;
        } catch (error) {
            console.log("error: ", error);
            throw new Error(`Error creating like: ${error.message}`);
        }
    }
}
