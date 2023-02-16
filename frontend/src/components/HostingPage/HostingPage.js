import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getHostingSpots } from '../../store/spot';
import styles from './HostingPage.module.css';


export default function HostingPage() {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const hostingSpots = useSelector(state => state.spots.hostingSpots);

    useEffect(() => {
        if (!user) {
            history.push('/');
        }
        dispatch(getHostingSpots());
    }, [user]);

    if (!hostingSpots) return null;

    return (
        <div>
            <h1>
                {Object.keys(hostingSpots).length} listings
            </h1>
        </div>
    )
};
