import { useDispatch } from "react-redux";
import { deleteSpotImage } from "../../../../store/spots";
import styles from "./SpotImageDeleteWarning.module.css";

export default function SpotImageDeleteWarning({ image, setShowSpotImageDeleteWarning }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteSpotImage(image.id, image.position))
            .then(() => setShowSpotImageDeleteWarning(false));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.warning}>
                <div className={styles.title}>
                    <i className="fa-solid fa-xmark" onClick={() => setShowSpotImageDeleteWarning(false)}></i>
                    <div className={styles.titleText}>Delete this photo?</div>
                    <div className={styles.placeholder}></div>
                </div>
                <div className={styles.message}>Once you delete it, you can't get it back.</div>
                <div className={styles.buttons}>
                    <div className={styles.cancel}
                        onClick={() => setShowSpotImageDeleteWarning(false)}
                    >
                        Cancel
                    </div>
                    <div className={styles.delete}
                        onClick={handleDelete}>
                        Delete it
                    </div>
                </div>
            </div>
        </div>
    )
}
