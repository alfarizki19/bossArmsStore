// Model Controller for Ejection Port Cover - IMPLEMENTED VERSION
// Handles 3D model show/hide for Ejection Port Cover parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';


// Update Ejection Port Cover model based on current selection
export function updateModel_EjectionPortCover() {
  
  // Get current selected ejection port cover from dataController
  const selected = getSelectedEjectionPortCover();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all ejection port cover variants first
      hideAllEjectionPortCoverVariants();
      
      // Show selected variant
      showModel(modelID);
    }
  } else {
    // No selection, hide all variants
    hideAllEjectionPortCoverVariants();
  }
}

// Handle Ejection Port Cover selection from UI
export function handleEjectionPortCoverSelection(itemsID) {
  
  // Hide all ejection port cover variants first
  hideAllEjectionPortCoverVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
  } else {
    console.warn(`⚠️ Model ID not found for Ejection Port Cover: ${itemsID}`);
  }
}

// Helper function to hide all ejection port cover variants
function hideAllEjectionPortCoverVariants() {
  const ejectionPortCoverModels = [
    'modelID_ejectionPortCover00100101',
    'modelID_ejectionPortCover00100102',
    'modelID_ejectionPortCover00100103',
    'modelID_ejectionPortCover00100104',
    'modelID_ejectionPortCover00100105'
    // Removed: 00100106-00100110 (hidden variants)
  ];
  
  ejectionPortCoverModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected ejection port cover (from dataController)
function getSelectedEjectionPortCover() {
  if (window.part && window.part.ejectionPortCover) {
    // Check all brands and products for ejection port cover
    for (const [brandKey, brand] of Object.entries(window.part.ejectionPortCover)) {
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
window.updateModel_EjectionPortCover = updateModel_EjectionPortCover;
window.handleEjectionPortCoverSelection = handleEjectionPortCoverSelection;
