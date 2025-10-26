// Model Controller for Pistol Grip - IMPLEMENTED VERSION
// Handles 3D model show/hide for Pistol Grip parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Pistol Grip model controller loaded (implemented version)');

// Update Pistol Grip model based on current selection
export function updateModel_PistolGrip() {
  console.log('🔧 Pistol Grip model update - checking current selection');
  
  // Get current selected pistol grip from dataController
  const selected = getSelectedPistolGrip();
  if (selected) {
    const modelID = getModelIDFromItemsID(selected.id);
    if (modelID) {
      // Hide all pistol grip variants first
      hideAllPistolGripVariants();
      
      // Show selected variant
      showModel(modelID);
      console.log(`✅ Showing Pistol Grip: ${selected.id} -> ${modelID}`);
    }
  } else {
    // No selection, hide all variants
    hideAllPistolGripVariants();
    console.log('👁️‍🗨️ No Pistol Grip selected - hiding all variants');
  }
}

// Handle Pistol Grip selection from UI
export function handlePistolGripSelection(itemsID) {
  console.log(`🎯 Pistol Grip selection: ${itemsID}`);
  
  // Hide all pistol grip variants first
  hideAllPistolGripVariants();
  
  // Show selected variant
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Pistol Grip: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Pistol Grip: ${itemsID}`);
  }
  
  // Handle Trigger Guard interaction based on pistol grip type
  handleTriggerGuardInteraction(itemsID);
}

// Handle Trigger Guard interaction based on pistol grip selection
function handleTriggerGuardInteraction(itemsID) {
  console.log(`🔧 Handling Trigger Guard interaction for: ${itemsID}`);
  
  if (itemsID.startsWith('pistolGrip001001')) {
    // Group 001001: NO TRIGGER GUARD needed (integrated trigger guard)
    console.log('🚫 Pistol Grip 001001 - Hiding all trigger guard models');
    hideAllTriggerGuardVariants();
  } else if (itemsID.startsWith('pistolGrip002001')) {
    // Group 002001: TRIGGER GUARD needed (separate trigger guard)
    console.log('✅ Pistol Grip 002001 - Showing default trigger guard');
    showDefaultTriggerGuard();
  }
}

// Helper function to hide all trigger guard variants
function hideAllTriggerGuardVariants() {
  const triggerGuardModels = [
    // Group 001001 (7 variants)
    'modelID_triggerGuard00100101',
    'modelID_triggerGuard00100102',
    'modelID_triggerGuard00100103',
    'modelID_triggerGuard00100104',
    'modelID_triggerGuard00100105',
    'modelID_triggerGuard00100106',
    'modelID_triggerGuard00100107',
    // Group 002001 (10 variants)
    'modelID_triggerGuard00200101',
    'modelID_triggerGuard00200102',
    'modelID_triggerGuard00200103',
    'modelID_triggerGuard00200104',
    'modelID_triggerGuard00200105',
    'modelID_triggerGuard00200106',
    'modelID_triggerGuard00200107',
    'modelID_triggerGuard00200108',
    'modelID_triggerGuard00200109',
    'modelID_triggerGuard00200110'
  ];
  
  triggerGuardModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to show default trigger guard
function showDefaultTriggerGuard() {
  // Hide all trigger guard variants first
  hideAllTriggerGuardVariants();
  
  // Show default trigger guard: triggerGuard00100101
  const defaultModelID = 'modelID_triggerGuard00100101';
  showModel(defaultModelID);
  console.log(`✅ Showing default Trigger Guard: triggerGuard00100101 -> ${defaultModelID}`);
}

// Helper function to hide all pistol grip variants
function hideAllPistolGripVariants() {
  const pistolGripModels = [
    // Group 001 variants
    'modelID_pistolGrip00100101',
    'modelID_pistolGrip00100102',
    'modelID_pistolGrip00100103',
    // Group 002 variants
    'modelID_pistolGrip00200101',
    'modelID_pistolGrip00200102',
    'modelID_pistolGrip00200103',
    'modelID_pistolGrip00200104',
    'modelID_pistolGrip00200105',
    'modelID_pistolGrip00200106',
    'modelID_pistolGrip00200107'
  ];
  
  pistolGripModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to get selected pistol grip (from dataController)
function getSelectedPistolGrip() {
  if (window.part && window.part.pistolGrip) {
    // Check group 001
    const group001 = window.part.pistolGrip["001"];
    if (group001 && group001.products && group001.products["001"]) {
      const variants = group001.products["001"].variants;
      for (const [key, variant] of Object.entries(variants)) {
        if (variant.quantity === 1) {
          return variant;
        }
      }
    }
    
    // Check group 002
    const group002 = window.part.pistolGrip["002"];
    if (group002 && group002.products && group002.products["001"]) {
      const variants = group002.products["001"].variants;
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
window.updateModel_PistolGrip = updateModel_PistolGrip;
window.handlePistolGripSelection = handlePistolGripSelection;
window.hideAllTriggerGuardVariants = hideAllTriggerGuardVariants; // Export for Trigger Guard controller