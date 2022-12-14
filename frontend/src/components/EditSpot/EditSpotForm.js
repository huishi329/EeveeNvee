import React, { useState } from 'react';
import { updateSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';


function EditSpotForm({ setShowModal, spot }) {
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const spotData = {
            address,
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
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Spot</h2>
            <div className='errors-div'>
                {errors.map((error, idx) => <div key={idx}>{error}</div>)}
            </div>
            <input
                placeholder='Address'
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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

            <button type="submit">Submit</button>
        </form >
    );
}

export default EditSpotForm;
