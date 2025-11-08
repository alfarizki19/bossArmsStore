// Model Controller for Front Sight - IMPLEMENTED VERSION
// Handles 3D model show/hide for Front Sight parts with Open/Folded toggle

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

// Global state for tracking current front sight state
let currentFrontSightState = {
  selected: null, // 'frontSight00100101' or 'frontSight00200101'
  mode: 'B' // 'A' (folded) or 'B' (open)
};

// Update Front Sight model based on current selection
export function updateModel_FrontSight() {
// Get current selected front sight from dataController
  const selected = getSelectedFrontSight();
  if (selected) {
    // Check if this is the same front sight that's already selected
    const isAlreadySelected = currentFrontSightState.selected === selected.id;
    
    // Only set default mode if this is a new selection
    if (!isAlreadySelected) {
      currentFrontSightState.selected = selected.id;
      currentFrontSightState.mode = 'B'; // Default to open (B) only for new selection
} else {
}
    
    // Hide all front sight variants first
    hideAllFrontSightVariants();
    
    // Show selected variant in current mode (or default B if new selection)
    const modelID = `modelID_${selected.id}_${currentFrontSightState.mode}`;
    showModel(modelID);
// Update button states
    updateFrontSightButtonStates();
  } else {
    // No selection, hide all variants
    currentFrontSightState.selected = null;
    currentFrontSightState.mode = 'B';
    hideAllFrontSightVariants();
    clearFrontSightButtonStates();
}
}

// Handle Front Sight selection from UI
export function handleFrontSightSelection(itemsID) {
// Check if this is the same front sight that's already selected
  const isAlreadySelected = currentFrontSightState.selected === itemsID;
  
  // Only set default mode if this is a new selection
  if (!isAlreadySelected) {
    currentFrontSightState.selected = itemsID;
    currentFrontSightState.mode = 'B'; // Default to open (B) only for new selection
} else {
}
  
  // Hide all front sight variants first
  hideAllFrontSightVariants();
  
  // Show selected variant in current mode (or default B if new selection)
  const modelID = `modelID_${itemsID}_${currentFrontSightState.mode}`;
  showModel(modelID);
// Update button states
  updateFrontSightButtonStates();
}

// Handle Front Sight Open/Folded toggle
export function handleFrontSightToggle(itemsID, mode) {
// If mode is provided, use it directly
  let targetMode = mode;
  
  // If no mode provided, toggle between A and B
  if (!targetMode) {
    // If no front sight is selected, try to select the one being toggled
    if (!currentFrontSightState.selected) {
// Check if this front sight exists in the data
      const selected = getSelectedFrontSight();
      if (!selected || selected.id !== itemsID) {
        console.warn(`⚠️ Cannot toggle ${itemsID} - not selected in data controller`);
        return;
      }
      
      // Set the current state to the toggled item
      currentFrontSightState.selected = itemsID;
      currentFrontSightState.mode = 'B'; // Default to open (B)
      
      // Show the front sight in default mode (B - open)
      hideAllFrontSightVariants();
      const modelID = `modelID_${itemsID}_B`;
      showModel(modelID);
// Update button states
      updateFrontSightButtonStates();
      return;
    }
    
    // Check if the toggle is for the currently selected front sight
    if (currentFrontSightState.selected !== itemsID) {
      console.warn(`⚠️ Toggle requested for ${itemsID} but current selection is ${currentFrontSightState.selected}`);
      return;
    }
    
    // Toggle between A (folded) and B (open)
    targetMode = currentFrontSightState.mode === 'A' ? 'B' : 'A';
  }
  
  // If no front sight is selected but mode is provided, try to select it
  if (!currentFrontSightState.selected) {
    const selected = getSelectedFrontSight();
    if (selected && selected.id === itemsID) {
      currentFrontSightState.selected = itemsID;
    } else {
      console.warn(`⚠️ Cannot set mode for ${itemsID} - not selected in data controller`);
      return;
    }
  }
  
  // Check if the toggle is for the currently selected front sight
  if (currentFrontSightState.selected !== itemsID) {
    console.warn(`⚠️ Toggle requested for ${itemsID} but current selection is ${currentFrontSightState.selected}`);
    return;
  }
  
currentFrontSightState.mode = targetMode;
  
  // Hide all front sight variants first
  hideAllFrontSightVariants();
  
  // Show selected variant in new mode
  const modelID = `modelID_${currentFrontSightState.selected}_${targetMode}`;
  showModel(modelID);
// Update button states
  updateFrontSightButtonStates();
}

// Helper function to hide all front sight variants
function hideAllFrontSightVariants() {
  const frontSightModels = [
    // Group 001001 (2 variants: A=open, B=folded)
    'modelID_frontSight00100101_A',
    'modelID_frontSight00100101_B',
    // Group 002001 (2 variants: A=open, B=folded)
    'modelID_frontSight00200101_A',
    'modelID_frontSight00200101_B'
  ];
  
  frontSightModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to update button states
function updateFrontSightButtonStates() {
if (!currentFrontSightState.selected) {
    clearFrontSightButtonStates();
    return;
  }
  
  // Get both A and B buttons
  const buttonA_ID = `buttonModelController_${currentFrontSightState.selected}_A`;
  const buttonB_ID = `buttonModelController_${currentFrontSightState.selected}_B`;
  const buttonA = document.getElementById(buttonA_ID);
  const buttonB = document.getElementById(buttonB_ID);
  
// Clear all states first
  if (buttonA) {
    buttonA.classList.remove('active');
}
  if (buttonB) {
    buttonB.classList.remove('active');
}
  
  // Set active state based on current mode
  if (currentFrontSightState.mode === 'A' && buttonA) {
    buttonA.classList.add('active');
} else if (currentFrontSightState.mode === 'B' && buttonB) {
    buttonB.classList.add('active');
} else {
    console.warn(`⚠️ Could not set button state - mode: ${currentFrontSightState.mode}, buttonA: ${!!buttonA}, buttonB: ${!!buttonB}`);
  }
}

// Helper function to clear button states
function clearFrontSightButtonStates() {
  const buttonIDs = [
    'buttonModelController_frontSight00100101_A',
    'buttonModelController_frontSight00100101_B',
    'buttonModelController_frontSight00200101_A',
    'buttonModelController_frontSight00200101_B'
  ];
  
  buttonIDs.forEach(buttonID => {
    const button = document.getElementById(buttonID);
    if (button) {
      button.classList.remove('active');
    }
  });
}

// Helper function to get selected front sight (from dataController)
function getSelectedFrontSight() {
  if (window.part && window.part.frontSight) {
    // Check group 001
    const group001 = window.part.frontSight["001"];
    if (group001 && group001.products && group001.products["001"]) {
      const variants = group001.products["001"].variants;
      for (const [key, variant] of Object.entries(variants)) {
        if (variant.quantity === 1) {
          return variant;
        }
      }
    }
    
    // Check group 002
    const group002 = window.part.frontSight["002"];
    if (group002 && group002.products && group002.products["001"]) {
      const variants = group002.products["001"].variants;
      for (const [key, variant] of Object.entries(variants)) {
        if (variant.quantity === 1) {
          return variant;
        }
      }
    }
  }
  return null;
}

// Export for global access
window.updateModel_FrontSight = updateModel_FrontSight;
window.handleFrontSightSelection = handleFrontSightSelection;
window.handleFrontSightToggle = handleFrontSightToggle;