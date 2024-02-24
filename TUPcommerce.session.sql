CREATE TABLE
    student (
        student_id VARCHAR(20),
        name VARCHAR(30) NOT NULL,
        email_address VARCHAR(30) NOT NULL UNIQUE,
        contact_number VARCHAR(11) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        PRIMARY KEY (student_id)
    );

CREATE TABLE
    cart (
        cart_id INT AUTO_INCREMENT,
        student_id VARCHAR(20) NOT NULL UNIQUE,
        total_price INT NOT NULL,
        PRIMARY KEY (cart_id),
        FOREIGN KEY (student_id) REFERENCES student(student_id)
    );

CREATE TABLE
    cart_items (
        cart_id INT,
        product_id INT,
        product_variation_id INT,
        quantity INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cart_id, product_id, product_variation_id),
        FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
        FOREIGN KEY (product_id) REFERENCES product(product_id),
        FOREIGN KEY (product_variation_id) REFERENCES product_variation(product_variation_id),
        CHECK (
            (
                (
                    product_id IS NOT NULL
                    AND product_variation_id IS NULL
                )
                OR (
                    product_id IS NULL
                    AND product_variation_id IS NOT NULL
                )
            )
        )
    );

CREATE TABLE
    customer_order (
        order_id INT AUTO_INCREMENT,
        student_id VARCHAR(20) NOT NULL,
        cart_id INT NOT NULL,
        -- However, if your business rules allow a student to place multiple
        -- orders or allow a cart to be associated with multiple orders (for example, 
        -- in the case of recurring orders), then unique constraints on student_id 
        -- and cart_id might be unnecessary.
        -- UNIQUE KEY unique_student_cart (student_id, cart_id),
        payment_id INT NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY (order_id),
        FOREIGN KEY (student_id) REFERENCES student(student_id),
        FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
        FOREIGN KEY (payment_id) REFERENCES payment_options(payment_id)
    );

CREATE TABLE
    payment_options (
        payment_id INT AUTO_INCREMENT,
        payment_method_type VARCHAR(50) NOT NULL,
        description VARCHAR(255) NOT NULL,
        transaction_fee DECIMAL(5, 2),
        is_active BOOLEAN DEFAULT TRUE,
        PRIMARY KEY (payment_id)
    );

CREATE TABLE    
    product (
        product_id INT AUTO_INCREMENT,
        product_name VARCHAR(20) NOT NULL,
        product_description VARCHAR(255) NOT NULL,
        product_sold_count INT NOT NULL,
        has_variations BOOLEAN DEFAULT FALSE NOT NULL,
        product_common_attributes_id INT,
        PRIMARY KEY (product_id),
        FOREIGN KEY (product_common_attributes_id) REFERENCES product_common_attributes(product_common_attributes_id),
        CONSTRAINT check_has_variations CHECK (
            (
                has_variations = TRUE
                AND product_common_attributes_id IS NULL
            )
            OR (
                has_variations = FALSE
                AND product_common_attributes_id IS NOT NULL
            )
        )
    );

DROP TABLE product_ratings;
CREATE TABLE
    product_ratings (
        rating_id INT AUTO_INCREMENT,
        product_id INT NOT NULL,
        student_id VARCHAR(20) NOT NULL,
        rating_value INT NOT NULL,
        CHECK (
            rating_value BETWEEN 1 AND 5
        ),
        UNIQUE (product_id, student_id),
        PRIMARY KEY (rating_id),
        FOREIGN KEY (product_id) REFERENCES product(product_id),
        FOREIGN KEY (student_id) REFERENCES student(student_id)
    );

CREATE TABLE
    product_common_attributes (
        product_common_attributes_id INT AUTO_INCREMENT,
        product_price DECIMAL(10, 2) NOT NULL,
        product_stock_quantity INT NOT NULL,
        product_sellable BOOLEAN DEFAULT TRUE NOT NULL,
        PRIMARY KEY (product_common_attributes_id)
    );

DROP TABLE product_rating_comments;
CREATE TABLE
    product_rating_comments (
        rating_comment_id INT AUTO_INCREMENT,
        product_common_attributes_id INT NOT NULL,
        student_id VARCHAR(20) NOT NULL,
        rating_comment_content VARCHAR(255) NOT NULL,
        rating_comment_like INT NOT NULL DEFAULT 0,
        PRIMARY KEY (rating_comment_id),
        FOREIGN KEY (student_id) REFERENCES student(student_id),
        FOREIGN KEY (product_common_attributes_id) REFERENCES product_common_attributes(product_common_attributes_id)
    );

CREATE TABLE
    student_product_likes (
        like_id INT AUTO_INCREMENT,
        student_id VARCHAR(20) NOT NULL,
        rating_command_id INT NOT NULL,
        PRIMARY KEY (like_id),
        FOREIGN KEY (student_id) REFERENCES student(student_id),
        FOREIGN KEY (rating_comment_id) REFERENCES product_rating_comments(rating_comment_id)
    );

CREATE TABLE
    product_variation_class (
        class_id INT AUTO_INCREMENT,
        class_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (class_id)
    );

CREATE TABLE
    product_variation (
        product_variation_id INT AUTO_INCREMENT,
        product_id INT,
        class_id INT,
        variation_name VARCHAR(50) NOT NULL,
        product_common_attributes_id INT NOT NULL,
        UNIQUE (product_id, class_id, variation_name),
        PRIMARY KEY (product_variation_id),
        FOREIGN KEY (product_common_attributes_id) REFERENCES product_common_attributes(product_common_attributes_id),
        FOREIGN KEY (product_id) REFERENCES product(product_id),
        FOREIGN KEY (class_id) REFERENCES product_variation_class(class_id)
    );

CREATE TABLE
    shop (
        shop_id INT AUTO_INCREMENT,
        shop_name VARCHAR(20) NOT NULL,
        email_address VARCHAR(50) NOT NULL UNIQUE,
        contact_number VARCHAR(11) NOT NULL,
        PRIMARY KEY (shop_id)
    );

CREATE TABLE
    stock (
        shop_id INT,
        product_id INT,
        product_variation_id INT,
        PRIMARY KEY (shop_id, product_id),
        FOREIGN KEY (shop_id) REFERENCES shop(shop_id),
        FOREIGN KEY (product_id) REFERENCES product(product_id),
        FOREIGN KEY (product_variation_id) REFERENCES product_variation(product_variation_id),
        CHECK (
            (
                (
                    product_id IS NOT NULL
                    AND product_variation_id IS NULL
                )
                OR (
                    product_id IS NULL
                    AND product_variation_id IS NOT NULL
                )
            )
        )
    );