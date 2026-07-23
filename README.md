# Ephemeral Session Demo

A deliberately limited Manifest V3 extension example showing an explicit user action,
short-lived `chrome.storage.session` state, and consume-once deletion.

## What it demonstrates

1. A popup sends an explicit action to a service worker.
2. The worker creates a harmless locally generated example value.
3. The value remains in session storage for at most 30 seconds.
4. Consuming it deletes the stored copy before the popup displays it.

## Abstracted purpose

This project demonstrates how a browser extension can manage a one-time,
short-lived temporary result:

1. A result is created only after an explicit user action.
2. The result is kept in browser session storage rather than persistent storage.
3. The result has a short validity period.
4. The consumer requests it through extension-internal messaging.
5. The worker deletes the stored copy before returning the result, making the
   operation single-use.
6. The extension clears pending state on installation, browser startup, and
   expiry checks.

This repository contains only the state-management, internal-messaging, and
lifecycle design. It does not contain any real site, external interface,
authentication flow, request parameters, or business rules.

The current implementation generates a local example value only. It does not
connect to an external service or provide a production integration.

## What it intentionally does not contain

- No host permissions or target domains.
- No request interception, content scripts, page refreshes, or DOM access.
- No account access, user secrets, upload code, APIs, or telemetry.
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
grep -RInE 'webRequest|host_permissions|authorization|cookie|fetch|XMLHttpRequest|WebSocket|https?://' --exclude=README.md .
```

The command should produce no output.
