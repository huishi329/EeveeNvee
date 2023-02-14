import { useEffect, useState } from 'react';
import { getSpotDetail, updateSpot } from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './EditSpotForm.module.css';
import DragAndDropImage from '../DragAndDropImage/DragAndDropImage';

export default function EditSpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const params = useParams();
    const spotId = params.spotId;
    const [street, setStreet] = useState(spot?.street);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [name, setName] = useState(spot?.name)
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [imgFiles, setImgFiles] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const spotData = {
            street,
            city,
            state,
            country,
            lat: 48,
            lng: 120,
            name,
            description,
            price
        };
        return dispatch(updateSpot(spot.id, spotData))
            .then(() => setShowModal(false))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    useEffect(() => {
        dispatch(getSpotDetail(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        setStreet(spot?.street);
        setCity(spot?.city);
        setState(spot?.state);
        setCountry(spot?.country);
        setName(spot?.name);
        setDescription(spot?.description);
        setPrice(spot?.price);
    }, [spot]);

    if (!spot) return null;

    return (
        <div className={styles.wrapper} id='editSpotForm'>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Edit Spot</h2>
                <div className='errors-div'>
                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
                <input
                    placeholder='Street'
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                />
                <input
                    placeholder='city'
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <input
                    placeholder='state'
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                <input
                    placeholder='Country'
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                <input
                    placeholder='Name'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <input
                    placeholder='Price'
                    type="number"
                    value={price}
                    min='0'
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <DragAndDropImage setImgFiles={setImgFiles} imgFiles={imgFiles} />
                <button className={styles.button} type="submit">Submit</button>
            </form >
        </div>
    );
}
