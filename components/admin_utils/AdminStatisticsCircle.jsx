import React from "react"

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
    const strokePct = ((100 - percentage + 1) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
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
        strokeLinecap="round"
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