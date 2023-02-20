import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import ReservationConfirmation from '../../ReservationConfirmation/ReservationConfirmation';
import styles from './SingleTrip.module.css';

export default function SingleTrip({ booking }) {
    let { startDate, endDate } = booking;
    const location = useLocation();
    const [showReservation, setShowReservation] = useState(false);
    const { title, street, city, state, country } = booking.Spot;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    return (
        <div className={styles.wrapper}>
            <div className={styles.infoWrapper}>
                <h2 className={styles.title}
                    onClick={() => setShowReservation(true)}>{title}</h2>
                <div className={styles.details}
                    onClick={() => setShowReservation(true)}>
                    <div className={styles.date}>
                        <div className={styles.day}>
                            <div>
                                <div className={styles.largeText}>
                                    {startDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                                </div>
                                <div className={styles.largeText}>
                                    {endDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                            <div> {'-'}</div>
                        </div>
                        <div>
                            {startDate.getFullYear()}
                        </div>
                    </div>
                    <div className={styles.location}>
                        <div className={styles.largeText}>
                            {street}, {city}, {state},
                        </div>
                        <div>
                            {country}
                        </div>
                    </div>
                </div>
                <div className={styles.buttonDiv}>
                    {location.pathname.includes('past') ?
                        <button>Rate my stay</button> :
                        <button>Cancel trip</button>}
                </div>
            </div>
            <div className={styles.imageWrapper}
                onClick={() => setShowReservation(true)}>
                <img src={booking.Spot.previewImage} alt='spot' className={styles.image} />
            </div>
            {
                showReservation &&
                <Modal onClose={() => setShowReservation(false)}>
                    <ReservationConfirmation reservation={booking} spot={booking.Spot} setShowReservation={setShowReservation} />
                </Modal>
            }
        </div >
    )
}
