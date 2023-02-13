import styles from './ImageEditor.module.css';
import { useState } from 'react';

export default function ImageEditor({ imgURL, position }) {
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);
    return (
        <div >
            <div className={styles.previewImage}>
                <img className="spotImage" src={imgURL} alt={`${position}`} />
                {position === 0 && <div className={styles.cover}>Cover photo</div>}
                <button type='button' className={styles.button} onClick={setShowDropDownMenu(true)}>
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            {showDropDownMenu &&
                <div>

                </div>}
        </div>
    )
}
