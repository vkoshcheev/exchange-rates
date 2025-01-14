import { useState } from "react";

export const useModalStateHooks = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  return { modalIsOpen, openModal, closeModal, toggleModal };
}