import styles from './SpotImages.module.css';

export default function SpotImages({ images }) {
    return (
        <div className={styles.wrapper}>
            <img className={styles.img1} src={images["0"].url} alt='0'></img>
            {images["1"] && <img className={styles.img2} src={images["1"]?.url} alt='1'></img>}
            {images["2"] && <img className={styles.img3} src={images["2"]?.url} alt='2'></img>}
            {images["3"] && <img className={styles.img4} src={images["3"]?.url} alt='3'></img>}
            {images["4"] && <img className={styles.img5} src={images["4"]?.url} alt='4'></img>}
        </div >
    )
}
