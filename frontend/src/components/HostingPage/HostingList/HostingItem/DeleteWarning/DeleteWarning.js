import { useDispatch } from "react-redux";
import { deleteSpot } from "../../../../../store/spot";
import styles from "./DeleteWarning.module.css";


export default function DeleteWarning({ spotId, setShowDeleteWarning, name }) {
    const dispatch = useDispatch();
    const deleteHostSpot = () => {
        dispatch(deleteSpot(spotId)).then(() => setShowDeleteWarning(false))
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.warning}>
                <div className={styles.title}>
                    <i className="fa-solid fa-xmark" onClick={() => setShowDeleteWarning(false)}></i>
                    <div className={styles.titleText}>Delete this spot?</div>
                    <div></div>
                </div>

                <div className={styles.message}>Once you delete <span>{name}</span>, this action cannot be undone.</div>
                <div className={styles.buttons}>
                    <div className={styles.cancel}
                        onClick={() => setShowDeleteWarning(false)}
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
