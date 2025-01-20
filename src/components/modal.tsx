import React from "react";

//로그인 모달달
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function renderModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[54rem] h-[25rem] rounded-[0.8rem] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

//예약취소 모달
interface reservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

export function reservationModal({
  isOpen,
  onClose,
  onConfirm,
  children,
}: reservationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[29rem] h-[18rem] rounded-[1.2rem] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}
