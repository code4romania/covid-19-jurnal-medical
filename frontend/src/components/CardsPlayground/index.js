import React from "react";

import BasePage from "../BasePage";
import StatisticsCard from "../StatisticsCard";

const covidData = [
  {
    covid: 164
  },
  {
    covid: 35
  },
  {
    covid: 94
  },
  {
    covid: 51
  },
  {
    covid: 43
  },
  {
    covid: 170
  },
  {
    covid: 73
  },
  {
    covid: 110
  },
  {
    covid: 200
  }
];

const CardsPlayground = () => {
  return (
    <BasePage>
      <StatisticsCard
        data={covidData}
        title="Utilizatori red flag in ultimele 24 de ore"
        numberToDisplay="146"
        evolutionPercent="-28.7"
        graphPercent="67"
      />
    </BasePage>
  );
};

export default CardsPlayground;
