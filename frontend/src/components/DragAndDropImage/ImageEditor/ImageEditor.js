import styles from './ImageEditor.module.css';
import { useEffect, useState } from 'react';
import ImageDropdownMenu from './ImageDropdownMenu/ImageDropdownMenu';


export default function ImageEditor({ image }) {
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);

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
        <div className={styles.wrapper} draggable>
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
                <ImageDropdownMenu image={image} />}
        </div>
    )
}
