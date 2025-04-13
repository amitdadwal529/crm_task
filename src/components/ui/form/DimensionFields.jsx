const DimensionFields = ({ register, errors }) => (
  <div>
    {/* Section Title */}
    <h3 className="text-lg font-medium">Dimensions (cm)</h3>
    
    {/* Grid layout for input fields */}
    <div className="grid grid-cols-3 gap-2">
      {/* Mapping over the array of dimension names */}
      {['width', 'height', 'depth'].map((dim) => (
        <div key={dim}>
          {/* Label for each dimension input */}
          <label className="block text-sm font-medium">
            {dim.charAt(0).toUpperCase() + dim.slice(1)} {/* Capitalizing the first letter of the dimension */}
          </label>
          
          {/* Number input field for dimension, with a step of 0.001 */}
          <input
            type="number"
            step="0.001" // Defining the decimal precision for the input
            {...register(`dimensions.${dim}`)} // Registering input for form handling
            className="input" // Applying custom styling
          />
          
          {/* Displaying error message if there is any validation error */}
          {errors?.dimensions?.[dim] && (
            <p className="text-red-500 text-xs mt-1">{errors.dimensions[dim].message}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default DimensionFields;
