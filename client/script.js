import bot from './assets/bot.png'
import user from './assets/user.jpg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval
let conversationHistory = "";

function loader(element) {
    // Rest of your code
}

function typeText(element, text) {
    // Rest of your code
}

function generateUniqueId() {
    // Rest of your code
}

function chatStripe(isAi, value, uniqueId) {
    // Rest of your code
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // Append user's message to the conversation history
    conversationHistory += `User: ${data.get('prompt')}\n`;

    // to clear the textarea input 
    form.reset()

    // Remove classes from form and textarea
    form.classList.remove('form-center')

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    const response = await fetch('https://sb3ai.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: conversationHistory
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim()

        // Append bot's message to the conversation history
        conversationHistory += `Bot: ${parsedData}\n`;

        typeText(messageDiv, parsedData)
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})

