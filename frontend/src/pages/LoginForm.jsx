import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginForm.css";
import kakaoIcon from "../assets/kakaotalk.png";
import googleIcon from "../assets/google.png";
import WePetLoginLogo from "../assets/WePetLoginLogo.png";
import jelly from "../assets/jelly.png";
import api from "../api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showDomain, setShowDomain] = useState(true);
  const [loginFail, setLoginFail] = useState(false);

  const navigate = useNavigate();

  // 이메일 형식 구성
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

  // Kakao 로그인
  const handleKakaoLogin = () => {
    const kakaoAuthUrl =
      "https://5zld3up4c4.execute-api.ap-northeast-2.amazonaws.com/dev/auth/kakao";

    // 팝업 창 설정
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      kakaoAuthUrl,
      "Kakao Login",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  // URL에서 JWT 토큰 추출 및 저장
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      console.log("JWT 토큰:", token);
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [navigate]);

  // Google 로그인
  const handleGoogleLogin = () => {
    const googleAuthUrl =
      "https://5zld3up4c4.execute-api.ap-northeast-2.amazonaws.com/dev/auth/google";

    // 팝업 창 설정
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      googleAuthUrl,
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  // 소셜 로그인 완료 후 처리를 위한 이벤트 리스너
  useEffect(() => {
    const handleSocialLogin = (event) => {
      if (
        event.origin !==
        "https://5zld3up4c4.execute-api.ap-northeast-2.amazonaws.com"
      )
        return;

      if (event.data.token) {
        localStorage.setItem("token", event.data.token);
        navigate("/");
      }
    };

    window.addEventListener("message", handleSocialLogin);
    return () => window.removeEventListener("message", handleSocialLogin);
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
    setShowDomain(e.target.value === "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (email === "") {
      setEmailError(true);
      valid = false;
    } else if (pattern.test(email) === false) {
      setEmailError(true);
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError(true);
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await api.post("/user/login", {
        id: email,
        pw: password,
      });

      if (response.data.result === "로그인 성공") {
        console.log("로그인 성공:", response.data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        navigate("/");
      } else {
        console.error("로그인 실패:", response.data.message);
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setLoginFail(true);
    }
  };

  return (
    <div className="login-container">
      <img
        src={WePetLoginLogo}
        alt="We Pet Login Logo"
        className="login-logo"
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="useremail">이메일</label>
        <div className="input-container">
          <input
            type="text"
            id="useremail"
            name="useremail"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력하세요"
            onFocus={() => setShowDomain(false)}
            onBlur={() => setShowDomain(email === "")}
            required
          />
          {showDomain && <span className="email-domain">@email.com</span>}
        </div>
        {emailError && (
          <p className="validation-error">
            이메일 주소를 정확하게 입력해주세요.
          </p>
        )}
        <label htmlFor="password" className="password-label">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력하세요"
          required
        />
        {passwordError && (
          <p className="validation-error">비밀번호를 정확하게 입력해주세요.</p>
        )}

        <Link
          to="/find-id-password"
          className="find-link"
          style={{ textDecoration: "none" }}
        >
          비밀번호 찾기
        </Link>

        <button type="submit" className="login-btn">
          로그인
          <img src={jelly} alt="paw" className="jellyicon" />
        </button>
        {loginFail && (
          <p className="validation-error-login">입력 정보를 확인해주세요.</p>
        )}
        <div className="social-login-box">
          <div className="social-login">
            <button className="kakao-login" onClick={handleKakaoLogin}>
              <img src={kakaoIcon} alt="Kakao" />
            </button>
          </div>
          <div className="social-login">
            <button className="google-login" onClick={handleGoogleLogin}>
              <img src={googleIcon} alt="Google" />
            </button>
          </div>
        </div>

        <Link to="/signup" className="signup-link">
          <p className="not-member" style={{ textDecoration: "none" }}>
            아직 회원이 아니신가요?
          </p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
