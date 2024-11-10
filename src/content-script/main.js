// Function to apply or remove sidebar hiding based on the toggle state
function applySidebarHiding(isEnabled) {
    const HTML = document.documentElement;
    if (isEnabled) {
      HTML.setAttribute("global_enable", "true");
    } else {
      HTML.removeAttribute("global_enable");
    }
  }
  
  // Initial check on page load to set the sidebar hiding state
  chrome.storage.local.get("isSidebarHiderEnabled", (data) => {
    const isEnabled = data.isSidebarHiderEnabled ?? true; // Default to true
    applySidebarHiding(isEnabled);
  });
  
  // Listen for messages from the background script to toggle visibility
  chrome.runtime.onMessage.addListener((message) => {
    if (message.toggleSidebarHider !== undefined) {
      applySidebarHiding(message.toggleSidebarHider);
    }
  });
  
  // Detect LinkedIn's single-page navigation and reapply sidebar hiding
  window.addEventListener('popstate', () => {
    chrome.storage.local.get("isSidebarHiderEnabled", (data) => {
      applySidebarHiding(data.isSidebarHiderEnabled ?? true);
    });
  });
  