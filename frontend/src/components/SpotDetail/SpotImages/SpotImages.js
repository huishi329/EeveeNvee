import styles from './SpotImages.module.css';

export default function SpotImages({ images }) {
    return (
        <div className={styles.wrapper}>
            <img className={styles.img1} src={images["0"].url} alt='spot image'></img>
            {images["1"] && <img className={styles.img2} src={images["1"]?.url} alt='spot image'></img>}
            {images["2"] && <img className={styles.img2} src={images["2"]?.url} alt='spot image'></img>}
            {images["3"] && <img className={styles.img2} src={images["3"]?.url} alt='spot image'></img>}
            {images["4"] && <img className={styles.img2} src={images["4"]?.url} alt='spot image'></img>}
        </div >
    )
}
