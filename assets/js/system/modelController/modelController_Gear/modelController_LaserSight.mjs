// Model Controller for Laser Sight - IMPLEMENTED VERSION
// Handles 3D model show/hide for Laser Sight parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';


// Update Laser Sight model based on current selection
export function updateModel_LaserSight() {
  
  // Get current selected laser sight from dataController
  const selected = getSelectedLaserSight();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all laser sight variants first
      hideAllLaserSightVariants();
      
      // Show selected variant
      showModel(modelID);
    }
  } else {
    // No selection, hide all variants
    hideAllLaserSightVariants();
  }
}

// Handle Laser Sight selection from UI
export function handleLaserSightSelection(itemsID) {
  
  // Hide all laser sight variants first
  hideAllLaserSightVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
  } else {
    console.warn(`⚠️ Model ID not found for Laser Sight: ${itemsID}`);
  }
}

// Helper function to hide all laser sight variants
function hideAllLaserSightVariants() {
  const laserSightModels = [
    // Single variant
    'modelID_laserSight00100101'
  ];
  
  laserSightModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected laser sight (from dataController)
function getSelectedLaserSight() {
  if (window.part && window.part.laserSight) {
    // Check laser sight product
    const product = window.part.laserSight["001"];
    if (product && product.products && product.products["001"]) {
      const variants = product.products["001"].variants;
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
window.updateModel_LaserSight = updateModel_LaserSight;
window.handleLaserSightSelection = handleLaserSightSelection;
