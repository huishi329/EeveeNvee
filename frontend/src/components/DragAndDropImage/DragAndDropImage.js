import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './DragAndDropImage.module.css'
import ImageEditor from './ImageEditor/ImageEditor';

export default function DragAndDropImage({ imgFiles, setImgFiles }) {
    const inputRef = useRef(null);
    const location = useLocation();
    // display on frontend
    const spot = useSelector(state => state.spots.singleSpot);
    const [previewImages, setPreviewImages] = useState(spot && location.pathname.includes('edit') ? Object.values(spot.SpotImages) : []);
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
                    resolve(event.target.result);
                };
                reader.readAsDataURL(file);
            });
        }
        const promises = files.map(file => getBase64(file));
        const imageURLs = await Promise.all(promises);
        const newPreviewImages = imageURLs.map((url, i) => ({ url, position: i }));

        setPreviewImages(previewImages.concat(newPreviewImages));
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
            className={styles.wrapper}
            // Must add e.preventDefault() for onDragOver and onDragEnter for the dropTarget
            onDragOver={handleDrag}
            onDragEnter={handleDrag}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={handleDrop}>
            <input
                ref={inputRef}
                hidden
                className={styles.spotImageInput}
                type="file"
                accept='.png, .jpeg, .jpg'
                onChange={handleImageChange}
                required={previewImages.length === 0}
                multiple
            />
            {previewImages.length === 0 &&
                <div className={`${styles.container} ${isDragActive && styles.dragActive}`} onClick={handleClick} onDrop={handleDrop}>
                    <i className="fa-solid fa-images"></i>
                    <div>Drag your photos here</div>
                    <div className={styles.lightText}>Choose at least 1 photos</div>
                    <button type='button' className={styles.button} >Upload from your device</button>
                </div>}
            <div className={styles.imgSection}>
                {previewImages.map((image, i) => <ImageEditor imgURL={image.url} position={i} key={i} />)}
                {previewImages.length > 0 &&
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
