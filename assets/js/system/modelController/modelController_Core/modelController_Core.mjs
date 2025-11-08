// Model Controller Core - CLEAN VERSION
// Basic model controller setup for M4_v4_01

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem, debugSketchfabResources } from './sketchfabAPI.mjs';

// Setup basic model controllers
export function setupModelControllers() {
  console.log('🔧 Setting up basic model controllers for M4_v6');
  
  // Setup START button listener
  setupStartButtonListener();
  
  // Setup button model controller click handlers
  setupButtonModelControllerHandlers();
  
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

// Setup button model controller click handlers
function setupButtonModelControllerHandlers() {
  console.log('🔧 Setting up button model controller handlers');
  
  // Wait for DOM to be ready
  function setupHandlers() {
    // Bipod button handlers
    setupBipodButtonHandlers();
    
    // Front Sight button handlers
    setupFrontSightButtonHandlers();
    
    // Rear Sight button handlers
    setupRearSightButtonHandlers();
    
    console.log('✅ Button model controller handlers setup complete');
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHandlers);
  } else {
    setupHandlers();
  }
}

// Setup Bipod button handlers
function setupBipodButtonHandlers() {
  const buttons = [
    { id: 'buttonModelController_bipod00100101_A', itemsID: 'bipod00100101', mode: 'A' },
    { id: 'buttonModelController_bipod00100101_B', itemsID: 'bipod00100101', mode: 'B' },
    { id: 'buttonModelController_bipod00100101_C', itemsID: 'bipod00100101', mode: 'C' },
    { id: 'buttonModelController_bipod00100101_D', itemsID: 'bipod00100101', mode: 'D' }
  ];
  
  buttons.forEach(({ id, itemsID, mode }) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener('click', function() {
        console.log(`🔘 Bipod button clicked: ${id} -> ${itemsID} mode ${mode}`);
        if (window.handleBipodToggle) {
          window.handleBipodToggle(itemsID, mode);
        } else {
          console.warn(`⚠️ handleBipodToggle not available`);
        }
      });
    }
  });
}

// Setup Front Sight button handlers
function setupFrontSightButtonHandlers() {
  const buttons = [
    { id: 'buttonModelController_frontSight00100101_A', itemsID: 'frontSight00100101', mode: 'A' },
    { id: 'buttonModelController_frontSight00100101_B', itemsID: 'frontSight00100101', mode: 'B' },
    { id: 'buttonModelController_frontSight00200101_A', itemsID: 'frontSight00200101', mode: 'A' },
    { id: 'buttonModelController_frontSight00200101_B', itemsID: 'frontSight00200101', mode: 'B' }
  ];
  
  buttons.forEach(({ id, itemsID, mode }) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener('click', function() {
        console.log(`🔘 Front Sight button clicked: ${id} -> ${itemsID} mode ${mode}`);
        if (window.handleFrontSightToggle) {
          // Pass mode directly to set specific mode
          window.handleFrontSightToggle(itemsID, mode);
        } else {
          console.warn(`⚠️ handleFrontSightToggle not available`);
        }
      });
    }
  });
}

// Setup Rear Sight button handlers
function setupRearSightButtonHandlers() {
  const buttons = [
    { id: 'buttonModelController_rearSight00100101_A', itemsID: 'rearSight00100101', mode: 'A' },
    { id: 'buttonModelController_rearSight00100101_B', itemsID: 'rearSight00100101', mode: 'B' },
    { id: 'buttonModelController_rearSight00200101_A', itemsID: 'rearSight00200101', mode: 'A' },
    { id: 'buttonModelController_rearSight00200101_B', itemsID: 'rearSight00200101', mode: 'B' }
  ];
  
  buttons.forEach(({ id, itemsID, mode }) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener('click', function() {
        console.log(`🔘 Rear Sight button clicked: ${id} -> ${itemsID} mode ${mode}`);
        if (window.handleRearSightToggle) {
          // Pass mode directly to set specific mode
          window.handleRearSightToggle(itemsID, mode);
        } else {
          console.warn(`⚠️ handleRearSightToggle not available`);
        }
      });
    }
  });
}

// Export for global access
window.setupModelControllers = setupModelControllers;
window.showModelByItemsID = showModelByItemsID;
window.hideModelByItemsID = hideModelByItemsID;
window.toggleModelByItemsID = toggleModelByItemsID;