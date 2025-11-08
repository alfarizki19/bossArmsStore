// Model Controller for Handguard - IMPLEMENTED VERSION
// Handles 3D model show/hide for Handguard Rail System parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Handguard model controller loaded (implemented version)');

// Update Handguard model based on current selection
export function updateModel_Handguard() {
  console.log('🔧 Handguard model update - checking current selection');
  
  // Get current selected handguard from dataController
  const selected = getSelectedHandguardRailSystem();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all handguard variants first
      hideAllHandguardVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Handguard: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllHandguardVariants();
    console.log('👁️‍🗨️ No Handguard selected - hiding all variants');
  }
}

// Handle Handguard selection from UI
export function handleHandguardSelection(itemsID) {
  console.log(`🎯 Handguard selection: ${itemsID}`);
  
  // Hide all handguard variants first
  hideAllHandguardVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Handguard: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Handguard: ${itemsID}`);
  }
}

// Helper function to hide all handguard variants
function hideAllHandguardVariants() {
  const handguardModels = [
    // Group 001001 variants
    'modelID_handguardRailSystem00100101',
    'modelID_handguardRailSystem00100102',
    // Group 001002 variants
    'modelID_handguardRailSystem00100201',
    'modelID_handguardRailSystem00100202'
  ];
  
  handguardModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected handguard (from dataController)
function getSelectedHandguardRailSystem() {
  if (window.part && window.part.handguardRailSystem) {
    // Check group 001001
    const group001001 = window.part.handguardRailSystem["001"];
    if (group001001 && group001001.products && group001001.products["001"]) {
      const variants = group001001.products["001"].variants;
      for (const [key, variant] of Object.entries(variants)) {
        if (variant.quantity === 1) {
          return variant;
        }
      }
    }
    
    // Check group 001002
    if (group001001 && group001001.products && group001001.products["002"]) {
      const variants = group001001.products["002"].variants;
      for (const [key, variant] of Object.entries(variants)) {
        if (variant.quantity === 1) {
          return variant;
        }
      }
    }
  }
  return null;
}

// Export for global access
window.updateModel_Handguard = updateModel_Handguard;
window.handleHandguardSelection = handleHandguardSelection;