import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SpotTile from "../SpotTile";
import { getAllSpots } from "../../store/spot";
import './SpotList.css'

function SpotList() {
    const spots = useSelector(state => state.spots.allSpots);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    if (!spots) return;

    const spotsArr = Object.values(spots);

    return (
        <div className="spot_list">
            {spotsArr.map(spot => <SpotTile key={spot.id} spot={spot} />)}
        </div>
    )
}

export default SpotList;
