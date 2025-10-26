// Model Controller for Takedown Pin - IMPLEMENTED VERSION
// Handles 3D model show/hide for Takedown Pin parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Takedown Pin model controller loaded (implemented version)');

// Update Takedown Pin model based on current selection
export function updateModel_TakedownPin() {
  console.log('🔧 Takedown Pin model update - checking current selection');
  
  // Get current selected takedown pin from dataController
  const selected = getSelectedTakedownPinSet();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all takedown pin variants first
      hideAllTakedownPinVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Takedown Pin: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllTakedownPinVariants();
    console.log('👁️‍🗨️ No Takedown Pin selected - hiding all variants');
  }
}

// Handle Takedown Pin selection from UI
export function handleTakedownPinSelection(itemsID) {
  console.log(`🎯 Takedown Pin selection: ${itemsID}`);
  
  // Hide all takedown pin variants first
  hideAllTakedownPinVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Takedown Pin: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Takedown Pin: ${itemsID}`);
  }
}

// Helper function to hide all takedown pin variants
function hideAllTakedownPinVariants() {
  const takedownPinModels = [
    // Group 001001 (2 variants)
    'modelID_takedownPinSet00100101',
    'modelID_takedownPinSet00100102',
    // Group 002001 (10 variants)
    'modelID_takedownPinSet00200101',
    'modelID_takedownPinSet00200102',
    'modelID_takedownPinSet00200103',
    'modelID_takedownPinSet00200104',
    'modelID_takedownPinSet00200105',
    'modelID_takedownPinSet00200106',
    'modelID_takedownPinSet00200107',
    'modelID_takedownPinSet00200108',
    'modelID_takedownPinSet00200109',
    'modelID_takedownPinSet00200110',
    // Group 003001 (1 variant)
    'modelID_takedownPinSet00300101'
  ];
  
  takedownPinModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected takedown pin (from dataController)
function getSelectedTakedownPinSet() {
  if (window.part && window.part.takedownPin) {
    // Check all brands and products for takedown pin
    for (const [brandKey, brand] of Object.entries(window.part.takedownPin)) {
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
window.updateModel_TakedownPin = updateModel_TakedownPin;
window.handleTakedownPinSelection = handleTakedownPinSelection;