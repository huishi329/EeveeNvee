import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import DragAndDropImage from '../../DragAndDropImage/DragAndDropImage';
import EditSpotForm from '../../EditSpotForm/EditSpotForm';
import styles from './EditSpotMenu.module.css';

export default function EditSpotMenu({ spot }) {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname);

    return (
        <div className={styles.wrapper} >
            <div className={styles.main}>
                <div
                    className={`${styles.option} ${location.pathname.includes('/basics') ? styles.selected : ''}}`}
                    onClick={() => navigate(`/spots/${spot.id}/edit/basics`)}
                >Listing basics</div>
                <div
                    className={`${styles.option} ${location.pathname.includes('/basics') ? styles.selected : ''}}`}
                    onClick={() => navigate(`/spots/${spot.id}/edit/photos`)}
                >Photos</div>
            </div>
        </div>
    )
};
