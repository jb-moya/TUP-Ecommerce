import React from 'react';

const ProductDetail = (props) => {
    const id = props.match.params.id;

    // Fetch product details using the id

    return (
        <div>
            <h2>Product Detail</h2>
            <p>Product ID: {id}</p>
            {/* Display other details of the product */}
        </div>
    );
};

export default ProductDetail;