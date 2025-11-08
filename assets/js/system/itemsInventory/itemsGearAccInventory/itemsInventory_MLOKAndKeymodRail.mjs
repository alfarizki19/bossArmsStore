// MLOK or KeyMod Rails Inventory Data
// Generated from partData.txt

window.part = window.part || {};

window.part.mlokAndKeymodRail = {
    "001": {  // Magpul
        brand: "Magpul",
        products: {
            "001": {  // MLok Aluminum Rail Section 7 Slot
                productTitle: "MLok Aluminum Rail Section 7 Slot",
                productId: "001001",
                variants: {
                    "01": {  // no variant
                        id: "mlokAndKeymodRail00100101",
                        variantTitle: "no variant",
                        price: 22.95,
                        stok: 0, // Akan diupdate dari Shopify
                        available: true, // Akan diupdate dari Shopify
                        quantity: 0,
                        shopifyID: "gid://shopify/ProductVariant/46688973881570",
                        modelID: ["modelID_mlokAndKeymodRail00100101_A", "modelID_mlokAndKeymodRail00100101_B"]
                    }
                }
            }
        }
    },
    "002": {  // Midwest Industries
        brand: "Midwest Industries",
        products: {
            "001": {  // Picatinny Rail Section 9 Slot
                productTitle: "Picatinny Rail Section 9 Slot",
                productId: "002001",
                variants: {
                    "01": {  // no variant
                        id: "mlokAndKeymodRail00200101",
                        variantTitle: "no variant",
                        price: 21.95,
                        stok: 0, // Akan diupdate dari Shopify
                        available: true, // Akan diupdate dari Shopify
                        quantity: 0,
                        shopifyID: "gid://shopify/ProductVariant/46811600879842",
                        modelID: ["modelID_mlokAndKeymodRail00200101_A", "modelID_mlokAndKeymodRail00200101_B"]
                    }
                }
            }
        }
    }
};

// Function to count total MLOK quantity (normal + forBipod)
// This function uses the new separate quantity variables
export function countMlokQuantity() {
	// Calculate total quantity for 00100101
	// Use new variable names: _A_quantity (normal) and _forBipod_quantity
	const qty00100101 = (window.mlokAndKeymodRail00100101_A_quantity || 0) + (window.mlokAndKeymodRail00100101_forBipod_quantity || 0);
	if (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail["001"] && window.part.mlokAndKeymodRail["001"].products && window.part.mlokAndKeymodRail["001"].products["001"] && window.part.mlokAndKeymodRail["001"].products["001"].variants["01"]) {
		window.part.mlokAndKeymodRail["001"].products["001"].variants["01"].quantity = qty00100101;
	}
	
	// Calculate total quantity for 00200101
	const qty00200101 = (window.mlokAndKeymodRail00200101_A_quantity || 0) + (window.mlokAndKeymodRail00200101_forBipod_quantity || 0);
	if (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail["002"] && window.part.mlokAndKeymodRail["002"].products && window.part.mlokAndKeymodRail["002"].products["001"] && window.part.mlokAndKeymodRail["002"].products["001"].variants["01"]) {
		window.part.mlokAndKeymodRail["002"].products["001"].variants["01"].quantity = qty00200101;
	}
}

// Note: mlokAndKeymodRailLogic() is now handled by uiData_mlok() in dataController_MLOKAndKeymodRail.mjs
// This function is kept for backward compatibility but should use the new UI functions
export function mlokAndKeymodRailLogic() {
	// Use the new UI function if available
	if (window.uiData_mlok) {
		window.uiData_mlok();
	}
}