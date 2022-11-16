import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotDetail } from "../../store/spot";
import { setNavbar, restoreNavbar } from "../../store/style";
import EditSpot from "../EditSpot";
import './SpotDetail.css';


function SpotDetail({ spots }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot)
    useEffect(() => {
        dispatch(setNavbar());
        dispatch(getSpotDetail(spotId));
        return () => dispatch(restoreNavbar());
    }, [dispatch, spotId])
    return (
        <div className="spot-detail">
            {spot &&
                <>
                    <h1>{spot.name}</h1>
                    <div className="spot-summary">
                        <span>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            {`${Number(spot.avgStarRating).toFixed(2)}`}
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
                        <div className="spot-image">
                            <img src={spot.SpotImages[0].url} alt={spot.name}></img>
                        </div>
                        <div className="spot-main">
                            <div className="spot-description">
                                <h2>{`${spot.name} hosted by`}</h2>
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
