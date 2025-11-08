// Model Controller for Bolt Carrier Group - IMPLEMENTED VERSION
// Handles 3D model show/hide for Bolt Carrier Group parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Bolt Carrier Group model controller loaded (implemented version)');

// Update Bolt Carrier Group model based on current selection
export function updateModel_BoltCarrierGroup() {
  console.log('🔧 Bolt Carrier Group model update - checking current selection');
  
  // Get current selected bolt carrier group from dataController
  const selected = getSelectedBoltCarrierGroup();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all bolt carrier group variants first
      hideAllBoltCarrierGroupVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Bolt Carrier Group: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllBoltCarrierGroupVariants();
    console.log('👁️‍🗨️ No Bolt Carrier Group selected - hiding all variants');
  }
}

// Handle Bolt Carrier Group selection from UI
export function handleBoltCarrierGroupSelection(itemsID) {
  console.log(`🎯 Bolt Carrier Group selection: ${itemsID}`);
  
  // Hide all bolt carrier group variants first
  hideAllBoltCarrierGroupVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Bolt Carrier Group: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Bolt Carrier Group: ${itemsID}`);
  }
}

// Helper function to hide all bolt carrier group variants
function hideAllBoltCarrierGroupVariants() {
  const boltCarrierGroupModels = [
    'modelID_boltCarrierGroup00100101',
    'modelID_boltCarrierGroup00200101',
    'modelID_boltCarrierGroup00200201'
  ];
  
  boltCarrierGroupModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected bolt carrier group (from dataController)
function getSelectedBoltCarrierGroup() {
  if (window.part && window.part.boltCarrierGroup) {
    // Check all brands and products for bolt carrier group
    for (const [brandKey, brand] of Object.entries(window.part.boltCarrierGroup)) {
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
window.updateModel_BoltCarrierGroup = updateModel_BoltCarrierGroup;
window.handleBoltCarrierGroupSelection = handleBoltCarrierGroupSelection;