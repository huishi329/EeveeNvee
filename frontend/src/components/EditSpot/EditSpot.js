import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './EditSpot.css';
import { deleteSpot } from '../../store/spot';
import { useHistory } from 'react-router-dom';

function EditSpot({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        if (sessionUser) {
            if (sessionUser.id === spot.ownerId) setIsHost(true)
        }

    }, [dispatch, sessionUser])

    const deleteHostSpot = () => {

        dispatch(deleteSpot(spot.id)).then(() => history.push('/'))
    }

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

            {isHost &&
                <div className='edit-button'>
                    <div>
                        <button
                        onClick={()=> {

                        }}
                        >Edit my spot</button>
                    </div>
                    <div>
                        <button
                            onClick={deleteHostSpot}
                        >Delete my spot</button>
                    </div>
                </div>
            }
        </div>

    )
}

export default EditSpot;
