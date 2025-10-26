// Model Controller for Muzzle Device - IMPLEMENTED VERSION
// Handles 3D model show/hide for Muzzle Device parts

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

console.log('📋 Muzzle Device model controller loaded (implemented version)');

// Update Muzzle Device model based on current selection
export function updateModel_MuzzleDevice() {
  console.log('🔧 Muzzle Device model update - checking current selection');
  
  // Get current selected base muzzle device and warden
  const selectedBase = getSelectedBaseMuzzleDevice();
  const selectedWarden = getSelectedWarden();
  
  // Hide all muzzle device variants first
  hideAllMuzzleDeviceVariants();
  
  // Show selected base muzzle device
  if (selectedBase) {
    const modelID = getModelIDFromItemsID(selectedBase.id);
    if (modelID) {
      showModel(modelID);
      console.log(`✅ Showing Base Muzzle Device: ${selectedBase.id} -> ${modelID}`);
    }
  }
  
  // Show selected warden (additional part)
  if (selectedWarden) {
    const wardenModelID = getModelIDFromItemsID(selectedWarden.id);
    if (wardenModelID) {
      showModel(wardenModelID);
      console.log(`✅ Showing Warden: ${selectedWarden.id} -> ${wardenModelID}`);
    }
  } else {
    // No warden selected, hide all warden variants
    hideAllWardenVariants();
    console.log('👁️‍🗨️ No Warden selected - hiding all warden variants');
  }
}

// Handle Muzzle Device selection from UI
export function handleMuzzleDeviceSelection(itemsID) {
  console.log(`🎯 Muzzle Device selection: ${itemsID}`);
  
  // Check if this is a base muzzle device or warden
  if (isBaseMuzzleDevice(itemsID)) {
    handleBaseMuzzleDeviceSelection(itemsID);
  } else if (isWarden(itemsID)) {
    handleWardenSelection(itemsID);
  } else {
    console.warn(`⚠️ Unknown muzzle device type: ${itemsID}`);
  }
}

// Handle base muzzle device selection
function handleBaseMuzzleDeviceSelection(itemsID) {
  console.log(`🎯 Base Muzzle Device selection: ${itemsID}`);
  
  // Hide all base muzzle devices first
  hideAllBaseMuzzleDevices();
  
  // Show selected base muzzle device
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Base Muzzle Device: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Base Muzzle Device: ${itemsID}`);
  }
  
  // Check if there's a selected warden and show it
  const selectedWarden = getSelectedWarden();
  if (selectedWarden) {
    const wardenModelID = getModelIDFromItemsID(selectedWarden.id);
    if (wardenModelID) {
      showModel(wardenModelID);
      console.log(`✅ Showing Warden: ${selectedWarden.id} -> ${wardenModelID}`);
    }
  }
}

// Handle warden selection
function handleWardenSelection(itemsID) {
  console.log(`🎯 Warden selection: ${itemsID}`);
  
  // Hide all warden variants first
  hideAllWardenVariants();
  
  // Show selected warden
  const modelID = getModelIDFromItemsID(itemsID);
  if (modelID) {
    showModel(modelID);
    console.log(`✅ Showing Warden: ${itemsID} -> ${modelID}`);
  } else {
    console.warn(`⚠️ Model ID not found for Warden: ${itemsID}`);
  }
  
  // Ensure base muzzle device is still shown
  const selectedBase = getSelectedBaseMuzzleDevice();
  if (selectedBase) {
    const baseModelID = getModelIDFromItemsID(selectedBase.id);
    if (baseModelID) {
      showModel(baseModelID);
      console.log(`✅ Ensuring Base Muzzle Device still shown: ${selectedBase.id} -> ${baseModelID}`);
    }
  }
}

// Helper function to hide all muzzle device variants
function hideAllMuzzleDeviceVariants() {
  const muzzleDeviceModels = [
    'modelID_muzzleDevice00100101',
    'modelID_muzzleDevice00100201',
    'modelID_muzzleDevice00100301',
    'modelID_muzzleDevice00100302',
    'modelID_muzzledevice00200201',  // Fixed: lowercase 'muzzledevice'
    'modelID_muzzledevice00200202'   // Fixed: lowercase 'muzzledevice'
  ];
  
  muzzleDeviceModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to hide all base muzzle device variants
function hideAllBaseMuzzleDevices() {
  const baseMuzzleDeviceModels = [
    'modelID_muzzleDevice00100101',
    'modelID_muzzleDevice00100201',
    'modelID_muzzledevice00200201',  // Fixed: lowercase 'muzzledevice'
    'modelID_muzzledevice00200202'   // Fixed: lowercase 'muzzledevice'
  ];
  
  baseMuzzleDeviceModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to hide all warden variants
function hideAllWardenVariants() {
  const wardenModels = [
    'modelID_muzzleDevice00100301',
    'modelID_muzzleDevice00100302'
  ];
  
  wardenModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to check if itemsID is a base muzzle device
function isBaseMuzzleDevice(itemsID) {
  const baseMuzzleDevices = [
    'muzzleDevice00100101',
    'muzzleDevice00100201',
    'muzzleDevice00200201',
    'muzzleDevice00200202'
  ];
  return baseMuzzleDevices.includes(itemsID);
}

// Helper function to check if itemsID is a warden
function isWarden(itemsID) {
  const wardenDevices = [
    'muzzleDevice00100301',
    'muzzleDevice00100302'
  ];
  return wardenDevices.includes(itemsID);
}

// Helper function to get selected base muzzle device (from dataController)
function getSelectedBaseMuzzleDevice() {
  if (window.part && window.part.muzzleDevice) {
    // Check 001001 (Warcomp 556 CTN Closed)
    const product001001 = window.part.muzzleDevice["001"]?.products["001"];
    if (product001001?.variants["01"]?.quantity === 1) {
      return product001001.variants["01"];
    }
    
    // Check 001002 (Warcomp Flash Hider)
    const product001002 = window.part.muzzleDevice["001"]?.products["002"];
    if (product001002?.variants["01"]?.quantity === 1) {
      return product001002.variants["01"];
    }
    
    // Check 002002 (65 Heart Breaker)
    const product002002 = window.part.muzzleDevice["002"]?.products["002"];
    if (product002002?.variants) {
      for (const [variantKey, variant] of Object.entries(product002002.variants)) {
        if (variant.quantity === 1) {
          return variant;
        }
      }
    }
  }
  return null;
}

// Helper function to get selected warden (from dataController)
function getSelectedWarden() {
  if (window.part && window.part.muzzleDevice) {
    // Check warden products (001003)
    const wardenProduct = window.part.muzzleDevice["001"]?.products["003"];
    if (wardenProduct?.variants) {
      for (const [variantKey, variant] of Object.entries(wardenProduct.variants)) {
        if (variant.quantity === 1) {
          return variant;
        }
      }
    }
  }
  return null;
}

// Export for global access
window.updateModel_MuzzleDevice = updateModel_MuzzleDevice;
window.handleMuzzleDeviceSelection = handleMuzzleDeviceSelection;
window.hideAllWardenVariants = hideAllWardenVariants;