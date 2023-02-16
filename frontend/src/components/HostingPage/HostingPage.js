import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getHostingSpots } from '../../store/spot';
import HostingList from './HostingList/HostingList';
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
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <h2>
                    {Object.keys(hostingSpots).length} listings
                </h2>
                <button className={styles.button}>
                    <i className="fa-solid fa-plus"></i>
                    Create listing
                </button>
            </div>
            <HostingList hostingSpots={hostingSpots} />
        </div>
    )
};
