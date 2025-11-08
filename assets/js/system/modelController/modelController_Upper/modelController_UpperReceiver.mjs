// Model Controller for Upper Receiver - IMPLEMENTED VERSION
// Handles 3D model show/hide for Upper Receiver parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Upper Receiver model controller loaded (implemented version)');

// Update Upper Receiver model based on current selection
export function updateModel_UpperReceiver() {
  console.log('🔧 Upper Receiver model update - checking current selection');
  
  // Get current selected upper receiver from dataController
  const selected = getSelectedUpperReceiver();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all upper receiver variants first
      hideAllUpperReceiverVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Upper Receiver: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllUpperReceiverVariants();
    console.log('👁️‍🗨️ No Upper Receiver selected - hiding all variants');
  }
}

// Handle Upper Receiver selection from UI
export function handleUpperReceiverSelection(itemsID) {
  console.log(`🎯 Upper Receiver selection: ${itemsID}`);
  
  // Hide all upper receiver variants first
  hideAllUpperReceiverVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Upper Receiver: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Upper Receiver: ${itemsID}`);
  }
}

// Helper function to hide all upper receiver variants
function hideAllUpperReceiverVariants() {
  const upperReceiverModels = [
    'modelID_upperReceiver00100101',
    'modelID_upperReceiver00100102'
  ];
  
  upperReceiverModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected upper receiver (from dataController)
function getSelectedUpperReceiver() {
  if (window.part && window.part.upperReceiver) {
    const variants = window.part.upperReceiver["001"].products["001"].variants;
    for (const [key, variant] of Object.entries(variants)) {
      if (variant.quantity === 1) {
        return variant;
      }
    }
  }
  return null;
}

// Export for global access
window.updateModel_UpperReceiver = updateModel_UpperReceiver;
window.handleUpperReceiverSelection = handleUpperReceiverSelection;