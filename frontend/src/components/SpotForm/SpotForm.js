import React, { useState } from 'react';
import { createSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './SpotForm.module.css';
import DragAndDropImage from '../DragAndDropImage/DragAndDropImage';


export default function SpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imgFiles, setImgFiles] = useState([]);
    const [errors, setErrors] = useState([]);
    console.log(imgFiles, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
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
        return dispatch(createSpot(spotData, imgFiles, history))
            .then(() => setShowModal(false))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };



    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2>Create a spot</h2>
                    <div>
                        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                    </div>
                    <input
                        placeholder='Street'
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                        style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
                    />
                    <input
                        placeholder='City'
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <input
                        placeholder='State'
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
                        min='0'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <DragAndDropImage setImgFiles={setImgFiles} imgFiles={imgFiles} />
                    {/* <input
                        className='spotImageInput'
                        placeholder='Preview Image'
                        type="file"
                        accept='.png, .jpeg, .jpg'
                        onChange={handleImageChange}
                        required
                        multiple
                        style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
                    /> */}
                    {imgFiles.map((file, i) => (
                        <div className={styles.previewImage} key={i}>
                            <img className="spotImage" src={file} alt={name} />
                        </div>))}
                    <button type="submit">Submit</button>
                </form >
            </div>
        </div>
    );
}
