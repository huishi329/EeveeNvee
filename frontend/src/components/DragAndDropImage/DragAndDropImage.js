import { useRef, useState } from 'react';
import styles from './DragAndDropImage.module.css'

export default function DragAndDropImage({ imgFiles, setImgFiles }) {
    const inputRef = useRef(null);
    // display on frontend
    const [previewImages, setPreviewImages] = useState([]);
    const [isDragActive, setIsDragActive] = useState(false);
    const handleImageChange = async (e) => {
        if (!e.files) e = e.target;
        const files = [...e.files];
        setImgFiles(imgFiles.concat(files));
        // Map each file object to its data url, for display in <img>
        // Don't update React state until we convert all img files to data url
        function getBase64(file) {
            const reader = new FileReader()
            return new Promise(resolve => {
                reader.onload = event => {
                    resolve(event.target.result)
                };
                reader.readAsDataURL(file);
            });
        }
        const promises = files.map(file => getBase64(file));

        setPreviewImages(previewImages.concat(await Promise.all(promises)));

    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleImageChange(e.dataTransfer);
        setIsDragActive(false);
    };

    return (
        <div draggable
            // Must add e.preventDefault() for onDragOver and onDragEnter for the dropTarget
            onDragOver={handleDrag}
            onDragEnter={handleDrag}
            onDragExit={() => setIsDragActive(false)}
            onDrop={handleDrop}>
            <input
                ref={inputRef}
                hidden
                className={styles.spotImageInput}
                type="file"
                accept='.png, .jpeg, .jpg'
                onChange={handleImageChange}
                required={imgFiles.length === 0}
                multiple
            />
            {imgFiles.length === 0 && <div className={`${styles.container} ${isDragActive && styles.dragActive}`} onClick={handleClick} onDrop={handleDrop}>
                <i className="fa-solid fa-images"></i>
                <div>Drag your photos here</div>
                <div className={styles.lightText}>Choose at least 1 photos</div>
                <button type='button' className={styles.button} >Upload from your device</button>
            </div>}
            <div className={styles.imgSection}>
                {previewImages.map((file, i) => (
                    <div className={styles.previewImage} key={i}>
                        <img className="spotImage" src={file} alt={`image ${i}`} />
                    </div>))}
                {imgFiles.length > 0 &&
                    <div className={`${styles.smallContainer} ${isDragActive && styles.dragActive}`}
                        onClick={handleClick}
                        onDrop={handleDrop}
                        onDragExit={() => setIsDragActive(false)}
                    >
                        <i className="fa-solid fa-images"></i>
                    </div>}
            </div>
        </div >
    )

}
