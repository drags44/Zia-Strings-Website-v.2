// chatbot.js - Simple keyword-based chatbot
document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbot = document.getElementById("chatbot");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    function addMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = sender === "bot" ? "text-blue-600 mb-2" : "text-gray-800 mb-2 text-right";
        msg.textContent = text;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    const responses = {
        "price": "Our thobes range from $40 to $80, depending on the material and style.",
        "delivery": "We deliver within 5–7 business days in the US.",
        "contact": "You can reach us via our contact form or Instagram DM."
    };

    function getBotResponse(input) {
        input = input.toLowerCase();
        for (let keyword in responses) {
            if (input.includes(keyword)) return responses[keyword];
        }
        return "I'm not sure about that. Could you rephrase?";
    }

    chatbotToggle.addEventListener("click", () => {
        chatbot.classList.toggle("hidden");
    });

    chatbotClose.addEventListener("click", () => {
        chatbot.classList.add("hidden");
    });

    chatbotSend.addEventListener("click", () => {
        const userInput = chatbotInput.value.trim();
        if (!userInput) return;
        addMessage("user", userInput);
        addMessage("bot", getBotResponse(userInput));
        chatbotInput.value = "";
    });
});
