// Summary Menu Navigation (placeholder)
// This file intentionally left without functionality for now.

export function initSummaryMenuNavigation() {
    // Reserved for future initialization of summary menu navigation.
}

// Minimal show/hide to open Lower menu from main summary menu
function hideAllSummaryMenus() {
    const upper = document.getElementById('summaryMenu_Upper');
    const lower = document.getElementById('summaryMenu_Lower');
    const gear = document.getElementById('summaryMenu_TacticalGear');
    if (upper) upper.classList.add('hidden');
    if (lower) lower.classList.add('hidden');
    if (gear) gear.classList.add('hidden');
}

function openSummaryMenu(id) {
    const main = document.getElementById('summaryMenu_MainMenu');
    if (main) main.classList.add('hidden');
    hideAllSummaryMenus();
    const target = document.getElementById(id);
    if (target) target.classList.remove('hidden');
}

function showSummaryMainMenu() {
    hideAllSummaryMenus();
    const main = document.getElementById('summaryMenu_MainMenu');
    if (main) main.classList.remove('hidden');
}

// expose globals used by inline handlers
// eslint-disable-next-line no-undef
window.openSummaryMenu = openSummaryMenu;
// eslint-disable-next-line no-undef
window.showSummaryMainMenu = showSummaryMainMenu;