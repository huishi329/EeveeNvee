import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, updateReview } from '../../store/reviews';
import styles from './ReviewForm.module.css';

export default function ReviewForm({ setShowModal, setShowReviewForm, spot, originalReview }) {
    const dispatch = useDispatch();
    const [review, setReview] = useState(originalReview?.review || '');
    const [stars, setStars] = useState(originalReview?.stars || 0);
    const [hover, setHover] = useState(stars);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (originalReview) {
            dispatch(updateReview(originalReview.id, { review, stars }))
                .then(() => {
                    console.log("review updated");
                    setShowReviewForm(false);
                    setShowModal(false);
                })
                .catch(async (res) => {
                    const errors = [];
                    const data = await res.json();
                    if (data.statusCode === 403) errors.push('You already has a review for this spot.')
                    if (data && data.errors) errors.push(...Object.values(data.errors));
                    setErrors(errors);
                });
        } else {
            dispatch(createReview(spot.id, { review, stars }))
                .then(() => {
                    setShowReviewForm(false);
                    setShowModal(false);
                })
                .catch(async (res) => {
                    const errors = [];
                    const data = await res.json();
                    if (data.statusCode === 403) errors.push('You already has a review for this spot.')
                    if (data && data.errors) errors.push(...Object.values(data.errors));
                    setErrors(errors);
                });
        }

    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <h2>Rate your stay</h2>
            {errors.length > 0 && <div className='errors-div'>
                {errors.map((error, idx) => <div key={idx}>{error}</div>)}
            </div>}
            <div className={styles.stars}>
                {[...Array(5)].map((star, i) => {
                    i += 1;
                    return (
                        <button
                            type='button'
                            key={i}
                            className={styles.star}
                            onClick={() => setStars(i)}
                            onMouseEnter={() => setHover(i)}
                            onMouseLeave={() => setHover(stars)}
                        >
                            <span><i className="fa-solid fa-star"
                                style={i <= ((stars && hover) || hover) ? { color: '#FF385C' } : { color: 'white' }} /></span>
                        </button>);
                })}
            </div >
            <textarea
                placeholder={`How was your stay at ${spot.Owner.firstName} 's place?`}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
            ></textarea>
            <button className={styles.button} type="submit">Submit</button>
        </form>
    );
};
