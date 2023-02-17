import './SpotBooking.css';

export default function SpotBooking({ spot, reviewRef }) {

    return (

        <div className="edit-spot">
            <div className="spot-info">
                <div className="spot-info-left">
                    <div className="price-bold">{`$${spot.price} CAD`}</div>
                    <div className="night">night</div>
                </div>
                <div className="spot-info-right">
                    <span
                        onClick={() => {
                            reviewRef.current.scrollIntoView();
                        }}
                        style={{ color: '#6B7070', cursor: 'pointer' }}>
                        {`${spot.numReviews} reviews`}
                    </span>
                </div>
            </div>
        </div>

    )
}
