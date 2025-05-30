document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('app-registration-form');
    const submitButton = document.querySelector('.app-form-submit');
    
    // Получаем все поля ввода
    const inputs = {
        name: document.getElementById('app-reg-name'),
        email: document.getElementById('app-reg-email'),
        password: document.getElementById('app-reg-password'),
        confirm: document.getElementById('app-reg-confirm')
    };

    // Делаем кнопку неактивной по умолчанию
    submitButton.disabled = true;

    // Добавляем обработчики событий для всех полей
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        
        input.addEventListener('input', function() {
            validateField(input.id);
            checkFormValidity();
        });

        input.addEventListener('blur', function() {
            validateField(input.id);
            checkFormValidity();
        });
    });

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        Object.keys(inputs).forEach(key => {
            if (!validateField(inputs[key].id)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Здесь можно добавить AJAX-запрос или другую логику отправки
            alert('Регистрация успешно завершена!');
            form.reset();
            submitButton.disabled = true;
            Object.keys(inputs).forEach(key => {
                inputs[key].classList.remove('valid');
            });
        } else {
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }
    });

    // Функция проверки валидности всей формы
    function checkFormValidity() {
        let isFormValid = true;
        Object.keys(inputs).forEach(key => {
            if (!inputs[key].classList.contains('valid')) {
                isFormValid = false;
            }
        });
        
        submitButton.disabled = !isFormValid;
    }

    // Функция валидации отдельного поля
    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        let isValid = true;
        let errorMessage = '';

        field.classList.remove('valid', 'invalid');

        switch(fieldId) {
            case 'app-reg-name':
                if (!field.value.trim()) {
                    errorMessage = 'Введите имя';
                    isValid = false;
                } else if (field.value.trim().length < 2) {
                    errorMessage = 'Минимум 2 символа';
                    isValid = false;
                } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(field.value)) {
                    errorMessage = 'Только буквы, пробелы и дефисы';
                    isValid = false;
                }
                break;

            case 'app-reg-email':
                if (!field.value.trim()) {
                    errorMessage = 'Введите email';
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    errorMessage = 'Некорректный email';
                    isValid = false;
                }
                break;

            case 'app-reg-password':
                if (!field.value) {
                    errorMessage = 'Введите пароль';
                    isValid = false;
                } else if (field.value.length < 8) {
                    errorMessage = 'Минимум 8 символов';
                    isValid = false;
                } else if (!/[0-9]/.test(field.value) || !/[a-zA-Z]/.test(field.value)) {
                    errorMessage = 'Цифры и буквы обязательны';
                    isValid = false;
                }
                break;

            case 'app-reg-confirm':
                if (!field.value) {
                    errorMessage = 'Подтвердите пароль';
                    isValid = false;
                } else if (field.value !== inputs.password.value) {
                    errorMessage = 'Пароли не совпадают';
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            field.classList.add('valid');
            if (errorElement) errorElement.textContent = '';
        } else {
            field.classList.add('invalid');
            if (errorElement) errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    // Дополнительная проверка сложности пароля
    inputs.password.addEventListener('input', function() {
        const hint = document.querySelector('.app-password-hint');
        if (!this.value) {
            hint.style.color = '#7f8c8d';
        } else if (this.value.length < 8) {
            hint.style.color = '#e74c3c';
        } else if (!/[0-9]/.test(this.value) || !/[a-zA-Z]/.test(this.value)) {
            hint.style.color = '#f39c12';
        } else {
            hint.style.color = '#2ecc71';
        }
    });
});