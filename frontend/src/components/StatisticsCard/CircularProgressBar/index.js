import React from "react";
import PropTypes from "prop-types";

import "./CircularProgressBar.scss";

const CircularProgressBar = ({ strokeWidth, percentage, number }) => {
  // sqSize - Size of the enclosing square
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const sqSize = 89.71;
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className="circular-progress-bar">
      {/* <svg
        className="circular-progress-bar__circle-abstract-bottom"
        width="76"
        height="76"
        viewBox="0 0 76 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.253397"
          d="M0.363714 55.6181C0.363714 55.6181 0.934909 52.463 3.18108 59.8823C5.42724 67.3016 30.8262 83.5399 39.3282 70.3891C47.8303 57.2382 59.8504 71.9952 68.1536 68.0484C76.4569 64.1016 77.7721 58.8927 71.5831 46.3417C65.3941 33.7907 80.6182 18.4968 65.4425 8.66435C50.2668 -1.16809 62.0152 1.2474 62.0152 1.2474L61.9379 41.3901L41.6238 59.807L0.363714 55.6181Z"
          fill="#F2994A"
        />
      </svg>
      <svg
        className="circular-progress-bar__circle-abstract-top"
        width="44"
        height="43"
        viewBox="0 0 44 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.518059"
          d="M34.5928 42.5461C34.5928 42.5461 32.8283 42.4435 36.7358 40.6932C40.6433 38.9429 47.8156 23.7465 40.0484 19.9222C32.2811 16.0978 39.5443 8.42575 36.8257 4.08655C34.1071 -0.252643 31.1689 -0.628618 24.7196 3.65805C18.2703 7.94472 5.82833 -3.50456 1.47175 5.58396C-2.88484 14.6725 4.51531 3.63802 4.51531 3.63802L22.6606 9.34632L34.1045 19.3672L34.5928 42.5461Z"
          fill="#F2994A"
        />
      </svg> */}
      <svg
        className="circular-progress-bar__circle"
        width={sqSize}
        height={sqSize}
        viewBox={viewBox}
      >
        <circle
          className="circular-progress-bar__background"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className="circular-progress-bar__progress"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
        />
        <text
          className="circular-progress-bar__text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
        >
          {number}
        </text>
      </svg>
    </div>
  );
};

CircularProgressBar.propTypes = {
  strokeWidth: PropTypes.number,
  percentage: PropTypes.number,
  number: PropTypes.number
};

export default CircularProgressBar;
