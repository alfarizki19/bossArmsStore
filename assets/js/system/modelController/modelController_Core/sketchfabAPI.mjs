// Sketchfab API Integration for M4 Rifle Configurator - CLEAN VERSION
// Basic API functions for 3D model control - M4_v4_01

let apiGlobal = null;

// Global model state tracking (simplified)
export const modelState = {};

// Make modelState available globally for debugging
window.modelState = modelState;

// Initialize Sketchfab API
export function initSketchfab(api) {
    apiGlobal = api;
    window.sketchfabAPIReady = true;
    // Debug: Get list of all models in scene
    api.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        Object.values(nodes).forEach(node => {
        });
    });
}

// Get Sketchfab API instance (for use by other modules)
export function getSketchfabAPI() {
    if (!apiGlobal) {
        return null;
    }
    return apiGlobal;
}

// Basic function to show specific model
export function showModel(modelID) {
    if (!apiGlobal) {
        return false;
    }
    
    // Update model state
    modelState[modelID] = 1;
    `);
    
    // Apply to 3D scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return false;
        }
        
        const node = Object.values(nodes).find((n) => n.name === modelID);
        if (node) {
            apiGlobal.show(node.instanceID);
            return true;
        } else {
            return false;
        }
    });
}

// Basic function to hide specific model
export function hideModel(modelID) {
    if (!apiGlobal) {
        return false;
    }
    
    // Update model state
    modelState[modelID] = 0;
    `);
    
    // Apply to 3D scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return false;
        }
        
        const node = Object.values(nodes).find((n) => n.name === modelID);
        if (node) {
            apiGlobal.hide(node.instanceID);
            return true;
        } else {
            return false;
        }
    });
}

// Basic function to toggle model visibility
export function toggleModel(modelID) {
    const currentState = modelState[modelID];
    if (currentState === 1) {
        hideModel(modelID);
    } else {
        showModel(modelID);
    }
}

// Basic function to hide all models
export function hideAllModels() {
    if (!apiGlobal) {
        return;
    }
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        Object.values(nodes).forEach(node => {
            apiGlobal.hide(node.instanceID);
            modelState[node.name] = 0;
        });
    });
}

// Show/Hide objects in 3D scene (like the working project)
export function objectShowHideSystem() {
    if (!apiGlobal) {
        return;
    }
    // Debug: Count visible vs hidden models
    const visibleModels = Object.entries(modelState).filter(([key, value]) => value === 1);
    const hiddenModels = Object.entries(modelState).filter(([key, value]) => value === 0);
    if (visibleModels.length > 0) {
        => key));
    }
    
    // Get all nodes in scene and apply model state
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        .length} nodes in scene`);
        
        // Debug: List all available node names
        const nodeNames = Object.values(nodes).map(node => node.name);
        let successCount = 0;
        let errorCount = 0;
        
        // Apply model state to 3D scene
        for (const [modelID, visibility] of Object.entries(modelState)) {
            // Find node by name (modelID is the mesh name)
            const node = Object.values(nodes).find((n) => n.name === modelID);
            
            if (node) {
                try {
                    if (visibility === 1) {
                        // Show model
                        apiGlobal.show(node.instanceID);
                        `);
                        successCount++;
                    } else {
                        // Hide model
                        apiGlobal.hide(node.instanceID);
                        `);
                        successCount++;
                    }
                } catch (error) {
                    errorCount++;
                }
            } else {
                errorCount++;
            }
        }
        // Debug: Check if models are actually visible
        setTimeout(() => {
            Object.entries(modelState).forEach(([modelID, visibility]) => {
                if (visibility === 1) {
                    const node = Object.values(nodes).find((n) => n.name === modelID);
                    if (node) {
                        `);
                    }
                }
            });
        }, 1000);
    });
}

// Debug function to show all available Sketchfab resources
export function debugSketchfabResources() {
    if (!apiGlobal) {
        return;
    }
    // Get all nodes
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        Object.values(nodes).forEach(node => {
            `);
        });
    });
    
    // Get all textures
    apiGlobal.getTextureList(function (err, textures) {
        if (err) {
            return;
        }
        textures.forEach(texture => {
            `);
        });
    });
    
    // Get all materials
    apiGlobal.getMaterialList(function (err, materials) {
        if (err) {
            return;
        }
        materials.forEach(material => {
            .join(', ')})`);
        });
    });
}

// Get model ID from items ID (simplified mapping)
export function getModelIDFromItemsID(itemsID) {
    // Model ID mapping to mesh names from Blender M4_v4_01 (FINAL - Updated with correct mesh names)
    const modelIDMap = {
        // Barrel
        'barel00200101': 'modelID_barel00200101',
        
        // Bipod (4 states)
        'bipod00100101': 'modelID_bipod00100101_A', // Default to _A state
        
        // Bolt Carrier Group
        'boltCarrierGroup00100101': 'modelID_boltCarrierGroup00100101',
        'boltCarrierGroup00200101': 'modelID_boltCarrierGroup00200101',
        'boltCarrierGroup00200201': 'modelID_boltCarrierGroup00200201',
        
        // Bolt Catch
        'boltCatch00100101': 'modelID_boltCatch00100101',
        
        // Buffer Tube
        'bufferTube00100101': 'modelID_bufferTube00100101',
        
        // Buffer and Spring Kit
        'bufferAndSpringKit00100101': 'modelID_bufferAndSpringKit00100101',
        
        // Charging Handle
        'chargingHandle00100101': 'modelID_chargingHandle00100101',
        'chargingHandle00100102': 'modelID_chargingHandle00100102',
        'chargingHandle00200101': 'modelID_chargingHandle00200101',
        'chargingHandle00300101': 'modelID_chargingHandle00300101',
        'chargingHandle00300102': 'modelID_chargingHandle00300102',
        'chargingHandle00300103': 'modelID_chargingHandle00300103',
        'chargingHandle00400101': 'modelID_chargingHandle00400101',
        'chargingHandle00400102': 'modelID_chargingHandle00400102',
        'chargingHandle00400103': 'modelID_chargingHandle00400103',
        'chargingHandle00400104': 'modelID_chargingHandle00400104',
        'chargingHandle00400105': 'modelID_chargingHandle00400105',
        'chargingHandle00400106': 'modelID_chargingHandle00400106',
        'chargingHandle00400107': 'modelID_chargingHandle00400107',
        'chargingHandle00400108': 'modelID_chargingHandle00400108',
        'chargingHandle00400109': 'modelID_chargingHandle00400109',
        'chargingHandle00400110': 'modelID_chargingHandle00400110',
        
        // Ejection Port Cover
        'ejectionPortCover00100101': 'modelID_ejectionPortCover00100101',
        'ejectionPortCover00100102': 'modelID_ejectionPortCover00100102',
        'ejectionPortCover00100103': 'modelID_ejectionPortCover00100103',
        'ejectionPortCover00100104': 'modelID_ejectionPortCover00100104',
        'ejectionPortCover00100105': 'modelID_ejectionPortCover00100105',
        'ejectionPortCover00100106': 'modelID_ejectionPortCover00100106',
        'ejectionPortCover00100107': 'modelID_ejectionPortCover00100107',
        'ejectionPortCover00100108': 'modelID_ejectionPortCover00100108',
        'ejectionPortCover00100109': 'modelID_ejectionPortCover00100109',
        'ejectionPortCover00100110': 'modelID_ejectionPortCover00100110',
        
        // End Plate
        'endPlate00100101': 'modelID_endPlate00100101',
        'endPlate00100102': 'modelID_endPlate00100102',
        'endPlate00100103': 'modelID_endPlate00100103',
        'endPlate00100104': 'modelID_endPlate00100104',
        'endPlate00100105': 'modelID_endPlate00100105',
        'endPlate00100106': 'modelID_endPlate00100106',
        'endPlate00100107': 'modelID_endPlate00100107',
        'endPlate00200101': 'modelID_endPlate00200101',
        'endPlate00200102': 'modelID_endPlate00200102',
        'endPlate00200103': 'modelID_endPlate00200103',
        'endPlate00200104': 'modelID_endPlate00200104',
        'endPlate00200105': 'modelID_endPlate00200105',
        'endPlate00200106': 'modelID_endPlate00200106',
        'endPlate00200107': 'modelID_endPlate00200107',
        'endPlate00200108': 'modelID_endPlate00200108',
        'endPlate00200109': 'modelID_endPlate00200109',
        'endPlate00200110': 'modelID_endPlate00200110',
        
        // Forward Assist
        'forwardAssists00100101': 'modelID_forwardAssists00100101',
        'forwardAssists00100102': 'modelID_forwardAssists00100102',
        
        // Front Sight
        'frontSight00100101': 'modelID_frontSight00100101_A', // Default to _A state
        'frontSight00200101': 'modelID_frontSight00200101_A', // Default to _A state
        
        // Handguard Rail System
        'handguardRailSystem00100101': 'modelID_handguardRailSystem00100101',
        'handguardRailSystem00100102': 'modelID_handguardRailSystem00100102',
        'handguardRailSystem00100201': 'modelID_handguardRailSystem00100201',
        'handguardRailSystem00100202': 'modelID_handguardRailSystem00100202',
        
        // Laser Sight
        'laserSight00100101': 'modelID_laserSight00100101',
        
        // Lower Receiver
        'lowerReceiver00100101': 'modelID_lowerReceiver00100101',
        'lowerReceiver00100102': 'modelID_lowerReceiver00100102',
        
        // Magazine
        'magazine00100101': 'modelID_magazine00100101',
        'magazine00200101': 'modelID_magazine00200101',
        
        // Magazine Release
        'magazineRelease00100101': 'modelID_magazineRelease00100101',
        'magazineRelease00100102': 'modelID_magazineRelease00100102',
        'magazineRelease00100103': 'modelID_magazineRelease00100103',
        'magazineRelease00200101': 'modelID_magazineRelease00200101',
        'magazineRelease00200102': 'modelID_magazineRelease00200102',
        'magazineRelease00200103': 'modelID_magazineRelease00200103',
        'magazineRelease00200104': 'modelID_magazineRelease00200104',
        'magazineRelease00200105': 'modelID_magazineRelease00200105',
        'magazineRelease00200106': 'modelID_magazineRelease00200106',
        'magazineRelease00200107': 'modelID_magazineRelease00200107',
        'magazineRelease00200108': 'modelID_magazineRelease00200108',
        'magazineRelease00200109': 'modelID_magazineRelease00200109',
        'magazineRelease00200110': 'modelID_magazineRelease00200110',
        
        // MLOK/KeyMod Rails
        'mlokAndKeymodRail00100101': 'modelID_mlokAndKeymodRail00100101_A', // Default to _A state
        'mlokAndKeymodRail00200101': 'modelID_mlokAndKeymodRail00200101_A', // Default to _A state
        
        // Muzzle Device
        'muzzleDevice00100101': 'modelID_muzzleDevice00100101',
        'muzzleDevice00100201': 'modelID_muzzleDevice00100201',
        'muzzleDevice00100301': 'modelID_muzzleDevice00100301',
        'muzzleDevice00100302': 'modelID_muzzleDevice00100302',
        'muzzleDevice00200201': 'modelID_muzzledevice00200201',  // Fixed: lowercase 'muzzledevice'
        'muzzleDevice00200202': 'modelID_muzzledevice00200202',  // Fixed: lowercase 'muzzledevice'
        
        // Optic Sight
        'opticSight00100101': 'modelID_opticSight00100101',
        
        // Laser Sight
        'laserSight00100101': 'modelID_laserSight00100101',
        
        // Bipod
        'bipod00100101': 'modelID_bipod00100101_A', // Default to _A state
        
        // Pistol Grip
        'pistolGrip00100101': 'modelID_pistolGrip00100101',
        'pistolGrip00100102': 'modelID_pistolGrip00100102',
        'pistolGrip00100103': 'modelID_pistolGrip00100103',
        'pistolGrip00200101': 'modelID_pistolGrip00200101',
        'pistolGrip00200102': 'modelID_pistolGrip00200102',
        'pistolGrip00200103': 'modelID_pistolGrip00200103',
        'pistolGrip00200104': 'modelID_pistolGrip00200104',
        'pistolGrip00200105': 'modelID_pistolGrip00200105',
        'pistolGrip00200106': 'modelID_pistolGrip00200106',
        'pistolGrip00200107': 'modelID_pistolGrip00200107',
        
        // Rear Sight
        'rearSight00100101': 'modelID_rearSight00100101_A', // Default to _A state
        'rearSight00200101': 'modelID_rearSight00200101_A', // Default to _A state
        
        // Safety
        'safety00100101': 'modelID_safety00100101',
        'safety00100102': 'modelID_safety00100102',
        'safety00100103': 'modelID_safety00100103',
        'safety00100104': 'modelID_safety00100104',
        'safety00200101': 'modelID_safety00200101',
        'safety00200102': 'modelID_safety00200102',
        'safety00200103': 'modelID_safety00200103',
        'safety00200104': 'modelID_safety00200104',
        'safety00200105': 'modelID_safety00200105',
        'safety00200106': 'modelID_safety00200106',
        'safety00200107': 'modelID_safety00200107',
        'safety00200108': 'modelID_safety00200108',
        'safety00200109': 'modelID_safety00200109',
        'safety00200110': 'modelID_safety00200110',
        
        // Stock
        'stock00100101': 'modelID_stock00100101',
        'stock00100102': 'modelID_stock00100102',
        'stock00100103': 'modelID_stock00100103',
        'stock00100104': 'modelID_stock00100104',
        'stock00100105': 'modelID_stock00100105',
        'stock00200101': 'modelID_stock00200101',
        'stock00200102': 'modelID_stock00200102',
        'stock00200103': 'modelID_stock00200103',
        
        // Takedown Pin Set
        'takedownPinSet00100101': 'modelID_takedownPinSet00100101',
        'takedownPinSet00100102': 'modelID_takedownPinSet00100102',
        'takedownPinSet00200101': 'modelID_takedownPinSet00200101',
        'takedownPinSet00200102': 'modelID_takedownPinSet00200102',
        'takedownPinSet00200103': 'modelID_takedownPinSet00200103',
        'takedownPinSet00200104': 'modelID_takedownPinSet00200104',
        'takedownPinSet00200105': 'modelID_takedownPinSet00200105',
        'takedownPinSet00200106': 'modelID_takedownPinSet00200106',
        'takedownPinSet00200107': 'modelID_takedownPinSet00200107',
        'takedownPinSet00200108': 'modelID_takedownPinSet00200108',
        'takedownPinSet00200109': 'modelID_takedownPinSet00200109',
        'takedownPinSet00200110': 'modelID_takedownPinSet00200110',
        'takedownPinSet00300101': 'modelID_takedownPinSet00300101',
        
        // Trigger
        'trigger00100101': 'modelID_trigger00100101',
        'trigger00200101': 'modelID_trigger00200101',
        'trigger00200102': 'modelID_trigger00200102',
        'trigger00200103': 'modelID_trigger00200103',
        
        // Trigger Guard
        'triggerGuard00100101': 'modelID_triggerGuard00100101',
        'triggerGuard00100102': 'modelID_triggerGuard00100102',
        'triggerGuard00100103': 'modelID_triggerGuard00100103',
        'triggerGuard00100104': 'modelID_triggerGuard00100104',
        'triggerGuard00100105': 'modelID_triggerGuard00100105',
        'triggerGuard00100106': 'modelID_triggerGuard00100106',
        'triggerGuard00100107': 'modelID_triggerGuard00100107',
        'triggerGuard00200101': 'modelID_triggerGuard00200101',
        'triggerGuard00200102': 'modelID_triggerGuard00200102',
        'triggerGuard00200103': 'modelID_triggerGuard00200103',
        'triggerGuard00200104': 'modelID_triggerGuard00200104',
        'triggerGuard00200105': 'modelID_triggerGuard00200105',
        'triggerGuard00200106': 'modelID_triggerGuard00200106',
        'triggerGuard00200107': 'modelID_triggerGuard00200107',
        'triggerGuard00200108': 'modelID_triggerGuard00200108',
        'triggerGuard00200109': 'modelID_triggerGuard00200109',
        'triggerGuard00200110': 'modelID_triggerGuard00200110',
        
        // Upper Receiver
        'upperReceiver00100101': 'modelID_upperReceiver00100101',
        'upperReceiver00100102': 'modelID_upperReceiver00100102',
        
        // Lower Receiver
        'lowerReceiver00100101': 'modelID_lowerReceiver00100101'
    };
    
    const result = modelIDMap[itemsID] || null;
    return result;
}

// Initialize model state (simplified)
export function initializeModelState() {
    // Initialize all possible model states to 0 (hidden) - Updated with correct mesh names from M4_v4_01
    const allModelIDs = [
        // Barrel
        'modelID_barel00200101',
        
        // Bipod (4 states)
        'modelID_bipod00100101_A', 'modelID_bipod00100101_B', 'modelID_bipod00100101_C', 'modelID_bipod00100101_D',
        
        // Bolt Carrier Group
        'modelID_boltCarrierGroup00100101', 'modelID_boltCarrierGroup00200101', 'modelID_boltCarrierGroup00200201',
        
        // Bolt Catch
        'modelID_boltCatch00100101',
        
        // Buffer Tube
        'modelID_bufferTube00100101',
        
        // Buffer and Spring Kit
        'modelID_bufferAndSpringKit00100101',
        
        // Charging Handle
        'modelID_chargingHandle00100101', 'modelID_chargingHandle00100102',
        'modelID_chargingHandle00200101', 'modelID_chargingHandle00300101', 'modelID_chargingHandle00300102',
        'modelID_chargingHandle00300103', 'modelID_chargingHandle00400101', 'modelID_chargingHandle00400102',
        'modelID_chargingHandle00400103', 'modelID_chargingHandle00400104', 'modelID_chargingHandle00400105',
        'modelID_chargingHandle00400106', 'modelID_chargingHandle00400107', 'modelID_chargingHandle00400108',
        'modelID_chargingHandle00400109', 'modelID_chargingHandle00400110',
        
        // Ejection Port Cover
        'modelID_ejectionPortCover00100101', 'modelID_ejectionPortCover00100102', 'modelID_ejectionPortCover00100103',
        'modelID_ejectionPortCover00100104', 'modelID_ejectionPortCover00100105', 'modelID_ejectionPortCover00100106',
        'modelID_ejectionPortCover00100107', 'modelID_ejectionPortCover00100108', 'modelID_ejectionPortCover00100109',
        'modelID_ejectionPortCover00100110',
        
        // End Plate
        'modelID_endPlate00100101', 'modelID_endPlate00100102', 'modelID_endPlate00100103', 'modelID_endPlate00100104', 'modelID_endPlate00100105', 'modelID_endPlate00100106', 'modelID_endPlate00100107',
        'modelID_endPlate00200101', 'modelID_endPlate00200102', 'modelID_endPlate00200103', 'modelID_endPlate00200104', 'modelID_endPlate00200105', 'modelID_endPlate00200106', 'modelID_endPlate00200107', 'modelID_endPlate00200108', 'modelID_endPlate00200109', 'modelID_endPlate00200110',
        
        // Forward Assist
        'modelID_forwardAssists00100101', 'modelID_forwardAssists00100102',
        
        // Front Sight
        'modelID_frontSight00100101_A', 'modelID_frontSight00100101_B', 'modelID_frontSight00200101_A', 'modelID_frontSight00200101_B',
        
        // Handguard Rail System
        'modelID_handguardRailSystem00100101', 'modelID_handguardRailSystem00100102', 'modelID_handguardRailSystem00100201', 'modelID_handguardRailSystem00100202',
        
        // Laser Sight
        'modelID_laserSight00100101',
        
        // Lower Receiver
        'modelID_lowerReceiver00100101', 'modelID_lowerReceiver00100102',
        
        // Magazine
        'modelID_magazine00100101', 'modelID_magazine00200101',
        
        // Magazine Release
        'modelID_magazineRelease00100101', 'modelID_magazineRelease00100102', 'modelID_magazineRelease00100103',
        'modelID_magazineRelease00200101', 'modelID_magazineRelease00200102', 'modelID_magazineRelease00200103',
        'modelID_magazineRelease00200104', 'modelID_magazineRelease00200105', 'modelID_magazineRelease00200106',
        'modelID_magazineRelease00200107', 'modelID_magazineRelease00200108', 'modelID_magazineRelease00200109',
        'modelID_magazineRelease00200110',
        
        // MLOK/KeyMod Rails
        'modelID_mlokAndKeymodRail00100101_A', 'modelID_mlokAndKeymodRail00100101_B', 'modelID_mlokAndKeymodRail00200101_A', 'modelID_mlokAndKeymodRail00200101_B',
        
        // Muzzle Device
        'modelID_muzzleDevice00100101', 'modelID_muzzleDevice00100201', 'modelID_muzzleDevice00100301', 'modelID_muzzleDevice00100302',
        'modelID_muzzledevice00200201', 'modelID_muzzledevice00200202',  // Fixed: lowercase 'muzzledevice'
        
        // Optic Sight
        'modelID_opticSight00100101',
        
        // Laser Sight
        'modelID_laserSight00100101',
        
        // Bipod
        'modelID_bipod00100101_A', 'modelID_bipod00100101_B', 'modelID_bipod00100101_C', 'modelID_bipod00100101_D',
        
        // Pistol Grip
        'modelID_pistolGrip00100101', 'modelID_pistolGrip00100102', 'modelID_pistolGrip00100103',
        'modelID_pistolGrip00200101', 'modelID_pistolGrip00200102', 'modelID_pistolGrip00200103',
        'modelID_pistolGrip00200104',         'modelID_pistolGrip00200105', 'modelID_pistolGrip00200106',
        'modelID_pistolGrip00200107',
        
        // Rear Sight
        'modelID_rearSight00100101_A', 'modelID_rearSight00100101_B', 'modelID_rearSight00200101_A', 'modelID_rearSight00200101_B',
        
        // Safety
        'modelID_safety00100101', 'modelID_safety00100102', 'modelID_safety00100103', 'modelID_safety00100104',
        'modelID_safety00200101', 'modelID_safety00200102', 'modelID_safety00200103', 'modelID_safety00200104',
        'modelID_safety00200105', 'modelID_safety00200106', 'modelID_safety00200107', 'modelID_safety00200108',
        'modelID_safety00200109', 'modelID_safety00200110',
        
        // Stock
        'modelID_stock00100101', 'modelID_stock00100102', 'modelID_stock00100103', 'modelID_stock00100104', 'modelID_stock00100105',
        'modelID_stock00200101', 'modelID_stock00200102', 'modelID_stock00200103',
        
        // Takedown Pin Set
        'modelID_takedownPinSet00100101', 'modelID_takedownPinSet00100102', 'modelID_takedownPinSet00200101',
        'modelID_takedownPinSet00200102', 'modelID_takedownPinSet00200103', 'modelID_takedownPinSet00200104',
        'modelID_takedownPinSet00200105', 'modelID_takedownPinSet00200106', 'modelID_takedownPinSet00200107',
        'modelID_takedownPinSet00200108', 'modelID_takedownPinSet00200109', 'modelID_takedownPinSet00200110',
        'modelID_takedownPinSet00300101',
        
        // Trigger
        'modelID_trigger00100101', 'modelID_trigger00200101', 'modelID_trigger00200102', 'modelID_trigger00200103',
        
        // Trigger Guard
        'modelID_triggerGuard00100101', 'modelID_triggerGuard00100102', 'modelID_triggerGuard00100103', 'modelID_triggerGuard00100104',
        'modelID_triggerGuard00100105', 'modelID_triggerGuard00100106', 'modelID_triggerGuard00100107',
        'modelID_triggerGuard00200101', 'modelID_triggerGuard00200102', 'modelID_triggerGuard00200103', 'modelID_triggerGuard00200104',
        'modelID_triggerGuard00200105', 'modelID_triggerGuard00200106', 'modelID_triggerGuard00200107',
        'modelID_triggerGuard00200108', 'modelID_triggerGuard00200109', 'modelID_triggerGuard00200110',
        
        // Upper Receiver
        'modelID_upperReceiver00100101', 'modelID_upperReceiver00100102',
        
        // Lower Receiver
        'modelID_lowerReceiver00100101'
    ];
    
    // Initialize all models to hidden state first
    allModelIDs.forEach(modelID => {
        modelState[modelID] = 0;
    });
    // Set initial parts to visible (1) - Using working configuration from v6001002
    const initialParts = [
        // Upper parts
        'modelID_barel00200101',
        'modelID_boltCarrierGroup00100101',
        'modelID_chargingHandle00100101',
        'modelID_ejectionPortCover00100101',
        'modelID_forwardAssists00100101',
        'modelID_handguardRailSystem00100101',
        'modelID_muzzleDevice00100101',
        'modelID_upperReceiver00100101',
        
        // Lower parts
        'modelID_boltCatch00100101',
        'modelID_bufferAndSpringKit00100101',
        'modelID_bufferTube00100101',
        'modelID_endPlate00100101',
        'modelID_lowerReceiver00100101',
        'modelID_magazine00100101',              // Magazine: 00100101 (default from dataController)
        'modelID_magazineRelease00100101',
        'modelID_pistolGrip00200102',            // Pistol Grip: 00200102 (default)
        'modelID_safety00100101',
        'modelID_stock00100101',
        'modelID_takedownPinSet00100101',
        'modelID_trigger00100101',
        'modelID_triggerGuard00100101'
    ];
    
    // Set initial parts to visible
    initialParts.forEach(modelID => {
        modelState[modelID] = 1;
    });
    `);
    
    // Debug: Show current modelState
    // Debug: Count visible models
    const visibleCount = Object.values(modelState).filter(state => state === 1).length;
    // Signal that initial models are ready
    window.initialModelsReady = true;
    // Also signal that model state is initialized
    window.modelStateInitialized = true;
}

// Test function to show all models (for debugging)
export function testShowAllModels() {
    if (!apiGlobal) {
        return;
    }
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        Object.values(nodes).forEach(node => {
            apiGlobal.show(node.instanceID);
            modelState[node.name] = 1;
        });
    });
}

// Test function to hide all models (for debugging)
export function testHideAllModels() {
    if (!apiGlobal) {
        return;
    }
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        Object.values(nodes).forEach(node => {
            apiGlobal.hide(node.instanceID);
            modelState[node.name] = 0;
        });
    });
}

// Debug function to check if initial models exist in scene
export function debugCheckModelsInScene() {
    if (!apiGlobal) {
        return;
    }
    
    const initialParts = [
        // Upper parts
        'modelID_barel00200101',
        'modelID_boltCarrierGroup00100101',
        'modelID_chargingHandle00100101',
        'modelID_ejectionPortCover00100101',
        'modelID_forwardAssists00100101',
        'modelID_handguardRailSystem00100101',
        'modelID_muzzleDevice00100101',
        'modelID_upperReceiver00100101',
        
        // Lower parts
        'modelID_boltCatch00100101',
        'modelID_bufferAndSpringKit00100101',
        'modelID_bufferTube00100101',
        'modelID_endPlate00100101',
        'modelID_lowerReceiver00100101',
        'modelID_magazine00100101',              // Magazine: 00100101 (default from dataController)
        'modelID_magazineRelease00100101',
        'modelID_pistolGrip00200102',            // Pistol Grip: 00200102 (default)
        'modelID_safety00100101',
        'modelID_stock00100101',
        'modelID_takedownPinSet00100101',
        'modelID_trigger00100101',
        'modelID_triggerGuard00100101'
    ];
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        const nodeNames = Object.values(nodes).map(node => node.name);
        
        let foundCount = 0;
        let missingCount = 0;
        
        initialParts.forEach(modelID => {
            if (nodeNames.includes(modelID)) {
                foundCount++;
            } else {
                missingCount++;
            }
        });
        if (missingCount > 0) {
        } else {
        }
    });
}

// Function to update muzzle device safely
export function updateMuzzleDevice(newItemsID) {
    if (!apiGlobal) {
        return false;
    }
    // Get the new model ID
    const newModelID = getModelIDFromItemsID(newItemsID);
    if (!newModelID) {
        return false;
    }
    // Current muzzle device (default)
    const currentMuzzleDevice = 'modelID_muzzleDevice00100101';
    
    // Check if new model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(newModelID);
        
        if (!exists) {
            ));
            return false;
        }
        // Hide current muzzle device if it's visible
        if (modelState[currentMuzzleDevice] === 1) {
            hideModel(currentMuzzleDevice);
        }
        
        // Show new muzzle device
        showModel(newModelID);
        // Update modelState
        modelState[currentMuzzleDevice] = 0;
        modelState[newModelID] = 1;
    });
    
    return true;
}

// Function to test all muzzle device variants (updated to use existing devices only)
export function testAllMuzzleDevices() {
    to avoid missing models');
    testExistingMuzzleDevices();
}

// Debug function to check which muzzle devices actually exist in scene
export function debugMuzzleDevicesInScene() {
    if (!apiGlobal) {
        return;
    }
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const muzzleDeviceNodes = nodeNames.filter(name => name.includes('muzzleDevice'));
        muzzleDeviceNodes.forEach(nodeName => {
        });
        
        // Check our expected muzzle devices
        const expectedMuzzleDevices = [
            'modelID_muzzleDevice00100101',
            'modelID_muzzleDevice00100201',
            'modelID_muzzleDevice00100301',
            'modelID_muzzleDevice00100302',
            'modelID_muzzledevice00200201',  // Fixed: lowercase 'muzzledevice'
            'modelID_muzzledevice00200202'   // Fixed: lowercase 'muzzledevice'
        ];
        expectedMuzzleDevices.forEach(modelID => {
            const exists = nodeNames.includes(modelID);
            const status = exists ? '✅ EXISTS' : '❌ MISSING';
        });
        
        // Show available vs expected
    });
}

// Updated function to test only existing muzzle devices
export function testExistingMuzzleDevices() {
    if (!apiGlobal) {
        return;
    }
    // First check which ones exist
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        
        // Check which muzzle devices actually exist
        const existingMuzzleDevices = [
            'muzzleDevice00100101',  // Default
            'muzzleDevice00100201',
            'muzzleDevice00100301',
            'muzzleDevice00100302',
            'muzzleDevice00200201',
            'muzzleDevice00200202'
        ].filter(itemsID => {
            const modelID = getModelIDFromItemsID(itemsID);
            return nodeNames.includes(modelID);
        });
        if (existingMuzzleDevices.length === 0) {
            return;
        }
        
        let testIndex = 0;
        
        function testNextMuzzleDevice() {
            if (testIndex >= existingMuzzleDevices.length) {
                // Reset to default
                updateMuzzleDevice('muzzleDevice00100101');
                return;
            }
            
            const itemsID = existingMuzzleDevices[testIndex];
            updateMuzzleDevice(itemsID);
            
            testIndex++;
            
            // Test next muzzle device after 2 seconds
            setTimeout(testNextMuzzleDevice, 2000);
        }
        
        // Start testing
        testNextMuzzleDevice();
    });
}

// Function to test all available muzzle devices individually
export function testAllAvailableMuzzleDevices() {
    const availableMuzzleDevices = [
        'muzzleDevice00100101',  // Default - ✅ CONFIRMED
        'muzzleDevice00100201',  // ✅ CONFIRMED
        'muzzleDevice00100301',  // ✅ CONFIRMED
        'muzzleDevice00100302',  // Test this
        'muzzleDevice00200201',  // Test this
        'muzzleDevice00200202'   // Test this
    ];
    availableMuzzleDevices.forEach((itemsID, index) => {
        const status = index < 3 ? '✅ CONFIRMED' : '🧪 TO TEST';
    });
    
    // Test each one
    availableMuzzleDevices.forEach((itemsID, index) => {
        setTimeout(() => {
            updateMuzzleDevice(itemsID);
        }, index * 3000); // 3 seconds between each test
    });
    
    // Reset to default after all tests
    setTimeout(() => {
        updateMuzzleDevice('muzzleDevice00100101');
    }, availableMuzzleDevices.length * 3000 + 1000);
}

// Function to test specific muzzle device with confirmation
export function testSpecificMuzzleDevice(itemsID) {
    const result = updateMuzzleDevice(itemsID);
    
    if (result) {
    } else {
    }
    
    return result;
}

// Function to get list of working muzzle devices
export function getWorkingMuzzleDevices() {
    const workingMuzzleDevices = [
        'muzzleDevice00100101',  // Default
        'muzzleDevice00100201',  // Confirmed working
        'muzzleDevice00100301'   // Confirmed working
    ];
    
    workingMuzzleDevices.forEach((itemsID, index) => {
    });
    const toTestMuzzleDevices = [
        'muzzleDevice00100302',
        'muzzleDevice00200201',
        'muzzleDevice00200202'
    ];
    
    toTestMuzzleDevices.forEach((itemsID, index) => {
    });
    
    return {
        working: workingMuzzleDevices,
        toTest: toTestMuzzleDevices
    };
}

// Function to update end plate safely
export function updateEndPlate(newItemsID) {
    if (!apiGlobal) {
        return false;
    }
    // Get the new model ID
    const newModelID = getModelIDFromItemsID(newItemsID);
    if (!newModelID) {
        return false;
    }
    // Current end plate (default)
    const currentEndPlate = 'modelID_endPlate00100101';
    
    // Check if new model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(newModelID);
        
        if (!exists) {
            ));
            return false;
        }
        // Hide current end plate if it's visible
        if (modelState[currentEndPlate] === 1) {
            hideModel(currentEndPlate);
        }
        
        // Show new end plate
        showModel(newModelID);
        // Update modelState
        modelState[currentEndPlate] = 0;
        modelState[newModelID] = 1;
    });
    
    return true;
}

// Debug function to check which end plates actually exist in scene
export function debugEndPlatesInScene() {
    if (!apiGlobal) {
        return;
    }
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const endPlateNodes = nodeNames.filter(name => name.includes('endPlate'));
        endPlateNodes.forEach(nodeName => {
        });
        
        // Check our expected end plates
        const expectedEndPlates = [
            'modelID_endPlate00100101',
            'modelID_endPlate00100102',
            'modelID_endPlate00100103',
            'modelID_endPlate00100104',
            'modelID_endPlate00100105',
            'modelID_endPlate00100106',
            'modelID_endPlate00100107',
            'modelID_endPlate00200101',
            'modelID_endPlate00200102',
            'modelID_endPlate00200103',
            'modelID_endPlate00200104',
            'modelID_endPlate00200105',
            'modelID_endPlate00200106',
            'modelID_endPlate00200107',
            'modelID_endPlate00200108',
            'modelID_endPlate00200109',
            'modelID_endPlate00200110'
        ];
        expectedEndPlates.forEach(modelID => {
            const exists = nodeNames.includes(modelID);
            const status = exists ? '✅ EXISTS' : '❌ MISSING';
        });
        
        // Show available vs expected
    });
}

// Function to test all available end plates
export function testAllEndPlates() {
    const availableEndPlates = [
        'endPlate00100101',  // Default
        'endPlate00100102',
        'endPlate00100103',
        'endPlate00100104',
        'endPlate00100105',
        'endPlate00100106',
        'endPlate00100107',
        'endPlate00200101',
        'endPlate00200102',
        'endPlate00200103',
        'endPlate00200104',
        'endPlate00200105',
        'endPlate00200106',
        'endPlate00200107',
        'endPlate00200108',
        'endPlate00200109',
        'endPlate00200110'
    ];
    availableEndPlates.forEach((itemsID, index) => {
        const status = index === 0 ? '✅ DEFAULT' : '🧪 TO TEST';
    });
    
    // Test each one
    availableEndPlates.forEach((itemsID, index) => {
        setTimeout(() => {
            updateEndPlate(itemsID);
        }, index * 2000); // 2 seconds between each test
    });
    
    // Reset to default after all tests
    setTimeout(() => {
        updateEndPlate('endPlate00100101');
    }, availableEndPlates.length * 2000 + 1000);
}

// Function to test specific end plate
export function testSpecificEndPlate(itemsID) {
    const result = updateEndPlate(itemsID);
    
    if (result) {
    } else {
    }
    
    return result;
}

// Universal debug function for any part category
export function debugPartCategory(partName) {
    if (!apiGlobal) {
        return;
    }
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const partNodes = nodeNames.filter(name => name.toLowerCase().includes(partName.toLowerCase()));
        partNodes.forEach(nodeName => {
        });
    });
}

// Universal update function for any part
export function updatePart(partName, newItemsID) {
    if (!apiGlobal) {
        return false;
    }
    // Get the new model ID
    const newModelID = getModelIDFromItemsID(newItemsID);
    if (!newModelID) {
        return false;
    }
    // Check if new model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(newModelID);
        
        if (!exists) {
            .includes(partName.toLowerCase())));
            return false;
        }
        // Find current part (first visible part of this category)
        const currentPart = Object.keys(modelState).find(modelID => 
            modelID.toLowerCase().includes(partName.toLowerCase()) && modelState[modelID] === 1
        );
        
        if (currentPart) {
            hideModel(currentPart);
        }
        
        // Show new part
        showModel(newModelID);
        // Update modelState
        if (currentPart) {
            modelState[currentPart] = 0;
        }
        modelState[newModelID] = 1;
    });
    
    return true;
}

// Universal test function for any part category
export function testPartCategory(partName, itemsIDs) {
    itemsIDs.forEach((itemsID, index) => {
        const status = index === 0 ? '✅ DEFAULT' : '🧪 TO TEST';
    });
    
    // Test each one
    itemsIDs.forEach((itemsID, index) => {
        setTimeout(() => {
            updatePart(partName, itemsID);
        }, index * 2000); // 2 seconds between each test
    });
    
    // Reset to default after all tests
    setTimeout(() => {
        updatePart(partName, itemsIDs[0]);
    }, itemsIDs.length * 2000 + 1000);
}

// Function to test specific part
export function testSpecificPart(partName, itemsID) {
    const result = updatePart(partName, itemsID);
    
    if (result) {
    } else {
    }
    
    return result;
}

// Function to show specific part by itemsID
export function showPartByItemsID(itemsID) {
    if (!apiGlobal) {
        return false;
    }
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        return false;
    }
    // Check if model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(modelID);
        
        if (!exists) {
            return false;
        }
        // Show the model
        showModel(modelID);
        `);
    });
    
    return true;
}

// Function to hide specific part by itemsID
export function hidePartByItemsID(itemsID) {
    if (!apiGlobal) {
        return false;
    }
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        return false;
    }
    // Check if model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(modelID);
        
        if (!exists) {
            return false;
        }
        // Hide the model
        hideModel(modelID);
        `);
    });
    
    return true;
}

// Function to toggle specific part by itemsID
export function togglePartByItemsID(itemsID) {
    if (!apiGlobal) {
        return false;
    }
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        return false;
    }
    // Check current state
    const currentState = modelState[modelID];
    `);
    
    // Toggle the model
    toggleModel(modelID);
    `);
    
    return true;
}

// Function to check part state
export function checkPartState(itemsID) {
    if (!apiGlobal) {
        return false;
    }
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        return false;
    }
    // Check current state
    const currentState = modelState[modelID];
    const status = currentState === 1 ? '✅ VISIBLE' : '❌ HIDDEN';
    `);
    
    return currentState;
}

// Function to check if part exists in scene (returns true/false)
export function checkPartExists(itemsID) {
    if (!apiGlobal) {
        return false;
    }
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        `);
        return false;
    }
    // Check if model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return false;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(modelID);
        
        if (exists) {
            `);
        } else {
            `);
        }
        
        return exists;
    });
    
    return true; // Will be updated by the callback
}

// Function to test multiple parts existence at once
export function testPartsExistence(itemsIDs) {
    if (!apiGlobal) {
        return;
    }
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        itemsIDs.forEach(itemsID => {
            const modelID = getModelIDFromItemsID(itemsID);
            if (!modelID) {
            } else {
                const exists = nodeNames.includes(modelID);
                const status = exists ? '✅ EXISTS' : '❌ MISSING';
            }
        });
    });
}

// Function to test all parts in a category
export function testCategoryExistence(partName) {
    if (!apiGlobal) {
        return;
    }
    // Get all itemsIDs for this category from modelState
    const categoryItemsIDs = Object.keys(modelState).filter(modelID => 
        modelID.toLowerCase().includes(partName.toLowerCase())
    ).map(modelID => {
        // Find the itemsID that maps to this modelID
        for (const [itemsID, mappedModelID] of Object.entries(getModelIDFromItemsID)) {
            if (mappedModelID === modelID) {
                return itemsID;
            }
        }
        return null;
    }).filter(Boolean);
    if (categoryItemsIDs.length > 0) {
        testPartsExistence(categoryItemsIDs);
    } else {
    }
}

// Make debug functions available globally
window.debugSketchfabResources = debugSketchfabResources;
window.debugCheckModelsInScene = debugCheckModelsInScene;
window.debugMuzzleDevicesInScene = debugMuzzleDevicesInScene;
window.debugEndPlatesInScene = debugEndPlatesInScene;
window.debugPartCategory = debugPartCategory;
window.testShowAllModels = testShowAllModels;
window.testHideAllModels = testHideAllModels;
window.updateMuzzleDevice = updateMuzzleDevice;
window.updateEndPlate = updateEndPlate;
window.updatePart = updatePart;
window.testAllMuzzleDevices = testAllMuzzleDevices;
window.testExistingMuzzleDevices = testExistingMuzzleDevices;
window.testAllAvailableMuzzleDevices = testAllAvailableMuzzleDevices;
window.testSpecificMuzzleDevice = testSpecificMuzzleDevice;
window.getWorkingMuzzleDevices = getWorkingMuzzleDevices;
window.testAllEndPlates = testAllEndPlates;
window.testSpecificEndPlate = testSpecificEndPlate;
window.testPartCategory = testPartCategory;
window.testSpecificPart = testSpecificPart;
window.showPartByItemsID = showPartByItemsID;
window.hidePartByItemsID = hidePartByItemsID;
window.togglePartByItemsID = togglePartByItemsID;
window.checkPartState = checkPartState;
window.checkPartExists = checkPartExists;
window.testPartsExistence = testPartsExistence;
window.testCategoryExistence = testCategoryExistence;