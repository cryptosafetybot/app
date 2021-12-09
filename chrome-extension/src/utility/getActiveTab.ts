/**
 * Syntatic sugar to get current active tab
 */
export function getActiveTab(): Promise<chrome.tabs.Tab> {
  return new Promise((resolve, reject) => {
    chrome.tabs?.query(
      {
        active: true,
        currentWindow: true,
      },
      ([tab]) => {
        if (!tab) {
          return reject("activeTab permission required in manifest");
        }

        if (!tab.url) {
          console.warn("Could not get active tab url");
        }

        resolve(tab);
      }
    );
  });
}
