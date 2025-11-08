// Model Controller for Rear Sight - IMPLEMENTED VERSION
// Handles 3D model show/hide for Rear Sight parts with Open/Folded toggle

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

// Global state for tracking current rear sight state
let currentRearSightState = {
  selected: null, // 'rearSight00100101' or 'rearSight00200101'
  mode: 'A' // 'A' (open) or 'B' (folded)
};

// Update Rear Sight model based on current selection
export function updateModel_RearSight() {
// Get current selected rear sight from dataController
  const selected = getSelectedRearSight();
  if (selected) {
    // Check if this is the same rear sight that's already selected
    const isAlreadySelected = currentRearSightState.selected === selected.id;
    
    // Only set default mode if this is a new selection
    if (!isAlreadySelected) {
      currentRearSightState.selected = selected.id;
      currentRearSightState.mode = 'A'; // Default to open (A) only for new selection
} else {
}
    
    // Hide all rear sight variants first
    hideAllRearSightVariants();
    
    // Show selected variant in current mode (or default A if new selection)
    const modelID = `modelID_${selected.id}_${currentRearSightState.mode}`;
    showModel(modelID);
// Update button states
    updateRearSightButtonStates();
  } else {
    // No selection, hide all variants
    currentRearSightState.selected = null;
    currentRearSightState.mode = 'A';
    hideAllRearSightVariants();
    clearRearSightButtonStates();
}
}

// Handle Rear Sight selection from UI
export function handleRearSightSelection(itemsID) {
// Check if this is the same rear sight that's already selected
  const isAlreadySelected = currentRearSightState.selected === itemsID;
  
  // Only set default mode if this is a new selection
  if (!isAlreadySelected) {
    currentRearSightState.selected = itemsID;
    currentRearSightState.mode = 'A'; // Default to open (A) only for new selection
} else {
}
  
  // Hide all rear sight variants first
  hideAllRearSightVariants();
  
  // Show selected variant in current mode (or default A if new selection)
  const modelID = `modelID_${itemsID}_${currentRearSightState.mode}`;
  showModel(modelID);
// Update button states
  updateRearSightButtonStates();
}

// Handle Rear Sight Open/Folded toggle
export function handleRearSightToggle(itemsID, mode) {
// If mode is provided, use it directly
  let targetMode = mode;
  
  // If no mode provided, toggle between A and B
  if (!targetMode) {
    // If no rear sight is selected, try to select the one being toggled
    if (!currentRearSightState.selected) {
// Check if this rear sight exists in the data
      const selected = getSelectedRearSight();
      if (!selected || selected.id !== itemsID) {
        console.warn(`⚠️ Cannot toggle ${itemsID} - not selected in data controller`);
        return;
      }
      
      // Set the current state to the toggled item
      currentRearSightState.selected = itemsID;
      currentRearSightState.mode = 'A'; // Default to open (A)
      
      // Show the rear sight in default mode (A - open)
      hideAllRearSightVariants();
      const modelID = `modelID_${itemsID}_A`;
      showModel(modelID);
// Update button states
      updateRearSightButtonStates();
      return;
    }
    
    // Check if the toggle is for the currently selected rear sight
    if (currentRearSightState.selected !== itemsID) {
      console.warn(`⚠️ Toggle requested for ${itemsID} but current selection is ${currentRearSightState.selected}`);
      return;
    }
    
    // Toggle between A (open) and B (folded)
    targetMode = currentRearSightState.mode === 'A' ? 'B' : 'A';
  }
  
  // If no rear sight is selected but mode is provided, try to select it
  if (!currentRearSightState.selected) {
    const selected = getSelectedRearSight();
    if (selected && selected.id === itemsID) {
      currentRearSightState.selected = itemsID;
    } else {
      console.warn(`⚠️ Cannot set mode for ${itemsID} - not selected in data controller`);
      return;
    }
  }
  
  // Check if the toggle is for the currently selected rear sight
  if (currentRearSightState.selected !== itemsID) {
    console.warn(`⚠️ Toggle requested for ${itemsID} but current selection is ${currentRearSightState.selected}`);
    return;
  }
  
currentRearSightState.mode = targetMode;
  
  // Hide all rear sight variants first
  hideAllRearSightVariants();
  
  // Show selected variant in new mode
  const modelID = `modelID_${currentRearSightState.selected}_${targetMode}`;
  showModel(modelID);
// Update button states
  updateRearSightButtonStates();
}

// Helper function to hide all rear sight variants
function hideAllRearSightVariants() {
  const rearSightModels = [
    // Group 001001 (2 variants: A=open, B=folded)
    'modelID_rearSight00100101_A',
    'modelID_rearSight00100101_B',
    // Group 002001 (2 variants: A=open, B=folded)
    'modelID_rearSight00200101_A',
    'modelID_rearSight00200101_B'
  ];
  
  rearSightModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to update button states
function updateRearSightButtonStates() {
if (!currentRearSightState.selected) {
    clearRearSightButtonStates();
    return;
  }
  
  // Get both A and B buttons
  const buttonA_ID = `buttonModelController_${currentRearSightState.selected}_A`;
  const buttonB_ID = `buttonModelController_${currentRearSightState.selected}_B`;
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
  if (currentRearSightState.mode === 'A' && buttonA) {
    buttonA.classList.add('active');
} else if (currentRearSightState.mode === 'B' && buttonB) {
    buttonB.classList.add('active');
} else {
    console.warn(`⚠️ Could not set button state - mode: ${currentRearSightState.mode}, buttonA: ${!!buttonA}, buttonB: ${!!buttonB}`);
  }
}

// Helper function to clear button states
function clearRearSightButtonStates() {
  const buttonIDs = [
    'buttonModelController_rearSight00100101_A',
    'buttonModelController_rearSight00100101_B',
    'buttonModelController_rearSight00200101_A',
    'buttonModelController_rearSight00200101_B'
  ];
  
  buttonIDs.forEach(buttonID => {
    const button = document.getElementById(buttonID);
    if (button) {
      button.classList.remove('active');
    }
  });
}

// Helper function to get selected rear sight (from dataController)
function getSelectedRearSight() {
  if (window.part && window.part.rearSight) {
    // Check group 001
    const group001 = window.part.rearSight["001"];
    if (group001 && group001.products && group001.products["001"]) {
      const variants = group001.products["001"].variants;
      for (const [key, variant] of Object.entries(variants)) {
        if (variant.quantity === 1) {
          return variant;
        }
      }
    }
    
    // Check group 002
    const group002 = window.part.rearSight["002"];
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
window.updateModel_RearSight = updateModel_RearSight;
window.handleRearSightSelection = handleRearSightSelection;
window.handleRearSightToggle = handleRearSightToggle;