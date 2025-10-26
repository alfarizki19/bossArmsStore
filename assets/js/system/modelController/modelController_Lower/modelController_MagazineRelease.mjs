// Model Controller for Magazine Release - IMPLEMENTED VERSION
// Handles 3D model show/hide for Magazine Release parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Magazine Release model controller loaded (implemented version)');

// Update Magazine Release model based on current selection
export function updateModel_MagazineRelease() {
  console.log('🔧 Magazine Release model update - checking current selection');
  
  // Get current selected magazine release from dataController
  const selected = getSelectedMagazineRelease();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all magazine release variants first
      hideAllMagazineReleaseVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Magazine Release: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllMagazineReleaseVariants();
    console.log('👁️‍🗨️ No Magazine Release selected - hiding all variants');
  }
}

// Handle Magazine Release selection from UI
export function handleMagazineReleaseSelection(itemsID) {
  console.log(`🎯 Magazine Release selection: ${itemsID}`);
  
  // Hide all magazine release variants first
  hideAllMagazineReleaseVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Magazine Release: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Magazine Release: ${itemsID}`);
  }
}

// Helper function to hide all magazine release variants
function hideAllMagazineReleaseVariants() {
  const magazineReleaseModels = [
    // Group 001001 (3 variants)
    'modelID_magazineRelease00100101',
    'modelID_magazineRelease00100102',
    'modelID_magazineRelease00100103',
    // Group 002001 (10 variants)
    'modelID_magazineRelease00200101',
    'modelID_magazineRelease00200102',
    'modelID_magazineRelease00200103',
    'modelID_magazineRelease00200104',
    'modelID_magazineRelease00200105',
    'modelID_magazineRelease00200106',
    'modelID_magazineRelease00200107',
    'modelID_magazineRelease00200108',
    'modelID_magazineRelease00200109',
    'modelID_magazineRelease00200110'
  ];
  
  magazineReleaseModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected magazine release (from dataController)
function getSelectedMagazineRelease() {
  if (window.part && window.part.magazineRelease) {
    // Check all brands and products for magazine release
    for (const [brandKey, brand] of Object.entries(window.part.magazineRelease)) {
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
window.updateModel_MagazineRelease = updateModel_MagazineRelease;
window.handleMagazineReleaseSelection = handleMagazineReleaseSelection;