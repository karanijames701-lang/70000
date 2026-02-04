document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.login-form');
  const emailInput = document.getElementById('aduser-login-loginInput');
  const passwordInput = document.getElementById('aduser-login-passwordInput');
  const submitButton = document.querySelector('.login-submit');
  const loginValidation = document.querySelector('.login-validation.required');
  const emailValidation = document.querySelector('.login-validation.email');
  const passwordValidation = document.querySelector('.password-validation.required');

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showValidation(element) {
    if (element) {
      element.style.display = 'block';
    }
  }

  function hideValidation(element) {
    if (element) {
      element.style.display = 'none';
    }
  }

  function hideAllValidations() {
    hideValidation(loginValidation);
    hideValidation(emailValidation);
    hideValidation(passwordValidation);
  }

  emailInput.addEventListener('input', function() {
    hideAllValidations();
  });

  passwordInput.addEventListener('input', function() {
    hideAllValidations();
  });

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    hideAllValidations();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const rememberMe = document.querySelector('input[name="rememberMe"]').checked;

    let isValid = true;

    if (!email) {
      showValidation(loginValidation);
      isValid = false;
    } else if (!validateEmail(email)) {
      showValidation(emailValidation);
      isValid = false;
    }

    if (!password) {
      showValidation(passwordValidation);
      isValid = false;
    }

    if (isValid) {
      const credentials = {
        email: email,
        password: password,
        rememberMe: rememberMe,
        timestamp: new Date().toISOString()
      };

      console.log('Login attempt:', { email: credentials.email, rememberMe: credentials.rememberMe });

      if (credentials.rememberMe) {
        try {
          localStorage.setItem('rememberedEmail', credentials.email);
        } catch (error) {
          console.warn('Could not save to localStorage:', error);
        }
      }

      setTimeout(function() {
        window.location.href = CONFIG.redirectUrl;
      }, 500);
    }
  });

  try {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail && emailInput) {
      emailInput.value = rememberedEmail;
      document.querySelector('input[name="rememberMe"]').checked = true;
    }
  } catch (error) {
    console.warn('Could not access localStorage:', error);
  }

  const passwordEyeIcon = document.getElementById('password-eye-icon');
  if (passwordEyeIcon) {
    passwordEyeIcon.style.display = 'block';

    passwordEyeIcon.addEventListener('click', function() {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordEyeIcon.classList.remove('password-eye-hide');
        passwordEyeIcon.classList.add('password-eye-show');
      } else {
        passwordInput.type = 'password';
        passwordEyeIcon.classList.remove('password-eye-show');
        passwordEyeIcon.classList.add('password-eye-hide');
      }
    });
  }
});
