import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '../../context/Modal';
import './ReviewPanel.css';
import ReviewForm from "../ReviewForm";
import ReviewCard from "../ReviewCard/ReviewCard";
import { getSpotReviews, clearSpotReviews } from "../../store/review";

function ReviewPanel({ spot }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const reviews = useSelector(state => state.reviews.spot);
    const hasReview = sessionUser && reviews && Object.keys(reviews).includes('' + sessionUser.id);
    const isNotHost = sessionUser && sessionUser.id !== spot.ownerId;

    useEffect(() => {
        dispatch(getSpotReviews(spot.id))
        return () => dispatch(clearSpotReviews())
    }, [dispatch, spot.id]);

    if (!reviews) return null;

    return (
        <>
            <div className='outer-panel'>
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
                    {isNotHost && !hasReview &&
                        <div>
                            <button
                                onClick={() => setShowModal(true)}
                            >Rate my stay</button>
                        </div>}
                </div>
                <div className="reviews-container">
                    {Object.values(reviews).map(review => <ReviewCard
                        key={review.id}
                        review={review}
                    />)}
                </div>
                {showModal &&
                    <Modal onClose={() => setShowModal(false)}>
                        <ReviewForm setShowModal={setShowModal} spot={spot} />
                    </Modal>
                }
            </div>
        </>
    )
}

export default ReviewPanel;
