import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // navigate hook to redirect to other page and useParam to access paramas from route
import { useForm } from 'react-hook-form'; // hook from react hook form
import { yupResolver } from '@hookform/resolvers/yup'; // yup resolver function for validation
import { useDispatch, useSelector } from 'react-redux'; // dispatch hook to dispatch fucntion 
import { getProductDetail, updateProduct } from '@redux/thunk/productThunk';
import Spinner from '@components/ui/loader/Spinner';
import { productSchema, transformFormToProductData, transformProductToFormValues } from '@utils/formUtils';
import FormInput from '@components/ui/form/FormInput';
import FormTextarea from '@components/ui/form/FormTextArea';
import NumberInput from '@components/ui/form/NumberInput';
import DimensionFields from '@components/ui/form/DimensionFields';
import { PRIVATE_ROUTES } from '@routes/routes';
import { generateRoute } from '@utils/utils';
import Back from '@components/ui/button/Back';


const updateProductSchema = productSchema.omit([
  'sku',
]);

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productInfo, loading } = useSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProductSchema),
  });

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productInfo && Object.keys(productInfo).length > 0) {
      reset(transformProductToFormValues(productInfo))
    }
  }, [productInfo, reset]);

  const onSubmit = (data) => {
    const cleanedData = transformFormToProductData(data);
    try {
       dispatch(updateProduct({ id, data: cleanedData }));
      navigate(generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, { id }));
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
    <div className='flex  items-center '>
    <Back/>
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Product</h2>
    </div>


    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Title" name="title" register={register} error={errors.title} />
        <FormInput label="Category" name="category" register={register} error={errors.category} />
        <NumberInput label="Price" name="price" register={register} error={errors.price} />
        <NumberInput label="Discount %" name="discountPercentage" register={register} error={errors.discountPercentage} />
        <NumberInput label="Rating" name="rating" type="number" register={register} error={errors.rating} />
        <NumberInput label="Stock" name="stock" type="number" register={register} error={errors.stock} />
        <FormInput label="Tags (comma separated)" name="tags" register={register} error={errors.tags} />
        <FormInput label="Brand" name="brand" register={register} error={errors.brand} />
        <NumberInput label="Weight" name="weight" register={register} error={errors.weight} />

        {/* Dimensions Component */}
        <div className="md:col-span-2">
          <DimensionFields register={register} errors={errors} />
        </div>

        <FormInput label="Warranty Info" name="warrantyInformation" register={register} error={errors.warrantyInformation} />
        <FormInput label="Shipping Info" name="shippingInformation" register={register} error={errors.shippingInformation} />
        <FormInput label="Availability Status" name="availabilityStatus" register={register} error={errors.availabilityStatus} />
        <FormInput label="Return Policy" name="returnPolicy" register={register} error={errors.returnPolicy} />
        <NumberInput label="Minimum Order Qty" name="minimumOrderQuantity" register={register} error={errors.minimumOrderQuantity} />

        {/* Description */}
        <div className="md:col-span-2">
          <FormTextarea label="Description" name="description" register={register} error={errors.description} />
        </div>

        <div className="md:col-span-2 text-left">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>

    </>
  );
};

export default UpdateProduct;
