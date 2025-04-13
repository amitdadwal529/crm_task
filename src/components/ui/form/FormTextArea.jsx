const FormTextarea = ({ label, error, register, name, placeholder }) => (
  <div>
    {/* Rendering label for the textarea if provided */}
    <label className="block font-medium mb-1">{label}</label>

    {/* Textarea input field */}
    <textarea
      {...register(name)} // Registering the textarea input with the form
      className="input resize-none" // Applying custom styling and disabling resize for the textarea
      placeholder={placeholder} // Setting a placeholder for the textarea
    />

    {/* Displaying error message if validation error exists */}
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

export default FormTextarea;
