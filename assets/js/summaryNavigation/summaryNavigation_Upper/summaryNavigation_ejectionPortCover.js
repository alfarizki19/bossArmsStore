export function initSummaryNavigation_EjectionPortCover() {
	const ids = [
		'summaryItemsCard_ejectionPortCover_00100101',
		'summaryItemsCard_ejectionPortCover_00100102',
		'summaryItemsCard_ejectionPortCover_00100103',
		'summaryItemsCard_ejectionPortCover_00100104',
		'summaryItemsCard_ejectionPortCover_00100105',
		'summaryItemsCard_ejectionPortCover_00100106',
		'summaryItemsCard_ejectionPortCover_00100107',
		'summaryItemsCard_ejectionPortCover_00100108',
		'summaryItemsCard_ejectionPortCover_00100109',
		'summaryItemsCard_ejectionPortCover_00100110'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuEjectionPortCoverProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_EjectionPortCover);
