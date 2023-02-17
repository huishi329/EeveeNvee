import styles from './ImageDropdownMenu.module.css';

export default function ImageDropdownMenu({ image, setShowSpotImageDeleteWarning }) {
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
                onClick={() => setShowSpotImageDeleteWarning(true)}>
                <span>Delete</span>
            </div>
        </div>
    )
}
