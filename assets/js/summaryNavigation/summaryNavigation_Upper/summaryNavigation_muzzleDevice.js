export function initSummaryNavigation_MuzzleDevice() {
	const ids = [
		'summaryItemsCard_muzzleDevice_00100101',
		'summaryItemsCard_muzzleDevice_00100201',
		'summaryItemsCard_muzzleDevice_00100301',
		'summaryItemsCard_muzzleDevice_00100302',
		'summaryItemsCard_muzzleDevice_00200201',
		'summaryItemsCard_muzzleDevice_00200202'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuMuzzleDeviceProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_MuzzleDevice);
