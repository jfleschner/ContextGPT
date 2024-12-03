// Create a context menu item for selected text
chrome.contextMenus.create({
  id: "searchChatGPT",
  title: "Search ChatGPT for '%s'", // %s will be replaced by the selected text
  contexts: ["selection"], // Show this only when text is selected
  documentUrlPatterns: ["*://*/*"],
  icons: {
    "128": "icon-128.png"
  }
});

// Create a context menu item for hyperlinks
chrome.contextMenus.create({
  id: "searchChatGPTLink",
  title: "Search ChatGPT for this link",
  contexts: ["link"], // Show this only when right-clicking a link
  documentUrlPatterns: ["*://*/*"],
  icons: {
    "128": "icon-128.png"
  }
});

// Listener for when context menu items are clicked
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "searchChatGPT" && info.selectionText) {
    const query = encodeURIComponent(info.selectionText);
    const url = `https://chat.openai.com/?q=${query}`;
    chrome.tabs.create({ url });
  }

  if (info.menuItemId === "searchChatGPTLink" && info.linkUrl) {
    const query = encodeURIComponent(info.linkUrl);
    const url = `https://chat.openai.com/?q=${query}`;
    chrome.tabs.create({ url });
  }
});

// Listener for the toolbar button click
chrome.browserAction.onClicked.addListener((tab) => {
  if (tab && tab.url) {
    // Use the current tab's URL for the search
    const query = encodeURIComponent(tab.url);
    const url = `https://chat.openai.com/?q=${query}`;
    chrome.tabs.create({ url });
  } else {
    alert("No URL found to search!");
  }
});
