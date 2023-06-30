import React, { useMemo } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Label,
  Legend,
} from "recharts";

export const MyBarChart = ({
  title,
  data,
  xDataKey,
  barDataKey,
  xLabel,
  yLabel,
  barName,
  keyToSort1,
  keyToSort2,
  ollerosOrOperadores,
  barDataKey2,
  barName2,
  legend,
  tickMargin,
  height,
  marginBottom,
}) => {
  const formattedData = useMemo(() => {
    const newArr = [...data];

    if (keyToSort1 && !keyToSort2) {
      newArr.sort(function (a, b) {
        if (a[keyToSort1] > b[keyToSort1]) return -1;
        if (a[keyToSort1] < b[keyToSort1]) return 1;
        return 0;
      });
    } else if (keyToSort1 && keyToSort2) {
      newArr.sort(function (a, b) {
        if (a[keyToSort1][keyToSort2] > b[keyToSort1][keyToSort2]) return -1;
        if (a[keyToSort1][keyToSort2] < b[keyToSort1][keyToSort2]) return 1;
        return 0;
      });
    } else {
      return data;
    }

    /*  if (typeof newArr[0][keyToSort1][keyToSort2] === "string") {
      const newNewArr = newArr.map((obj) => {
        return {
          ...obj,
          [keyToSort1]: {
            ...obj[keyToSort1],
            [keyToSort2]: Number(
              Number(obj[keyToSort1][keyToSort2]).toFixed(2)
            ),
          },
        };
      });

      return newNewArr;
    }

    return newArr; */

    return newArr;
  }, [data]);

  const newFormattedData = useMemo(() => {
    if (!ollerosOrOperadores) return formattedData;

    const newArr2 = formattedData.map((obj) => {
      return {
        ...obj,
        displayName: `${obj.name} ${obj.last_name.slice(0, 1)}.`,
      };
    });

    return newArr2;
  }, [formattedData, ollerosOrOperadores]);

  return (
    <>
      <h5 className="text-center">{title}</h5>
      <div className="graph-container">
        <BarChart
          width={data.length > 20 ? data.length * 70 : 1100}
          height={height || 350}
          margin={{ top: 20, bottom: marginBottom || 120, left: 20 }}
          data={newFormattedData}
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={ollerosOrOperadores ? "displayName" : xDataKey}
            interval={0}
            angle={-90}
            tickMargin={tickMargin || 50}
          >
            <Label value={xLabel} position="insideBottomLeft" offset={-10} />
          </XAxis>
          <YAxis>
            <Label value={yLabel} angle={-90} position={"left"} />
          </YAxis>
          <Tooltip labelStyle={{ color: "black" }} />
          {legend && <Legend verticalAlign="top" />}
          <Bar
            dataKey={barDataKey}
            fill="#212C56"
            name={barName}
            label={{ position: "top" }}
          />
          {barDataKey2 && (
            <Bar
              dataKey={barDataKey2}
              fill="#00C08B"
              name={barName2}
              label={{ position: "top" }}
            />
          )}
        </BarChart>
      </div>
    </>
  );
};
