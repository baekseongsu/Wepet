const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원가입
router.post("/join", userController.join);

// 이메일 중복 확인 API
router.post("/check-email", userController.checkEmail);

// 로그인
router.post("/login", userController.login);

// 로그인 상태 확인
router.get("/checkLoginStatus", userController.checkLoginStatus);

// 로그아웃
router.post("/logout", userController.logout);

// 마이페이지 닉네임 전달
router.get("/send-nick-mypage", userController.sendNickMypage);

// 회원 정보 수정
router.post("/update", userController.updateUser);

// 회원 탈퇴
router.post("/delete", userController.deleteUser);

// 비밀번호 찾기 - 인증 코드 전송
router.post("/send-reset-code", userController.sendResetCode);

// **비밀번호 찾기 - 인증 코드 검증 (추가된 부분)**
router.post("/verify-reset-code", userController.verifyResetCode); // 이 줄 추가

// 비밀번호 재설정
router.post("/reset-password", userController.resetPassword);

module.exports = router;
