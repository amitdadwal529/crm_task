import React from 'react';

const NumberInput = ({ label, name, register, error, step = '0.01', placeholder }) => {
  return (
    <div>
      {/* Rendering label for the input field */}
      <label className="block font-medium mb-1">{label}</label>

      {/* Number input field with customizable step */}
      <input
        type="number" // Specifies that the input field accepts numeric values
        step={step} // Defines the step interval (default is 0.01)
        {...register(name)} // Registering the input with the form
        className="input" // Applying custom styling to the input field
        placeholder={placeholder} // Setting a placeholder for the input field
      />

      {/* Displaying error message if validation error exists */}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default NumberInput;
