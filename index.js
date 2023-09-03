document.addEventListener('DOMContentLoaded', function() {
  const infoLink = document.getElementById('infoLink');

  infoLink.addEventListener('click', function() {
    // 檢查本地存儲中是否存在有效的令牌
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      // 如果令牌存在，導向資訊頁面
      window.location.href = 'info.html'; // 假設資訊頁面文件為info.html
    } else {
      // 如果令牌不存在，可以提示用戶或執行其他操作
      alert('Please log in first.'); // 用戶未登入，顯示提示
    }
  });
});
