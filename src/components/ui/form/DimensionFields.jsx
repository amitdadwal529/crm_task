const DimensionFields = ({ register, errors }) => (
    <div>
      <h3 className="text-lg font-medium">Dimensions</h3>
      <div className="grid grid-cols-3 gap-2">
        {['width', 'height', 'depth'].map((dim) => (
          <div key={dim}>
            <label className="block text-sm font-medium">{dim.charAt(0).toUpperCase() + dim.slice(1)}</label>
            <input
              type="number"
              step="0.001"
              {...register(`dimensions.${dim}`)}
              className="input"
            />
            {errors?.dimensions?.[dim] && (
              <p className="text-red-500 text-xs mt-1">{errors.dimensions[dim].message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  export default DimensionFields;
  