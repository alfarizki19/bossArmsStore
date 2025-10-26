// Model Controller for Stock - IMPLEMENTED VERSION
// Handles 3D model show/hide for Stock parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Stock model controller loaded (implemented version)');

// Update Stock model based on current selection
export function updateModel_Stock() {
  console.log('🔧 Stock model update - checking current selection');
  
  // Get current selected stock from dataController
  const selected = getSelectedStock();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all stock variants first
      hideAllStockVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Stock: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllStockVariants();
    console.log('👁️‍🗨️ No Stock selected - hiding all variants');
  }
}

// Handle Stock selection from UI
export function handleStockSelection(itemsID) {
  console.log(`🎯 Stock selection: ${itemsID}`);
  
  // Hide all stock variants first
  hideAllStockVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Stock: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Stock: ${itemsID}`);
  }
}

// Helper function to hide all stock variants
function hideAllStockVariants() {
  const stockModels = [
    // Group 001001 (5 variants)
    'modelID_stock00100101',
    'modelID_stock00100102',
    'modelID_stock00100103',
    'modelID_stock00100104',
    'modelID_stock00100105',
    // Group 002001 (3 variants)
    'modelID_stock00200101',
    'modelID_stock00200102',
    'modelID_stock00200103'
  ];
  
  stockModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected stock (from dataController)
function getSelectedStock() {
  if (window.part && window.part.stock) {
    // Check all brands and products for stock
    for (const [brandKey, brand] of Object.entries(window.part.stock)) {
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
window.updateModel_Stock = updateModel_Stock;
window.handleStockSelection = handleStockSelection;