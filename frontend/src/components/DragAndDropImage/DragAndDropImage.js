import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createSpotImage } from '../../store/spot';
import styles from './DragAndDropImage.module.css'
import ImageEditor from './ImageEditor/ImageEditor';


export default function DragAndDropImage() {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const location = useLocation();
    // display on frontend
    const spot = useSelector(state => state.spots.singleSpot);
    const [previewImages, setPreviewImages] = useState(spot && location.pathname.includes('edit') ? Object.values(spot.SpotImages) : []);
    const [isDragActive, setIsDragActive] = useState(false);
    const [dragStartImage, setDragStartImage] = useState(null);

    useEffect(() => {
        if (spot) {
            setPreviewImages(Object.values(spot.SpotImages));
        }
    }, [spot]);


    const handleImageSubmission = async (imgFiles) => {
        const promises = imgFiles.map((file, i) => {
            return new Promise(resolve => resolve(
                dispatch(createSpotImage(spot.id, file, i + previewImages.length))
            ))
        });
        return await Promise.all(promises);
    };

    const handleImageChange = async (e) => {
        if (!e.files) e = e.target;
        const files = [...e.files];
        const newPreviewImages = await handleImageSubmission(files);
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
                <div>
                    <div className={styles.title}>
                        <div>
                            <div className={styles.bold}>Add some photos of your apartment</div>
                            <div className={styles.lightText}>You'll need 5 photos to get started. You can add more or make changes later.</div>
                        </div>
                    </div>
                    <div className={`${styles.container} ${isDragActive && styles.dragActive}`} onClick={handleClick} onDrop={handleDrop}>
                        <i className="fa-solid fa-images"></i>
                        <div>Drag your photos here</div>
                        <div className={styles.lightText}>Choose at least 1 photos</div>
                        <button type='button' className={styles.button} >Upload from your device</button>
                    </div>
                </div>

            }
            {previewImages.length > 0 &&
                <div>
                    <div className={styles.title}>
                        <div>
                            <div className={styles.bold}>All photos</div>
                            <div className={styles.lightText}>Drag and drop your photos to change the order.</div>
                        </div>
                        <button type='button' className={styles.roundButton} onClick={handleClick}>Upload photos</button>
                    </div>
                    <div className={styles.imgSection}>
                        {previewImages.map((image, i) =>
                            <ImageEditor image={image} key={i}
                                dragStartImage={dragStartImage}
                                setDragStartImage={setDragStartImage}
                            />)}

                        <div className={`${styles.smallContainer} ${isDragActive && styles.dragActive}`}
                            onClick={handleClick}
                            onDrop={handleDrop}
                            onDragExit={() => setIsDragActive(false)}
                        >
                            <i className="fa-solid fa-images"></i>
                        </div>
                    </div>
                </div>}
        </div >
    )
}
