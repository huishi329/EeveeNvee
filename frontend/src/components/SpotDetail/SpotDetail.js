import EditSpot from "../EditSpot";
import './SpotDetail.css';


function SpotDetail({ spot }) {

    return (
        <div className="spot-detail">
            {spot &&
                <>
                    <h1>{spot.name}</h1>
                    <div className="spot-summary">
                        <span>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            {`${Number(spot.avgStarRating).toFixed(1)}`}
                        </span>
                        ·
                        <span>
                            {`${spot.numReviews} reviews`}
                        </span>
                        ·
                        <i className="fa-regular fa-heart"></i>
                        Superhost ·
                        <span>
                            {`${spot.city}, ${spot.state},${spot.country}`}
                        </span>
                        {(spot.SpotImages).length > 0 ?
                            (<div className="spot-image">
                                <img src={spot.SpotImages[0].url} alt={spot.name}></img>
                            </div>) : (<h2>No image found</h2>)}
                        <div className="spot-main">
                            <div className="spot-description">
                                <h2>{`${spot.name} hosted by ${spot.Owner.firstName}`}</h2>
                                <hr />
                                <p>{spot.description}</p>
                            </div>
                            <EditSpot spot={spot} />
                        </div>
                    </div>

                </>
            }
        </div >
    )

}

export default SpotDetail
