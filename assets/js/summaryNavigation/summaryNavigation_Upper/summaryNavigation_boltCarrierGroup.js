export function initSummaryNavigation_BoltCarrierGroup() {
	const ids = [
		'summaryItemsCard_boltCarrierGroup_00100101',
		'summaryItemsCard_boltCarrierGroup_00200101',
		'summaryItemsCard_boltCarrierGroup_00200201'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuBoltCarrierGroupProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_BoltCarrierGroup);