// import React from 'react';
// // import {View, StyleSheet} from 'react-native';

// export default function CircularProgress (props) {

//     const styles = {
//         width: 200,
//         height: 200,
//         backgroundColor: '#9b59b6',
//         borderWidth: 20,
//         borderRadius: 100,
//         borderColor: 'grey'
//     }

//     return (
//       <div style={styles}></div>
//     )
// }

// // const styles = StyleSheet.create({
// //     container: {
// //       width: 200,
// //       height: 200,
// //     //   backgroundColor: '#9b59b6',
// //       borderWidth: 20,
// //       borderRadius: 100,
// //       borderColor: "#22006A40"
// //     }
// // });

import React from "react"

// const cleanPercentage = (percentage) => {
//   const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
//   const isTooHigh = percentage > 100;
//   return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
// };

// const Circle = ({ colour, percentage }) => {
//   const r = 70;
//   const circ = 2 * Math.PI * r;
//   const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
//   return (
//     <circle
//       r={r}
//       cx={100}
//       cy={100}
//       fill="transparent"
//       stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
//       strokeWidth={"2rem"}
//       strokeDasharray={circ}
//       strokeDashoffset={percentage ? strokePct : 0}
//     ></circle>
//   );
// };

// const Text = ({ percentage }) => {
//   return (
//     <text
//       x="50%"
//       y="50%"
//       dominantBaseline="central"
//       textAnchor="middle"
//       fontSize="36px"
//     >
//       {percentage.toFixed(0)}%
//     </text>
//   );
// };

// const Pie = (props) => {
//   const {percentage, size} = props;
//   const pct = cleanPercentage(percentage);
//   return (
//     <svg width={size} height={size}>
//       <g transform={`rotate(-90 ${"100 100"})`}>
//         <Circle colour="#22006A40" />
//         <Circle colour="#22006A" percentage={pct} />
//       </g>
//       <Text percentage={pct} />
//     </svg>
//   );
// };

// export default Pie;

export default function AdminStatisticsCircle ({ percentage, size, strokeWidth, fontSize }) {

  const cleanPercentage = (percentage) => {
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > 100;
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
  };

  const pct = cleanPercentage(percentage);

  const Circle = ({ percentage, size, colour, strokeWidth }) => {
    const r = (size - 25) / 2;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    return (
      <circle
        r={r}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
        strokeWidth={`${strokeWidth}px`}
        strokeDasharray={circ}
        strokeDashoffset={percentage ? strokePct : 0}
        stroke-linecap="round"
      ></circle>
    );
  };

  const Text = ({ percentage, fontSize }) => {
    return (
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={`${fontSize}px`}
      >
        {percentage.toFixed(0)}%
      </text>
    );
  };
  
  return (
    <svg width={size} height={size}>
      <g transform={`rotate(-90 ${`${size/2}, ${size/2}`})`}>
        <Circle size={size} colour={"#22006A40"} strokeWidth={strokeWidth} />
        <Circle percentage={pct} size={size} colour={"#22006A"} strokeWidth={strokeWidth} />
      </g>
      <Text percentage={pct} fontSize={fontSize} />
    </svg>
  );
};