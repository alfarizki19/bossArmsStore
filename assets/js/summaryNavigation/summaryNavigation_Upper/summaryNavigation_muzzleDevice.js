export function initSummaryNavigation_MuzzleDevice() {
	// Regular muzzle device cards - open menuMuzzleDeviceProductMenu
	const regularIds = [
		'summaryItemsCard_muzzleDevice_00100101',
		'summaryItemsCard_muzzleDevice_00100201',
		'summaryItemsCard_muzzleDevice_00200201',
		'summaryItemsCard_muzzleDevice_00200202'
	];
	regularIds.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuMuzzleDeviceProductMenu');
		});
	});
	
	// Warden cards - open menuAdditionalPart_Warden
	const wardenIds = [
		'summaryItemsCard_muzzleDevice_00100301',
		'summaryItemsCard_muzzleDevice_00100302'
	];
	wardenIds.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuAdditionalPart_Warden');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_MuzzleDevice);
