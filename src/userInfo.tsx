import { useEffect, useState } from "react";

interface UserInfo {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

function UserInfo(): JSX.Element {
  const [userData, setUserData] = useState<UserInfo | null>(null);

  useEffect(() => {
    // 檢查本地存儲中是否存在有效的令牌
    const accessToken = localStorage.getItem("accessToken");

    async function fetchUserInfo() {
      if (accessToken) {
        try {
          const response = await fetch(
            "https://api.escuelajs.co/api/v1/auth/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );

          if (response.ok) {
            const userData: UserInfo = await response.json();
            setUserData(userData);
          } else {
            console.error("Unable to fetch user data.");
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
        }
      }
    }

    fetchUserInfo();
  }, []);

  return (
    <div className="userInfo">
      <h2>User Information</h2>
      {userData ? (
        <>
          <p>
            Name: <span id="userName">{userData.name}</span>
          </p>
          <p>
            Email: <span id="userEmail">{userData.email}</span>
          </p>
          <p>
            Role: <span id="userRole">{userData.role}</span>
          </p>
          <img id="userAvatar" src={userData.avatar} alt="User Avatar" />
        </>
      ) : (
        <p>Please log in first.</p>
      )}
    </div>
  );
}

export default UserInfo;