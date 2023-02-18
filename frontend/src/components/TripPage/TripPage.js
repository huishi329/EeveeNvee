import styles from './TripPage.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBookings } from '../../store/bookings';
import SingleTrip from './SingleTrip/SingleTrip';


export default function TripPage() {
    const dispatch = useDispatch();
    const trips = useSelector(state => state.bookings.trips);

    useEffect(() => {
        dispatch(getCurrentBookings());
    }, [dispatch]);

    if (!trips) return null;

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Trips</h1>
            <div className={styles.tripsWrapper}>
                {trips.map(booking => (
                    <SingleTrip key={booking.id} booking={booking} />
                ))}
            </div>
        </div>
    )

}
