// Model Controller for Buffer Tube - IMPLEMENTED VERSION
// Handles 3D model show/hide for Buffer Tube parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

');

// Update Buffer Tube model based on current selection
export function updateModel_BufferTube() {
  // Get current selected buffer tube from dataController
  const selected = getSelectedBufferTube();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all buffer tube variants first
      hideAllBufferTubeVariants();
      
      // Show selected variant
      showModel(modelID);
    }
  } else {
    // No selection, hide all variants
    hideAllBufferTubeVariants();
  }
}

// Handle Buffer Tube selection from UI
export function handleBufferTubeSelection(itemsID) {
  // Hide all buffer tube variants first
  hideAllBufferTubeVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
  } else {
  }
}

// Helper function to hide all buffer tube variants
function hideAllBufferTubeVariants() {
  const bufferTubeModels = [
    'modelID_bufferTube00100101'
  ];
  
  bufferTubeModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected buffer tube (from dataController)
function getSelectedBufferTube() {
  if (window.part && window.part.bufferTube) {
    // Check all brands and products for buffer tube
    for (const [brandKey, brand] of Object.entries(window.part.bufferTube)) {
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
window.updateModel_BufferTube = updateModel_BufferTube;
window.handleBufferTubeSelection = handleBufferTubeSelection;