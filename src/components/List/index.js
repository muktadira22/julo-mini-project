import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./style.css";
import { KtoC } from "../../utils/kelvinToCelcius";
const List = ({ data }) => {
  return (
    <div className="next-3-days">
      <h2 className="next-3-days__heading">Next 3 days</h2>
      <div className="next-3-days__container">
        {data.forEach((item, key) => {
          const day = moment().add(key + 1, "days");
          if (key < 3)
            return (
              <div className="next-3-days__row" key={key}>
                <div className="next-3-days__date">
                  {day.format("ddd")}
                  <div className="next-3-days__label">
                    {day.format("DD/MM")}
                  </div>
                </div>

                <div className="next-3-days__low">
                  {KtoC(item.temp.min)}&deg;
                  <div className="next-3-days__label">Low</div>
                </div>

                <div className="next-3-days__high">
                  {KtoC(item.temp.max)}&deg;
                  <div className="next-3-days__label">High</div>
                </div>

                <div className="next-3-days__icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].icon}
                  />
                </div>

                <div className="next-3-days__wind">
                  {item.wind_speed}m/s
                  <div className="next-3-days__label">Wind</div>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
};

export default List;
