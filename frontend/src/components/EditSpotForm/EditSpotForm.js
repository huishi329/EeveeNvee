import { useEffect, useState } from 'react';
import { createSpot, getSpotDetail, updateSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
import styles from './EditSpotForm.module.css';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../context/Modal';

export default function EditSpotForm({ spot }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [street, setStreet] = useState(spot?.street);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [title, setName] = useState(spot?.title)
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [errors, setErrors] = useState([]);
    const [isSaved, setIsSaved] = useState(false);

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
            title,
            description,
            price
        };
        if (spot) {
            dispatch(updateSpot(spot.id, spotData))
                .then(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    setIsSaved(true);
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
        }
        else {
            dispatch(createSpot(spotData))
                .then((spotId) => {
                    dispatch(getSpotDetail(spotId))
                        .then(() => navigate(`/spots/${spotId}/edit/photos`));
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
        }
    }

    useEffect(() => {
        const removeFocus = () => {
            if (document.activeElement.type === "number") {
                // removes keyboard focus from the current element
                document.activeElement.blur();
            }
        };
        window.addEventListener("wheel", removeFocus);

        return () => {
            window.removeEventListener("wheel", removeFocus);
        };
    }, []);


    return (
        <div className={styles.wrapper}>
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
                    <label>Title</label>
                    <input
                        placeholder='Title'
                        type="text"
                        value={title}
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
                <button className={styles.button} type="submit">{spot ? 'Save' : 'Next'}</button>
            </form >
            {isSaved && <Modal onClose={() => setIsSaved(false)}>
                <div className={styles.modal}>
                    <div className={styles.modalButton}>
                        <i className="fa-solid fa-xmark" onClick={() => setIsSaved(false)}></i>
                    </div>
                    <div className={styles.modalText}>
                        Your listing is saved!
                    </div>

                </div>
            </Modal>}
        </div>
    );
}
