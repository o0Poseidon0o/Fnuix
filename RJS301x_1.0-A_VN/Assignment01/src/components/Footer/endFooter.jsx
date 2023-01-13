import React from "react";
import endFooter from "../../data/footer.json";
import "./endFooter.css";

const EndFooter = () => {
  return (
    <div className="container col_endfooter">
      <ul>
        {endFooter.map((item) => (
          <li>
            <a href="#">{item.col_values}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EndFooter;
