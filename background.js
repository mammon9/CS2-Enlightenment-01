const PENDING_KEY = 'pendingDemoValue'
const EXPIRY_MS = 30_000

async function clearPendingValue() {
  await chrome.storage.session.remove(PENDING_KEY)
}

async function createDemoValue() {
  const value = {
    label: `demo-${crypto.randomUUID().slice(0, 8)}`,
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_MS,
  }

  await chrome.storage.session.set({ [PENDING_KEY]: value })
  setTimeout(() => {
    void clearPendingValue()
  }, EXPIRY_MS)
  return value
}

chrome.runtime.onInstalled.addListener(() => {
  void chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' })
    .then(clearPendingValue)
})

chrome.runtime.onStartup.addListener(() => {
  void clearPendingValue()
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'create-demo-value') {
    createDemoValue().then(sendResponse).catch(() => sendResponse(null))
    return true
  }

  if (message?.type === 'consume-demo-value') {
    chrome.storage.session.get(PENDING_KEY).then(async (result) => {
      const value = result[PENDING_KEY] || null
      await clearPendingValue()
      sendResponse(value?.expiresAt > Date.now() ? value : null)
    })
    return true
  }

  return false
})
