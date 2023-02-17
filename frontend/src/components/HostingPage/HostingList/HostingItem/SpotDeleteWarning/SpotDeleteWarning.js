import { useDispatch } from "react-redux";
import { deleteSpot } from "../../../../../store/spot";
import styles from "./SpotDeleteWarning.module.css";


export default function SpotDeleteWarning({ spotId, setShowSpotDeleteWarning, title }) {
    const dispatch = useDispatch();
    const deleteHostSpot = () => {
        dispatch(deleteSpot(spotId)).then(() => setShowSpotDeleteWarning(false))
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.warning}>
                <div className={styles.title}>
                    <i className="fa-solid fa-xmark" onClick={() => setShowSpotDeleteWarning(false)}></i>
                    <div className={styles.titleText}>Delete this spot?</div>
                    <div className={styles.placeholder}></div>
                </div>

                <div className={styles.message}>Once you delete <span>{title}</span>, this action cannot be undone.</div>
                <div className={styles.buttons}>
                    <div className={styles.cancel}
                        onClick={() => setShowSpotDeleteWarning(false)}
                    >
                        Cancel
                    </div>
                    <div className={styles.delete}
                        onClick={deleteHostSpot}>
                        Delete it
                    </div>
                </div>
            </div>
        </div>
    )
}
