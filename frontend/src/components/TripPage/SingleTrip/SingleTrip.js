import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import ReservationConfirmation from '../../ReservationConfirmation/ReservationConfirmation';
import styles from './SingleTrip.module.css';
import TripCancelWarning from './TripCancelWarning/TripCancelWarning';
import ReviewForm from '../../ReviewForm/ReviewForm';
import ReviewDeleteWarning from './ReviewDeleteWarning/ReviewDeleteWarning';
import ChangeReservation from './ChangeReservation/ChangeReservation';

export default function SingleTrip({ booking, review }) {
    const { startDate, endDate } = booking;
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [showReservation, setShowReservation] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showTripCancelWarning, setShowTripCancelWarning] = useState(false);
    const [showChangeReservation, setShowChangeReservation] = useState(false);
    const { title, street, city, state, country } = booking.Spot;
    const start = new Date(startDate + 'T15:00:00');
    const end = new Date(endDate + 'T11:00:00');

    const showReservationModal = () => {
        setShowModal(true);
        setShowTripCancelWarning(false);
        setShowDeleteWarning(false);
        setShowReviewForm(false);
        setShowChangeReservation(false);
        setShowReservation(true);
    }

    const showTripCancelWarningModal = () => {
        setShowModal(true);
        setShowReservation(false);
        setShowReviewForm(false);
        setShowDeleteWarning(false);
        setShowChangeReservation(false);
        setShowTripCancelWarning(true);
    }

    const showReviewFormModal = () => {
        setShowModal(true);
        setShowReservation(false);
        setShowDeleteWarning(false);
        setShowTripCancelWarning(false);
        setShowChangeReservation(false);
        setShowReviewForm(true);
    }

    const showReviewDeleteModal = () => {
        setShowModal(true);
        setShowReservation(false);
        setShowReviewForm(false);
        setShowTripCancelWarning(false);
        setShowChangeReservation(false);
        setShowDeleteWarning(true);
    }

    const showChangeReservationModal = () => {
        setShowModal(true);
        setShowReservation(false);
        setShowReviewForm(false);
        setShowTripCancelWarning(false);
        setShowDeleteWarning(false);
        setShowChangeReservation(true);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.infoWrapper}>
                <h2 className={styles.title}
                    onClick={showReservationModal}>{title}</h2>
                <div className={styles.details}
                    onClick={showReservationModal}>
                    <div className={styles.date}>
                        <div className={styles.day}>
                            <div>
                                <div className={styles.largeText}>
                                    {start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                                <div className={styles.largeText}>
                                    {end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                            <div> {'-'}</div>
                        </div>
                        <div>
                            {start.getFullYear()}
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
                        review ?
                            <div className={styles.buttonGroup}>
                                <button className={styles.delete} onClick={showReviewDeleteModal}>Delete my review</button>
                                <button onClick={showReviewFormModal}>Edit my review</button>
                            </div>
                            :
                            <button onClick={showReviewFormModal}>Rate my stay</button>
                        :
                        <div className={styles.buttonGroup}>
                            <button onClick={showTripCancelWarningModal}>Cancel trip</button>
                            <button onClick={showChangeReservationModal}>Change reservation</button>
                        </div>}
                </div>
            </div>
            <div className={styles.imageWrapper}
                onClick={showReservationModal}>
                <img src={booking.Spot.previewImage} alt='spot' className={styles.image} />
            </div>
            {showModal && <Modal onClose={() => { setShowModal(false); }}>
                {showReservation && <ReservationConfirmation reservation={booking} spot={booking.Spot} setShowModal={setShowModal} setShowReservation={setShowReservation} />}
                {showTripCancelWarning && <TripCancelWarning bookingId={booking.id} setShowModal={setShowModal} setShowTripCancelWarning={setShowTripCancelWarning} />}
                {showReviewForm && <ReviewForm spot={booking.Spot} setShowModal={setShowModal} setShowReviewForm={setShowReviewForm} originalReview={review} />}
                {showDeleteWarning && <ReviewDeleteWarning review={review} setShowModal={setShowModal} setShowDeleteWarning={setShowDeleteWarning} />}
                {showChangeReservation && <ChangeReservation booking={booking} setShowModal={setShowModal} setShowChangeReservation={setShowChangeReservation} />}
            </Modal>}
        </div >
    )
}
