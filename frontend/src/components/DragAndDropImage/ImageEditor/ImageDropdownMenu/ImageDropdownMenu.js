import styles from './ImageDropdownMenu.module.css';
import { useDispatch } from 'react-redux';
import { deleteSpotImage } from '../../../../store/spot';


export default function ImageDropdownMenu({ image }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteSpotImage(image.id, image.position));
    };

    return (
        <div className={styles.dropdownMenu}>
            <div className={styles.menuItem}>
                <span>Move forward</span>
            </div>
            <div className={styles.menuItem}>
                <span>Move backward</span>
            </div>
            <div className={styles.menuItem}>
                <span>Make cover photo</span>
            </div>
            <div className={styles.menuItem}
                onClick={handleDelete}>
                <span>Delete</span>
            </div>
        </div>
    )
}
