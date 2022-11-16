import { NavLink } from 'react-router-dom';
import './SpotTile.css';

function SpotTile({ spot }) {
    return (
        <NavLink to={`/spots/${spot.id}`}>
            <div className="spot_tile">
                <div className='spot_image'>
                    <img src={spot.previewImage} alt={spot.name}></img>
                </div>
                <div className='spot_title'>
                    <div className='spot_intro'>
                        <div className='title-bold'>
                            {`${spot.city}, ${spot.country}`}
                        </div>
                        <div className='title-bold'>
                            {`$${spot.price} CAD`}
                            <span> night</span>
                        </div>
                    </div>
                    <div className='spot_rating'>
                        <i className="fa-sharp fa-solid fa-star"></i>
                        {`${Number(spot.avgRating).toFixed(2)}`}
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default SpotTile
