// Model Controller for Safety - IMPLEMENTED VERSION
// Handles 3D model show/hide for Safety parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Safety model controller loaded (implemented version)');

// Update Safety model based on current selection
export function updateModel_Safety() {
  console.log('🔧 Safety model update - checking current selection');
  
  // Get current selected safety from dataController
  const selected = getSelectedSafety();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all safety variants first
      hideAllSafetyVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Safety: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllSafetyVariants();
    console.log('👁️‍🗨️ No Safety selected - hiding all variants');
  }
}

// Handle Safety selection from UI
export function handleSafetySelection(itemsID) {
  console.log(`🎯 Safety selection: ${itemsID}`);
  
  // Hide all safety variants first
  hideAllSafetyVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Safety: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Safety: ${itemsID}`);
  }
}

// Helper function to hide all safety variants
function hideAllSafetyVariants() {
  const safetyModels = [
    // Group 001001 (4 variants)
    'modelID_safety00100101',
    'modelID_safety00100102',
    'modelID_safety00100103',
    'modelID_safety00100104',
    // Group 002001 (10 variants)
    'modelID_safety00200101',
    'modelID_safety00200102',
    'modelID_safety00200103',
    'modelID_safety00200104',
    'modelID_safety00200105',
    'modelID_safety00200106',
    'modelID_safety00200107',
    'modelID_safety00200108',
    'modelID_safety00200109',
    'modelID_safety00200110'
  ];
  
  safetyModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected safety (from dataController)
function getSelectedSafety() {
  if (window.part && window.part.safety) {
    // Check all brands and products for safety
    for (const [brandKey, brand] of Object.entries(window.part.safety)) {
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
window.updateModel_Safety = updateModel_Safety;
window.handleSafetySelection = handleSafetySelection;