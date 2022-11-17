import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/review';


export default function ReviewForm({ setShowModal, spot }) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

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
            <div style={{ color: '#FF385C' }}>
                {errors.map((error, idx) => <div key={idx}>{error}</div>)}
            </div>

            <label>

                <textarea
                    placeholder={`How was your stay at ${spot.Owner.firstName} 's place?`}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                ></textarea>
            </label>
            <label>

                <input
                    placeholder={`Rate your stay at ${spot.Owner.firstName}'s place`}
                    type="number"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};
