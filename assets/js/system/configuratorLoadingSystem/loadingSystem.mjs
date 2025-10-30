// Simple loader controller for the configurator

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getOverlayElements() {
    const overlay = document.getElementById('loading-overlay');
    const titleEl = overlay ? overlay.querySelector('[data-loader-title]') : null;
    const descEl = overlay ? overlay.querySelector('[data-loader-desc]') : null;
    const progressEl = overlay ? overlay.querySelector('[data-loader-progress]') : null;
    return { overlay, titleEl, descEl, progressEl };
}

export function showLoader(initialTitle = 'System Loading...', initialDesc = 'Preparing interface...') {
    const { overlay, titleEl, descEl, progressEl } = getOverlayElements();
    if (!overlay) return;
    if (titleEl) titleEl.textContent = initialTitle;
    if (descEl) descEl.textContent = initialDesc;
    if (progressEl) progressEl.style.width = '0%';
    overlay.classList.remove('hidden');
}

export async function updateLoaderText(title, desc) {
    const { titleEl, descEl } = getOverlayElements();
    if (titleEl && typeof title === 'string') titleEl.textContent = title;
    if (descEl && typeof desc === 'string') descEl.textContent = desc;
}

export function setLoaderProgress(percent) {
    const { progressEl } = getOverlayElements();
    if (!progressEl) return;
    const clamped = Math.max(0, Math.min(100, Number(percent) || 0));
    progressEl.style.width = clamped + '%';
}

export async function hideLoaderWithDelay(finalTitle = 'Finalizing...', finalDesc = 'Getting things ready') {
    const { overlay } = getOverlayElements();
    if (!overlay) return;
    await updateLoaderText(finalTitle, finalDesc);
    setLoaderProgress(100);
    await delay(2000); // 2s grace period before closing
    overlay.classList.add('hidden');
}

// Default staged sequence for initial app boot
export async function runInitialLoadingSequence() {
    showLoader('System Loading...', 'Preparing interface...');

    // Stage 1 — Critical resources
    await delay(1000);
    await updateLoaderText('System Loading...', 'Loading core styles and icons...');
    setLoaderProgress(12);

    // Stage 2 — Core scripts
    await delay(1000);
    await updateLoaderText('System Loading...', 'Initializing application scripts...');
    setLoaderProgress(28);

    // Stage 3 — DOM ready
    await delay(1000);
    await updateLoaderText('System Loading...', 'Building interface layout...');
    setLoaderProgress(42);

    // Stage 4 — Preload first view assets
    await delay(1000);
    await updateLoaderText('System Loading...', 'Loading images and icons...');
    setLoaderProgress(58);

    // Stage 5 — App data init
    await delay(1000);
    await updateLoaderText('System Loading...', 'Loading parts and configuration data...');
    setLoaderProgress(74);

    // Stage 6 — UI interactions
    await delay(1000);
    await updateLoaderText('System Loading...', 'Activating controls and interactions...');
    setLoaderProgress(86);

    // Stage 7 — Sketchfab (future)
    await delay(1000);
    await updateLoaderText('System Loading...', 'Initializing 3D viewer...');
    setLoaderProgress(96);

    // Stage 8 — Finalize and close
    await hideLoaderWithDelay('Finalizing...', 'Almost ready...');
}

// Auto-run at DOMContentLoaded as a safe default
document.addEventListener('DOMContentLoaded', () => {
    // Consumers can opt-out by calling preventDefault on a custom event in the future if needed
    runInitialLoadingSequence();
});


