import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  //Sự kiện khi nhấn btn Search
  const goToSearch = (event) => {
    event.preventDefault();
    window.location.replace("/search");
  };
  // Lưu ngày bắt đầu và ngày kết thúc
  const [date, setData] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "section",
    },
  ]);
  // Trạng thái có chọn ngày tháng không
  const [isPicker, setIspicker] = useState(false);
  // Sự kiện click vào ngày tháng năm
  const startPicker = () => {
    setIspicker(true);
  };
  // Thiết lập giá trị mới và tắt chọn ngày
  const changeValue = (value) => {
    setData(value);
    setIspicker(false);
  };
  // Hủy chọn ngày
  const isCancel = (e) => {
    setIspicker(false);
  };

  return (
    <div className="container-fluid">
      <form className="form-header p-1">
        <FontAwesomeIcon icon={"fa-bed"}></FontAwesomeIcon>
        <input
          type="text"
          class="form-control m-1"
          id="exampleFormControlInput1"
          placeholder="Where are you going?"
        ></input>
        <FontAwesomeIcon icon={"fa-calendar-days"}></FontAwesomeIcon>
        <label onClick={startPicker}>
          {/* Hiển thị ngày được chọn */}
          <FontAwesomeIcon icon={"fa-calendar-days"}></FontAwesomeIcon>
          {`${date[0].startDate.toLocaleString(
            "vn-VN"
          )} to ${date[0].endDate.toLocaleString("vn-VN")}`}
        </label>
        {!isPicker && ""}

        <input
          type="date"
          class="form-control m-1"
          id="exampleFormControlInput1"
          placeholder="06/24/2022 to 06/24/2022"
        ></input>
        <FontAwesomeIcon icon={"fa-person"}></FontAwesomeIcon>
        <input
          type="text"
          class="form-control m-1"
          id="exampleFormControlInput1"
          placeholder="1 aduit 0 children 1 room"
        ></input>
        <button className="btn btn-primary" onClick={goToSearch}>
          Search
        </button>
      </form>
    </div>
  );
}
export default Header;
