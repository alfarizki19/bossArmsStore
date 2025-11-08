// Model Controller for Trigger Guard - IMPLEMENTED VERSION
// Handles 3D model show/hide for Trigger Guard parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

// Update Trigger Guard model based on current selection
export function updateModel_TriggerGuard() {
// Check if current pistol grip requires trigger guard
  if (!shouldShowTriggerGuard()) {
hideAllTriggerGuardVariants();
    return;
  }
  
  // Get current selected trigger guard from dataController
  const selected = getSelectedTriggerGuard();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all trigger guard variants first
      hideAllTriggerGuardVariants();
      
      // Show selected variant
      showModel(modelID);
}
  } else {
    // No selection, hide all variants
    hideAllTriggerGuardVariants();
}
}

// Handle Trigger Guard selection from UI
export function handleTriggerGuardSelection(itemsID) {
// Check if current pistol grip requires trigger guard
  if (!shouldShowTriggerGuard()) {
return;
  }
  
  // Hide all trigger guard variants first
  hideAllTriggerGuardVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
} else {
    console.warn(`⚠️ Model ID not found for Trigger Guard: ${itemsID}`);
  }
}

// Helper function to check if current pistol grip requires trigger guard
function shouldShowTriggerGuard() {
  if (window.part && window.part.pistolGrip) {
    // Check if any pistolGrip002001** is selected (requires trigger guard)
    const group002 = window.part.pistolGrip["002"];
    if (group002 && group002.products && group002.products["001"]) {
      const variants = group002.products["001"].variants;
      for (const [key, variant] of Object.entries(variants)) {
        if (variant.quantity === 1) {
          return true; // pistolGrip002001** requires trigger guard
        }
      }
    }
  }
  return false; // pistolGrip001001** or no selection = no trigger guard needed
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

// Helper function to get selected trigger guard (from dataController)
function getSelectedTriggerGuard() {
  if (window.part && window.part.triggerGuard) {
    // Check all brands and products for trigger guard
    for (const [brandKey, brand] of Object.entries(window.part.triggerGuard)) {
      for (const [productKey, product] of Object.entries(brand.products)) {
        for (const [variantKey, variant] of Object.entries(product.variants)) {
          if (variant.quantity === 1) {
            return variant;
          }
        }
      }
    }
  }
  return null;
}

// Export for global access
window.updateModel_TriggerGuard = updateModel_TriggerGuard;
window.handleTriggerGuardSelection = handleTriggerGuardSelection;