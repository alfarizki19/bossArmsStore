// Model Controller for Barrel - IMPLEMENTED VERSION
// Handles 3D model show/hide for Barrel parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Barrel model controller loaded (implemented version)');

// Update Barrel model based on current selection
export function updateModel_Barel() {
  console.log('🔧 Barrel model update - checking current selection');
  
  // Get current selected barrel from dataController
  const selected = getSelectedBarel();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all barrel variants first
      hideAllBarelVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Barrel: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllBarelVariants();
    console.log('👁️‍🗨️ No Barrel selected - hiding all variants');
  }
}

// Handle Barrel selection from UI
export function handleBarelSelection(itemsID) {
  console.log(`🎯 Barrel selection: ${itemsID}`);
  
  // Hide all barrel variants first
  hideAllBarelVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Barrel: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Barrel: ${itemsID}`);
  }
}

// Helper function to hide all barrel variants
function hideAllBarelVariants() {
  const barelModels = [
    'modelID_barel00200101'
  ];
  
  barelModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected barrel (from dataController)
function getSelectedBarel() {
  if (window.part && window.part.barel) {
    const variants = window.part.barel["002"].products["001"].variants;
    for (const [key, variant] of Object.entries(variants)) {
      if (variant.quantity === 1) {
        return variant;
      }
    }
  }
  return null;
}

// Export for global access
window.updateModel_Barel = updateModel_Barel;
window.handleBarelSelection = handleBarelSelection;