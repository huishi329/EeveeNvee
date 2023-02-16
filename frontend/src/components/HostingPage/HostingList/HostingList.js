import HostingItem from "./HostingItem/HostingItem";
import styles from "./HostingList.module.css";


export default function HostingList({ hostingSpots }) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.titles}>
                <div>LISTING</div>
                <div>LOCATION</div>
                <div>LAST MODIFIED</div>
            </div>
            <div>

                {Object.values(hostingSpots).map(spot => (<HostingItem spot={spot} />))}
            </div>
        </div>
    )
}
