// Model Controller for Optic Sight - IMPLEMENTED VERSION
// Handles 3D model show/hide for Optic Sight parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Optic Sight model controller loaded (implemented version)');

// Update Optic Sight model based on current selection
export function updateModel_OpticSight() {
  console.log('🔧 Optic Sight model update - checking current selection');
  
  // Get current selected optic sight from dataController
  const selected = getSelectedOpticSight();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all optic sight variants first
      hideAllOpticSightVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Optic Sight: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllOpticSightVariants();
    console.log('👁️‍🗨️ No Optic Sight selected - hiding all variants');
  }
}

// Handle Optic Sight selection from UI
export function handleOpticSightSelection(itemsID) {
  console.log(`🎯 Optic Sight selection: ${itemsID}`);
  
  // Hide all optic sight variants first
  hideAllOpticSightVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Optic Sight: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Optic Sight: ${itemsID}`);
  }
}

// Helper function to hide all optic sight variants
function hideAllOpticSightVariants() {
  const opticSightModels = [
    // Single variant
    'modelID_opticSight00100101'
  ];
  
  opticSightModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected optic sight (from dataController)
function getSelectedOpticSight() {
  if (window.part && window.part.opticSight) {
    // Check optic sight product
    const product = window.part.opticSight["001"];
    if (product && product.products && product.products["001"]) {
      const variants = product.products["001"].variants;
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
window.updateModel_OpticSight = updateModel_OpticSight;
window.handleOpticSightSelection = handleOpticSightSelection;