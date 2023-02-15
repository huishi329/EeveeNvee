import styles from './EditSpotPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetail } from '../../store/spot';
import EditSpotForm from '../EditSpotForm/EditSpotForm';

export default function EditSpotPage({ }) {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const params = useParams();
    const spotId = params.spotId;

    useEffect(() => {
        dispatch(getSpotDetail(spotId));
    }, [dispatch, spotId]);

    if (!spot) return null;

    return (
        <div className={styles.wrapper}>
            <h1>{spot.name}</h1>
            <div className={styles.container}>
                <div></div>
                <EditSpotForm spot={spot} />

            </div>
        </div>
    );
}
