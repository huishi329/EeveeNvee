import './EditSpot.css';

function EditSpot( {spot}) {
    return (

        <div className="edit-spot">
            <div className="spot-info">
                <div className="spot-info-left">
                    <div className="price-bold">{`$${spot.price} CAD`}</div>
                    <div className="night">night</div>
                </div>
                <div className="spot-info-right">
                    <span>
                        <i className="fa-sharp fa-solid fa-star"></i>
                        {`${Number(spot.avgStarRating).toFixed(2)}`}
                    </span>
                    ·
                    <span style={{ color: '#6B7070' }}>
                        {`${spot.numReviews} reviews`}
                    </span>
                </div>

            </div>
        </div>

    )
}

export default EditSpot;
