// Main Viewer Controller for M4 Rifle Configurator - CLEAN VERSION
// Basic viewer setup for M4_v4_01

import { initSketchfab, initializeModelState, objectShowHideSystem, debugSketchfabResources, debugCheckModelsInScene } from './sketchfabAPI.mjs';
import { setupModelControllers } from './modelController_Core.mjs';

const iframe = document.getElementById('api-frame');
const uid = '88f91292508649feab6975b82eacab93'; // M4_v4_01 model ID

const client = new Sketchfab(iframe);

client.init(uid, {
  success: function onSuccess(api) {
    api.start();
    api.addEventListener('viewerready', function () {
      console.log('🚀 M4 Rifle Configurator (M4_v4_01) ready');

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
        
        console.log('✅ Basic Model Controller system initialized');
        console.log('📋 Ready for simple 3D interactions');
        console.log('🎯 START button listener ready');
      }, 1000); // 1 second delay
    });
  },
  error: function onError() {
    console.error('❌ Sketchfab viewer failed to load');
  }
});

// Export for global access
window.sketchfabClient = client;