// Model Controller for Bipod - IMPLEMENTED VERSION
// Handles 3D model show/hide for Bipod parts with 4 states + M-LOK for Bipod integration

import { modelState, showModel, hideModel, getModelIDFromItemsID, objectShowHideSystem } from '../modelController_Core/sketchfabAPI.mjs';

');

// Global state for tracking current bipod state
let currentBipodState = {
  selected: null, // 'bipod00100101' or null
  mode: 'A' // 'A' (Folded Long), 'B' (Folded Short), 'C' (Open Short), 'D' (Open Long)
};

// Update Bipod model based on current selection
export function updateModel_Bipod() {
  // Get current selected bipod from dataController
  const selected = getSelectedBipod();
  if (selected) {
    // Check if this is the same bipod that's already selected
    const isAlreadySelected = currentBipodState.selected === selected.id;
    
    // Only set default mode if this is a new selection
    if (!isAlreadySelected) {
      currentBipodState.selected = selected.id;
      currentBipodState.mode = 'A'; // Default to A (Folded Long) only for new selection
    } else {
    }
    
    // Hide all bipod variants first
    hideAllBipodVariants();
    
    // Show selected variant in current mode (or default A if new selection)
    const modelID = `modelID_${selected.id}_${currentBipodState.mode}`;
    showModel(modelID);
    `);
    
    // Show M-LOK for Bipod (always shown with bipod)
    showMlokForBipod();
    
    // Update button states
    updateBipodButtonStates();
  } else {
    // No selection, hide all variants
    currentBipodState.selected = null;
    currentBipodState.mode = 'A';
    hideAllBipodVariants();
    hideMlokForBipod();
    clearBipodButtonStates();
  }
}

// Handle Bipod selection from UI
export function handleBipodSelection(itemsID) {
  // Check if this is the same bipod that's already selected
  const isAlreadySelected = currentBipodState.selected === itemsID;
  
  // Only set default mode if this is a new selection
  if (!isAlreadySelected) {
    currentBipodState.selected = itemsID;
    currentBipodState.mode = 'A'; // Default to A (Folded Long) only for new selection
  } else {
  }
  
  // Hide all bipod variants first
  hideAllBipodVariants();
  
  // Show selected variant in current mode (or default A if new selection)
  const modelID = `modelID_${itemsID}_${currentBipodState.mode}`;
  showModel(modelID);
  `);
  
  // Show M-LOK for Bipod (always shown with bipod)
  showMlokForBipod();
  
  // Update button states
  updateBipodButtonStates();
}

// Handle Bipod state toggle (A, B, C, D)
export function handleBipodToggle(itemsID, mode) {
  if (!currentBipodState.selected) {
    // No bipod selected, try to auto-select the bipod being toggled
    const selected = getSelectedBipod();
    if (!selected || selected.id !== itemsID) {
      return;
    }
    
    // Auto-select the bipod being toggled
    currentBipodState.selected = itemsID;
    currentBipodState.mode = mode;
    // Hide all bipod variants first
    hideAllBipodVariants();
    
    // Show selected variant in new mode
    const modelID = `modelID_${itemsID}_${mode}`;
    showModel(modelID);
    `);
    
    // Update button states
    updateBipodButtonStates();
    return;
  }
  
  // Check if the toggle is for the currently selected bipod
  if (currentBipodState.selected !== itemsID) {
    return;
  }
  
  // Set new mode
  currentBipodState.mode = mode;
  // Hide all bipod variants first
  hideAllBipodVariants();
  
  // Show selected variant in new mode
  const modelID = `modelID_${currentBipodState.selected}_${mode}`;
  showModel(modelID);
  `);
  
  // Update button states
  updateBipodButtonStates();
}

// Helper function to hide all bipod variants
function hideAllBipodVariants() {
  const bipodModels = [
    // Bipod 4 states
    'modelID_bipod00100101_A', // Folded Long
    'modelID_bipod00100101_B', // Folded Short
    'modelID_bipod00100101_C', // Open Short
    'modelID_bipod00100101_D'  // Open Long
  ];
  
  bipodModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to set default M-LOK for Bipod if none selected
function setDefaultMlokForBipod() {
  // Check if any M-LOK for Bipod is already selected
  const selected = getSelectedMlokForBipod();
  if (!selected) {
    // No M-LOK for Bipod selected, set default (first variant)
    if (window.part && window.part.mlokAndKeymodRail) {
      const group001 = window.part.mlokAndKeymodRail["001"];
      if (group001 && group001.products && group001.products["001"]) {
        const variants = group001.products["001"].variants;
        if (variants["01"]) {
          variants["01"].quantity = 1;
        }
      }
    }
  }
}

// Helper function to get selected M-LOK for Bipod (from dataController)
function getSelectedMlokForBipod() {
  if (window.part && window.part.mlokAndKeymodRail) {
    // Check group 001 (M-LOK for Bipod)
    const group001 = window.part.mlokAndKeymodRail["001"];
    if (group001 && group001.products && group001.products["001"]) {
      const variants = group001.products["001"].variants;
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

// Helper function to show M-LOK for Bipod
function showMlokForBipod() {
  // Set default M-LOK for Bipod if none selected (only when Bipod is selected)
  setDefaultMlokForBipod();
  
  // Use M-LOK for Bipod model controller to show the selected variant
  if (window.updateModel_MlokForBipod) {
    window.updateModel_MlokForBipod();
  } else {
    // Fallback: Show default M-LOK for Bipod
    const mlokModelID = 'modelID_mlokAndKeymodRail00100101_B';
    showModel(mlokModelID);
    : ${mlokModelID}`);
  }
}

// Helper function to hide M-LOK for Bipod
function hideMlokForBipod() {
  const mlokModels = [
    'modelID_mlokAndKeymodRail00100101_B', // M-LOK for Bipod
    'modelID_mlokAndKeymodRail00200101_B'  // Keymod for Bipod
  ];
  
  mlokModels.forEach(modelID => {
    hideModel(modelID);
  });
}

// Helper function to update button states
function updateBipodButtonStates() {
  if (!currentBipodState.selected) {
    clearBipodButtonStates();
    return;
  }
  
  // Get all bipod buttons
  const buttonA_ID = `buttonModelController_${currentBipodState.selected}_A`;
  const buttonB_ID = `buttonModelController_${currentBipodState.selected}_B`;
  const buttonC_ID = `buttonModelController_${currentBipodState.selected}_C`;
  const buttonD_ID = `buttonModelController_${currentBipodState.selected}_D`;
  
  const buttonA = document.getElementById(buttonA_ID);
  const buttonB = document.getElementById(buttonB_ID);
  const buttonC = document.getElementById(buttonC_ID);
  const buttonD = document.getElementById(buttonD_ID);
  // Clear all states first
  [buttonA, buttonB, buttonC, buttonD].forEach((button, index) => {
    if (button) {
      button.classList.remove('active');
      }: ${button.id}`);
    }
  });
  
  // Set active state based on current mode
  const activeButton = { 'A': buttonA, 'B': buttonB, 'C': buttonC, 'D': buttonD }[currentBipodState.mode];
  if (activeButton) {
    activeButton.classList.add('active');
    `);
  } else {
  }
}

// Helper function to clear button states
function clearBipodButtonStates() {
  const buttonIDs = [
    'buttonModelController_bipod00100101_A',
    'buttonModelController_bipod00100101_B',
    'buttonModelController_bipod00100101_C',
    'buttonModelController_bipod00100101_D'
  ];
  
  buttonIDs.forEach(buttonID => {
    const button = document.getElementById(buttonID);
    if (button) {
      button.classList.remove('active');
    }
  });
}

// Helper function to get selected bipod (from dataController)
function getSelectedBipod() {
  if (window.part && window.part.bipod) {
    const bipod = window.part.bipod["001"];
    if (bipod && bipod.products && bipod.products["001"]) {
      const variants = bipod.products["001"].variants;
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
window.updateModel_Bipod = updateModel_Bipod;
window.handleBipodSelection = handleBipodSelection;
window.handleBipodToggle = handleBipodToggle;