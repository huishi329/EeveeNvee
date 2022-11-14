import './SpotTile.css'

function SpotTile({ spot }) {
    return (
        <div className="spot_tile">
            <div className='spot_image'>
                <img src={spot.previewImage} alt={spot.name}></img>
            </div>
            <div className='spot_title'>
                <div className='title-bold'>
                    {`${spot.city}, ${spot.country}`}
                </div>
            </div>
        </div>
    );
}

export default SpotTile
