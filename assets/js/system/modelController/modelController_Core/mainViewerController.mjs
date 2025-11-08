// Main Viewer Controller for M4 Rifle Configurator - CLEAN VERSION
// Basic viewer setup for M4_v6

import { initSketchfab, initializeModelState, objectShowHideSystem, debugSketchfabResources, debugCheckModelsInScene } from './sketchfabAPI.mjs';
import { setupModelControllers } from './modelController_Core.mjs';

// Wait for DOM and iframe to be ready
function initSketchfabViewer() {
    const iframe = document.getElementById('api-frame');
    if (!iframe) {
        // Retry if iframe not ready yet
        setTimeout(initSketchfabViewer, 100);
        return;
    }
    
    const uid = 'b0396eccd5474aab9b37b689ed90fcce'; // M4_v6 model ID
    
    const client = new Sketchfab(iframe);
    
    client.init(uid, {
        success: function onSuccess(api) {
            api.start();
            api.addEventListener('viewerready', function () {
// Initialize Sketchfab API
                initSketchfab(api);
                
                // Wait a bit for API to be fully ready
                setTimeout(() => {
                    // Initialize model state first
                    initializeModelState();
                    
                    // Apply initial model state to 3D scene (like the working sample)
                    objectShowHideSystem();
                    
                    // Setup model controllers (including START button listener)
                    setupModelControllers();
                    
                    // Debug: List all available models
                    debugSketchfabResources();
                    
                    // Debug: Check if initial models exist in scene
                    setTimeout(() => {
                        debugCheckModelsInScene();
                    }, 500);
                    
}, 1000); // 1 second delay
            });
        },
        error: function onError() {
            console.error('❌ Sketchfab viewer failed to load');
        }
    });
    
    // Export for global access
    window.sketchfabClient = client;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSketchfabViewer);
} else {
    // DOM already loaded
    initSketchfabViewer();
}