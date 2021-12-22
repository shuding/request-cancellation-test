# Browser Request Cancellation Test

## What Is This?

This website details the error when a fetch request gets cancelled in this browser.

Most browsers will cancel ongoing or queued fetch tasks, when unloading the document ([spec](https://html.spec.whatwg.org/multipage/browsing-the-web.html#aborting-a-document-load)). It usually happens when navigating away from the current page, which causes a fetch error if there is an unfinished request.

However, browsers are behaving differently and throwing different errors (listed below). It can be really [annoying](https://stackoverflow.com/questions/55738408/javascript-typeerror-cancelled-error-when-calling-fetch-on-ios) to differentiate them from normal errors if you are using Sentry, or showing a “failed to fetch” hint in the UI.

## Test Results for Common Browsers

| Field | Chrome 95 | Safari 14 | iOS Safari 14 | Firefox 94 |
|:------|:----------|:----------|:--------------|:-----------|
| `.toString()` | `TypeError: Failed to fetch` | `TypeError: cancelled` | `TypeError: cancelled` | `TypeError: NetworkError when attempting to fetch resource.` |
| `.name` | `TypeError` | `TypeError` | `TypeError` | `TypeError` |
| `.message` | `Failed to fetch` | `cancelled` | `cancelled` | `NetworkError when attempting to fetch resource.` |
| `.stack` | `TypeError: Failed to fetch at ...` | | | |
