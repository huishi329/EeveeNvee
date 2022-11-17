import './ReviewCard.css'


function ReviewCard({ review }) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <div className='review-card'>
            <div className='user-info'>
                <div style={{ fontWeight: 600 }}>
                    {review.User.firstName}
                </div>
                <div style={{ fontWeight: 400, color: 'gray' }}>
                    {`${month[(new Date(review.updatedAt)).getMonth()]} ${(new Date(review.updatedAt)).getUTCFullYear()}`}
                </div>
            </div>
            <p>
                {review.review}
            </p>
        </div >
    )
};

export default ReviewCard;
