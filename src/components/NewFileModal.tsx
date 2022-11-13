import React from "react";
import Modal, { Props } from "react-modal";

export type NewFileModalProps = {
  onConfirm: () => void;
} & Props;

const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    background: "#000",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const NewFileModal = ({ onConfirm, ...others }: NewFileModalProps) => {
  return (
    <div>
      <Modal style={customStyles} {...others}>
        <h2>Input week index, first week is 2022.11.1</h2>
        <input placeholder="Input week (1, 2, 3...)" />
        <button
          onClick={() => {
            onConfirm();
          }}
        >
          Confirm
        </button>
      </Modal>
    </div>
  );
};
