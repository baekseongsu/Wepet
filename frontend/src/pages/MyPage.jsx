import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert2 라이브러리 추가
import "../css/MyPage.css";
import userprofile from "../assets/userprofile.png";
import logout from "../assets/mylogout.png";
import mydelete from "../assets/mydelete.png";
import myuseredit from "../assets/myuseredit.png";
import mydonation from "../assets/mydonation.png";

const MyPage = () => {

  const handleDeleteAccount = () => {
    // SweetAlert2로 모달 띄우기
    Swal.fire({
      title: "정말로 회원 탈퇴 하시겠습니까?",
      icon: "warning",  // 경고 아이콘
      showCancelButton: true,
      confirmButtonText: "탈퇴", // 확인 버튼 텍스트
      cancelButtonText: "취소",  // 취소 버튼 텍스트
      confirmButtonColor: "#d33", // 확인 버튼 색상 (빨간색)
      cancelButtonColor: "#3085d6" // 취소 버튼 색상 (파란색)
    }).then((result) => {
      if (result.isConfirmed) {
        // 사용자가 "탈퇴"를 눌렀을 때 처리 로직
        Swal.fire("탈퇴 완료", "회원 탈퇴가 완료되었습니다.", "success");
        // 여기서 실제 회원탈퇴 API 호출
        // fetch('/api/delete-user', ...)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("취소됨", "회원 탈퇴가 취소되었습니다.", "info");
      }
    });
  };

  return (
    <div className="homepage-background">
      <div className="profile-card">
        <img src={userprofile} alt="프로필 아이콘" className="profile-icon" />
        <div className="profile-info">
          <p className="username">
            <span className="username-main">마루</span>
            <span className="username-sub">님, 안녕하세요!</span>
          </p>
          <p className="email">maru0102@gmail.com</p>
        </div>
      </div>

      <div className="menu-list">
        <div className="menu-item">
          <img src={logout} alt="로그아웃 아이콘" className="menu-icon" />
          <span>로그아웃</span>
          <span className="arrow">></span>
        </div>
        <div className="menu-item" onClick={handleDeleteAccount}> {/* 회원탈퇴 버튼 클릭 시 SweetAlert 모달 띄우기 */}
          <img src={mydelete} alt="회원탈퇴 아이콘" className="menu-icon" />
          <span>회원탈퇴</span>
          <span className="arrow">></span>
        </div>
        <Link to="/edit-profile" className="menu-item">
          <img src={myuseredit} alt="회원정보 수정 아이콘" className="menu-icon" />
          <span>회원정보 수정</span>
          <span className="arrow">></span>
        </Link>
        <div className="menu-item">
          <img src={mydonation} alt="후원하기 아이콘" className="menu-icon" />
          <span>후원하기</span>
          <span className="arrow">></span>
        </div>
      </div>
    </div>
  );
};

export default MyPage;