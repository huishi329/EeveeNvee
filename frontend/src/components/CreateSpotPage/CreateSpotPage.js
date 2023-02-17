import { useNavigate } from 'react-router-dom';
import EditSpotForm from '../EditSpotForm/EditSpotForm';
import styles from './CreateSpotPage.module.css';


export default function CreateSpotPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <i className="fa-solid fa-xmark" onClick={() => navigate('/listings')}></i>
                <h1>Create a listing</h1>
            </div>
            <EditSpotForm />
        </div>
    );
}
