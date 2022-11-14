import SpotTile from "../SpotTile";
import './SpotList.css'

function SpotList ( {spots}) {

    return (
        <div className="spot_list">
            {spots.map(spot => <SpotTile key={spot.id} spot={spot}/>)}
        </div>
    )
}

export default SpotList;
