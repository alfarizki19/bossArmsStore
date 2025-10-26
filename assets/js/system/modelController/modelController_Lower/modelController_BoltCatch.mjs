// Model Controller for Bolt Catch - IMPLEMENTED VERSION
// Handles 3D model show/hide for Bolt Catch parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Bolt Catch model controller loaded (implemented version)');

// Update Bolt Catch model based on current selection
export function updateModel_BoltCatch() {
  console.log('🔧 Bolt Catch model update - checking current selection');
  
  // Get current selected bolt catch from dataController
  const selected = getSelectedBoltCatch();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all bolt catch variants first
      hideAllBoltCatchVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Bolt Catch: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllBoltCatchVariants();
    console.log('👁️‍🗨️ No Bolt Catch selected - hiding all variants');
  }
}

// Handle Bolt Catch selection from UI
export function handleBoltCatchSelection(itemsID) {
  console.log(`🎯 Bolt Catch selection: ${itemsID}`);
  
  // Hide all bolt catch variants first
  hideAllBoltCatchVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Bolt Catch: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Bolt Catch: ${itemsID}`);
  }
}

// Helper function to hide all bolt catch variants
function hideAllBoltCatchVariants() {
  const boltCatchModels = [
    'modelID_boltCatch00100101'
  ];
  
  boltCatchModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected bolt catch (from dataController)
function getSelectedBoltCatch() {
  if (window.part && window.part.boltCatch) {
    // Check all brands and products for bolt catch
    for (const [brandKey, brand] of Object.entries(window.part.boltCatch)) {
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
window.updateModel_BoltCatch = updateModel_BoltCatch;
window.handleBoltCatchSelection = handleBoltCatchSelection;