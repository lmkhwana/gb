document.addEventListener('DOMContentLoaded', function () {
    const taskPills = document.querySelectorAll('.task-pill');
    const promptInput = document.querySelector('input[name="prompt"]');
    const chatBox = document.querySelector('.chat-box .message');
    const quickRepliesContainer = document.querySelector('.tasks');
    const aiMessage = "Hello, I'm GymBudd, your awesome new AI gym partner. What would you like to ask me today?";
    let index = 0;

    function typeMessage() {
        if (index < aiMessage.length) {
            chatBox.innerHTML += aiMessage.charAt(index);
            index++;
            setTimeout(typeMessage, 50);
        } else {
            addQuickReplies();
        }
    }

    function addQuickReplies() {
        const quickReplies = [
            'How to start a workout routine?',
            'Best diet for muscle gain?',
            'How to lose belly fat?',
            'Effective cardio exercises?',
            'How to stay motivated?'
        ];
        // const avatar = document.querySelector('.avatar img');
        // avatar.style.display = 'block';

        quickReplies.forEach(reply => {
            const quickReplyElement = document.createElement('div');
            quickReplyElement.classList.add('quick-reply tasks');
            quickReplyElement.textContent = reply;
            quickReplyElement.addEventListener('click', () => {
                promptInput.value = reply;
            });
            quickRepliesContainer.appendChild(quickReplyElement);
        });
    }

    chatBox.classList.add('typing');
    typeMessage();

    taskPills.forEach(pill => {
        pill.addEventListener('click', () => {
            promptInput.value = pill.textContent.trim();
        });
    });
});
