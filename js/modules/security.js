export function initSecurity() {
    /** Prevents right-clicking on the document. */
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    /** Prevents dragging of images. */
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', (event) => {
            event.preventDefault();
        });
        
        /** Fallback to prevent image dragging in older browsers. */
        img.ondragstart = () => false;
    });
}
