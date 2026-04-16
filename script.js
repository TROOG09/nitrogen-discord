class NitrogenDiscord {
    constructor() {
        this.messages = [];
        this.currentServer = 'general';
        this.init();
    }

    init() {
        this.messageInput = document.getElementById('messageInput');
        this.messagesContainer = document.getElementById('messages');
        this.sendBtn = document.getElementById('sendBtn');
        
        // Eventos
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Mensajes de ejemplo
        this.addBotMessage('¡Bienvenido a Nitrogen Discord! 🚀', 'NitrogenBot');
        this.addBotMessage('Escribe aquí y presiona Enter para enviar.', 'NitrogenBot');
    }

    sendMessage() {
        const text = this.messageInput.value.trim();
        if (!text) return;

        this.addMessage(text, 'Tú');
        this.messageInput.value = '';
        
        // Simular respuesta bot
        setTimeout(() => {
            this.addBotMessage('Recibido: ' + text, 'NitrogenBot');
        }, 500);
    }

    addMessage(text, author) {
        const message = {
            id: Date.now(),
            text,
            author,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            server: this.currentServer
        };
        
        this.messages.push(message);
        this.renderMessages();
        this.scrollToBottom();
    }

    addBotMessage(text, author = 'NitrogenBot') {
        setTimeout(() => {
            this.addMessage(text, author);
        }, 100);
    }

    renderMessages() {
        this.messagesContainer.innerHTML = this.messages
            .filter(msg => msg.server === this.currentServer)
            .map(msg => `
                <div class="message">
                    <div class="message-author">${msg.author} 
                        <span class="message-time">${msg.time}</span>
                    </div>
                    <div class="message-content">${msg.text}</div>
                </div>
            `).join('');
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Inicializar
new NitrogenDiscord();
