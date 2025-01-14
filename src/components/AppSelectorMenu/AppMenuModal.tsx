import { addModifierToClassWhenConditionIsTrue } from '../../utils/helper';
import { useCloseModalOnClickOutside } from '../../utils/hooks/useCloseModalOnClickOutside';
import './AppMenuModal.scss';
import { AppMenuItem } from './AppSelectorMenu';

function AppMenuModal({
  modalIsOpen,
  closeModal,
  menuItems,
  selectedItemId,
  onSelect,
  className,
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
  menuItems: AppMenuItem[];
  selectedItemId: number | string;
  onSelect: (id: number | string) => void;
  className?: string;
}) {
  const { modalRef } = useCloseModalOnClickOutside({ closeModal });

  const onSelectMenuItem = (id: number | string) => {
    onSelect(id);
    closeModal();
  };

  if (!modalIsOpen) return null;

  return (
    <div
      className={`app-menu-modal ${className || ''}`}
      ref={modalRef}
    >
      {menuItems.map((menuItem, index) => {
        const isSelected = menuItem.id === selectedItemId;

        return (
          <button
            key={index}
            className={addModifierToClassWhenConditionIsTrue('app-menu-modal__item', isSelected)}
            onClick={() => onSelectMenuItem(menuItem.id)}
          >
            {menuItem.label}
          </button>
        );
      })}
    </div>
  );
}

export default AppMenuModal;
