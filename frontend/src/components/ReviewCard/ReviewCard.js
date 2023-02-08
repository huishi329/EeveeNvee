import './ReviewCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../store/review';
import { useEffect, useState } from 'react';

function ReviewCard({ review }) {
    const dispatch = useDispatch();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const sessionUser = useSelector(state => state.session.user);
    const [isReviewWriter, setIsReviewWriter] = useState(false);

    useEffect(() => {
        if (sessionUser) {
            if (review.userId === sessionUser.id) setIsReviewWriter(true);
        }
        return () => setIsReviewWriter(false);
    }, [sessionUser, review])

    const deleteHandler = () => {
        dispatch(deleteReview(review));
    }

    return (
        <div className='review-card'>
            <div className='review-info'>
                <div className='user-info'>
                    <div className='profile-image'>
                        <img src='/eeveeNvee-logo.png' alt={review.User.firstName}></img>
                    </div>
                    <div>
                        <div style={{ fontWeight: 600 }}>
                            {review.User.firstName}
                        </div>
                        <div style={{ fontWeight: 400, color: 'gray' }}>
                            {`${month[(new Date(review.updatedAt)).getMonth()]} ${(new Date(review.updatedAt)).getUTCFullYear()}`}
                        </div>
                    </div>
                </div>
                <div>
                    {isReviewWriter && <button
                        onClick={() => deleteHandler()}
                    >Delete my review</button>}
                </div>

            </div>
            <div className='review-content'>
                <p>
                    {review.review}
                </p>

            </div>
        </div >
    )
};

export default ReviewCard;
