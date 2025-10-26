// Model Controller Core - CLEAN VERSION
// Basic model controller setup for M4_v4_01

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem, debugSketchfabResources } from './sketchfabAPI.mjs';

// Setup basic model controllers
export function setupModelControllers() {
  console.log('🔧 Setting up basic model controllers for M4_v4_01');
  
  // Setup START button listener
  setupStartButtonListener();
  
  console.log('✅ Basic model controllers initialized');
}

// Setup START button listener
function setupStartButtonListener() {
  const startButton = document.getElementById('buttonModalStartMenu_StartButton');
  
  if (startButton) {
    startButton.addEventListener('click', function() {
      console.log('🎯 START button clicked - initializing default 3D models');
      
      // Wait for dataController and API to be ready
      setTimeout(() => {
        // Check if API is ready before updating models
        if (window.sketchfabAPIReady) {
          // Debug: Log all available Sketchfab resources
          console.log("🔍 Running debug check...");
          debugSketchfabResources();
          
          // Apply show/hide system to display initial parts
          objectShowHideSystem();
          console.log("✅ Default 3D models initialized");
        } else {
          console.log("⚠️ API not ready yet, retrying in 1 second...");
          setTimeout(() => {
            if (window.sketchfabAPIReady) {
              // Debug: Log all available Sketchfab resources
              console.log("🔍 Running debug check (retry)...");
              debugSketchfabResources();
              
              // Apply show/hide system to display initial parts
              objectShowHideSystem();
              console.log("✅ Default 3D models initialized (retry)");
            }
          }, 1000);
        }
      }, 2000);
    });
    
    console.log('✅ START button listener setup complete');
  } else {
    console.warn('⚠️ START button not found - listener not setup');
  }
}

// Simple function to show a model by itemsID
export function showModelByItemsID(itemsID) {
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing model: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for itemsID: ${itemsID}`);
  }
}

// Simple function to hide a model by itemsID
export function hideModelByItemsID(itemsID) {
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    hideModel(modelID);
    console.log(`👁️‍🗨️ Hiding model: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for itemsID: ${itemsID}`);
  }
}

// Simple function to toggle a model by itemsID
export function toggleModelByItemsID(itemsID) {
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    const currentState = modelState[modelID];
    if (currentState === 1) {
      hideModel(modelID);
    } else {
      showModel(modelID);
    }
    console.log(`🔄 Toggled model: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for itemsID: ${itemsID}`);
  }
}

// Export for global access
window.setupModelControllers = setupModelControllers;
window.showModelByItemsID = showModelByItemsID;
window.hideModelByItemsID = hideModelByItemsID;
window.toggleModelByItemsID = toggleModelByItemsID;