document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  const messageContainer = document.getElementById('message');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      });

      const data = await response.json();
      if (data.access_token) {
        messageContainer.textContent = 'Login successful!';
        
        // 將令牌存儲在本地存儲中
        localStorage.setItem('accessToken', data.access_token);

        // 重定向到首頁
        window.location.href = 'index.html'; 
        
      } else {
        messageContainer.textContent = 'Login failed. Check your credentials.';
      }
    } catch (error) {
      messageContainer.textContent = 'An error occurred. Please try again later.';
      console.error('Error:', error);
    }
  });
});
