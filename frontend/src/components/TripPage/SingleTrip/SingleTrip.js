import styles from './SingleTrip.module.css';

export default function SingleTrip({ booking }) {
    let { startDate, endDate } = booking;
    const { title, street, city, state, country } = booking.Spot;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    return (
        <div className={styles.wrapper}>
            <div className={styles.infoWrapper}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.details}>
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
            </div>
            <div className={styles.imageWrapper}>
                <img src={booking.Spot.previewImage} alt='spot' className={styles.image} />
            </div>
        </div >
    )
}
