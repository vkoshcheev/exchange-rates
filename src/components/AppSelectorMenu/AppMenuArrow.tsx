import './AppMenuArrow.scss';

const AppMenuArrow = ({ modalIsOpen }: { modalIsOpen: boolean }) => {
  const arrowSymbol = modalIsOpen ? '⇡' : '⇣'; // ⇡⇣↑↓

  return <div className="app-menu-arrow">{arrowSymbol}</div>;
};

export default AppMenuArrow;
