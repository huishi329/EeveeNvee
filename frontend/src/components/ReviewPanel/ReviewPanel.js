import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/review";
import ReviewCard from "../ReviewCard/ReviewCard";
import './ReviewPanel.css';

function ReviewPanel({ spot }) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.spot);
    useEffect(() => {
        dispatch(getSpotReviews(spot.id))
    }, [dispatch, spot.id]);

    if (!reviews) return null;

    return (
        <>
            <div className='outer-panel'>
                <hr />
                <div className='reviews-overview'>

                    <span>
                        <i className="fa-sharp fa-solid fa-star"></i>
                        {`${Number(spot.avgStarRating).toFixed(2)}`}
                    </span>
                    ·
                    <span>
                        {`${spot.numReviews} reviews`}
                    </span>

                </div>
                <div className="reviews-container">
                    {Object.values(reviews).map(review => <ReviewCard
                        key={review.id}
                        review={review}
                    />)}
                </div>
            </div>
        </>
    )
}

export default ReviewPanel;
