import { useForm } from 'react-hook-form'; // hook from react hook from 
import { yupResolver } from '@hookform/resolvers/yup';  // yup resolver funtion from yup 
import { useDispatch, useSelector } from 'react-redux'; // redux hook to discppatch actions and use state from store 
import { addProduct } from '@redux/thunk/productThunk'; // thunk to add product
import Spinner from '@components/ui/loader/Spinner'; // loader 
import { productSchema, defaultProductValues } from '@utils/formUtils'; // yup validation schema for form 
import FormInput from '@components/ui/form/FormInput'; //  Input field compoennt for text inputs 
import FormTextarea from '@components/ui/form/FormTextArea'; // Text Area field compoennt for text inputs 
import DimensionFields from '@components/ui/form/DimensionFields'; // Component for dimension field
import NumberInput from '@components/ui/form/NumberInput'; // Input field component for number inputs
import { useNavigate } from 'react-router-dom'; // naviagte hook to redirect 
import { PRIVATE_ROUTES } from '@routes/routes'; // routes path for private pages
import Back from '@components/ui/button/Back';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);
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
  const onSubmit = (data) => {
    data.tags = data.tags.split(',').map((tag) => tag.trim());
    data.dimensions = {
      width: Number(data.dimensions.width),
      height: Number(data.dimensions.height),
      depth: Number(data.dimensions.depth),
    };
    dispatch(addProduct(data));
    navigate(PRIVATE_ROUTES.PRODUCTS);
  };


  return (
    <>
      {/* Loader */}
      {loading && <Spinner />}
      <div className='flex  items-center '>
        <Back />
        <h2 className="text-2xl font-bold ">Add Product</h2>
      </div>
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-6">

        {/* Form starts  */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Title field */}
          <FormInput label="Title" name="title" register={register} error={errors.title} />

          {/* Category field */}
          <FormInput label="Category" name="category" register={register} error={errors.category} />

          {/* price field */}
          <NumberInput label="Price" name="price" type="number" register={register} error={errors.price} />

          {/*Discount field  */}
          <NumberInput label="Discount %" name="discountPercentage" type="number" register={register} error={errors.discountPercentage} />

          {/* Rating field */}
          <NumberInput label="Rating" name="rating" type="number" register={register} error={errors.rating} />

          {/* Stock field  */}
          <NumberInput label="Stock" name="stock" type="number" register={register} error={errors.stock} />

          {/*Tags field  */}
          <FormInput label="Tags (comma separated)" name="tags" register={register} error={errors.tags} />

          {/* Brand field  */}
          <FormInput label="Brand" name="brand" register={register} error={errors.brand} />

          {/* SKU field */}
          <FormInput label="SKU" name="sku" register={register} error={errors.sku} />

          {/*Weight field  */}
          <NumberInput label="Weight" name="weight" type="number" register={register} error={errors.weight} />

          {/* Dimension Fields  */}
          <DimensionFields register={register} errors={errors} />

          {/* Warranty Info Field */}
          <FormInput label="Warranty Information" name="warrantyInformation" register={register} error={errors.warrantyInformation} />

          {/* Shipping feild  */}
          <FormInput label="Shipping Information" name="shippingInformation" register={register} error={errors.shippingInformation} />

          {/*Availability Status field  */}
          <FormInput label="Availability Status" name="availabilityStatus" register={register} error={errors.availabilityStatus} />

          {/*Return Policy feild  */}
          <FormInput label="Return Policy" name="returnPolicy" register={register} error={errors.returnPolicy} />

          {/*Min Order Quantity feild */}
          <NumberInput label="Min Order Quantity" name="minimumOrderQuantity" type="number" register={register} error={errors.minimumOrderQuantity} />

          {/*Description field  */}
          <div className="md:col-span-2">
            <FormTextarea label="Description" name="description" register={register} error={errors.description} />
          </div>

          {/* Submit button */}
          <div className="md:col-span-2 text-left">
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
