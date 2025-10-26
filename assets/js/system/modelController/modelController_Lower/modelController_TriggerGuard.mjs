// Model Controller for Trigger Guard - IMPLEMENTED VERSION
// Handles 3D model show/hide for Trigger Guard parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Trigger Guard model controller loaded (implemented version)');

// Update Trigger Guard model based on current selection
export function updateModel_TriggerGuard() {
  console.log('🔧 Trigger Guard model update - checking current selection');
  
  // Check if current pistol grip requires trigger guard
  if (!shouldShowTriggerGuard()) {
    console.log('🚫 Current pistol grip does not require trigger guard - hiding all variants');
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
      console.log(`✅ Showing Trigger Guard: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllTriggerGuardVariants();
    console.log('👁️‍🗨️ No Trigger Guard selected - hiding all variants');
  }
}

// Handle Trigger Guard selection from UI
export function handleTriggerGuardSelection(itemsID) {
  console.log(`🎯 Trigger Guard selection: ${itemsID}`);
  
  // Check if current pistol grip requires trigger guard
  if (!shouldShowTriggerGuard()) {
    console.log('🚫 Current pistol grip does not require trigger guard - ignoring selection');
    return;
  }
  
  // Hide all trigger guard variants first
  hideAllTriggerGuardVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Trigger Guard: ${itemsID} -> ${modelID}`);
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
    // Group 001001 (7 variants)
    'modelID_triggerGuard00100101',
    'modelID_triggerGuard00100102',
    'modelID_triggerGuard00100103',
    'modelID_triggerGuard00100104',
    'modelID_triggerGuard00100105',
    'modelID_triggerGuard00100106',
    'modelID_triggerGuard00100107',
    // Group 002001 (10 variants)
    'modelID_triggerGuard00200101',
    'modelID_triggerGuard00200102',
    'modelID_triggerGuard00200103',
    'modelID_triggerGuard00200104',
    'modelID_triggerGuard00200105',
    'modelID_triggerGuard00200106',
    'modelID_triggerGuard00200107',
    'modelID_triggerGuard00200108',
    'modelID_triggerGuard00200109',
    'modelID_triggerGuard00200110'
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