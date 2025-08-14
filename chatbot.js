// Chatbot functionality for Zia Strings
document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Product knowledge database
    const productDB = {
        'price': 'Our thobes range from $89.99 to $139.99 depending on style and fabric.',
        'fabric': 'We use premium 100% cotton for most thobes, with Egyptian cotton for our luxury line.',
        'shipping': 'We ship worldwide within 7-14 business days. Free shipping on orders over $200.',
        'size': 'See our size chart for measurements. If between sizes, we recommend sizing up.',
        'return': '30-day returns for unworn items with tags attached. Custom thobes are final sale.',
        'payment': 'We accept Visa, Mastercard, PayPal, and bank transfers.',
        'custom': 'We offer custom tailoring - please contact us for details and pricing.'
    };

    // Common questions regex patterns
    const patterns = [
        { regex: /price|cost|how much/, response: productDB['price'] },
        { regex: /fabric|material|what.*made/, response: productDB['fabric'] },
        { regex: /ship|deliver|arrive/, response: productDB['shipping'] },
        { regex: /size|measure|fit/, response: productDB['size'] },
        { regex: /return|refund|exchange/, response: productDB['return'] },
        { regex: /pay|method|card/, response: productDB['payment'] },
        { regex: /custom|tailor|alter/, response: productDB['custom'] }
    ];

    // Toggle chatbot window
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
    });

    // Close chatbot window
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    // Add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-4 text-sm ${isUser ? 'text-right' : ''}`;
        messageDiv.innerHTML = 
            `<p class="${isUser ? 'bg-amber-100' : 'bg-gray-100'} p-3 rounded-lg">${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Process user questions
    function processQuestion(question) {
        question = question.toLowerCase();
        let response = "I'm sorry, I didn't understand your question. Can you try rephrasing it?";

        // Check for exact matches
        if (productDB[question]) {
            response = productDB[question];
        } 
        // Check against patterns
        else {
            for (const {regex, response: resp} of patterns) {
                if (regex.test(question)) {
                    response = resp;
                    break;
                }
            }
        }

        return response;
    }

    // Send button click handler
    chatbotSend.addEventListener('click', () => {
        const question = chatbotInput.value.trim();
        if (question) {
            addMessage(question, true);
            chatbotInput.value = '';
            
            setTimeout(() => {
                const response = processQuestion(question);
                addMessage(response);
            }, 500);
        }
    });

    // Enter key handler
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatbotSend.click();
        }
    });
});
