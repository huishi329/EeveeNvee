import { useDispatch } from "react-redux";
import { deleteBooking } from "../../../../store/bookings";
import styles from "./TripCancelWarning.module.css";

export default function TripCancelWarning({ bookingId, setShowTripCancelWarning }) {
    const dispatch = useDispatch();
    const cancelTrip = () => {
        dispatch(deleteBooking(bookingId));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.warning}>
                <div className={styles.title}>
                    <i className="fa-solid fa-xmark" onClick={() => setShowTripCancelWarning(false)}></i>
                    <div className={styles.titleText}>Cancel this trip?</div>
                    <div className={styles.placeholder}></div>
                </div>
                <div className={styles.message}>Once you cancel it, this action cannot be undone.</div>
                <div className={styles.buttons}>
                    <div className={styles.cancel}
                        onClick={() => setShowTripCancelWarning(false)}
                    >
                        No, keep it
                    </div>
                    <div className={styles.delete}
                        onClick={cancelTrip}>
                        Yes, cancel
                    </div>
                </div>
            </div>
        </div>
    )
}
