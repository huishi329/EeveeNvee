import { useRef } from 'react';
import styles from './DragAndDropImage.module.css'

export default function DragAndDropImage({ imgFiles, setImgFiles }) {
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        console.log(e);
        if (!e.files) e = e.target;
        const files = [...e.files];
        // Map each file object to its data url, for display in <img>
        let count = 0;
        files.forEach((file, i) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                files[i] = event.target.result;
                count++;
                // Don't update React state until we convert all img files to data url
                if (count === files.length) {
                    setImgFiles(imgFiles.concat(files));
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleImageChange(e.dataTransfer);
    };

    return (
        <div draggable
            // Must add e.preventDefault() for onDragOver and onDragEnter for the dropTarget
            onDragOver={handleDrag}
            onDragEnter={handleDrag}
            onDrop={handleDrop}>
            <input
                ref={inputRef}
                className={styles.spotImageInput}
                placeholder='Preview Image'
                type="file"
                accept='.png, .jpeg, .jpg'
                onChange={handleImageChange}
                required
                multiple
                style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
            />
            <div className={styles.container} onClick={handleClick} onDrop={handleDrop}>
                <i className="fa-solid fa-images"></i>
                <div>Drag your photos here</div>
                <div className={styles.lightText}>Choose at least 5 photos</div>
                <button type='button' className={styles.button} >Upload from your device</button>
            </div>
        </div>
    )

}
