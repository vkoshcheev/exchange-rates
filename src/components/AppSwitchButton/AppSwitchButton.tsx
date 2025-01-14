import './AppSwitchButton.scss';

const AppSwitchButton = ({
  optionOneText,
  optionTwoText,
  firstOptionIsSelected,
  setFirstOptionIsSelected,
  styles,
}: {
  optionOneText: string;
  optionTwoText: string;
  firstOptionIsSelected: boolean;
  setFirstOptionIsSelected: (b: boolean) => void;
  styles?: React.CSSProperties;
}) => {
  return (
    <button
      className="switch-button"
      onClick={() => setFirstOptionIsSelected(!firstOptionIsSelected)}
      style={styles}
    >
      <div
        className="switch-button__highlight"
        style={{ transform: `translateX(${firstOptionIsSelected ? '0' : '100%'})` }}
      />
      <div
        className={`switch-button__option ${
          !firstOptionIsSelected ? ' switch-button__option--not-selected-mobile' : ''
        }`}
      >
        {optionOneText}
      </div>
      <div
        className={`switch-button__option ${
          firstOptionIsSelected ? ' switch-button__option--not-selected-mobile' : ''
        }`}
      >
        {optionTwoText}
      </div>
    </button>
  );
};

export default AppSwitchButton;
