import React from "react";
import CircularProgressBar from "./CircularProgressBar";
import ThreeDotsMenu from "./ThreeDotsMenu";
import PropTypes from "prop-types";

import "./StatisticsCard.scss";
import AreaChart from "./AreaChart";

////////////////////////////////////////
//		StatisticsCard
////////////////////////////////////////
// props
////////////////////
// title - card title
// numberToDisplay - text that is shown inside of the circle
// graphPercent - percent of the circle that is filled (to be computed
//		outside of the card, taking into account numberToDisplay VS total)
// evolution percent - number to be shown as increasing/decreasing evolution,
//		if positive => red, up arrow
//		if negative => green, down arrow
// data - json in the form of "keyName": "number", e.g. covidCases: 143
//		used to build the area chart in the righthand side of the card
///////////////////////////////////////

const StatisticsCard = ({
  title,
  numberToDisplay,
  graphPercent,
  evolutionPercent,
  data
}) => {
  const evolutionColor = evolutionPercent > 0 ? "red" : "green";
  const evolutionClasses = `statistics-card__right__evolution statistics-card__right__evolution--${evolutionColor}`;

  return (
    <div className="statistics-card">
      <div className="statistics-card__left">
        <CircularProgressBar
          strokeWidth={10}
          percentage={graphPercent}
          number={numberToDisplay}
        />
      </div>
      <div className="statistics-card__right">
        <div className="statistics-card__right__title">{title}</div>
        <div className="statistics-card__right__stats">
          <div>
            <p className={evolutionClasses}>{evolutionPercent}%</p>
            {evolutionPercent > 0 ? (
              <svg height="4" width="8">
                <path fill="#FF1616" d="M0 4 L8 4 L4 0 Z" />
              </svg>
            ) : (
              <svg height="4" width="8">
                <path fill="#008000" d="M0 0 L4 4 L8 0 Z" />
              </svg>
            )}
          </div>
          <div className="statistics-card__right__chart-container">
            <AreaChart data={data} keys={["covid"]} />
          </div>
        </div>
      </div>
      <ThreeDotsMenu />
    </div>
  );
};

StatisticsCard.propTypes = {
  title: PropTypes.string,
  numberToDisplay: PropTypes.number,
  graphPercent: PropTypes.number,
  evolutionPercent: PropTypes.number,
  data: PropTypes.any
};

export default StatisticsCard;
