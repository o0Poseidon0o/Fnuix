// Khai báo thư viện
import React, { useState } from "react";
import { DateRange } from "react-date-range"; //component dateRange
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./DatePicker.css";

const DatePicker = (props) => {
  // Khai báo biến state để lưu ngày bắt đầy và ngày kết thúc
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Truyền giá trị mới về cho component search bar
  const newValue = (event) => {
    event.preventDefault();
    props.value(state);
  };

  // Hủy chọn giá trị mới
  const cancelPick = (event) => {
    event.preventDefault();
    props.edit(false);
  };

  return (
    <div className="date-picker">
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        minDate={new Date()}
        className="date"
      />
      <div>
        <button onClick={cancelPick}>Cancel</button>
        <button onClick={newValue}>Confirm</button>
      </div>
    </div>
  );
};

export default DatePicker;
