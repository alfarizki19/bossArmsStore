// Model Controller for Buffer and Spring Kit - IMPLEMENTED VERSION
// Handles 3D model show/hide for Buffer and Spring Kit parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

// Update Buffer and Spring Kit model based on current selection
export function updateModel_BufferAndSpringKit() {
// Get current selected buffer and spring kit from dataController
  const selected = getSelectedBufferAndSpringKit();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all buffer and spring kit variants first
      hideAllBufferAndSpringKitVariants();
      
      // Show selected variant
      showModel(modelID);
}
  } else {
    // No selection, hide all variants
    hideAllBufferAndSpringKitVariants();
}
}

// Handle Buffer and Spring Kit selection from UI
export function handleBufferAndSpringKitSelection(itemsID) {
// Hide all buffer and spring kit variants first
  hideAllBufferAndSpringKitVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
} else {
    console.warn(`⚠️ Model ID not found for Buffer and Spring Kit: ${itemsID}`);
  }
}

// Helper function to hide all buffer and spring kit variants
function hideAllBufferAndSpringKitVariants() {
  const bufferAndSpringKitModels = [
    'modelID_bufferAndSpringKit00100101'
  ];
  
  bufferAndSpringKitModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected buffer and spring kit (from dataController)
function getSelectedBufferAndSpringKit() {
  if (window.part && window.part.bufferAndSpringKit) {
    // Check all brands and products for buffer and spring kit
    for (const [brandKey, brand] of Object.entries(window.part.bufferAndSpringKit)) {
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
window.updateModel_BufferAndSpringKit = updateModel_BufferAndSpringKit;
window.handleBufferAndSpringKitSelection = handleBufferAndSpringKitSelection;