export function initSummaryNavigation_ChargingHandle() {
	const ids = [
		'summaryItemsCard_chargingHandle_00100101',
		'summaryItemsCard_chargingHandle_00100102',
		'summaryItemsCard_chargingHandle_00200101',
		'summaryItemsCard_chargingHandle_00300101',
		'summaryItemsCard_chargingHandle_00300102',
		'summaryItemsCard_chargingHandle_00300103',
		'summaryItemsCard_chargingHandle_00400101',
		'summaryItemsCard_chargingHandle_00400102',
		'summaryItemsCard_chargingHandle_00400103',
		'summaryItemsCard_chargingHandle_00400104',
		'summaryItemsCard_chargingHandle_00400105',
		'summaryItemsCard_chargingHandle_00400106',
		'summaryItemsCard_chargingHandle_00400107',
		'summaryItemsCard_chargingHandle_00400108',
		'summaryItemsCard_chargingHandle_00400109',
		'summaryItemsCard_chargingHandle_00400110'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuChargingHandleProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_ChargingHandle);