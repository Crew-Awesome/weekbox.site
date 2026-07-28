import { initSecurity } from './modules/security.js';
import { initLanguageSwitcher } from './modules/language.js';

document.addEventListener('DOMContentLoaded', () => {
    /** Initializes security measures to prevent dragging and right-clicking. */
    initSecurity();

    /** Initializes the language switcher logic. */
    initLanguageSwitcher();
});
