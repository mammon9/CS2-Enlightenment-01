const status = document.getElementById('status')
const result = document.getElementById('result')
const createButton = document.getElementById('create')
const consumeButton = document.getElementById('consume')

function show(message, value = '') {
  status.textContent = message
  result.hidden = !value
  result.textContent = value
}

createButton.addEventListener('click', async () => {
  const created = await chrome.runtime.sendMessage({ type: 'create-demo-value' })
  show(created ? 'Example is stored for up to 30 seconds.' : 'Could not create an example.')
})

consumeButton.addEventListener('click', async () => {
  const value = await chrome.runtime.sendMessage({ type: 'consume-demo-value' })
  show(value ? 'Consumed and deleted from extension session storage.' : 'No unconsumed example exists.', value?.label || '')
})
