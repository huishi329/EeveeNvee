import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EditSpotMenu.module.css';

export default function EditSpotMenu({ spot }) {
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick = (path) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/spots/${spot.id}/edit/${path}`);
    }

    return (
        <div className={styles.wrapper} >
            <div className={styles.menu}>
                <div
                    className={`${styles.option} ${location.pathname.includes('/basics') && styles.selected}`}
                    onClick={() => handleClick('basics')}
                >Listing basics</div>
                <div
                    className={`${styles.option} ${location.pathname.includes('/photos') && styles.selected}`}
                    onClick={() => handleClick('photos')}
                >Photos</div>
            </div>
        </div>
    )
};
