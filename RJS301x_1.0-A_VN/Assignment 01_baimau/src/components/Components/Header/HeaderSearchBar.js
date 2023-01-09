// Khai báo thư viện
import React, { useState } from "react";
import "./HeaderSearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "./DatePicker";

const HeaderSearhcBar = () => {
  // Sự kiện khi nhấn btn Search
  const goToSearch = (event) => {
    event.preventDefault();
    window.location.replace("/search");
  };

  //Biến state lưu ngày bắt đầu và kết thúc
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  //Biến trạng thái có đang chọn ngày hay không
  const [isPicker, setIsPicker] = useState(false);

  //Sự kiện nhấn vào phần ngày tháng
  const startPicker = () => {
    setIsPicker(true);
  };

  // Thiết lập giá trị mới và tắt chọn ngày
  const changeValue = (value) => {
    setDate(value);
    setIsPicker(false);
  };

  // Hủy chọn
  const isCancel = (e) => {
    setIsPicker(false);
  };

  return (
    <form className="search-bar">
      <div>
        <FontAwesomeIcon icon="fa-bed" />
        <input type="text" placeholder="Where are you going?"></input>
      </div>
      <div>
        <label onClick={startPicker}>
          {/* Hiển thị ngày đang được chọn */}
          <FontAwesomeIcon icon="fa-calendar-days" />
          {`${date[0].startDate.toLocaleDateString(
            "vn-VN"
          )} to ${date[0].endDate.toLocaleDateString("vn-VN")}`}
        </label>
        {!isPicker && ""}
        {isPicker && <DatePicker edit={isCancel} value={changeValue} />}
      </div>
      <label>
        <FontAwesomeIcon icon="fa-person" /> 1 adult &#183; 0 children &#183; 1
        room
      </label>
      <button onClick={goToSearch}>Search</button>
    </form>
  );
};

export default HeaderSearhcBar;
