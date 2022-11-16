import { Route } from "react-router-dom";
import SpotTile from "../SpotTile";
import './SpotList.css'

function SpotList ( {spots}) {
    const spotsArr = Object.values(spots);

    return (
        <div className="spot_list">
            {spotsArr.map(spot => <SpotTile key={spot.id} spot={spot}/>)}
        </div>
    )
}

export default SpotList;
