const FormInput = ({ label, error, register, name, type = "text", ...rest }) => (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input {...register(name)} type={type} className="input" {...rest} />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
  export default FormInput;
  