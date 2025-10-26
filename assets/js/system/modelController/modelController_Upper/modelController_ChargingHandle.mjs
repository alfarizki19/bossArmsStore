// Model Controller for Charging Handle - IMPLEMENTED VERSION
// Handles 3D model show/hide for Charging Handle parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Charging Handle model controller loaded (implemented version)');

// Update Charging Handle model based on current selection
export function updateModel_ChargingHandle() {
  console.log('🔧 Charging Handle model update - checking current selection');
  
  // Get current selected charging handle from dataController
  const selected = getSelectedChargingHandle();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all charging handle variants first
      hideAllChargingHandleVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Charging Handle: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllChargingHandleVariants();
    console.log('👁️‍🗨️ No Charging Handle selected - hiding all variants');
  }
}

// Handle Charging Handle selection from UI
export function handleChargingHandleSelection(itemsID) {
  console.log(`🎯 Charging Handle selection: ${itemsID}`);
  
  // Hide all charging handle variants first
  hideAllChargingHandleVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Charging Handle: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Charging Handle: ${itemsID}`);
  }
}

// Helper function to hide all charging handle variants
function hideAllChargingHandleVariants() {
  const chargingHandleModels = [
    'modelID_chargingHandle00100101',
    'modelID_chargingHandle00100102',
    'modelID_chargingHandle00200101',
    'modelID_chargingHandle00300101',
    'modelID_chargingHandle00300102',
    'modelID_chargingHandle00300103',
    'modelID_chargingHandle00400101',
    'modelID_chargingHandle00400102',
    'modelID_chargingHandle00400103',
    'modelID_chargingHandle00400104',
    'modelID_chargingHandle00400105',
    'modelID_chargingHandle00400106',
    'modelID_chargingHandle00400107',
    'modelID_chargingHandle00400108',
    'modelID_chargingHandle00400109',
    'modelID_chargingHandle00400110'
  ];
  
  chargingHandleModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected charging handle (from dataController)
function getSelectedChargingHandle() {
  if (window.part && window.part.chargingHandle) {
    // Check all brands and products for charging handle
    for (const [brandKey, brand] of Object.entries(window.part.chargingHandle)) {
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
window.updateModel_ChargingHandle = updateModel_ChargingHandle;
window.handleChargingHandleSelection = handleChargingHandleSelection;