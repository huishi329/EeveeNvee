import styles from './SingleTrip.module.css';

export default function SingleTrip({ booking }) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.infoWrapper}>
                <h1 className={styles.header}>{booking.Spot.title}</h1>
                <p className={styles.location}>{booking.Spot.location}</p>
                <p className={styles.date}>{booking.startDate} - {booking.endDate}</p>
            </div>
            <div className={styles.imageWrapper}>
                <img src={booking.Spot.previewImage} alt='spot' className={styles.image} />
            </div>
        </div>
    )
}
