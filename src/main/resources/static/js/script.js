document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.app-modal-close');
    const modalOkButton = document.getElementById('modalOkButton');

    // Получаем все поля ввода
    const inputs = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        phone: document.getElementById('phone')
    };

    // Добавляем обработчики событий для валидации при вводе
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', function() {
            validateField(this.id);
        });

        inputs[key].addEventListener('blur', function() {
            validateField(this.id);
        });
    });

    // Валидация всей формы при отправке
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearValidation();

        let isValid = true;
        Object.keys(inputs).forEach(key => {
            if (!validateField(inputs[key].id)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Визуальный эффект успешной отправки
            const submitButton = document.querySelector('.app-form-submit');
            submitButton.classList.add('success');
            setTimeout(() => {
                submitButton.classList.remove('success');
                successModal.style.display = 'flex';
            }, 500);
        }
    });

    // Функция валидации отдельного поля
    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        let isValid = true;
        let errorMessage = '';

        field.classList.remove('valid', 'invalid');

        switch(fieldId) {
            case 'firstName':
            case 'lastName':
                if (!field.value.trim()) {
                    errorMessage = 'Это поле обязательно';
                    isValid = false;
                } else if (field.value.trim().length < 2) {
                    errorMessage = 'Минимум 2 символа';
                    isValid = false;
                }
                break;

            case 'email':
                if (!field.value.trim()) {
                    errorMessage = 'Это поле обязательно';
                    isValid = false;
                } else if (!validateEmail(field.value.trim())) {
                    errorMessage = 'Некорректный email';
                    isValid = false;
                }
                break;

            case 'password':
                if (!field.value) {
                    errorMessage = 'Это поле обязательно';
                    isValid = false;
                } else if (field.value.length < 6) {
                    errorMessage = 'Минимум 6 символов';
                    isValid = false;
                }
                break;

            case 'confirmPassword':
                if (!field.value) {
                    errorMessage = 'Это поле обязательно';
                    isValid = false;
                } else if (field.value !== inputs.password.value) {
                    errorMessage = 'Пароли не совпадают';
                    isValid = false;
                }
                break;

            case 'phone':
                if (!field.value.trim()) {
                    errorMessage = 'Это поле обязательно';
                    isValid = false;
                } else if (!validatePhone(field.value.trim())) {
                    errorMessage = 'Некорректный телефон';
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            field.classList.add('valid');
            errorElement.textContent = '';
        } else {
            field.classList.add('invalid');
            errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    // Очистка валидации
    function clearValidation() {
        Object.keys(inputs).forEach(key => {
            inputs[key].classList.remove('valid', 'invalid');
            document.getElementById(`${inputs[key].id}Error`).textContent = '';
        });
    }

    // Функции проверки
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }

    // Закрытие модального окна
    modalClose.addEventListener('click', function() {
        successModal.style.display = 'none';
    });

    modalOkButton.addEventListener('click', function() {
        successModal.style.display = 'none';
        window.location.href = '/about';
    });
});