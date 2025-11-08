// Model Controller for Pistol Grip - IMPLEMENTED VERSION
// Handles 3D model show/hide for Pistol Grip parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

// Update Pistol Grip model based on current selection
export function updateModel_PistolGrip() {
// Get current selected pistol grip from dataController
  const selected = getSelectedPistolGrip();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all pistol grip variants first
      hideAllPistolGripVariants();
      
      // Show selected variant
      showModel(modelID);
}
  } else {
    // No selection, hide all variants
    hideAllPistolGripVariants();
}
}

// Handle Pistol Grip selection from UI
export function handlePistolGripSelection(itemsID) {
// Hide all pistol grip variants first
  hideAllPistolGripVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
} else {
    console.warn(`⚠️ Model ID not found for Pistol Grip: ${itemsID}`);
  }
  
  // Handle Trigger Guard interaction based on pistol grip type
  handleTriggerGuardInteraction(itemsID);
}

// Handle Trigger Guard interaction based on pistol grip selection
function handleTriggerGuardInteraction(itemsID) {
if (itemsID.startsWith('pistolGrip001001')) {
    // Group 001001: NO TRIGGER GUARD needed (integrated trigger guard)
hideAllTriggerGuardVariants();
  } else if (itemsID.startsWith('pistolGrip002001')) {
    // Group 002001: TRIGGER GUARD needed (separate trigger guard)
showDefaultTriggerGuard();
  }
}

// Helper function to hide all trigger guard variants
function hideAllTriggerGuardVariants() {
  const triggerGuardModels = [
    // Group 001001 (3 variants - removed 04-07)
    'modelID_triggerGuard00100101',
    'modelID_triggerGuard00100102',
    'modelID_triggerGuard00100103',
    // Removed: 00100104-00100107 (hidden variants)
    // Group 002001 (4 variants - removed 05-10)
    'modelID_triggerGuard00200101',
    'modelID_triggerGuard00200102',
    'modelID_triggerGuard00200103',
    'modelID_triggerGuard00200104'
    // Removed: 00200105-00200110 (hidden variants)
  ];
  
  triggerGuardModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to show default trigger guard
function showDefaultTriggerGuard() {
  // Hide all trigger guard variants first
  hideAllTriggerGuardVariants();
  
  // Show default trigger guard: triggerGuard00100101
  const defaultModelID = 'modelID_triggerGuard00100101';
  showModel(defaultModelID);
}

// Helper function to hide all pistol grip variants
function hideAllPistolGripVariants() {
  const pistolGripModels = [
    // Group 001 variants
    'modelID_pistolGrip00100101',
    'modelID_pistolGrip00100102',
    'modelID_pistolGrip00100103',
    // Group 002 variants (4 variants - removed 05-07)
    'modelID_pistolGrip00200101',
    'modelID_pistolGrip00200102',
    'modelID_pistolGrip00200103',
    'modelID_pistolGrip00200104'
    // Removed: 00200105-00200107 (hidden variants)
  ];
  
  pistolGripModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected pistol grip (from dataController)
function getSelectedPistolGrip() {
  if (window.part && window.part.pistolGrip) {
    // Check group 001
    const group001 = window.part.pistolGrip["001"];
    if (group001 && group001.products && group001.products["001"]) {
      const variants = group001.products["001"].variants;
      for (const [key, variant] of Object.entries(variants)) {
        if (variant.quantity === 1) {
          return variant;
        }
      }
    }
    
    // Check group 002
    const group002 = window.part.pistolGrip["002"];
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
window.updateModel_PistolGrip = updateModel_PistolGrip;
window.handlePistolGripSelection = handlePistolGripSelection;
window.hideAllTriggerGuardVariants = hideAllTriggerGuardVariants; // Export for Trigger Guard controller