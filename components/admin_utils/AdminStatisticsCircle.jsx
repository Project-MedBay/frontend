import React from "react"
import s from "../../styles/adminStatistics.module.css"

export default function AdminStatisticsCircle ({ percentage, size }) {

  const cleanPercentage = (percentage) => {
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > 100;
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
  };

  const pct = cleanPercentage(percentage);

  const Circle = ({ percentage, colour }) => {
    return (
      <circle
        r="44%"
        cx="50%"
        cy="50%"
        fill="transparent"
        stroke={percentage!=0 ? colour : ""} // remove colour as 0% sets full circumference
        strokeWidth={`${12}%`}
        strokeDasharray={percentage ? `${percentage * 0.88 * Math.PI}% ${(100 - percentage * 0.88) * Math.PI}%` : 0}
        strokeDashoffset={0}
        strokeLinecap="round"
      ></circle>
    );
  };

  const Text = ({ percentage }) => {
    return (
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className={size == "big" ? s.circle_text_big : s.circle_text_small}
      >
        {percentage.toFixed(0)}%
      </text>
    );
  };
  
  return (
    <svg>
      <g>
        <Circle colour={"#22006A40"} />
        <Circle percentage={pct} colour={"#22006A"} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};