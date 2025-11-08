// Model Controller for Optic Sight - IMPLEMENTED VERSION
// Handles 3D model show/hide for Optic Sight parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

');

// Update Optic Sight model based on current selection
export function updateModel_OpticSight() {
  // Get current selected optic sight from dataController
  const selected = getSelectedOpticSight();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all optic sight variants first
      hideAllOpticSightVariants();
      
      // Show selected variant
      showModel(modelID);
    }
  } else {
    // No selection, hide all variants
    hideAllOpticSightVariants();
  }
}

// Handle Optic Sight selection from UI
export function handleOpticSightSelection(itemsID) {
  // Hide all optic sight variants first
  hideAllOpticSightVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
  } else {
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