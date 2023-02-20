import { useDispatch } from "react-redux";
import { deleteReview } from "../../../../store/reviews";
import styles from "./ReviewDeleteWarning.module.css";

export default function ReviewDeleteWarning({ review, setShowModal, setShowDeleteWarning }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteReview(review))
            .then(() => closeModal());
    }

    const closeModal = () => {
        setShowDeleteWarning(false);
        setShowModal(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.warning}>
                <div className={styles.title}>
                    <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                    <div className={styles.titleText}>Delete this review?</div>
                    <div className={styles.placeholder}></div>
                </div>
                <div className={styles.message}>Once you delete it, you can't get it back.</div>
                <div className={styles.buttons}>
                    <div className={styles.cancel} onClick={closeModal}>Cancel</div>
                    <div className={styles.delete}
                        onClick={handleDelete}>
                        Delete it
                    </div>
                </div>
            </div>
        </div>
    )
}
