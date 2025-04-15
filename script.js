// Получаем элементы DOM
const nameInput = document.querySelector('.registration-window input:nth-child(1)');
const emailInput = document.querySelector('.registration-window input:nth-child(2)');
const registrationSection = document.querySelector('.registration-window');

// Добавляем обработчики событий
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);

function validateName() {
    const nameValue = nameInput.value.trim();
    const nameError = document.querySelector('.name-error');

    // Если сообщение об ошибке уже существует, удаляем его
    if (nameError) {
        nameError.remove();
    }

    // Проверяем, что имя не пустое и содержит только буквы
    if (!nameValue.match(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)) {
        const errorElement = document.createElement('p');
        errorElement.className = 'name-error text-danger';
        errorElement.textContent = 'Пожалуйста, введите корректное имя (только буквы).';
        registrationSection.insertBefore(errorElement, nameInput.nextSibling);
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailError = document.querySelector('.email-error');

    // Если сообщение об ошибке уже существует, удаляем его
    if (emailError) {
        emailError.remove();
    }

    // Проверяем, что email соответствует формату
    if (!emailValue.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        const errorElement = document.createElement('p');
        errorElement.className = 'email-error text-danger';
        errorElement.textContent = 'Пожалуйста, введите корректный email.';
        registrationSection.insertBefore(errorElement, emailInput.nextSibling);
    }
}

// Обработка отправки формы (если потребуется)
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.createElement('button');
    submitButton.className = 'btn btn-primary mt-3';
    submitButton.textContent = 'Зарегистрироваться';

    registrationSection.appendChild(submitButton);

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем отправку формы

        const isNameValid = validateName();
        const isEmailValid = validateEmail();

        if (!document.querySelector('.name-error') && !document.querySelector('.email-error')) {
            alert('Регистрация успешна!');
        } else {
            alert('Пожалуйста, исправьте ошибки.');
        }
    });
});