import styles from './ImageEditor.module.css';
import { useEffect, useState } from 'react';
import ImageDropdownMenu from './ImageDropdownMenu/ImageDropdownMenu';
import { Modal } from '../../../context/Modal';
import SpotImageDeleteWarning from './SpotImageDeleteWarning/SpotImageDeleteWarning';
import { useDispatch } from 'react-redux';
import { shuffleSpotImages } from '../../../store/spots';

export default function ImageEditor({ image, dragStartImage, setDragStartImage }) {
    const dispatch = useDispatch();
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);
    const [showSpotImageDeleteWarning, setShowSpotImageDeleteWarning] = useState(false);
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(shuffleSpotImages(dragStartImage, image));
    };

    const handleDefault = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }


    useEffect(() => {
        if (!showDropDownMenu) return;

        const closeDropdownMenu = () => {
            setShowDropDownMenu(false);
        };
        // click anywhere on the window, close the profile menu
        window.addEventListener('click', closeDropdownMenu);
        window.addEventListener('scroll', closeDropdownMenu);

        return () => {
            window.removeEventListener("click", closeDropdownMenu);
            window.removeEventListener("scroll", closeDropdownMenu);
        }
    }, [showDropDownMenu]);


    return (
        <div className={styles.wrapper}
            draggable
            onDragStart={() => setDragStartImage(image)}
            onDrop={handleDrop}
            onDragOver={handleDefault}
            onDragEnter={handleDefault}
        >
            <div className={styles.previewImage}>
                <img className="spotImage" src={image.url} alt={`${image.position}`} />
                {image.position === 0 && <div className={styles.cover}>Cover photo</div>}
                <button type='button' className={styles.button}
                    onClick={() => setShowDropDownMenu(true)}
                >
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            {showDropDownMenu &&
                <ImageDropdownMenu image={image} setShowSpotImageDeleteWarning={setShowSpotImageDeleteWarning} />}
            {showSpotImageDeleteWarning &&
                <Modal onClose={() => setShowSpotImageDeleteWarning(false)}>
                    <SpotImageDeleteWarning image={image} setShowSpotImageDeleteWarning={setShowSpotImageDeleteWarning} />
                </Modal>}
        </div>
    )
}
