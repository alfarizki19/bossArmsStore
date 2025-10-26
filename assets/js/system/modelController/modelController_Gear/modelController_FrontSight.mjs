// Model Controller for Front Sight - IMPLEMENTED VERSION
// Handles 3D model show/hide for Front Sight parts with Open/Folded toggle

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Front Sight model controller loaded (implemented version)');

// Global state for tracking current front sight state
let currentFrontSightState = {
  selected: null, // 'frontSight00100101' or 'frontSight00200101'
  mode: 'B' // 'A' (folded) or 'B' (open)
};

// Update Front Sight model based on current selection
export function updateModel_FrontSight() {
  console.log('🔧 Front Sight model update - checking current selection');
  
  // Get current selected front sight from dataController
  const selected = getSelectedFrontSight();
  if (selected) {
    currentFrontSightState.selected = selected.id;
    currentFrontSightState.mode = 'B'; // Default to open (B)
    
    // Hide all front sight variants first
    hideAllFrontSightVariants();
    
    // Show selected variant in default mode (B - open)
    const modelID = `modelID_${selected.id}_B`;
    showModel(modelID);
    console.log(`✅ Showing Front Sight: ${selected.id} -> ${modelID} (default open mode)`);
    
    // Update button states
    updateFrontSightButtonStates();
  } else {
    // No selection, hide all variants
    currentFrontSightState.selected = null;
    currentFrontSightState.mode = 'B';
    hideAllFrontSightVariants();
    clearFrontSightButtonStates();
    console.log('👁️‍🗨️ No Front Sight selected - hiding all variants');
  }
}

// Handle Front Sight selection from UI
export function handleFrontSightSelection(itemsID) {
  console.log(`🎯 Front Sight selection: ${itemsID}`);
  
  // Hide all front sight variants first
  hideAllFrontSightVariants();
  
  // Set current state
  currentFrontSightState.selected = itemsID;
  currentFrontSightState.mode = 'B'; // Default to open (B)
  
  // Show selected variant in default mode (B - open)
  const modelID = `modelID_${itemsID}_B`;
  showModel(modelID);
  console.log(`✅ Showing Front Sight: ${itemsID} -> ${modelID} (default open mode)`);
  
  // Update button states
  updateFrontSightButtonStates();
}

// Handle Front Sight Open/Folded toggle
export function handleFrontSightToggle(itemsID) {
  console.log(`🔄 Front Sight toggle: ${itemsID}`);
  console.log(`🔍 Current state - selected: ${currentFrontSightState.selected}, mode: ${currentFrontSightState.mode}`);
  
  // If no front sight is selected, try to select the one being toggled
  if (!currentFrontSightState.selected) {
    console.log(`🔧 No front sight selected, attempting to select: ${itemsID}`);
    
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
    console.log(`✅ Showing Front Sight: ${itemsID} -> ${modelID} (default open mode)`);
    
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
  const newMode = currentFrontSightState.mode === 'A' ? 'B' : 'A';
  console.log(`🔄 Toggling from ${currentFrontSightState.mode} to ${newMode}`);
  currentFrontSightState.mode = newMode;
  
  // Hide all front sight variants first
  hideAllFrontSightVariants();
  
  // Show selected variant in new mode
  const modelID = `modelID_${currentFrontSightState.selected}_${newMode}`;
  showModel(modelID);
  console.log(`✅ Showing Front Sight: ${currentFrontSightState.selected} -> ${modelID} (${newMode === 'A' ? 'folded' : 'open'} mode)`);
  
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
  console.log(`🔧 Updating button states for: ${currentFrontSightState.selected}, mode: ${currentFrontSightState.mode}`);
  
  if (!currentFrontSightState.selected) {
    clearFrontSightButtonStates();
    return;
  }
  
  // Get both A and B buttons
  const buttonA_ID = `buttonModelController_${currentFrontSightState.selected}_A`;
  const buttonB_ID = `buttonModelController_${currentFrontSightState.selected}_B`;
  const buttonA = document.getElementById(buttonA_ID);
  const buttonB = document.getElementById(buttonB_ID);
  
  console.log(`🔍 Looking for buttons: ${buttonA_ID}, ${buttonB_ID}`);
  console.log(`🔍 Button A found: ${!!buttonA}, Button B found: ${!!buttonB}`);
  
  // Clear all states first
  if (buttonA) {
    buttonA.classList.remove('active');
    console.log(`🔘 Cleared button A: ${buttonA_ID}`);
  }
  if (buttonB) {
    buttonB.classList.remove('active');
    console.log(`🔘 Cleared button B: ${buttonB_ID}`);
  }
  
  // Set active state based on current mode
  if (currentFrontSightState.mode === 'A' && buttonA) {
    buttonA.classList.add('active');
    console.log(`🔘 Updated button state: ${buttonA_ID} -> active (folded mode)`);
  } else if (currentFrontSightState.mode === 'B' && buttonB) {
    buttonB.classList.add('active');
    console.log(`🔘 Updated button state: ${buttonB_ID} -> active (open mode)`);
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