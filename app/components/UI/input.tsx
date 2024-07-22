import React from 'react';
import PropTypes from 'prop-types';
import '@/app/components/styles/components/_input.scss';

const Input = ({ state, fullWidth, placeholder, label, type }) => {
  // Define las clases base para el input
  let inputClasses = "input-base"; // Clase base general
  let containerClasses = "input-container";

  if (fullWidth) {
    inputClasses += ' w-full';
    containerClasses += ' w-full';
  }

  // Aplica el estado
  switch (state) {
    case 'Disabled':
      inputClasses += ' input-disabled';
      break;
    case 'Active':
      inputClasses += ' input-active';
      break;
    case 'Default':
    default:
      inputClasses += ' input-default';
      break;
  }

  return (
    <div className={containerClasses}>
      {label && <label className="input-label">{label}</label>}
      <input 
        type={type} 
        className={inputClasses} 
        placeholder={placeholder} 
        disabled={state === 'Disabled'} 
      />
    </div>
  );
};

// Define los tipos de props para el componente
Input.propTypes = {
  state: PropTypes.oneOf(['Default', 'Active', 'Disabled']),
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number']), // Agrega aquí otros tipos de input según sea necesario
};

// Define los valores por defecto para las props
Input.defaultProps = {
  state: 'Default',
  fullWidth: false,
  placeholder: '',
  label: '',
  type: 'text', // Valor por defecto para el tipo de input
};

export default Input;