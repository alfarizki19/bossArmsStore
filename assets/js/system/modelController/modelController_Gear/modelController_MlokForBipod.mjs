// Model Controller for M-LOK for Bipod - IMPLEMENTED VERSION
// Handles 3D model show/hide for M-LOK for Bipod parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 M-LOK for Bipod model controller loaded (implemented version)');

// Update M-LOK for Bipod model based on current selection
export function updateModel_MlokForBipod() {
  console.log('🔧 M-LOK for Bipod model update - checking current selection');
  
  // Get current selected M-LOK for Bipod from dataController
  const selected = getSelectedMlokForBipod();
  if (selected) {
    // Hide all M-LOK for Bipod variants first
    hideAllMlokForBipodVariants();
    
    // Show selected variant - M-LOK for Bipod always uses _B suffix
    const modelID = `modelID_${selected.id}_B`;
    showModel(modelID);
    console.log(`✅ Showing M-LOK for Bipod: ${selected.id} -> ${modelID}`);
  } else {
    // No selection, hide all M-LOK for Bipod variants
    hideAllMlokForBipodVariants();
    console.log('👁️‍🗨️ No M-LOK for Bipod selected - hiding all variants');
  }
}

// Handle M-LOK for Bipod selection from UI
export function handleMlokForBipodSelection(itemsID) {
  console.log(`🎯 M-LOK for Bipod selection: ${itemsID}`);
  
  // Hide all M-LOK for Bipod variants first
  hideAllMlokForBipodVariants();
  
  // Show selected variant - M-LOK for Bipod always uses _B suffix
  const modelID = `modelID_${itemsID}_B`;
  showModel(modelID);
  console.log(`✅ Showing M-LOK for Bipod: ${itemsID} -> ${modelID}`);
}

// Helper function to hide all M-LOK for Bipod variants
function hideAllMlokForBipodVariants() {
  const mlokForBipodModels = [
    // M-LOK for Bipod variants
    'modelID_mlokAndKeymodRail00100101_B', // M-LOK for Bipod
    'modelID_mlokAndKeymodRail00200101_B'  // Keymod for Bipod
  ];
  
  mlokForBipodModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected M-LOK for Bipod (from dataController)
function getSelectedMlokForBipod() {
  if (window.part && window.part.mlokAndKeymodRail) {
    // Check group 001 (M-LOK for Bipod)
    const group001 = window.part.mlokAndKeymodRail["001"];
    if (group001 && group001.products && group001.products["001"]) {
      const variants = group001.products["001"].variants;
      // Check variant '01' (not '001')
      if (variants["01"] && variants["01"].quantity === 1) {
        return {
          id: "mlokAndKeymodRail00100101",
          ...variants["01"]
        };
      }
    }
    
    // Check group 002 (Keymod for Bipod)
    const group002 = window.part.mlokAndKeymodRail["002"];
    if (group002 && group002.products && group002.products["001"]) {
      const variants = group002.products["001"].variants;
      // Check variant '01' (not '001')
      if (variants["01"] && variants["01"].quantity === 1) {
        return {
          id: "mlokAndKeymodRail00200101",
          ...variants["01"]
        };
      }
    }
  }
  return null;
}

// Export for global access
window.updateModel_MlokForBipod = updateModel_MlokForBipod;
window.handleMlokForBipodSelection = handleMlokForBipodSelection;