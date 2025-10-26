// Model Controller for Trigger - IMPLEMENTED VERSION
// Handles 3D model show/hide for Trigger parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Trigger model controller loaded (implemented version)');

// Update Trigger model based on current selection
export function updateModel_Trigger() {
  console.log('🔧 Trigger model update - checking current selection');
  
  // Get current selected trigger from dataController
  const selected = getSelectedTrigger();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all trigger variants first
      hideAllTriggerVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Trigger: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllTriggerVariants();
    console.log('👁️‍🗨️ No Trigger selected - hiding all variants');
  }
}

// Handle Trigger selection from UI
export function handleTriggerSelection(itemsID) {
  console.log(`🎯 Trigger selection: ${itemsID}`);
  
  // Hide all trigger variants first
  hideAllTriggerVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Trigger: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Trigger: ${itemsID}`);
  }
}

// Helper function to hide all trigger variants
function hideAllTriggerVariants() {
  const triggerModels = [
    // Group 001001 (1 variant)
    'modelID_trigger00100101',
    // Group 002001 (3 variants)
    'modelID_trigger00200101',
    'modelID_trigger00200102',
    'modelID_trigger00200103'
  ];
  
  triggerModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected trigger (from dataController)
function getSelectedTrigger() {
  if (window.part && window.part.trigger) {
    // Check all brands and products for trigger
    for (const [brandKey, brand] of Object.entries(window.part.trigger)) {
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
window.updateModel_Trigger = updateModel_Trigger;
window.handleTriggerSelection = handleTriggerSelection;