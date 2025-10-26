// Model Controller for Ejection Port Cover - IMPLEMENTED VERSION
// Handles 3D model show/hide for Ejection Port Cover parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Ejection Port Cover model controller loaded (implemented version)');

// Update Ejection Port Cover model based on current selection
export function updateModel_EjectionPortCover() {
  console.log('🔧 Ejection Port Cover model update - checking current selection');
  
  // Get current selected ejection port cover from dataController
  const selected = getSelectedEjectionPortCover();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all ejection port cover variants first
      hideAllEjectionPortCoverVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Ejection Port Cover: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllEjectionPortCoverVariants();
    console.log('👁️‍🗨️ No Ejection Port Cover selected - hiding all variants');
  }
}

// Handle Ejection Port Cover selection from UI
export function handleEjectionPortCoverSelection(itemsID) {
  console.log(`🎯 Ejection Port Cover selection: ${itemsID}`);
  
  // Hide all ejection port cover variants first
  hideAllEjectionPortCoverVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Ejection Port Cover: ${itemsID} -> ${modelID}`);
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
    'modelID_ejectionPortCover00100105',
    'modelID_ejectionPortCover00100106',
    'modelID_ejectionPortCover00100107',
    'modelID_ejectionPortCover00100108',
    'modelID_ejectionPortCover00100109',
    'modelID_ejectionPortCover00100110'
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