import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getHostingSpots } from '../../store/spots';
import HostingList from './HostingList/HostingList';
import styles from './HostingPage.module.css';

export default function HostingPage() {
    const user = useSelector(state => state.session.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hostingSpots = useSelector(state => state.spots.hostingSpots);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        dispatch(getHostingSpots());
    }, [user]);

    if (!hostingSpots) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <h2>
                    {Object.keys(hostingSpots).length} listings
                </h2>
                <button className={styles.button}
                    onClick={() => navigate('/spots/create-listing')}>
                    <i className="fa-solid fa-plus"></i>
                    Create listing
                </button>
            </div>
            <HostingList hostingSpots={hostingSpots} />
        </div>
    )
};
