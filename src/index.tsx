import React from "react";

class HomePage extends React.Component {
  handleInfoLinkClick = (): void => {
    // 檢查本地存儲中是否存在有效的令牌
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      // 如果令牌存在，導向資訊頁面
      window.location.href = "info.html"; // 假設資訊頁面文件為info.html
    } else {
      // 如果令牌不存在，可以提示用戶或執行其他操作
      alert("Please log in first."); // 用戶未登入，顯示提示
    }
  };

  handleLogInClick = (): void => {
    // 點擊"Log In"按鈕時導向到logIn.html
    window.location.href = "logIn.html"; // 假設登入頁面文件為logIn.html
  };

  render(): JSX.Element {
    return (
      <div>
        <button id="infoLink" onClick={this.handleInfoLinkClick}>
        member
        </button>
        <button id="logInLink" onClick={this.handleLogInClick}>
          Log In
        </button>
      </div>
    );
  }
}

export default HomePage;
