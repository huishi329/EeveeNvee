import styles from './ImageEditor.module.css';
import { useEffect, useState } from 'react';
import ImageDropdownMenu from './ImageDropdownMenu/ImageDropdownMenu';


export default function ImageEditor({ imgURL, position }) {
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);

    useEffect(() => {
        if (!showDropDownMenu) return;

        const closeDropdownMenu = () => {
            setShowDropDownMenu(false);
        };
        // click anywhere on the window, close the profile menu
        const modal = document.getElementById('editSpotForm');
        console.log(modal);
        modal.addEventListener('click', closeDropdownMenu);
        modal.addEventListener('scroll', closeDropdownMenu);

        return () => {
            modal.removeEventListener("click", closeDropdownMenu);
            modal.removeEventListener("scroll", closeDropdownMenu);
        }
    }, [showDropDownMenu]);

    return (
        <div className={styles.wrapper} draggable>
            <div className={styles.previewImage}>
                <img className="spotImage" src={imgURL} alt={`${position}`} />
                {position === 0 && <div className={styles.cover}>Cover photo</div>}
                <button type='button' className={styles.button}
                    onClick={() => setShowDropDownMenu(true)}
                >
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            {showDropDownMenu &&
                <ImageDropdownMenu />}
        </div>
    )
}
