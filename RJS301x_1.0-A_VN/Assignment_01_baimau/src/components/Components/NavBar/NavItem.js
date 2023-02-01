import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavItem.css";

const NavItem = (props) => {
  // Gửi dữ liệu nút active mới về component navbar
  const onClickNavItemHandler = (event) => {
    if (event.target.textContent.trim())
      props.onActive(event.target.textContent.trim());
  };

  return (
    <div
      // Kiểm tra nút đang render có phải là nút đang active không
      // thêm class active
      className={`nav-item ${props.active === props.item.type ? "active" : ""}`}
      onClick={onClickNavItemHandler}
    >
      <FontAwesomeIcon icon={`fa-solid ${props.item.icon}`} />
      {props.item.type}
    </div>
  );
};

export default NavItem;
