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
            // console.log("error: ", error);
            throw new Error(`Error creating comment: ${error.message}`);
        }
    }

    static async togglelikeProductReview(details) {
        const { studentId, ratingCommentId } = details;

        const checkCommentExist = `
            SELECT * FROM ${ProductReview.TABLE_product_likes}
            WHERE student_id = ? AND rating_comment_id = ?;
        `;

        const toggleQuery = `
            INSERT INTO student_product_likes (student_id, rating_comment_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE student_id = student_id;
        `;

        connection.query(
            checkCommentExist,
            [studentId, ratingCommentId],
            (err, results) => {
                if (err) throw err;

                if (results.length > 0) {
                    // If the student has already liked the review, remove the like
                    const deleteQuery = `
                        DELETE FROM student_product_likes
                        WHERE student_id = ? AND rating_comment_id = ?;
                    `;
                    connection.query(
                        deleteQuery,
                        [studentId, ratingCommentId],
                        (err, results) => {
                            if (err) throw err;
                            // console.log("Review unliked successfully");
                        }
                    );
                } else {
                    // If the student hasn't liked the review, add the like
                    connection.query(
                        toggleQuery,
                        [studentId, ratingCommentId],
                        (err, results) => {
                            if (err) throw err;
                            // console.log("Review liked successfully");
                        }
                    );
                }
            }
        );
    }
}
