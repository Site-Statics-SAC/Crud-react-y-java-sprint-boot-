import React, { useState } from 'react';
import ModalForm from './ModalForm';

function ButtonWithModal({ buttonText, fields }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado");
    closeModal();
  };

  return (
    <div className="my-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        {buttonText}
      </button>
      <ModalForm isOpen={isOpen} onClose={closeModal} onSubmit={handleSubmit} fields={fields} />
    </div>
  );
}

export default ButtonWithModal;
