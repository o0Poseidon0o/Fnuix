import React from "react";
import background from "../../assets/img/chirstmas.jpg";
function BackGround() {
  return (
    <div className="container-fluid background">
      <div class="snowflakes" aria-hidden="true">
        <div class="snowflake">❅</div>
        <div class="snowflake">❆</div>
        <div class="snowflake">❅</div>
        <div class="snowflake">❆</div>
        <div class="snowflake">❅</div>
        <div class="snowflake">❆</div>
        <div class="snowflake">❅</div>
        <div class="snowflake">❆</div>
        <div class="snowflake">❅</div>
        <div class="snowflake">❆</div>
        <div class="snowflake">❅</div>
        <div class="snowflake">❆</div>
      </div>
      <div className="row">
        <img src={background} alt="" />
      </div>
    </div>
  );
}
export default BackGround;
