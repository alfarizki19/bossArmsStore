// Model Controller for Rear Sight - IMPLEMENTED VERSION
// Handles 3D model show/hide for Rear Sight parts with Open/Folded toggle

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Rear Sight model controller loaded (implemented version)');

// Global state for tracking current rear sight state
let currentRearSightState = {
  selected: null, // 'rearSight00100101' or 'rearSight00200101'
  mode: 'A' // 'A' (open) or 'B' (folded)
};

// Update Rear Sight model based on current selection
export function updateModel_RearSight() {
  console.log('🔧 Rear Sight model update - checking current selection');
  
  // Get current selected rear sight from dataController
  const selected = getSelectedRearSight();
  if (selected) {
    currentRearSightState.selected = selected.id;
    currentRearSightState.mode = 'A'; // Default to open (A)
    
    // Hide all rear sight variants first
    hideAllRearSightVariants();
    
    // Show selected variant in default mode (A - open)
    const modelID = `modelID_${selected.id}_A`;
    showModel(modelID);
    console.log(`✅ Showing Rear Sight: ${selected.id} -> ${modelID} (default open mode)`);
    
    // Update button states
    updateRearSightButtonStates();
  } else {
    // No selection, hide all variants
    currentRearSightState.selected = null;
    currentRearSightState.mode = 'A';
    hideAllRearSightVariants();
    clearRearSightButtonStates();
    console.log('👁️‍🗨️ No Rear Sight selected - hiding all variants');
  }
}

// Handle Rear Sight selection from UI
export function handleRearSightSelection(itemsID) {
  console.log(`🎯 Rear Sight selection: ${itemsID}`);
  
  // Hide all rear sight variants first
  hideAllRearSightVariants();
  
  // Set current state
  currentRearSightState.selected = itemsID;
  currentRearSightState.mode = 'A'; // Default to open (A)
  
  // Show selected variant in default mode (A - open)
  const modelID = `modelID_${itemsID}_A`;
  showModel(modelID);
  console.log(`✅ Showing Rear Sight: ${itemsID} -> ${modelID} (default open mode)`);
  
  // Update button states
  updateRearSightButtonStates();
}

// Handle Rear Sight Open/Folded toggle
export function handleRearSightToggle(itemsID) {
  console.log(`🔄 Rear Sight toggle: ${itemsID}`);
  console.log(`🔍 Current state - selected: ${currentRearSightState.selected}, mode: ${currentRearSightState.mode}`);
  
  // If no rear sight is selected, try to select the one being toggled
  if (!currentRearSightState.selected) {
    console.log(`🔧 No rear sight selected, attempting to select: ${itemsID}`);
    
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
    console.log(`✅ Showing Rear Sight: ${itemsID} -> ${modelID} (default open mode)`);
    
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
  const newMode = currentRearSightState.mode === 'A' ? 'B' : 'A';
  console.log(`🔄 Toggling from ${currentRearSightState.mode} to ${newMode}`);
  currentRearSightState.mode = newMode;
  
  // Hide all rear sight variants first
  hideAllRearSightVariants();
  
  // Show selected variant in new mode
  const modelID = `modelID_${currentRearSightState.selected}_${newMode}`;
  showModel(modelID);
  console.log(`✅ Showing Rear Sight: ${currentRearSightState.selected} -> ${modelID} (${newMode === 'A' ? 'open' : 'folded'} mode)`);
  
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
  console.log(`🔧 Updating button states for: ${currentRearSightState.selected}, mode: ${currentRearSightState.mode}`);
  
  if (!currentRearSightState.selected) {
    clearRearSightButtonStates();
    return;
  }
  
  // Get both A and B buttons
  const buttonA_ID = `buttonModelController_${currentRearSightState.selected}_A`;
  const buttonB_ID = `buttonModelController_${currentRearSightState.selected}_B`;
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
  if (currentRearSightState.mode === 'A' && buttonA) {
    buttonA.classList.add('active');
    console.log(`🔘 Updated button state: ${buttonA_ID} -> active (open mode)`);
  } else if (currentRearSightState.mode === 'B' && buttonB) {
    buttonB.classList.add('active');
    console.log(`🔘 Updated button state: ${buttonB_ID} -> active (folded mode)`);
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