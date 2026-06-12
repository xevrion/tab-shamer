# Privacy Policy

Tab Shamer does not collect, store, transmit, or share any user data. Period.

## What it does

When you open a new tab, the extension calls `chrome.tabs.query({})` to count how many tabs you currently have open across all windows. That number is shown on the new tab page along with a message.

## What it does NOT do

- No analytics
- No tracking
- No network requests of any kind
- No tab titles, URLs, content, or browsing history are read or stored
- No accounts, no sign-in, no cookies
- Nothing is sent to any server, because there is no server

The tab count is computed locally, displayed locally, and immediately forgotten. That's the entire data lifecycle.

## Contact

Questions? Open an issue on the [GitHub repo](https://github.com/xevrion/tab-shamer).
