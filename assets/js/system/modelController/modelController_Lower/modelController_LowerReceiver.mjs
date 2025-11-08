// Model Controller for Lower Receiver - IMPLEMENTED VERSION
// Handles 3D model show/hide for Lower Receiver parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Lower Receiver model controller loaded (implemented version)');

// Update Lower Receiver model based on current selection
export function updateModel_LowerReceiver() {
  console.log('🔧 Lower Receiver model update - checking current selection');
  
  // Get current selected lower receiver from dataController
  const selected = getSelectedLowerReceiver();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all lower receiver variants first
      hideAllLowerReceiverVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Lower Receiver: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllLowerReceiverVariants();
    console.log('👁️‍🗨️ No Lower Receiver selected - hiding all variants');
  }
}

// Handle Lower Receiver selection from UI
export function handleLowerReceiverSelection(itemsID) {
  console.log(`🎯 Lower Receiver selection: ${itemsID}`);
  
  // Hide all lower receiver variants first
  hideAllLowerReceiverVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Lower Receiver: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Lower Receiver: ${itemsID}`);
  }
}

// Helper function to hide all lower receiver variants
function hideAllLowerReceiverVariants() {
  const lowerReceiverModels = [
    'modelID_lowerReceiver00100101',
    'modelID_lowerReceiver00100102'
  ];
  
  lowerReceiverModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected lower receiver (from dataController)
function getSelectedLowerReceiver() {
  if (window.part && window.part.lowerReceiver) {
    const variants = window.part.lowerReceiver["001"].products["001"].variants;
    for (const [key, variant] of Object.entries(variants)) {
      if (variant.quantity === 1) {
        return variant;
      }
    }
  }
  return null;
}

// Export for global access
window.updateModel_LowerReceiver = updateModel_LowerReceiver;
window.handleLowerReceiverSelection = handleLowerReceiverSelection;