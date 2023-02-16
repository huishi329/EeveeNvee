import { useDispatch } from "react-redux";
import { deleteSpot } from "../../../../../store/spot";
import styles from "./DeleteWarning.module.css";


export default function DeleteWarning({ spotId, setShowDeleteWarning }) {
    const dispatch = useDispatch();
    const deleteHostSpot = () => {
        dispatch(deleteSpot(spotId)).then(() => setShowDeleteWarning(false))
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.warning}>
                <div className={styles.title}>Are you sure?</div>
                <div className={styles.message}>This action cannot be undone.</div>
                <div className={styles.buttons}>
                    <div className={styles.cancel}
                        onClick={() => setShowDeleteWarning(false)}
                    >
                        Cancel
                    </div>
                    <div className={styles.delete}
                        onClick={deleteHostSpot}>
                        Permanately Delete
                    </div>
                </div>
            </div>
        </div>
    )
}
