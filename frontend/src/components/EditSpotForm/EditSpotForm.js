import { useEffect, useState } from 'react';
import { updateSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './EditSpotForm.module.css';
import DragAndDropImage from '../DragAndDropImage/DragAndDropImage';

export default function EditSpotForm({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [street, setStreet] = useState(spot?.street);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [name, setName] = useState(spot?.name)
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [imgFiles, setImgFiles] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
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
        try {
            dispatch(updateSpot(spot.id, spotData));
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) setErrors(Object.values(data.errors));
        };
        history.push(`/spots/${spot.id}`);
    };

    return (
        <div className={styles.wrapper} id='editSpotForm'>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* <h2>Edit Spot</h2> */}
                {errors.length > 0 && <div className='errors-div'>
                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>}
                <div className={styles.input}>
                    <label>Street</label>
                    <input
                        placeholder='e.g. 11108 108th Avenue'
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.input}>
                    <label>City</label>
                    <input
                        placeholder='e.g. Edmonton'
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.input}>
                    <label>State</label>
                    <input
                        placeholder='e.g. Alberta'
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.input}>
                    <label>Country</label>
                    <input
                        placeholder='e.g. Canada'
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.input}>
                    <label>Name</label>
                    <input
                        placeholder='Name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.input}>
                    <label>Description</label>
                    <textarea
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className={styles.input}>

                    <label>Price</label>
                    <input
                        placeholder='Price'
                        type="number"
                        value={price}
                        min='0'
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <DragAndDropImage setImgFiles={setImgFiles} imgFiles={imgFiles} />
                <button className={styles.button} type="submit">Save</button>
            </form >
        </div>
    );
}
