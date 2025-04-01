document.addEventListener('DOMContentLoaded', () => {
    const layoutSelect = document.getElementById('layout-select');
    const themeSelect = document.getElementById('theme-select');
    const legendToggle = document.getElementById('legend-toggle'); // Added
    const legendPopup = document.getElementById('legend-popup');   // Added
    const body = document.body;

    const LAYOUT_STORAGE_KEY = 'blenderCheatsheetLayout';
    const THEME_STORAGE_KEY = 'blenderCheatsheetTheme';

    // --- Initialization ---

    // Function to apply layout class
    function applyLayout(layoutClass) {
        body.classList.remove('layout-compact', 'layout-default', 'layout-wide');
        if (layoutClass) {
            body.classList.add(layoutClass);
        } else {
            body.classList.add('layout-default'); // Default if nothing stored
        }
        // Update dropdown selection
        if (layoutSelect) {
            layoutSelect.value = layoutClass || 'layout-default';
        }
    }

    // Function to apply theme class
    function applyTheme(themeClass) {
        // Remove all possible theme classes before adding the new one
        body.classList.remove(
            'theme-dark', 'theme-light', 'theme-synthwave', 'theme-ocean',
            'theme-black-grey', 'theme-deep-space', 'theme-charcoal',
            'theme-midnight', 'theme-slate', 'theme-forest-night',
            'theme-blender', 'theme-dark-ember' // Added Dark Ember
        );
        if (themeClass) {
            body.classList.add(themeClass);
        } else {
            body.classList.add('theme-dark-ember'); // Default to Dark Ember if nothing stored
        }
        // Update dropdown selection
        if (themeSelect) {
            themeSelect.value = themeClass || 'theme-dark';
        }
    }

    // Load saved preferences or apply defaults
    const savedLayout = localStorage.getItem(LAYOUT_STORAGE_KEY);
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    applyLayout(savedLayout);
    // Apply saved theme or the new default (Dark Ember)
    applyTheme(savedTheme || 'theme-dark-ember');

    // --- Event Listeners ---

    // Layout Changer
    if (layoutSelect) {
        layoutSelect.addEventListener('change', (event) => {
            const newLayout = event.target.value;
            applyLayout(newLayout);
            localStorage.setItem(LAYOUT_STORAGE_KEY, newLayout);
        });
    }

    // Theme Changer
    if (themeSelect) {
        themeSelect.addEventListener('change', (event) => {
            const newTheme = event.target.value;
            applyTheme(newTheme);
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        });
    }

    // --- Legend Popup Logic ---
    if (legendToggle && legendPopup) {
        legendToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from immediately closing popup
            legendPopup.classList.toggle('hidden');
            legendPopup.classList.toggle('visible');
        });

        // Close popup if clicking outside
        document.addEventListener('click', (event) => {
            // Check if the popup is visible and the click is outside the container
            if (legendPopup.classList.contains('visible') && !legendPopup.contains(event.target) && event.target !== legendToggle) {
                legendPopup.classList.remove('visible');
                legendPopup.classList.add('hidden');
            }
        });
    }
});