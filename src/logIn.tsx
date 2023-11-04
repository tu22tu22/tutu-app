import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
        );
        
        const data = await response.json();
        if (data.access_token) {
          setMessage("Login successful!");
          
          // 將令牌存儲在本地存儲中
          localStorage.setItem("accessToken", data.access_token);
          
          // 使用 navigate 函數進行導航到首頁
          navigate('/');
        
      } else {
        setMessage("Login failed. Check your credentials.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="logIn">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <div id="message">{message}</div>
      <p>
        john@mail.com <br />
        changeme
      </p>
    </div>
  );
}

export default LogIn;