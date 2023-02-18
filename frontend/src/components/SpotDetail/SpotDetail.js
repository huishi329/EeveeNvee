import styles from './SpotDetail.module.css';
import SpotImages from './SpotImages/SpotImages';
import SpotBooking from '../SpotBooking/SpotBooking';
import { useEffect } from 'react';
import { clearSingleSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';

export default function SpotDetail({ spot, reviewRef }) {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => dispatch(clearSingleSpot());
    }, []);

    return (
        <div className={styles.spotDetail}>
            {spot &&
                <>
                    <h1>{spot.title}</h1>
                    <div className={styles.spotSummary}>
                        <span style={{ textDecoration: 'none' }}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            {spot.avgStarRating ?
                                <span style={{ fontWeight: 600 }}>{`${Number(spot.avgStarRating).toFixed(1)}`}</span> :
                                <span style={{ fontWeight: 400 }}>New</span>
                            }
                        </span>
                        ·
                        {spot.numReviews ?
                            <span
                                onClick={() => {
                                    reviewRef.current.scrollIntoView();
                                }}
                                style={{ cursor: 'pointer' }}
                            >{`${spot.numReviews} reviews`}</span> : ' '}

                        <i className="fa-regular fa-heart"></i>
                        Superhost ·
                        <span>
                            {`${spot.city}, ${spot.state}, ${spot.country}`}
                        </span>
                        {Object.keys(spot.SpotImages).length > 0 && <SpotImages images={spot.SpotImages} />}

                        <div className={styles.spotMain}>
                            <div className={styles.spotDescription}>
                                <h2>{`${spot.title} hosted by ${spot.Owner.firstName}`}</h2>
                                <p>{spot.description}</p>
                            </div>
                            <SpotBooking spot={spot} reviewRef={reviewRef} />
                        </div>
                    </div>
                </>
            }
        </div >
    )

}
