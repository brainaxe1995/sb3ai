// Import assets
import bot from './assets/bot.png'
import user from './assets/user.jpg'

// Select DOM elements
const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

// Function to simulate thinking of the bot
function loader(element) {
  element.textContent = 'Thinking'
  // ... existing code ...
}

// Function to type the text
function typeText(element, text) {
  let index = 0
  // ... existing code ...
}

// Function to generate unique ID
function generateUniqueId() {
  // ... existing code ...
}

// Function to create a chat stripe
function chatStripe(isAi, value, uniqueId = null) {
  return (
    // ... existing code ...
  )
}

// Function to handle form submit
const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form)

  // User's chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

  // To clear the textarea input
  form.reset()

  // Remove classes from form and textarea
  form.classList.remove('form-center')

  // Bot's chat stripe
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  // To focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Get specific message div
  const messageDiv = document.getElementById(uniqueId)

  // Load "Thinking..."
  loader(messageDiv)

  // Fetch data from the server
  const response = await fetch('https://sb3ai.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval)
  messageDiv.innerHTML = " "

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim()
    typeText(messageDiv, parsedData)
  } else {
    const err = await response.text()
    messageDiv.innerHTML = "Something went wrong"
    alert(err)
  }
}

// Event listeners
form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e)
  }
})
