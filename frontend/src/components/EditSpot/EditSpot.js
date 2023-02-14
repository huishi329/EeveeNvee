import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './EditSpot.css';
import { deleteSpot } from '../../store/spot';

export default function EditSpot({ spot, reviewRef }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        if (sessionUser) {
            if (sessionUser.id === spot.ownerId) setIsHost(true)
        }
        return () => setIsHost(false);
    }, [dispatch, sessionUser, spot.ownerId])

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
                    <span
                        onClick={() => {
                            reviewRef.current.scrollIntoView();
                        }}
                        style={{ color: '#6B7070', cursor: 'pointer' }}>
                        {`${spot.numReviews} reviews`}
                    </span>
                </div>
            </div>

            {isHost &&
                <div className='edit-button'>
                    <div>
                        <button
                            onClick={() => history.push(`/spots/${spot.id}/edit`)}
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
