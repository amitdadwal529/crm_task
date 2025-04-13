import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addProduct } from '@redux/thunk/productThunk';
import Spinner from '@components/ui/loader/Spinner';
import { productSchema, defaultProductValues } from '@utils/formUtils';
import FormInput from '@components/ui/form/FormInput';
import FormTextarea from '@components/ui/form/FormTextArea';
import DimensionFields from '@components/ui/form/DimensionFields';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: defaultProductValues,
  });

  const onSubmit = (data) => {
    data.tags = data.tags.split(',').map((tag) => tag.trim());
    data.dimensions = {
      width: Number(data.dimensions.width),
      height: Number(data.dimensions.height),
      depth: Number(data.dimensions.depth),
    };
    dispatch(addProduct(data));
  };

  useEffect(() => {
    if (success) reset();
  }, [success, reset]);

  return (
    <>
     {loading && <Spinner />}
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
     
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Title" name="title" register={register} error={errors.title} />
        <FormInput label="Category" name="category" register={register} error={errors.category} />
        <FormInput label="Price" name="price" type="number" register={register} error={errors.price} />
        <FormInput label="Discount %" name="discountPercentage" type="number" register={register} error={errors.discountPercentage} />
        <FormInput label="Rating" name="rating" type="number" register={register} error={errors.rating} />
        <FormInput label="Stock" name="stock" type="number" register={register} error={errors.stock} />
        <FormInput label="Tags (comma separated)" name="tags" register={register} error={errors.tags} />
        <FormInput label="Brand" name="brand" register={register} error={errors.brand} />
        <FormInput label="SKU" name="sku" register={register} error={errors.sku} />
        <FormInput label="Weight" name="weight" type="number" register={register} error={errors.weight} />
        <DimensionFields register={register} errors={errors} />
        <FormInput label="Warranty Information" name="warrantyInformation" register={register} error={errors.warrantyInformation} />
        <FormInput label="Shipping Information" name="shippingInformation" register={register} error={errors.shippingInformation} />
        <FormInput label="Availability Status" name="availabilityStatus" register={register} error={errors.availabilityStatus} />
        <FormInput label="Return Policy" name="returnPolicy" register={register} error={errors.returnPolicy} />
        <FormInput label="Min Order Quantity" name="minimumOrderQuantity" type="number" register={register} error={errors.minimumOrderQuantity} />
        <div className="md:col-span-2">
          <FormTextarea label="Description" name="description" register={register} error={errors.description} />
        </div>
        <div className="md:col-span-2 text-right">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 mt-3 rounded-md">
            Submit
          </button>
        </div>
      </form>
      </div>
    </>
  );
};

export default AddProduct;
