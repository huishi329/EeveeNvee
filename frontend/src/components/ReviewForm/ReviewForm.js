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
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <label>
                How was your stay at {spot.Owner.firstName} 's place?
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                ></textarea>
            </label>
            <label>
                Rate your stay at {spot.Owner.firstName}'s place
                <input
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
