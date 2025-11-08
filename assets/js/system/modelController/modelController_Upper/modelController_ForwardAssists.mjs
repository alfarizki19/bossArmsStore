// Model Controller for Forward Assist - IMPLEMENTED VERSION
// Handles 3D model show/hide for Forward Assist parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Forward Assist model controller loaded (implemented version)');

// Update Forward Assist model based on current selection
export function updateModel_ForwardAssists() {
  console.log('🔧 Forward Assist model update - checking current selection');
  
  // Get current selected forward assist from dataController
  const selected = getSelectedForwardAssists();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all forward assist variants first
      hideAllForwardAssistsVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Forward Assist: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllForwardAssistsVariants();
    console.log('👁️‍🗨️ No Forward Assist selected - hiding all variants');
  }
}

// Handle Forward Assist selection from UI
export function handleForwardAssistsSelection(itemsID) {
  console.log(`🎯 Forward Assist selection: ${itemsID}`);
  
  // Hide all forward assist variants first
  hideAllForwardAssistsVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Forward Assist: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Forward Assist: ${itemsID}`);
  }
}

// Helper function to hide all forward assist variants
function hideAllForwardAssistsVariants() {
  const forwardAssistsModels = [
    'modelID_forwardAssists00100101',
    'modelID_forwardAssists00100102'
  ];
  
  forwardAssistsModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected forward assist (from dataController)
function getSelectedForwardAssists() {
  if (window.part && window.part.forwardAssist) {
    // Check all brands and products for forward assist
    for (const [brandKey, brand] of Object.entries(window.part.forwardAssist)) {
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
window.updateModel_ForwardAssists = updateModel_ForwardAssists;
window.handleForwardAssistsSelection = handleForwardAssistsSelection;