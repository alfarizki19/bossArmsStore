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
    // Group 001001 (4 variants - removed 05-07)
    'modelID_endPlate00100101',
    'modelID_endPlate00100102',
    'modelID_endPlate00100103',
    'modelID_endPlate00100104',
    // Removed: 00100105-00100107 (hidden variants)
    // Group 002001 (5 variants - removed 06-10)
    'modelID_endPlate00200101',
    'modelID_endPlate00200102',
    'modelID_endPlate00200103',
    'modelID_endPlate00200104',
    'modelID_endPlate00200105'
    // Removed: 00200106-00200110 (hidden variants)
  ];
  
  endPlateModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected end plate (from dataController)
function getSelectedEndPlate() {
  // Check 001001 variants
  {
    const product = window.part.endPlate["001"].products["001"];
    for (let i = 1; i <= 7; i++) {
      const k = ("" + i).padStart(2, "0");
      if (product.variants[k] && product.variants[k].quantity === 1) {
        return product.variants[k];
      }
    }
  }
  // Check 002001 variants
  {
    const product = window.part.endPlate["002"].products["001"];
    for (let i = 1; i <= 10; i++) {
      const k = ("" + i).padStart(2, "0");
      if (product.variants[k] && product.variants[k].quantity === 1) {
        return product.variants[k];
      }
    }
  }
  return null;
}

// Export for global access
window.updateModel_EndPlate = updateModel_EndPlate;
window.handleEndPlateSelection = handleEndPlateSelection;