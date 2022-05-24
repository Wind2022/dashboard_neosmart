import React from "react";
import ReactEcharts from "echarts-for-react";

function ChartPie({ data }) {
  const dataNames = data.map((item) => item.name);
  const style = {
    height: "400px",
    width: "50%",
  };

  //Chart options
  let option = {
    title: {
      text: "BIỂU ĐỒ",
      subtext: "",
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: dataNames,
    },
    series: [
      {
        name: "Data",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        animationDuration: 5000,
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <>
      <ReactEcharts option={option} style={style} className="pie-chart" />
    </>
  );
}

export default ChartPie;
