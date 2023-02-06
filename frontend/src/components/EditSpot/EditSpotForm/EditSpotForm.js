import React, { useState } from 'react';
import { updateSpot } from '../../../store/spot';
import { useDispatch } from 'react-redux';
import styles from './EditSpotForm.module.css';


function EditSpotForm({ setShowModal, spot }) {
    const dispatch = useDispatch();
    const [street, setStreet] = useState(spot.street);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [imgFile, setImgFile] = useState(spot.SpotImages[0].url);
    const [errors, setErrors] = useState([]);
    console.log(imgFile, spot);

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
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImgFile(file)
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(".spotImage").src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit}>
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
                    <input
                        className='spotImageInput'
                        placeholder='Preview Image'
                        type="file"
                        accept='.png, .jpeg, .jpg'
                        onChange={handleImageChange}
                        required
                        multiple
                        style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
                    />
                    <div className={styles.previewImage}>
                        <img className="spotImage" src={imgFile} alt={name} />
                    </div>
                    <button type="submit">Submit</button>
                </form >
            </div>
        </div>
    );
}

export default EditSpotForm;
