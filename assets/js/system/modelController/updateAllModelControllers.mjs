// Script to update all model controllers with correct mesh names
// This script will fix all model controllers to use the correct mesh names from namaMeshModelBlender.txt

// Model ID mapping from namaMeshModelBlender.txt (FINAL - Updated with correct mesh names)
const correctModelIDs = {
    // Barrel
    'barel00200101': 'modelID_barel00200101',
    
    // Bipod
    'bipod00100101': ['modelID_bipod00100101_A', 'modelID_bipod00100101_B', 'modelID_bipod00100101_C', 'modelID_bipod00100101_D'],
    
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
    'endPlate00200101': 'modelID_endPlate00200101',
    
    // Forward Assist
    'forwardAssists00100101': 'modelID_forwardAssists00100101',
    'forwardAssists00100102': 'modelID_forwardAssists00100102',
    
    // Front Sight
    'frontSight00100101': ['modelID_frontSight00100101_A', 'modelID_frontSight00100101_B'],
    'frontSight00200101': ['modelID_frontSight00200101_A', 'modelID_frontSight00200101_B'],
    
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
    'mlokAndKeymodRail00100101': ['modelID_mlokAndKeymodRail00100101_A', 'modelID_mlokAndKeymodRail00100101_B'],
    'mlokAndKeymodRail00200101': ['modelID_mlokAndKeymodRail00200101_A', 'modelID_mlokAndKeymodRail00200101_B'],
    
    // Muzzle Device
    'muzzleDevice00100101': 'modelID_muzzleDevice00100101',
    'muzzleDevice00100201': 'modelID_muzzleDevice00100201',
    'muzzleDevice00100301': 'modelID_muzzleDevice00100301',
    'muzzleDevice00100302': 'modelID_muzzleDevice00100302',
    'muzzleDevice00200201': 'modelID_muzzleDevice00200201',
    'muzzleDevice00200202': 'modelID_muzzleDevice00200202',
    
    // Optic Sight
    'opticSight00100101': 'modelID_opticSight00100101',
    
    // Pistol Grip
    'pistolGrip00100101': 'modelID_pistolGrip00100101',
    'pistolGrip00200101': 'modelID_pistolGrip00200101',
    
    // Rear Sight
    'rearSight00100101': ['modelID_rearSight00100101_A', 'modelID_rearSight00100101_B'],
    'rearSight00200101': ['modelID_rearSight00200101_A', 'modelID_rearSight00200101_B'],
    
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
    'upperReceiver00100102': 'modelID_upperReceiver00100102'
};

// Export the mapping for use in other files
export { correctModelIDs };

// Helper function to get correct model ID from items ID
export function getCorrectModelID(itemsID) {
    return correctModelIDs[itemsID] || null;
}

// Helper function to get all possible model IDs for a part
export function getAllModelIDsForPart(partName) {
    const modelIDs = new Set();
    
    for (const [itemsID, modelID] of Object.entries(correctModelIDs)) {
        if (itemsID.startsWith(partName)) {
            if (Array.isArray(modelID)) {
                modelID.forEach(id => modelIDs.add(id));
            } else {
                modelIDs.add(modelID);
            }
        }
    }
    
    return Array.from(modelIDs);
}

console.log('✅ Model ID mapping updated with correct Blender mesh names');
console.log('📋 Available model IDs:', Object.keys(correctModelIDs).length);
console.log('🔧 Use getCorrectModelID(itemsID) to get the correct model ID for any items ID');
