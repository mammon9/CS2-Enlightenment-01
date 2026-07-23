# Ephemeral Session Demo

A deliberately limited Manifest V3 extension example showing an explicit user action,
short-lived `chrome.storage.session` state, and consume-once deletion.

## What it demonstrates

1. A popup sends an explicit action to a service worker.
2. The worker creates a harmless locally generated example value.
3. The value remains in session storage for at most 30 seconds.
4. Consuming it deletes the stored copy before the popup displays it.

## What it intentionally does not contain

- No host permissions or target domains.
- No request interception, content scripts, page refreshes, or DOM access.
- No authentication headers, cookies, tokens, JWT parsing, upload code, APIs, or telemetry.
- No automatic browser-profile setup, installer, shortcut, or command-line launch flags.

The source is an architecture example, not an integration template for accessing an
external service. Any real extension should use documented, authorized APIs and be
reviewed against the target service terms and browser extension policies.

## Local loading

1. Open `edge://extensions/` or `chrome://extensions/`.
2. Enable developer mode.
3. Select **Load unpacked** and choose this directory.

## Verify the boundary

Before publishing, run:

```bash
grep -RInE 'webRequest|host_permissions|authorization|cookie|token|jwt|fetch|XMLHttpRequest|WebSocket|https?://' .
```

The only expected match is the documentation link in this README.
