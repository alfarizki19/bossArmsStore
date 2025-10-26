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
    console.log('✅ Sketchfab API initialized for M4_v4_01');
    console.log('✅ window.sketchfabAPIReady set to true');
    
    // Debug: Get list of all models in scene
    api.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Failed to get node map:', err);
            return;
        }
        console.log('📋 Available models in M4_v4_01 scene:');
        Object.values(nodes).forEach(node => {
            console.log(`- Name: ${node.name}, InstanceID: ${node.instanceID}`);
        });
    });
}

// Basic function to show specific model
export function showModel(modelID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    // Update model state
    modelState[modelID] = 1;
    console.log(`📝 Model state updated: ${modelID} = 1 (visible)`);
    
    // Apply to 3D scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return false;
        }
        
        const node = Object.values(nodes).find((n) => n.name === modelID);
        if (node) {
            apiGlobal.show(node.instanceID);
            console.log(`✅ ${modelID} shown`);
            return true;
        } else {
            console.warn(`⚠️ ${modelID} not found in scene`);
            return false;
        }
    });
}

// Basic function to hide specific model
export function hideModel(modelID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    // Update model state
    modelState[modelID] = 0;
    console.log(`📝 Model state updated: ${modelID} = 0 (hidden)`);
    
    // Apply to 3D scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return false;
        }
        
        const node = Object.values(nodes).find((n) => n.name === modelID);
        if (node) {
            apiGlobal.hide(node.instanceID);
            console.log(`👁️‍🗨️ ${modelID} hidden`);
            return true;
        } else {
            console.warn(`⚠️ ${modelID} not found in scene`);
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
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        Object.values(nodes).forEach(node => {
            apiGlobal.hide(node.instanceID);
            modelState[node.name] = 0;
        });
        
        console.log('👁️‍🗨️ All models hidden');
    });
}

// Show/Hide objects in 3D scene (like the working project)
export function objectShowHideSystem() {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized for show/hide system');
        return;
    }
    
    console.log('🔄 Updating show/hide system...');
    console.log('📊 Current model state:', modelState);
    
    // Debug: Count visible vs hidden models
    const visibleModels = Object.entries(modelState).filter(([key, value]) => value === 1);
    const hiddenModels = Object.entries(modelState).filter(([key, value]) => value === 0);
    
    console.log(`📊 Visible models: ${visibleModels.length}, Hidden models: ${hiddenModels.length}`);
    
    if (visibleModels.length > 0) {
        console.log('👁️ Visible models:', visibleModels.map(([key]) => key));
    }
    
    // Get all nodes in scene and apply model state
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        console.log(`📋 Found ${Object.keys(nodes).length} nodes in scene`);
        
        // Debug: List all available node names
        const nodeNames = Object.values(nodes).map(node => node.name);
        console.log('📋 Available node names:', nodeNames);
        
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
                        console.log(`✅ Showing: ${modelID} (InstanceID: ${node.instanceID})`);
                        successCount++;
                    } else {
                        // Hide model
                        apiGlobal.hide(node.instanceID);
                        console.log(`👁️‍🗨️ Hiding: ${modelID} (InstanceID: ${node.instanceID})`);
                        successCount++;
                    }
                } catch (error) {
                    console.error(`❌ Error updating ${modelID}:`, error);
                    errorCount++;
                }
            } else {
                console.warn(`⚠️ Model ${modelID} not found in scene`);
                errorCount++;
            }
        }
        
        console.log(`✅ Show/Hide system updated: ${successCount} success, ${errorCount} errors`);
        
        // Debug: Check if models are actually visible
        setTimeout(() => {
            console.log('🔍 Debug: Checking model visibility after 1 second...');
            Object.entries(modelState).forEach(([modelID, visibility]) => {
                if (visibility === 1) {
                    const node = Object.values(nodes).find((n) => n.name === modelID);
                    if (node) {
                        console.log(`🔍 Model ${modelID} should be visible (InstanceID: ${node.instanceID})`);
                    }
                }
            });
        }, 1000);
    });
}

// Debug function to show all available Sketchfab resources
export function debugSketchfabResources() {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    console.log('🔍 DEBUG: Sketchfab Resources Check');
    
    // Get all nodes
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        console.log('📋 Available models in scene:');
        Object.values(nodes).forEach(node => {
            console.log(`- ${node.name} (InstanceID: ${node.instanceID})`);
        });
    });
    
    // Get all textures
    apiGlobal.getTextureList(function (err, textures) {
        if (err) {
            console.error('❌ Error getting texture list:', err);
            return;
        }
        
        console.log('🎨 Available textures:');
        textures.forEach(texture => {
            console.log(`- ${texture.name} (UID: ${texture.uid})`);
        });
    });
    
    // Get all materials
    apiGlobal.getMaterialList(function (err, materials) {
        if (err) {
            console.error('❌ Error getting material list:', err);
            return;
        }
        
        console.log('🔧 Available materials:');
        materials.forEach(material => {
            console.log(`- ${material.name} (Channels: ${Object.keys(material.channels || {}).join(', ')})`);
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
    console.log(`🔗 Mapping ${itemsID} -> ${result}`);
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
    
    console.log(`📊 All ${allModelIDs.length} models initialized to hidden state`);
    
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
    
    console.log(`📊 Model state initialized with ${allModelIDs.length} models`);
    console.log(`🎯 Initial parts set to visible: ${initialParts.length} models`);
    console.log(`👁️ Initial visible models:`, initialParts);
    console.log(`🔄 Ready to show initial objects via objectShowHideSystem()`);
    
    // Debug: Show current modelState
    console.log('📊 Current modelState:', modelState);
    
    // Debug: Count visible models
    const visibleCount = Object.values(modelState).filter(state => state === 1).length;
    console.log(`📊 Visible models count: ${visibleCount}`);
    
    // Signal that initial models are ready
    window.initialModelsReady = true;
    console.log('✅ window.initialModelsReady set to true');
    
    // Also signal that model state is initialized
    window.modelStateInitialized = true;
    console.log('✅ window.modelStateInitialized set to true');
}

// Test function to show all models (for debugging)
export function testShowAllModels() {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        Object.values(nodes).forEach(node => {
            apiGlobal.show(node.instanceID);
            modelState[node.name] = 1;
        });
        
        console.log('👁️ All models shown for testing');
    });
}

// Test function to hide all models (for debugging)
export function testHideAllModels() {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        Object.values(nodes).forEach(node => {
            apiGlobal.hide(node.instanceID);
            modelState[node.name] = 0;
        });
        
        console.log('👁️‍🗨️ All models hidden for testing');
    });
}

// Debug function to check if initial models exist in scene
export function debugCheckModelsInScene() {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
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
            console.error('❌ Error getting node map for debug check:', err);
            return;
        }
        
        console.log('🔍 DEBUG: Checking if initial models exist in scene...');
        const nodeNames = Object.values(nodes).map(node => node.name);
        
        let foundCount = 0;
        let missingCount = 0;
        
        initialParts.forEach(modelID => {
            if (nodeNames.includes(modelID)) {
                console.log(`✅ Found: ${modelID}`);
                foundCount++;
            } else {
                console.log(`❌ Missing: ${modelID}`);
                missingCount++;
            }
        });
        
        console.log(`🔍 Initial models check: ${foundCount} found, ${missingCount} missing`);
        
        if (missingCount > 0) {
            console.warn(`⚠️ ${missingCount} initial models are missing from scene!`);
        } else {
            console.log('✅ All initial models found in scene');
        }
    });
}

// Function to update muzzle device safely
export function updateMuzzleDevice(newItemsID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    console.log(`🔧 Updating muzzle device to: ${newItemsID}`);
    
    // Get the new model ID
    const newModelID = getModelIDFromItemsID(newItemsID);
    if (!newModelID) {
        console.error(`❌ No model ID found for muzzle device: ${newItemsID}`);
        return false;
    }
    
    console.log(`🔗 Muzzle device mapping: ${newItemsID} -> ${newModelID}`);
    
    // Current muzzle device (default)
    const currentMuzzleDevice = 'modelID_muzzleDevice00100101';
    
    // Check if new model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map for muzzle device update:', err);
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(newModelID);
        
        if (!exists) {
            console.error(`❌ Muzzle device model ${newModelID} not found in scene!`);
            console.log('💡 Available muzzle device nodes:', nodeNames.filter(name => name.includes('muzzleDevice')));
            return false;
        }
        
        console.log(`✅ Muzzle device model ${newModelID} found in scene`);
        
        // Hide current muzzle device if it's visible
        if (modelState[currentMuzzleDevice] === 1) {
            hideModel(currentMuzzleDevice);
            console.log(`👁️‍🗨️ Hidden current muzzle device: ${currentMuzzleDevice}`);
        }
        
        // Show new muzzle device
        showModel(newModelID);
        console.log(`✅ Showing new muzzle device: ${newModelID}`);
        
        // Update modelState
        modelState[currentMuzzleDevice] = 0;
        modelState[newModelID] = 1;
        
        console.log('✅ Muzzle device updated successfully');
        console.log(`📊 Current muzzle device state: ${newModelID} = visible`);
    });
    
    return true;
}

// Function to test all muzzle device variants (updated to use existing devices only)
export function testAllMuzzleDevices() {
    console.log('🧪 Testing all muzzle device variants...');
    console.log('💡 This will now use testExistingMuzzleDevices() to avoid missing models');
    testExistingMuzzleDevices();
}

// Debug function to check which muzzle devices actually exist in scene
export function debugMuzzleDevicesInScene() {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    console.log('🔍 DEBUG: Checking which muzzle devices exist in scene...');
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const muzzleDeviceNodes = nodeNames.filter(name => name.includes('muzzleDevice'));
        
        console.log('📋 Muzzle device nodes found in scene:');
        muzzleDeviceNodes.forEach(nodeName => {
            console.log(`  ✅ ${nodeName}`);
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
        
        console.log('🔍 Checking expected muzzle devices:');
        expectedMuzzleDevices.forEach(modelID => {
            const exists = nodeNames.includes(modelID);
            const status = exists ? '✅ EXISTS' : '❌ MISSING';
            console.log(`  ${status}: ${modelID}`);
        });
        
        // Show available vs expected
        console.log(`📊 Found ${muzzleDeviceNodes.length} muzzle device nodes in scene`);
        console.log(`📊 Expected ${expectedMuzzleDevices.length} muzzle device models`);
    });
}

// Updated function to test only existing muzzle devices
export function testExistingMuzzleDevices() {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    console.log('🧪 Testing only existing muzzle devices...');
    
    // First check which ones exist
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
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
        
        console.log(`🧪 Found ${existingMuzzleDevices.length} existing muzzle devices:`, existingMuzzleDevices);
        
        if (existingMuzzleDevices.length === 0) {
            console.warn('⚠️ No muzzle devices found in scene!');
            return;
        }
        
        let testIndex = 0;
        
        function testNextMuzzleDevice() {
            if (testIndex >= existingMuzzleDevices.length) {
                console.log('🧪 All existing muzzle device tests completed');
                // Reset to default
                updateMuzzleDevice('muzzleDevice00100101');
                return;
            }
            
            const itemsID = existingMuzzleDevices[testIndex];
            console.log(`🧪 Testing muzzle device ${testIndex + 1}/${existingMuzzleDevices.length}: ${itemsID}`);
            
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
    console.log('🧪 Testing all available muzzle devices individually...');
    
    const availableMuzzleDevices = [
        'muzzleDevice00100101',  // Default - ✅ CONFIRMED
        'muzzleDevice00100201',  // ✅ CONFIRMED
        'muzzleDevice00100301',  // ✅ CONFIRMED
        'muzzleDevice00100302',  // Test this
        'muzzleDevice00200201',  // Test this
        'muzzleDevice00200202'   // Test this
    ];
    
    console.log('📋 Available muzzle devices to test:');
    availableMuzzleDevices.forEach((itemsID, index) => {
        const status = index < 3 ? '✅ CONFIRMED' : '🧪 TO TEST';
        console.log(`  ${status}: ${itemsID}`);
    });
    
    // Test each one
    availableMuzzleDevices.forEach((itemsID, index) => {
        setTimeout(() => {
            console.log(`🧪 Testing ${index + 1}/${availableMuzzleDevices.length}: ${itemsID}`);
            updateMuzzleDevice(itemsID);
        }, index * 3000); // 3 seconds between each test
    });
    
    // Reset to default after all tests
    setTimeout(() => {
        console.log('🔄 Resetting to default muzzle device...');
        updateMuzzleDevice('muzzleDevice00100101');
    }, availableMuzzleDevices.length * 3000 + 1000);
}

// Function to test specific muzzle device with confirmation
export function testSpecificMuzzleDevice(itemsID) {
    console.log(`🧪 Testing specific muzzle device: ${itemsID}`);
    
    const result = updateMuzzleDevice(itemsID);
    
    if (result) {
        console.log(`✅ Successfully updated to: ${itemsID}`);
    } else {
        console.log(`❌ Failed to update to: ${itemsID}`);
    }
    
    return result;
}

// Function to get list of working muzzle devices
export function getWorkingMuzzleDevices() {
    console.log('📋 Working muzzle devices:');
    
    const workingMuzzleDevices = [
        'muzzleDevice00100101',  // Default
        'muzzleDevice00100201',  // Confirmed working
        'muzzleDevice00100301'   // Confirmed working
    ];
    
    workingMuzzleDevices.forEach((itemsID, index) => {
        console.log(`  ${index + 1}. ${itemsID}`);
    });
    
    console.log('🧪 Muzzle devices to test:');
    const toTestMuzzleDevices = [
        'muzzleDevice00100302',
        'muzzleDevice00200201',
        'muzzleDevice00200202'
    ];
    
    toTestMuzzleDevices.forEach((itemsID, index) => {
        console.log(`  ${index + 1}. ${itemsID}`);
    });
    
    return {
        working: workingMuzzleDevices,
        toTest: toTestMuzzleDevices
    };
}

// Function to update end plate safely
export function updateEndPlate(newItemsID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    console.log(`🔧 Updating end plate to: ${newItemsID}`);
    
    // Get the new model ID
    const newModelID = getModelIDFromItemsID(newItemsID);
    if (!newModelID) {
        console.error(`❌ No model ID found for end plate: ${newItemsID}`);
        return false;
    }
    
    console.log(`🔗 End plate mapping: ${newItemsID} -> ${newModelID}`);
    
    // Current end plate (default)
    const currentEndPlate = 'modelID_endPlate00100101';
    
    // Check if new model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map for end plate update:', err);
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(newModelID);
        
        if (!exists) {
            console.error(`❌ End plate model ${newModelID} not found in scene!`);
            console.log('💡 Available end plate nodes:', nodeNames.filter(name => name.includes('endPlate')));
            return false;
        }
        
        console.log(`✅ End plate model ${newModelID} found in scene`);
        
        // Hide current end plate if it's visible
        if (modelState[currentEndPlate] === 1) {
            hideModel(currentEndPlate);
            console.log(`👁️‍🗨️ Hidden current end plate: ${currentEndPlate}`);
        }
        
        // Show new end plate
        showModel(newModelID);
        console.log(`✅ Showing new end plate: ${newModelID}`);
        
        // Update modelState
        modelState[currentEndPlate] = 0;
        modelState[newModelID] = 1;
        
        console.log('✅ End plate updated successfully');
        console.log(`📊 Current end plate state: ${newModelID} = visible`);
    });
    
    return true;
}

// Debug function to check which end plates actually exist in scene
export function debugEndPlatesInScene() {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    console.log('🔍 DEBUG: Checking which end plates exist in scene...');
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const endPlateNodes = nodeNames.filter(name => name.includes('endPlate'));
        
        console.log('📋 End plate nodes found in scene:');
        endPlateNodes.forEach(nodeName => {
            console.log(`  ✅ ${nodeName}`);
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
        
        console.log('🔍 Checking expected end plates:');
        expectedEndPlates.forEach(modelID => {
            const exists = nodeNames.includes(modelID);
            const status = exists ? '✅ EXISTS' : '❌ MISSING';
            console.log(`  ${status}: ${modelID}`);
        });
        
        // Show available vs expected
        console.log(`📊 Found ${endPlateNodes.length} end plate nodes in scene`);
        console.log(`📊 Expected ${expectedEndPlates.length} end plate models`);
    });
}

// Function to test all available end plates
export function testAllEndPlates() {
    console.log('🧪 Testing all available end plates...');
    
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
    
    console.log('📋 Available end plates to test:');
    availableEndPlates.forEach((itemsID, index) => {
        const status = index === 0 ? '✅ DEFAULT' : '🧪 TO TEST';
        console.log(`  ${status}: ${itemsID}`);
    });
    
    // Test each one
    availableEndPlates.forEach((itemsID, index) => {
        setTimeout(() => {
            console.log(`🧪 Testing ${index + 1}/${availableEndPlates.length}: ${itemsID}`);
            updateEndPlate(itemsID);
        }, index * 2000); // 2 seconds between each test
    });
    
    // Reset to default after all tests
    setTimeout(() => {
        console.log('🔄 Resetting to default end plate...');
        updateEndPlate('endPlate00100101');
    }, availableEndPlates.length * 2000 + 1000);
}

// Function to test specific end plate
export function testSpecificEndPlate(itemsID) {
    console.log(`🧪 Testing specific end plate: ${itemsID}`);
    
    const result = updateEndPlate(itemsID);
    
    if (result) {
        console.log(`✅ Successfully updated to: ${itemsID}`);
    } else {
        console.log(`❌ Failed to update to: ${itemsID}`);
    }
    
    return result;
}

// Universal debug function for any part category
export function debugPartCategory(partName) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    console.log(`🔍 DEBUG: Checking ${partName} parts in scene...`);
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const partNodes = nodeNames.filter(name => name.toLowerCase().includes(partName.toLowerCase()));
        
        console.log(`📋 ${partName} nodes found in scene:`);
        partNodes.forEach(nodeName => {
            console.log(`  ✅ ${nodeName}`);
        });
        
        console.log(`📊 Found ${partNodes.length} ${partName} nodes in scene`);
    });
}

// Universal update function for any part
export function updatePart(partName, newItemsID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    console.log(`🔧 Updating ${partName} to: ${newItemsID}`);
    
    // Get the new model ID
    const newModelID = getModelIDFromItemsID(newItemsID);
    if (!newModelID) {
        console.error(`❌ No model ID found for ${partName}: ${newItemsID}`);
        return false;
    }
    
    console.log(`🔗 ${partName} mapping: ${newItemsID} -> ${newModelID}`);
    
    // Check if new model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error(`❌ Error getting node map for ${partName} update:`, err);
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(newModelID);
        
        if (!exists) {
            console.error(`❌ ${partName} model ${newModelID} not found in scene!`);
            console.log(`💡 Available ${partName} nodes:`, nodeNames.filter(name => name.toLowerCase().includes(partName.toLowerCase())));
            return false;
        }
        
        console.log(`✅ ${partName} model ${newModelID} found in scene`);
        
        // Find current part (first visible part of this category)
        const currentPart = Object.keys(modelState).find(modelID => 
            modelID.toLowerCase().includes(partName.toLowerCase()) && modelState[modelID] === 1
        );
        
        if (currentPart) {
            hideModel(currentPart);
            console.log(`👁️‍🗨️ Hidden current ${partName}: ${currentPart}`);
        }
        
        // Show new part
        showModel(newModelID);
        console.log(`✅ Showing new ${partName}: ${newModelID}`);
        
        // Update modelState
        if (currentPart) {
            modelState[currentPart] = 0;
        }
        modelState[newModelID] = 1;
        
        console.log(`✅ ${partName} updated successfully`);
        console.log(`📊 Current ${partName} state: ${newModelID} = visible`);
    });
    
    return true;
}

// Universal test function for any part category
export function testPartCategory(partName, itemsIDs) {
    console.log(`🧪 Testing all ${partName} parts...`);
    
    console.log(`📋 Available ${partName} parts to test:`);
    itemsIDs.forEach((itemsID, index) => {
        const status = index === 0 ? '✅ DEFAULT' : '🧪 TO TEST';
        console.log(`  ${status}: ${itemsID}`);
    });
    
    // Test each one
    itemsIDs.forEach((itemsID, index) => {
        setTimeout(() => {
            console.log(`🧪 Testing ${index + 1}/${itemsIDs.length}: ${itemsID}`);
            updatePart(partName, itemsID);
        }, index * 2000); // 2 seconds between each test
    });
    
    // Reset to default after all tests
    setTimeout(() => {
        console.log(`🔄 Resetting to default ${partName}...`);
        updatePart(partName, itemsIDs[0]);
    }, itemsIDs.length * 2000 + 1000);
}

// Function to test specific part
export function testSpecificPart(partName, itemsID) {
    console.log(`🧪 Testing specific ${partName}: ${itemsID}`);
    
    const result = updatePart(partName, itemsID);
    
    if (result) {
        console.log(`✅ Successfully updated to: ${itemsID}`);
    } else {
        console.log(`❌ Failed to update to: ${itemsID}`);
    }
    
    return result;
}

// Function to show specific part by itemsID
export function showPartByItemsID(itemsID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    console.log(`👁️ Showing part: ${itemsID}`);
    
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        console.error(`❌ No model ID found for: ${itemsID}`);
        return false;
    }
    
    console.log(`🔗 Mapping: ${itemsID} -> ${modelID}`);
    
    // Check if model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(modelID);
        
        if (!exists) {
            console.error(`❌ Model ${modelID} not found in scene!`);
            return false;
        }
        
        console.log(`✅ Model ${modelID} found in scene`);
        
        // Show the model
        showModel(modelID);
        console.log(`✅ Successfully shown: ${itemsID} (${modelID})`);
    });
    
    return true;
}

// Function to hide specific part by itemsID
export function hidePartByItemsID(itemsID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    console.log(`👁️‍🗨️ Hiding part: ${itemsID}`);
    
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        console.error(`❌ No model ID found for: ${itemsID}`);
        return false;
    }
    
    console.log(`🔗 Mapping: ${itemsID} -> ${modelID}`);
    
    // Check if model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(modelID);
        
        if (!exists) {
            console.error(`❌ Model ${modelID} not found in scene!`);
            return false;
        }
        
        console.log(`✅ Model ${modelID} found in scene`);
        
        // Hide the model
        hideModel(modelID);
        console.log(`✅ Successfully hidden: ${itemsID} (${modelID})`);
    });
    
    return true;
}

// Function to toggle specific part by itemsID
export function togglePartByItemsID(itemsID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    console.log(`🔄 Toggling part: ${itemsID}`);
    
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        console.error(`❌ No model ID found for: ${itemsID}`);
        return false;
    }
    
    console.log(`🔗 Mapping: ${itemsID} -> ${modelID}`);
    
    // Check current state
    const currentState = modelState[modelID];
    console.log(`📊 Current state: ${currentState} (${currentState === 1 ? 'visible' : 'hidden'})`);
    
    // Toggle the model
    toggleModel(modelID);
    console.log(`✅ Successfully toggled: ${itemsID} (${modelID})`);
    
    return true;
}

// Function to check part state
export function checkPartState(itemsID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    console.log(`🔍 Checking state of part: ${itemsID}`);
    
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        console.error(`❌ No model ID found for: ${itemsID}`);
        return false;
    }
    
    console.log(`🔗 Mapping: ${itemsID} -> ${modelID}`);
    
    // Check current state
    const currentState = modelState[modelID];
    const status = currentState === 1 ? '✅ VISIBLE' : '❌ HIDDEN';
    console.log(`📊 State: ${status} (${currentState})`);
    
    return currentState;
}

// Function to check if part exists in scene (returns true/false)
export function checkPartExists(itemsID) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return false;
    }
    
    console.log(`🔍 Checking if part exists: ${itemsID}`);
    
    // Get the model ID
    const modelID = getModelIDFromItemsID(itemsID);
    if (!modelID) {
        console.error(`❌ No model ID found for: ${itemsID}`);
        console.log(`📊 Result: false (no mapping)`);
        return false;
    }
    
    console.log(`🔗 Mapping: ${itemsID} -> ${modelID}`);
    
    // Check if model exists in scene
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return false;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        const exists = nodeNames.includes(modelID);
        
        if (exists) {
            console.log(`✅ Model ${modelID} found in scene`);
            console.log(`📊 Result: true (exists)`);
        } else {
            console.log(`❌ Model ${modelID} not found in scene`);
            console.log(`📊 Result: false (not found)`);
        }
        
        return exists;
    });
    
    return true; // Will be updated by the callback
}

// Function to test multiple parts existence at once
export function testPartsExistence(itemsIDs) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    console.log(`🧪 Testing existence of ${itemsIDs.length} parts...`);
    
    apiGlobal.getNodeMap(function (err, nodes) {
        if (err) {
            console.error('❌ Error getting node map:', err);
            return;
        }
        
        const nodeNames = Object.values(nodes).map(node => node.name);
        
        console.log('📋 Results:');
        itemsIDs.forEach(itemsID => {
            const modelID = getModelIDFromItemsID(itemsID);
            if (!modelID) {
                console.log(`  ❌ ${itemsID} -> No mapping`);
            } else {
                const exists = nodeNames.includes(modelID);
                const status = exists ? '✅ EXISTS' : '❌ MISSING';
                console.log(`  ${status}: ${itemsID} -> ${modelID}`);
            }
        });
    });
}

// Function to test all parts in a category
export function testCategoryExistence(partName) {
    if (!apiGlobal) {
        console.warn('⚠️ Sketchfab API not initialized');
        return;
    }
    
    console.log(`🧪 Testing existence of all ${partName} parts...`);
    
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
    
    console.log(`📋 Found ${categoryItemsIDs.length} ${partName} items to test`);
    
    if (categoryItemsIDs.length > 0) {
        testPartsExistence(categoryItemsIDs);
    } else {
        console.log(`⚠️ No ${partName} items found in modelState`);
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