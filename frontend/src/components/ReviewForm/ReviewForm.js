import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/review';


export default function ReviewForm({ setShowModal, spot }) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1);

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(createReview(spot.id, {
            review,
            stars
        }))
            .then(() => setShowModal(false))
            .catch(async (res) => {
                const errors = [];
                const data = await res.json();
                console.log(data);
                if (data.statusCode === 403) errors.push('You already has a review for this spot.')
                if (data && data.errors) errors.push(...Object.values(data.errors));
                setErrors(errors);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Rate your stay</h2>
            <div className='errors-div'>
                {errors.map((error, idx) => <div key={idx}>{error}</div>)}
            </div>
            <textarea
                placeholder={`How was your stay at ${spot.Owner.firstName} 's place?`}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
            ></textarea>
            <input
                placeholder={`Rate your stay at ${spot.Owner.firstName}'s place`}
                type="number"
                value={stars}
                min='1'
                max='5'
                onChange={(e) => setStars(e.target.value)}
                required
                style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
            />

            <button type="submit">Submit</button>
        </form>
    );
};
