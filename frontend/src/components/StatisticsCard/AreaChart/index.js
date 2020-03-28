import React from "react";
import PropTypes from "prop-types";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveStream } from "@nivo/stream";

const AreaChart = ({ data, keys }) => {
  return (
    <ResponsiveStream
      data={data}
      keys={keys}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      offsetType="none"
      curve="linear"
      colors={{ scheme: "set1" }}
      fillOpacity={0.8}
      borderWidth={0}
      borderColor={{ from: "color", modifiers: [] }}
      defs={[
        linearGradientDef("gradientA", [
          { offset: 0, color: "inherit" },
          { offset: 180, color: "inherit", opacity: 0.1 }
        ]),
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#2c998f",
          size: 4,
          padding: 2,
          stagger: true
        },
        {
          id: "squares",
          type: "patternSquares",
          background: "inherit",
          color: "#e4c912",
          size: 6,
          padding: 2,
          stagger: true
        }
      ]}
      fill={[{ match: { id: "covid" }, id: "gradientA" }]}
      dotSize={8}
      dotColor={{ from: "color" }}
      dotBorderWidth={0}
      dotBorderColor={{ from: "color", modifiers: [["darker", "0.7"]] }}
      animate={false}
      motionStiffness={90}
      motionDamping={15}
      enableStackTooltip={true}
      legends={[]}
    />
  );
};

AreaChart.propTypes = {
  data: PropTypes.any,
  keys: PropTypes.array
};

export default AreaChart;
