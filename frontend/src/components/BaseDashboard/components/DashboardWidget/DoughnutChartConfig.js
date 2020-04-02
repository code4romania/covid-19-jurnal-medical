export default {
  type: "doughnut",
  data: {
    labels: [],
    datasets: []
  },
  options: {
    responsive: false,
    animation: {
      duration: 0
    },
    cutoutPercentage: 70,
    legend: false,
    elements: {
      arc: {
        roundedCornersFor: 0
      },
      center: {
        text: "",
        fontColor: "#6B6B6B",
        fontStyle: "bold",
        zIndex: 0,
        minFontSize: 1,
        maxFontSize: 16
      }
    }
  }
};
