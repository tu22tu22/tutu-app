document.addEventListener('DOMContentLoaded', async function() {
  const userInfoContainer = document.getElementById('userInfo');
  const userNameElement = document.getElementById('userName');
  const userEmailElement = document.getElementById('userEmail');
  const userRoleElement = document.getElementById('userRole');
  const userAvatarElement = document.getElementById('userAvatar');

  // 檢查本地存儲中是否存在有效的令牌
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        // 將用戶資料填充到HTML元素中
        userNameElement.textContent = userData.name;
        userEmailElement.textContent = userData.email;
        userRoleElement.textContent = userData.role;
        userAvatarElement.src = userData.avatar;
        userInfoContainer.style.display = 'block'; // 顯示用戶資訊
      } else {
        userInfoContainer.textContent = 'Unable to fetch user data.';
      }
    } catch (error) {
      userInfoContainer.textContent = 'An error occurred while fetching user data.';
      console.error('Error:', error);
    }
  } else {
    userInfoContainer.textContent = 'Please log in first.';
  }
});
