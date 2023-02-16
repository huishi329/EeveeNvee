import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpot } from "../../../../store/spot";
import styles from "./HostingItem.module.css";

export default function HostingItem({ spot }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id, name, city, state, country, updatedAt, previewImage } = spot;
    const date = new Date(updatedAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const deleteHostSpot = () => {
        dispatch(deleteSpot(spot.id)).then(() => history.push('/'))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.listing}>
                <div className={styles.identifier}>
                    <div className={styles.previeImage}>
                        <img src={previewImage} alt={name}></img></div>
                    <div className={styles.name}>
                        <div>{name}</div>
                    </div>
                </div>
                <div className={styles.options}>
                    <div className={styles.edit}
                        onClick={() => history.push(`/spots/${id}/edit`)}
                    >
                        <i className="fa-solid fa-edit"></i>
                        Edit
                    </div>
                    <div className={styles.delete}
                        onClick={deleteHostSpot}>
                        <i className="fa-solid fa-trash"></i>
                        Delete
                    </div>
                </div>
            </div>
            <div className={styles.location}>
                {city}, {state}, {country}
            </div>
            <div className={styles.lastModified}>
                {month} {day}, {year}
            </div>
        </div>
    )
}
