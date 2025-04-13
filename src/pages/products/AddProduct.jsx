import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  discountPercentage: yup
    .number()
    .typeError('Discount percentage must be a number')
    .required('Discount percentage is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating cannot be less than 0')
    .max(5, 'Rating cannot be more than 5')
    .required('Rating is required'),
  stock: yup.number().typeError('Stock must be a number').required('Stock is required'),
  tags: yup
    .string()
    .required('At least one tag is required'),
  brand: yup.string().required('Brand is required'),
  sku: yup.string().required('SKU is required'),
  weight: yup.number().typeError('Weight must be a number').required('Weight is required'),
  dimensions: yup.object().shape({
    width: yup.number().typeError('Width must be a number').required('Width is required'),
    height: yup.number().typeError('Height must be a number').required('Height is required'),
    depth: yup.number().typeError('Depth must be a number').required('Depth is required'),
  }),
  warrantyInformation: yup.string().required('Warranty information is required'),
  shippingInformation: yup.string().required('Shipping information is required'),
  availabilityStatus: yup.string().required('Availability status is required'),
  returnPolicy: yup.string().required('Return policy is required'),
  minimumOrderQuantity: yup
    .number()
    .typeError('Minimum order quantity must be a number')
    .required('Minimum order quantity is required'),
});

const AddProduct = () => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: '',
      discountPercentage: '',
      rating: '',
      stock: '',
      tags: '',
      brand: '',
      sku: '',
      weight: '',
      dimensions: { width: '', height: '', depth: '' },
      warrantyInformation: '',
      shippingInformation: '',
      availabilityStatus: '',
      returnPolicy: '',
      minimumOrderQuantity: '',
    },
  });

  // Called on form submit
  const onSubmit = (data) => {
    // Convert tags to an array; assumes tags are comma separated.
    data.tags = data.tags.split(',').map((tag) => tag.trim());
    // Convert string values for dimensions to numbers
    data.dimensions.width = Number(data.dimensions.width);
    data.dimensions.height = Number(data.dimensions.height);
    data.dimensions.depth = Number(data.dimensions.depth);

    // Log payload to console
    console.log('Payload:', JSON.stringify(data, null, 2));
    addProduct(data)
  };

  const addProduct = (data)=>{
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => console.log(res.json()) )
      .then(console.log);
    }


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            {...register('title')}
            className="input"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            {...register('category')}
            className="input"
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Price Field */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price')}
            className="input"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
        </div>

        {/* Discount Percentage Field */}
        <div>
          <label className="block text-sm font-medium">Discount Percentage</label>
          <input
            type="number"
            step="0.01"
            {...register('discountPercentage')}
            className="input"
          />
          {errors.discountPercentage && (
            <p className="text-red-500 text-xs mt-1">{errors.discountPercentage.message}</p>
          )}
        </div>

        {/* Rating Field */}
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <input
            type="number"
            step="0.01"
            {...register('rating')}
            className="input"
          />
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
          )}
        </div>

        {/* Stock Field */}
        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            {...register('stock')}
            className="input"
          />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
        </div>

        {/* Tags Field */}
        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input
            type="text"
            {...register('tags')}
            className="input"
          />
          {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>}
        </div>

        {/* Brand Field */}
        <div>
          <label className="block text-sm font-medium">Brand</label>
          <input
            type="text"
            {...register('brand')}
            className="input"
          />
          {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
        </div>

        {/* SKU Field */}
        <div>
          <label className="block text-sm font-medium">SKU</label>
          <input
            type="text"
            {...register('sku')}
            className="input"
          />
          {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>}
        </div>

        {/* Weight Field */}
        <div>
          <label className="block text-sm font-medium">Weight</label>
          <input
            type="number"
            step="0.1"
            {...register('weight')}
            className="input"
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
          )}
        </div>

        {/* Dimensions Fields */}
        <div>
          <h3 className="text-lg font-medium">Dimensions</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium">Width</label>
              <input
                type="number"
                step="0.1"
                {...register('dimensions.width')}
                className="input"
              />
              {errors.dimensions?.width && (
                <p className="text-red-500 text-xs mt-1">{errors.dimensions.width.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Height</label>
              <input
                type="number"
                step="0.1"
                {...register('dimensions.height')}
                className="input"
              />
              {errors.dimensions?.height && (
                <p className="text-red-500 text-xs mt-1">{errors.dimensions.height.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Depth</label>
              <input
                type="number"
                step="0.1"
                {...register('dimensions.depth')}
                className="input"
              />
              {errors.dimensions?.depth && (
                <p className="text-red-500 text-xs mt-1">{errors.dimensions.depth.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Warranty Information Field */}
        <div>
          <label className="block text-sm font-medium">Warranty Information</label>
          <input
            type="text"
            {...register('warrantyInformation')}
            className="input"
          />
          {errors.warrantyInformation && (
            <p className="text-red-500 text-xs mt-1">{errors.warrantyInformation.message}</p>
          )}
        </div>

        {/* Shipping Information Field */}
        <div>
          <label className="block text-sm font-medium">Shipping Information</label>
          <input
            type="text"
            {...register('shippingInformation')}
            className="input"
          />
          {errors.shippingInformation && (
            <p className="text-red-500 text-xs mt-1">{errors.shippingInformation.message}</p>
          )}
        </div>

        {/* Availability Status Field */}
        <div>
          <label className="block text-sm font-medium">Availability Status</label>
          <input
            type="text"
            {...register('availabilityStatus')}
            className="input"
          />
          {errors.availabilityStatus && (
            <p className="text-red-500 text-xs mt-1">{errors.availabilityStatus.message}</p>
          )}
        </div>

        {/* Return Policy Field */}
        <div>
          <label className="block text-sm font-medium">Return Policy</label>
          <input
            type="text"
            {...register('returnPolicy')}
            className="input"
          />
          {errors.returnPolicy && (
            <p className="text-red-500 text-xs mt-1">{errors.returnPolicy.message}</p>
          )}
        </div>

        {/* Minimum Order Quantity Field */}
        <div>
          <label className="block text-sm font-medium">Minimum Order Quantity</label>
          <input
            type="number"
            {...register('minimumOrderQuantity')}
            className="input"
          />
          {errors.minimumOrderQuantity && (
            <p className="text-red-500 text-xs mt-1">{errors.minimumOrderQuantity.message}</p>
          )}
        </div>

          {/* Description  */}
          <div className="md:col-span-2">
          <label className="block font-medium mb-1">Description</label>
          <textarea {...register('description')} className="input resize-none" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
