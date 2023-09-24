

import {useEffect, useRef,useState} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';


import React from 'react'

const Reviews = ({ getMovieData, movie }) => {
    const revText = useRef();
    const params = useParams();
    const movieId = params.movieId;
  
    // Initialize reviews as an empty array
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      getMovieData(movieId);
    }, []);
  
    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
      
        try {
          const response = await api.post("/api/v1/reviews", {
            reviewBody: rev.value,
            imdbId: movieId,
          });
      
          // Add the new review to the existing reviews array
          const newReviews = [
            ...reviews,
            { body: rev.value, id: response.data.id }, // Assuming response.data.id is the unique ID of the new review
          ];
      
          // Set the reviews state variable to the new array
          setReviews(newReviews);
      
          // Clear the review textbox
          revText.current.value = "";
        } catch (err) {
          console.error(err);
        }
      };
  
    return (
      <Container>
        <Row>
          <Col>
            <h3>Reviews</h3>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <img src={movie?.poster} alt="" />
          </Col>
          <Col>
            <>
              <Row>
                <Col>
                  <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
            {reviews.map((review, index) => (
              <div key={review.id}>
                <Row>
                  <Col>{review.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Reviews;