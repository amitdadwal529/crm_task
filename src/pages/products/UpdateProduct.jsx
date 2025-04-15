import React, { useEffect } from 'react';

// navigate hook to redirect to other page and useParam to access paramas from route
import { useNavigate, useParams } from 'react-router-dom';

// hook from react hook form
import { useForm } from 'react-hook-form';

// yup resolver function for validation
import { yupResolver } from '@hookform/resolvers/yup';

// dispatch hook to dispatch fucntion 
import { useDispatch, useSelector } from 'react-redux';

// thunk functions to get product detail and update the product
import { getProductDetail, updateProduct } from '@redux/thunk/productThunk';

//UI components loader and Back button
import Spinner from '@components/ui/loader/Spinner';
import Back from '@components/ui/button/Back';
import FormInput from '@components/ui/form/FormInput';
import FormTextarea from '@components/ui/form/FormTextArea';
import NumberInput from '@components/ui/form/NumberInput';
import DimensionFields from '@components/ui/form/DimensionFields';

// utility function for form  and product schema
import { productSchema, transformFormToProductData, transformProductToFormValues } from '@utils/formUtils';

// Rount constant and utility function
import { PRIVATE_ROUTES } from '@routes/routes';
import { generateRoute } from '@utils/utils';


const UpdateProduct = () => {
  const { id } = useParams();  // get product ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productInfo, loading } = useSelector((state) => state.product); // access data from store 

  // form initializaton
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema), // validation schema
  });

  // get product detail
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  // add data in form once product data is available
  useEffect(() => {
    if (productInfo && Object.keys(productInfo).length > 0) {
      reset(transformProductToFormValues(productInfo))
    }
  }, [productInfo, reset]);

  // form submission 
  const onSubmit = async(data) => {
    const dataToSubmit = transformFormToProductData(data); // transform form data
    try {
      // Dispatch the thunk and unwrap the result of a thunk action and return either the resolved value or throw an error if the action fails.
  
      await dispatch(updateProduct({ id, data: dataToSubmit })).unwrap(); 

      // If successful, navigate to the product detail page
      navigate(generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, { id })); // Redirect to product detail page
    } catch (error) {
      console.error('Update failed:', error); // handle error
    }
  };

  // show loader while loading
  if (loading) return <Spinner />;

  return (
    <>
      {/* Header Section */}
      <div className='flex items-center'>
        <Back />
        <h2 className="text-2xl font-bold text-gray-800">Update Product</h2>
      </div>

      {/* Form Section */}
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Product Info */}
          <FormInput label="Title" name="title" register={register} error={errors.title} placeholder="Enter product title" />
          <FormInput label="Category" name="category" register={register} error={errors.category} placeholder="Enter product category" />
          <NumberInput label="Price ($)" name="price" register={register} error={errors.price} placeholder="Enter product price" />
          <NumberInput label="Discount %" name="discountPercentage" register={register} error={errors.discountPercentage} placeholder="Enter discount percentage" />
          <NumberInput label="Rating" name="rating" type="number" register={register} error={errors.rating} placeholder="Enter product rating" />
          <NumberInput label="Stock" name="stock" type="number" register={register} error={errors.stock} placeholder="Enter stock quantity" />
          <FormInput label="Tags (comma separated)" name="tags" register={register} error={errors.tags} placeholder="Enter tags, separated by commas" />
          <FormInput label="Brand" name="brand" register={register} error={errors.brand} placeholder="Enter product brand" />
            {/* SKU field */}
            <FormInput label="SKU" name="sku" placeholder="Enter SKU" register={register} error={errors.sku} />
          <NumberInput label="Weight (kg)" name="weight" register={register} error={errors.weight} placeholder="Enter product weight" />

          {/* Product Dimensions */}
          <div className="md:col-span-2">
            <DimensionFields register={register} errors={errors} />
          </div>

          {/* Additional Info */}
          <FormInput label="Warranty Info" name="warrantyInformation" register={register} error={errors.warrantyInformation} placeholder="Enter warranty information" />
          <FormInput label="Shipping Info" name="shippingInformation" register={register} error={errors.shippingInformation} placeholder="Enter shipping information" />
          <FormInput label="Availability Status" name="availabilityStatus" register={register} error={errors.availabilityStatus} placeholder='e.g., "In Stock", "Low Stock" or "Out of Stock "' />
          <FormInput label="Return Policy" name="returnPolicy" register={register} error={errors.returnPolicy} placeholder="Enter return policy" />
          <NumberInput label="Minimum Order Qty" name="minimumOrderQuantity" register={register} error={errors.minimumOrderQuantity} placeholder="Enter minimum order quantity" />

          {/* Description field */}
          <div className="md:col-span-2">
            <FormTextarea label="Description" name="description" register={register} error={errors.description} placeholder="Enter product description" />
          </div>

          {/* Submit button */}
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
