// Data Controller Core - CLEAN VERSION
// Basic data controller setup for M4_v4_01 initial parts

// Setup basic data controllers
export function setupDataControllers() {
  // Setup START button listener for initial parts
  setupStartButtonListener();
}

// Setup START button listener for initial parts
function setupStartButtonListener() {
  const startButton = document.getElementById('buttonModalStartMenu_StartButton');
  
  if (startButton) {
    startButton.addEventListener('click', function() {
      // Wait for data to be ready
      setTimeout(() => {
        // Initialize default initial parts
        initializeDefaultInitialParts();
      }, 1000);
    });
  } else {
  }
}

// Initialize default initial parts
function initializeDefaultInitialParts() {
  // This function will coordinate with individual dataController files
  // to set up the default initial parts when START button is clicked
  
  // The actual initialization will be handled by individual dataController files
  // that listen to the START button event
}

// Export for global access
window.setupDataControllers = setupDataControllers;
