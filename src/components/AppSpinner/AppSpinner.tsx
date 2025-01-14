import './AppSpinner.scss';

const AppSpinner = ({
  color = '#D8C4B6',
  size = 20,
  thickness = 3,
  quarters = 3,
  spinTime = 1.5,
  styles,
}: {
  color?: string;
  size?: number;
  thickness?: number;
  quarters?: number;
  spinTime?: number;
  styles?: React.CSSProperties;
}) => {
  const circleThickness = thickness || ((size / 10) - 1);

  const radius = (size - circleThickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (quarters / 4) * circumference;
  const offset = circumference - arcLength;

  return (
    <div className="spinner" style={{ width: size, height: size, ...styles }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="spinner__svg"
        style={{ animationDuration: `${spinTime}s` }}
      >
        <circle
          className="spinner__svg__circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={circleThickness}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={-offset / 2}
          style={{ animationDuration: `${spinTime}s`, transformOrigin: 'center' }}
        />
      </svg>
    </div>
  );
};

export default AppSpinner;
