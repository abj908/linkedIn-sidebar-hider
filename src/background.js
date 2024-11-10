// Initialize sidebar hiding state from storage and update the icon accordingly
chrome.storage.local.get("isSidebarHiderEnabled", (data) => {
    const isEnabled = data.isSidebarHiderEnabled ?? true; // Default to true
    updateIcon(isEnabled);
  });
  
  // Listen for icon click to toggle sidebar hiding
  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.get("isSidebarHiderEnabled", (data) => {
      const isEnabled = !data.isSidebarHiderEnabled;
      chrome.storage.local.set({ isSidebarHiderEnabled: isEnabled });
      updateIcon(isEnabled);
  
      // Send a message to content script to update visibility
      chrome.tabs.sendMessage(tab.id, { toggleSidebarHider: isEnabled }, (response) => {
        if (chrome.runtime.lastError) {
          console.warn("Content script not found. It may not be injected on this page.");
        }
      });
    });
  });
  
  // Update the extension icon based on the sidebar hiding state
  function updateIcon(isEnabled) {
    const iconPath = isEnabled ? {
      "16": "/images/icon-on-16.png",
      "32": "/images/icon-on-32.png",
      "48": "/images/icon-on-48.png",
      "128": "/images/icon-on-128.png"
    } : {
      "16": "/images/icon-off-16.png",
      "32": "/images/icon-off-32.png",
      "48": "/images/icon-off-48.png",
      "128": "/images/icon-off-128.png"
    };
    chrome.action.setIcon({ path: iconPath });
  }
  
  // Set the URL to open when the extension is uninstalled
chrome.runtime.setUninstallURL("https://github.com/abj908/remove-linkedin-sidebar");
