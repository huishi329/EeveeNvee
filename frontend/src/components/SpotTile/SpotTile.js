import { NavLink } from 'react-router-dom';
import './SpotTile.css';

function SpotTile({ spot }) {
    return (
        <NavLink to={`/spots/${spot.id}`}>
            <div className="spot_tile">
                <div className='spot_image'>
                    <img src={spot.previewImage} alt={spot.title}></img>
                </div>
                <div className='spot_title'>
                    <div className='spot_intro'>
                        <div className='title_bold'>
                            {`${spot.city}, ${spot.country}`}
                        </div>
                        <div className='title_bold'>
                            {`$${spot.price} CAD`}
                            <span> night</span>
                        </div>
                    </div>
                    <div className='spot_rating'>
                        <i className="fa-sharp fa-solid fa-star"></i>
                        {spot.avgRating ? `${Number(spot.avgRating).toFixed(1)}` : 'New'}
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default SpotTile
