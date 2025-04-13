import React from 'react';

const NumberInput = ({ label, name, register, error, step = '0.01' }) => {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="number"
        step={step}
        {...register(name)}
        className="input"
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default NumberInput;
