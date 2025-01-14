import { useEffect, useRef } from "react";
import { sleep } from "../helper";

export const useCloseModalOnClickOutside = ({ closeModal }: { closeModal: () => void }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      sleep().then(() => closeModal());
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return { modalRef };
}