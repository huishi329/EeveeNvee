import styles from './TripPage.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBookings } from '../../store/bookings';
import SingleTrip from './SingleTrip/SingleTrip';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';


export default function TripPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(state => state.session.user);
    const trips = useSelector(state => state.bookings.trips);

    useEffect(() => {
        dispatch(getCurrentBookings());
    }, [dispatch]);

    useEffect(() => {
        if (!user) navigate('/');
    }, [trips, user, navigate]);

    if (!trips) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Trips</h1>
                <div className={styles.categories}>
                    <div className={`${styles.category} ${!location.pathname.includes('past') && styles.selected}`}
                        onClick={() => navigate('/trips/upcoming')}
                    >Upcoming</div>
                    <div className={`${styles.category} ${location.pathname.includes('past') && styles.selected}`}
                        onClick={() => navigate('/trips/past')}
                    >Past</div>
                </div>
            </div>
            <Routes>
                <Route path='/past' element={
                    <div className={styles.tripsWrapper}>
                        {trips.pastTrips.map(booking => (
                            <SingleTrip key={booking.id} booking={booking} />
                        ))}
                    </div>
                } />
                <Route path='*' element={
                    <div className={styles.tripsWrapper}>
                        {trips.upcomingTrips.map(booking => (
                            <SingleTrip key={booking.id} booking={booking} />
                        ))}
                    </div>
                } />
            </Routes>

        </div>
    )

}
