export default class ProductReview {
    static QUERY;
    static TABLE = "product_common_attributes";

    static initialize(query){
        ProductReview.QUERY = query;
    }
       
    static async createProductReview (details) {
        const { product_common_attributes_id, student_id, rating_comment_content } = details;

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

}