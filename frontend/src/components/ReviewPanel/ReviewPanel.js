import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ReviewPanel.css';
import ReviewCard from "../ReviewCard/ReviewCard";
import { getSpotReviews, clearSpotReviews } from "../../store/reviews";


function ReviewPanel({ spot, reviewRef }) {

    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.spot);

    useEffect(() => {
        dispatch(getSpotReviews(spot.id))
        return () => dispatch(clearSpotReviews())
    }, [dispatch, spot.id]);

    if (!reviews) return null;

    return (
        <>
            <div ref={reviewRef} className='outer-panel'>
                <div className='reviews-overview'>
                    <div>
                        <span>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            {spot.avgStarRating ?
                                <span style={{ fontWeight: 600 }}>{`${Number(spot.avgStarRating).toFixed(1)}`}</span> :
                                <span style={{ fontWeight: 400 }}>New</span>
                            }
                        </span>
                        <span>
                            ·
                        </span>
                        <span>
                            {`${spot.numReviews} reviews`}
                        </span>

                    </div>
                </div>
                <div className="reviews-container">
                    {Object.values(reviews).map(review => <ReviewCard
                        spot={spot}
                        key={review.id}
                        review={review}
                    />)}
                </div>
            </div>
        </>
    )
}

export default ReviewPanel;
