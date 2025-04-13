const FormTextarea = ({ label, error, register, name, placeholder }) => (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <textarea {...register(name)} className="input resize-none" placeholder={placeholder} />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
  export default FormTextarea;
  