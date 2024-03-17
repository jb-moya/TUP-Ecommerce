import React from 'react'

import { Row, Col, Image, Button } from "react-bootstrap";
import StarRating from "./StarRating.js";
import image from "../components/images/lake-louise-51543_1280.jpg";
import { AiFillLike } from "react-icons/ai";

const UserReview = () => {
  return (
      <Row className="review-container user-review">
          <Col className="main-review-body column" md={{ span: 8, offset: 2 }}>
              <Row xs="auto">
                  <Col className="profile-pic-container">
                      <div className="circle">
                          <Image
                              className="profile"
                              src={image}
                              roundedCircle
                              fluid
                          />
                      </div>
                  </Col>
                  <Col className="user-name">John Smilga</Col>
                  <Col className="column date ms-auto">Apr 1, 2024</Col>
              </Row>
              <Row className="review-title-container" xs="auto">
                  <Col className="star-rating-container">
                      <StarRating staticColor disableAction />
                  </Col>
                  <Col className="review-title">
                      WHAT THE FUCK IS THIS SHIT?
                  </Col>
              </Row>
              <Row className="review-body">
                  ANG BAHO. Putangina diko na-enjoy. Pero dahil Horney na horney
                  nako ginamit ko parin. tiniis ko ung amoy. pero sa bandang
                  huli nakaramdam ako ng disgust at emptiness. #neverAgain
              </Row>
              <Row className="custom-row like-button-container" xs="auto">
                  <Button variant="outline-secondary like-button">
                      <AiFillLike className="like-icon" />
                      <div className="like-count">5</div>
                  </Button>
              </Row>
          </Col>
      </Row>
  );
}

export default UserReview