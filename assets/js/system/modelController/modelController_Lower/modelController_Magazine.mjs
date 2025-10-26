// Model Controller for Magazine - IMPLEMENTED VERSION
// Handles 3D model show/hide for Magazine parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Magazine model controller loaded (implemented version)');

// Update Magazine model based on current selection
export function updateModel_Magazine() {
  console.log('🔧 Magazine model update - checking current selection');
  
  // Get current selected magazine from dataController
  const selected = getSelectedMagazine();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all magazine variants first
      hideAllMagazineVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Magazine: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllMagazineVariants();
    console.log('👁️‍🗨️ No Magazine selected - hiding all variants');
  }
}

// Handle Magazine selection from UI
export function handleMagazineSelection(itemsID) {
  console.log(`🎯 Magazine selection: ${itemsID}`);
  
  // Hide all magazine variants first
  hideAllMagazineVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Magazine: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Magazine: ${itemsID}`);
  }
}

// Helper function to hide all magazine variants
function hideAllMagazineVariants() {
  const magazineModels = [
    'modelID_magazine00100101',
    'modelID_magazine00200101'
  ];
  
  magazineModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected magazine (from dataController)
function getSelectedMagazine() {
  if (window.part && window.part.magazine) {
    // Check all brands and products for magazine
    for (const [brandKey, brand] of Object.entries(window.part.magazine)) {
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
window.updateModel_Magazine = updateModel_Magazine;
window.handleMagazineSelection = handleMagazineSelection;