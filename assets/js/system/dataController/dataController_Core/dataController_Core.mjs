// Data Controller Core - CLEAN VERSION
// Basic data controller setup for M4_v4_01 initial parts

// Setup basic data controllers
export function setupDataControllers() {
  console.log('🔧 Setting up basic data controllers for M4_v4_01');
  
  // Setup START button listener for initial parts
  setupStartButtonListener();
  
  console.log('✅ Basic data controllers initialized');
}

// Setup START button listener for initial parts
function setupStartButtonListener() {
  const startButton = document.getElementById('buttonModalStartMenu_StartButton');
  
  if (startButton) {
    startButton.addEventListener('click', function() {
      console.log('🎯 START button clicked - initializing default initial parts');
      
      // Wait for data to be ready
      setTimeout(() => {
        // Initialize default initial parts
        initializeDefaultInitialParts();
        console.log("✅ Default initial parts initialized");
      }, 1000);
    });
    
    console.log('✅ START button listener setup complete');
  } else {
    console.warn('⚠️ START button not found - listener not setup');
  }
}

// Initialize default initial parts
function initializeDefaultInitialParts() {
  console.log('🔧 Initializing default initial parts...');
  
  // This function will coordinate with individual dataController files
  // to set up the default initial parts when START button is clicked
  
  // The actual initialization will be handled by individual dataController files
  // that listen to the START button event
}

// Export for global access
window.setupDataControllers = setupDataControllers;
