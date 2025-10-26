// Model Controller for End Plate - IMPLEMENTED VERSION
// Handles 3D model show/hide for End Plate parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 End Plate model controller loaded (implemented version)');

// Update End Plate model based on current selection
export function updateModel_EndPlate() {
  console.log('🔧 End Plate model update - checking current selection');
  
  // Get current selected end plate from dataController
  const selected = getSelectedEndPlate();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all end plate variants first
      hideAllEndPlateVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing End Plate: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllEndPlateVariants();
    console.log('👁️‍🗨️ No End Plate selected - hiding all variants');
  }
}

// Handle End Plate selection from UI
export function handleEndPlateSelection(itemsID) {
  console.log(`🎯 End Plate selection: ${itemsID}`);
  
  // Hide all end plate variants first
  hideAllEndPlateVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing End Plate: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for End Plate: ${itemsID}`);
  }
}

// Helper function to hide all end plate variants
function hideAllEndPlateVariants() {
  const endPlateModels = [
    // Group 001001 (7 variants)
    'modelID_endPlate00100101',
    'modelID_endPlate00100102',
    'modelID_endPlate00100103',
    'modelID_endPlate00100104',
    'modelID_endPlate00100105',
    'modelID_endPlate00100106',
    'modelID_endPlate00100107',
    // Group 002001 (10 variants)
    'modelID_endPlate00200101',
    'modelID_endPlate00200102',
    'modelID_endPlate00200103',
    'modelID_endPlate00200104',
    'modelID_endPlate00200105',
    'modelID_endPlate00200106',
    'modelID_endPlate00200107',
    'modelID_endPlate00200108',
    'modelID_endPlate00200109',
    'modelID_endPlate00200110'
  ];
  
  endPlateModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected end plate (from dataController)
function getSelectedEndPlate() {
  if (window.part && window.part.endPlate) {
    // Check all brands and products for end plate
    for (const [brandKey, brand] of Object.entries(window.part.endPlate)) {
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
window.updateModel_EndPlate = updateModel_EndPlate;
window.handleEndPlateSelection = handleEndPlateSelection;