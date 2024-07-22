import React from 'react';
import PropTypes from 'prop-types';
import '@/app/components/styles/components/_button.scss';

const Button = ({ size, hierarchy, state, fullWidth, children }) => {
  // Define las clases base para el botón
  let buttonClasses = "button-base focus:outline-none";

  if (fullWidth) {
    buttonClasses += ' w-full';
  }

  // Configurar tamaños
  switch (size) {
    case 'sm':
      buttonClasses += ' px-3 py-2'; // padding: 8px 12px (Tailwind: px-3 py-2)
      break;
    case 'md':
      buttonClasses += ' px-3.5 py-2.5'; // padding: 10px 14px (Tailwind: px-3.5 py-2.5)
      break;
    case 'lg':
      buttonClasses += ' px-4 py-2.5'; // padding: 10px 16px (Tailwind: px-4 py-2.5)
      break;
    case 'xl':
      buttonClasses += ' px-4.5 py-3'; // padding: 12px 18px (Tailwind: px-4.5 py-3)
      break;
    case '2xl':
      buttonClasses += ' px-5.5 py-4'; // padding: 16px 22px (Tailwind: px-5.5 py-4)
      break;
    default:
      buttonClasses += ' px-3 py-2.5'; // padding por defecto (10px 14px)
      break;
  }

  // Aplica la jerarquía (estilo del botón)
  switch (hierarchy) {
    case 'Secondary':
      buttonClasses += ' bg-white border border-[#D6BBFB] text-[#6941C6] font-medium ';
      break;
    case 'Tertiary':
      buttonClasses += ' bg-gray-200 text-gray-700';
      break;
    case 'Primary':
    default:
      buttonClasses += ' bg-blue-500 text-white';
      break;
  }

  // Aplica el estado
  switch (state) {
    case 'Disabled':
      buttonClasses += ' opacity-50 cursor-not-allowed';
      break;
    case 'Active':
      buttonClasses += ' opacity-100';
      break;
    case 'Default':
    default:
      buttonClasses += ' opacity-90 hover:opacity-100';
      break;
  }

  return (
    <button className={buttonClasses} disabled={state === 'Disabled'}>
      {children}
    </button>
  );
};

// Define los tipos de props para el componente
Button.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  hierarchy: PropTypes.oneOf(['Primary', 'Secondary', 'Tertiary']),
  state: PropTypes.oneOf(['Default', 'Active', 'Disabled']),
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired
};

// Define los valores por defecto para las props
Button.defaultProps = {
  size: 'md',
  hierarchy: 'Primary',
  state: 'Disable',
  fullWidth: false
};

export default Button;
