import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SpotTile from "../SpotTile";
import { getAllSpots } from "../../store/spots";
import './SpotView.css'

function SpotView() {
    const spots = useSelector(state => state.spots.allSpots);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    if (!spots) return null;

    const spotsArr = Object.values(spots);

    return (
        <div className="spot-view">
            {spotsArr.map(spot => <SpotTile key={spot.id} spot={spot} />)}
        </div>
    )
}

export default SpotView;
