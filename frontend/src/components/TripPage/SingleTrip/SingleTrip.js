import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import ReservationConfirmation from '../../ReservationConfirmation/ReservationConfirmation';
import styles from './SingleTrip.module.css';
import TripCancelWarning from './TripCancelWarning/TripCancelWarning';
import ReviewForm from '../../ReviewForm/ReviewForm';
import ReviewDeleteWarning from './ReviewDeleteWarning/ReviewDeleteWarning';

export default function SingleTrip({ booking, review }) {
    let { startDate, endDate } = booking;
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [showReservation, setShowReservation] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showTripCancelWarning, setShowTripCancelWarning] = useState(false);
    const { title, street, city, state, country } = booking.Spot;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const showReservationModal = () => {
        setShowModal(true);
        setShowTripCancelWarning(false);
        setShowDeleteWarning(false);
        setShowReviewForm(false);
        setShowReservation(true);
    }

    const showTripCancelWarningModal = () => {
        setShowModal(true);
        setShowReservation(false);
        setShowReviewForm(false);
        setShowDeleteWarning(false);
        setShowTripCancelWarning(true);
    }

    const showReviewFormModal = () => {
        setShowModal(true);
        setShowReservation(false);
        setShowDeleteWarning(false);
        setShowTripCancelWarning(false);
        setShowReviewForm(true);
    }

    const showReviewDeleteModal = () => {
        setShowModal(true);
        setShowReservation(false);
        setShowReviewForm(false);
        setShowTripCancelWarning(false);
        setShowDeleteWarning(true);
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
                        review ?
                            <div className={styles.hasReview}>
                                <button className={styles.delete} onClick={showReviewDeleteModal}>Delete my review</button>
                                <button onClick={showReviewFormModal}>Edit my review</button>
                            </div>
                            :
                            <button onClick={showReviewFormModal}>Rate my stay</button>
                        :
                        <button onClick={showTripCancelWarningModal}>Cancel trip</button>}
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
            </Modal>}
        </div >
    )
}
