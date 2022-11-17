import './ReviewCard.css'


function ReviewCard({ review }) {
    return (
        <div>
            <div>
                <p style={{ fontWeight: 600 }}>
                    {review.User.firstName}
                </p>
                <p>
                    {(new Date(review.updatedAt)).getUTCFullYear()}
                </p>
            </div>
            <p>
                {review.review}
            </p>
        </div>
    )
};

export default ReviewCard;
