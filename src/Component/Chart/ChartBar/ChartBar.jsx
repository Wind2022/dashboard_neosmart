import React from "react";
import ReactEcharts from "echarts-for-react";

function ChartBar({ data }) {
  const dataValue = data.map((item) => item.value);
  const dataLine = data.map((item) => item.value * 1.4);
  const dataNames = data.map((item) => item.name);

  const option = {
    title: {
      text: "BIỂU ĐỒ",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      data: dataNames,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Bar",
        type: "bar",
        data: dataValue,
        animationDuration: 5000,
      },
      {
        name: "Line",
        type: "line",
        data: dataLine,
        animationDuration: 5000,
      },
    ],
  };
  return (
    <>
      <ReactEcharts
        option={option}
        style={{ height: "400px", width: "30%", margin: "auto" }}
      />
    </>
  );
}

export default ChartBar;
