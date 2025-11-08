// Model Controller for MLOK - IMPLEMENTED VERSION
// Handles 3D model show/hide for M-LOK and Keymod Rail parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 MLOK model controller loaded (implemented version)');

// Update MLOK model based on current selection
export function updateModel_MLOK() {
  console.log('🔧 MLOK model update - checking current selection');
  
  // Get current selected MLOK from dataController
  const selected = getSelectedMLOK();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all MLOK variants first
      hideAllMLOKVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing MLOK: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllMLOKVariants();
    console.log('👁️‍🗨️ No MLOK selected - hiding all variants');
  }
}

// Handle MLOK selection from UI
export function handleMLOKSelection(itemsID) {
  console.log(`🎯 MLOK selection: ${itemsID}`);
  
  // Always hide all MLOK variants first (mutually exclusive)
  hideAllMLOKVariants();
  
  // Only show if there's a valid selection
  if (itemsID && itemsID !== 'noMlokAndKeymodRail') {
    const modelID = getModelIDFromItemsID(itemsID);
    if (modelID) {
      showModel(modelID);
      console.log(`✅ Showing MLOK: ${itemsID} -> ${modelID}`);
    } else {
      console.warn(`⚠️ Model ID not found for MLOK: ${itemsID}`);
    }
  } else {
    console.log('🚫 No MLOK selected - all variants hidden');
  }
}

// Helper function to hide all MLOK variants
function hideAllMLOKVariants() {
  const mlokModels = [
    // Group 001001 (M-LOK)
    'modelID_mlokAndKeymodRail00100101_A',
    // Group 002001 (Keymod)
    'modelID_mlokAndKeymodRail00200101_A'
  ];
  
  mlokModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected MLOK (from dataController)
function getSelectedMLOK() {
  if (window.part && window.part.mlokAndKeymodRail) {
    // Get products A and B (same logic as data controller)
    const productA = window.part.mlokAndKeymodRail["001"] && 
                     window.part.mlokAndKeymodRail["001"].products && 
                     window.part.mlokAndKeymodRail["001"].products["001"];
    const productB = window.part.mlokAndKeymodRail["002"] && 
                     window.part.mlokAndKeymodRail["002"].products && 
                     window.part.mlokAndKeymodRail["002"].products["001"];
    
    if (productA && productA.variants && productA.variants["01"] && productA.variants["01"].quantity === 1) {
      return productA.variants["01"]; // M-LOK selected
    }
    
    if (productB && productB.variants && productB.variants["01"] && productB.variants["01"].quantity === 1) {
      return productB.variants["01"]; // Keymod selected
    }
  }
  return null; // No selection
}

// Export for global access
window.updateModel_MLOK = updateModel_MLOK;
window.handleMLOKSelection = handleMLOKSelection;