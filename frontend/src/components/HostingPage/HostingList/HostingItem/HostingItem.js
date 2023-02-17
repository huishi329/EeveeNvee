import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../../context/Modal";
import SpotDeleteWarning from "./SpotDeleteWarning/SpotDeleteWarning";
import styles from "./HostingItem.module.css";

export default function HostingItem({ spot }) {
    const navigate = useNavigate();
    const [showSpotDeleteWarning, setShowSpotDeleteWarning] = useState(false);
    const { id, title, city, state, country, updatedAt, previewImage } = spot;
    const date = new Date(updatedAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();


    return (
        <div className={styles.wrapper}>
            <div className={styles.listing}>
                <div className={styles.identifier}>
                    <div className={styles.previeImage}>
                        <img src={previewImage || '/eeveeNvee-logo.png'} alt={title}></img></div>
                    <div className={styles.title}>
                        <div>{title}</div>
                    </div>
                </div>
                <div className={styles.options}>
                    <div className={styles.edit}
                        onClick={() => navigate(`/spots/${id}/edit/basics`)}
                    >
                        <i className="fa-solid fa-edit"></i>
                        Edit
                    </div>
                    <div className={styles.delete}
                        onClick={() => setShowSpotDeleteWarning(true)}>
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
            {showSpotDeleteWarning &&
                <Modal onClose={() => setShowSpotDeleteWarning(false)}>
                    <SpotDeleteWarning spotId={id} setShowSpotDeleteWarning={setShowSpotDeleteWarning} title={title} />
                </Modal>}
        </div>
    )
}
