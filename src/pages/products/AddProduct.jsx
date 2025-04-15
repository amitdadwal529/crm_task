import { useForm, FormProvider } from 'react-hook-form'; // hook from react hook form 
import { yupResolver } from '@hookform/resolvers/yup';  // yup resolver function from yup 
import { useDispatch, useSelector } from 'react-redux'; // redux hook to dispatch actions and use state from store 
import { addProduct } from '@redux/thunk/productThunk'; // thunk to add product
import Spinner from '@components/ui/loader/Spinner'; // loader 
import { productSchema, defaultProductValues } from '@utils/formUtils'; // yup validation schema for form 
import FormInput from '@components/ui/form/FormInput'; //  Input field component for text inputs 
import FormTextarea from '@components/ui/form/FormTextArea'; // Text Area field component for text inputs 
import DimensionFields from '@components/ui/form/DimensionFields'; // Component for dimension field
import NumberInput from '@components/ui/form/NumberInput'; // Input field component for number inputs
import { useNavigate } from 'react-router-dom'; // navigate hook to redirect 
import { PRIVATE_ROUTES } from '@routes/routes'; // routes path for private pages
import Back from '@components/ui/button/Back';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading} = useSelector((state) => state.product);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: defaultProductValues,
  });

  // Submit function 
  const onSubmit = async (data) => {
    data.tags = data.tags.split(',').map((tag) => tag.trim());
    data.dimensions = {
      width: Number(data.dimensions.width),
      height: Number(data.dimensions.height),
      depth: Number(data.dimensions.depth),
    };
    try {
      // Dispatch the thunk and unwrap the result of a thunk action and return either the resolved value or throw an error if the action fails.
      await dispatch(addProduct(data)).unwrap();

      // If successful, navigate to the product list page
      navigate(PRIVATE_ROUTES.PRODUCTS);
    } catch (error) {
      console.error('Product creation failed:', error); // handle error
    }
  };

  if (loading) return <Spinner />;
  
  return (
    <>
      <div className='flex items-center'>
        <Back />
        <h2 className="text-2xl font-bold">Add Product</h2>
      </div>
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-6">

        {/* Form starts */}
        <FormProvider >

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Title field */}
          <FormInput label="Title" name="title" placeholder="Enter product title" register={register} error={errors.title} />

          {/* Category field */}
          <FormInput label="Category" name="category" placeholder="Enter product category" register={register} error={errors.category} />

          {/* Price field */}
          <NumberInput label="Price ($)" name="price" type="number" placeholder="Enter product price" register={register} error={errors.price} />

          {/* Discount field */}
          <NumberInput label="Discount %" name="discountPercentage" type="number" placeholder="Enter discount percentage" register={register} error={errors.discountPercentage} />

          {/* Rating field */}
          <NumberInput label="Rating" name="rating" type="number" placeholder="Enter product rating" register={register} error={errors.rating} />

          {/* Stock field */}
          <NumberInput label="Stock" name="stock" type="number" placeholder="Enter stock quantity" register={register} error={errors.stock} />

          {/* Tags field */}
          <FormInput label="Tags (comma separated)" name="tags" placeholder="Enter tags separated by commas" register={register} error={errors.tags} />

          {/* Brand field */}
          <FormInput label="Brand" name="brand" placeholder="Enter product brand" register={register} error={errors.brand} />

          {/* SKU field */}
          <FormInput label="SKU" name="sku" placeholder="Enter SKU" register={register} error={errors.sku} />

          {/* Weight field */}
          <NumberInput label="Weight (kg)" name="weight" type="number" placeholder="Enter product weight" register={register} error={errors.weight} />

          {/* Dimension Fields */}
          <DimensionFields register={register} errors={errors} />

          {/* Warranty Info Field */}
          <FormInput label="Warranty Information" name="warrantyInformation" placeholder="Enter warranty information" register={register} error={errors.warrantyInformation} />

          {/* Shipping field */}
          <FormInput label="Shipping Information" name="shippingInformation" placeholder="Enter shipping information" register={register} error={errors.shippingInformation} />

          {/* Availability Status field */}
          <FormInput label="Availability Status" name="availabilityStatus" placeholder='e.g., "In Stock", "Low Stock" or "Out of Stock "' register={register} error={errors.availabilityStatus} />

          {/* Return Policy field */}
          <FormInput label="Return Policy" name="returnPolicy" placeholder="Enter return policy" register={register} error={errors.returnPolicy} />

          {/* Min Order Quantity field */}
          <NumberInput label="Min Order Quantity" name="minimumOrderQuantity" type="number" placeholder="Enter minimum order quantity" register={register} error={errors.minimumOrderQuantity} />

          {/* Description field */}
          <div className="md:col-span-2">
            <FormTextarea label="Description" name="description" placeholder="Enter product description" register={register} error={errors.description} />
          </div>

          <div className="md:col-span-2 text-left">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 mt-3 rounded-md">
              Submit
            </button>
          </div>
        </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddProduct;
