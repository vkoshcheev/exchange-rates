import { useModalStateHooks } from 'utils-library';
import AppMenuArrow from './AppMenuArrow';
import AppMenuModal from './AppMenuModal';
import './AppSelectorMenu.scss';

export interface AppMenuItem {
  id: number | string;
  label: string;
}

const AppSelectorMenu = ({
  menuItems,
  selectedItemId,
  onSelect,
  className,
  modalClassName,
  styles,
}: {
  menuItems: AppMenuItem[];
  selectedItemId: number | string;
  onSelect: (id: number | string) => void;
  className?: string;
  modalClassName?: string;
  styles: React.CSSProperties;
}) => {
  const selectedValueLabel = menuItems.find((item) => item.id === selectedItemId)?.label;

  const { modalIsOpen, closeModal, toggleModal } = useModalStateHooks();

  const onMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleModal();
  };

  return (
    <div className="app-selector-menu" style={{ minWidth: 240, ...styles }}>
      <button
        className={`app-selector-menu__button ${className || ''}`}
        onClick={onMenuButtonClick}
        disabled={false}
      >
        <div
          className="app-selector-menu__button__content"
          style={{ borderColor: modalIsOpen ? '#0EC1C9' : undefined }}
        >
          <div className="app-selector-menu__button__content__selected-item-title">{selectedValueLabel}</div>

          <AppMenuArrow modalIsOpen={modalIsOpen} />
        </div>
      </button>

      <AppMenuModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        menuItems={menuItems}
        selectedItemId={selectedItemId}
        onSelect={onSelect}
        className={modalClassName}
      />
    </div>
  );
};

export default AppSelectorMenu;
