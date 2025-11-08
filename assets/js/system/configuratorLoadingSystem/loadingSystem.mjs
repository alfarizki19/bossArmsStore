// Simple loader controller for the configurator

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getOverlayElements() {
    const overlay = document.getElementById('loading-overlay');
    const titleEl = overlay ? overlay.querySelector('[data-loader-title]') : null;
    const descEl = overlay ? overlay.querySelector('[data-loader-desc]') : null;
    const progressEl = overlay ? overlay.querySelector('[data-loader-progress]') : null;
    const startButton = document.getElementById('loader-start-button');
    return { overlay, titleEl, descEl, progressEl, startButton };
}

export function showLoader(initialTitle = 'System Loading...', initialDesc = 'Preparing interface...') {
    const { overlay, titleEl, descEl, progressEl, startButton } = getOverlayElements();
    if (!overlay) return;
    if (titleEl) titleEl.textContent = initialTitle;
    if (descEl) descEl.textContent = initialDesc;
    if (progressEl) progressEl.style.width = '0%';
    if (startButton) startButton.classList.add('hidden');
    // Show loading spinner and dots when loader appears
    const spinner = overlay.querySelector('.fa-cog');
    const dots = overlay.querySelectorAll('.w-3.h-3');
    if (spinner) spinner.classList.remove('hidden');
    dots.forEach(dot => dot.classList.remove('hidden'));
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

export async function hideLoaderWithDelay(finalTitle = 'Configurator Ready!', finalDesc = 'Click START to begin configuring your M4 rifle') {
    const { overlay, startButton, progressEl } = getOverlayElements();
    if (!overlay) return;
    
    // Update text to show configurator is ready
    await updateLoaderText(finalTitle, finalDesc);
    setLoaderProgress(100);
    
    // Show start button when loading completes
    if (startButton) {
        startButton.classList.remove('hidden');
        // Hide loading spinner, dots, and progress bar when start button appears
        const spinner = overlay.querySelector('.fa-cog');
        const dots = overlay.querySelectorAll('.w-3.h-3');
        const progressBarContainer = overlay.querySelector('.w-full.bg-slate-200');
        
        if (spinner) {
            // Remove any animation classes and hide
            spinner.classList.remove('animate-spin', 'animate-pulse');
            spinner.classList.add('hidden');
        }
        dots.forEach(dot => dot.classList.add('hidden'));
        if (progressBarContainer) progressBarContainer.classList.add('hidden');
    }
    
    // Wait for user to click start button (no auto-close)
    // Overlay will be closed by start button click handler
}

export function hideLoader() {
    const { overlay, startButton } = getOverlayElements();
    if (!overlay) return;
    
    // Validate that viewer is ready before allowing configuration
    if (!window.sketchfabViewerReady) {
        console.warn('⚠️ Cannot start: Sketchfab viewer is not ready yet');
        // Show warning message
        const descEl = overlay.querySelector('[data-loader-desc]');
        if (descEl) {
            descEl.textContent = 'Please wait, 3D viewer is still loading...';
            descEl.style.color = '#ef4444';
        }
        // Re-enable start button after a delay
        setTimeout(() => {
            if (descEl) {
                descEl.textContent = 'Click START to begin configuring your M4 rifle';
                descEl.style.color = '';
            }
        }, 2000);
        return;
    }
    
    // Viewer is ready, proceed with hiding loader
    if (startButton) startButton.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Wait for Sketchfab 3D viewer to load
function waitForSketchfabViewer() {
    return new Promise((resolve) => {
        const iframe = document.getElementById('sketchfab-viewer');
        if (!iframe) {
            console.warn('Sketchfab viewer iframe not found');
            resolve();
            return;
        }

        let viewerReady = false;
        let progressInterval;
        let progressValue = 0;

        // Listen for custom events from the viewer loader script
        const readyHandler = () => {
            if (!viewerReady) {
                viewerReady = true;
                // Ensure global flag is set
                window.sketchfabViewerReady = true;
                clearInterval(progressInterval);
                window.removeEventListener('sketchfab-viewer-ready', readyHandler);
                window.removeEventListener('sketchfab-viewer-progress', progressHandler);
resolve();
            }
        };

        const progressHandler = (event) => {
            if (event.detail && event.detail.progress) {
                setLoaderProgress(event.detail.progress);
            }
        };

        window.addEventListener('sketchfab-viewer-ready', readyHandler);
        window.addEventListener('sketchfab-viewer-progress', progressHandler);

        // Simulate progress while waiting (fallback if no progress events)
        progressInterval = setInterval(() => {
            if (!viewerReady && progressValue < 95) {
                progressValue += 2;
                setLoaderProgress(86 + Math.floor(progressValue * 0.1));
            }
        }, 200);

        // Fallback: if viewer doesn't send ready signal within 20 seconds, proceed anyway
        setTimeout(() => {
            if (!viewerReady) {
                clearInterval(progressInterval);
                window.removeEventListener('sketchfab-viewer-ready', readyHandler);
                window.removeEventListener('sketchfab-viewer-progress', progressHandler);
                console.warn('⚠️ Sketchfab viewer timeout after 20s, proceeding anyway');
                // Set flag even on timeout (viewer might be ready but not sending signals)
                window.sketchfabViewerReady = true;
                resolve();
            }
        }, 20000);
    });
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

    // Stage 7 — Wait for Sketchfab 3D viewer
    await updateLoaderText('System Loading...', 'Loading 3D viewer...');
    setLoaderProgress(86);
    
    // Wait for 3D viewer to be ready
    await waitForSketchfabViewer();
    
    // Verify viewer is actually ready - wait additional time if needed
    let retryCount = 0;
    while (!window.sketchfabViewerReady && retryCount < 5) {
        console.warn(`⚠️ Viewer ready flag not set, waiting additional time... (attempt ${retryCount + 1}/5)`);
        await delay(2000);
        retryCount++;
    }
    
    // Final check - if still not ready, wait one more time
    if (!window.sketchfabViewerReady) {
        console.warn('⚠️ Viewer still not ready after retries, waiting final 3 seconds...');
        await delay(3000);
        // Force set after final wait (viewer should be ready by now)
        window.sketchfabViewerReady = true;
    }
    
    await updateLoaderText('System Loading...', '3D viewer ready!');
    setLoaderProgress(92);
    
    // Stage 8 — Wait for 3D model to be fully loaded
    await updateLoaderText('System Loading...', 'Loading 3D model...');
    setLoaderProgress(94);
    
    // Wait for initial models to be ready
    let modelRetryCount = 0;
    const maxModelRetries = 30; // 30 seconds max wait for model
    
    while (!window.initialModelsReady && modelRetryCount < maxModelRetries) {
await delay(1000);
        modelRetryCount++;
    }
    
    // Final check - if still not ready, wait one more time
    if (!window.initialModelsReady) {
        console.warn('⚠️ 3D model still not ready after retries, waiting final 3 seconds...');
        await delay(3000);
        // Force set after final wait (model should be ready by now)
        window.initialModelsReady = true;
    }
    
    await updateLoaderText('System Loading...', '3D model loaded!');
    setLoaderProgress(98);

    // Stage 9 — Finalizing (with delay 2-4 seconds)
    // Random delay between 2-4 seconds
    const finalizingDelay = 2000 + Math.random() * 2000; // 2000-4000ms
    
    // Finalizing messages array for variety
    const finalizingMessages = [
        'Almost there...',
        'Just a moment...',
        'Almost ready...',
        'Final touches...'
    ];
    const finalizingDescriptions = [
        'Optimizing 3D model performance',
        'Preparing your configurator experience',
        'Ensuring everything is perfect',
        'Setting up interactive controls'
    ];
    
    const randomIndex = Math.floor(Math.random() * finalizingMessages.length);
    await updateLoaderText(finalizingMessages[randomIndex], finalizingDescriptions[randomIndex]);
    setLoaderProgress(99);
    
    // Show finalizing indicator - change spinner to pulse animation
    const { overlay, titleEl, descEl } = getOverlayElements();
    if (overlay && titleEl && descEl) {
        const spinner = overlay.querySelector('.fa-cog');
        if (spinner) {
            spinner.classList.remove('animate-spin');
            spinner.classList.add('animate-pulse');
        }
    }
    
await delay(finalizingDelay);
    
    setLoaderProgress(100);

    // Stage 10 — Show start button (only after everything is confirmed ready)
    if (window.sketchfabViewerReady && window.initialModelsReady) {
await hideLoaderWithDelay('Configurator Ready!', 'Click START to begin configuring your M4 rifle');
    } else {
        // This should not happen, but just in case
        console.error('❌ Viewer or model not ready after all checks - this should not happen');
        await delay(2000);
        window.sketchfabViewerReady = true; // Force set
        window.initialModelsReady = true; // Force set
        await hideLoaderWithDelay('Configurator Ready!', 'Click START to begin configuring your M4 rifle');
    }
}

// Auto-run at DOMContentLoaded as a safe default
document.addEventListener('DOMContentLoaded', () => {
    // Consumers can opt-out by calling preventDefault on a custom event in the future if needed
    runInitialLoadingSequence();
    
    // Make hideLoader globally available for inline onclick
    window.hideLoader = hideLoader;
});

