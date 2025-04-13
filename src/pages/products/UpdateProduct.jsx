import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  price: yup.number().typeError('Must be a number').required('Price is required'),
  discountPercentage: yup.number().typeError('Must be a number').required('Discount is required'),
  brand: yup.string().required('Brand is required'),
  weight: yup.number().typeError('Must be a number').required('Weight is required'),
  dimensions: yup.object().shape({
    width: yup.number().typeError('Width must be a number').required('Width is required'),
    height: yup.number().typeError('Height must be a number').required('Height is required'),
    depth: yup.number().typeError('Depth must be a number').required('Depth is required'),
  }),
  warrantyInformation: yup.string().required('Warranty info required'),
  shippingInformation: yup.string().required('Shipping info required'),
  availabilityStatus: yup.string().required('Availability status required'),
  returnPolicy: yup.string().required('Return policy required'),
  minimumOrderQuantity: yup.number().typeError('Must be a number').required('Min order required'),
});

const UpdateProduct = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();

        reset({
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
          discountPercentage: data.discountPercentage,
          brand: data.brand,
          weight: data.weight,
          dimensions: {
            width: data.dimensions?.width || '',
            height: data.dimensions?.height || '',
            depth: data.dimensions?.depth || '',
          },
          warrantyInformation: data.warrantyInformation || '',
          shippingInformation: data.shippingInformation || '',
          availabilityStatus: data.availabilityStatus || '',
          returnPolicy: data.returnPolicy || '',
          minimumOrderQuantity: data.minimumOrderQuantity || '',
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id, reset]);

  const onSubmit = (data) => {
    data.dimensions.width = Number(data.dimensions.width);
    data.dimensions.height = Number(data.dimensions.height);
    data.dimensions.depth = Number(data.dimensions.depth);

    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((updated) => {
        console.log(updated);
        alert('Product updated successfully');
      })
      .catch((err) => {
        console.error(err);
        alert('Update failed');
      });
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input {...register('title')} className="input" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input {...register('category')} className="input" />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input type="number" {...register('price')} className="input" />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Discount */}
        <div>
          <label className="block font-medium mb-1">Discount %</label>
          <input type="number" {...register('discountPercentage')} className="input" />
          {errors.discountPercentage && (
            <p className="text-red-500 text-sm">{errors.discountPercentage.message}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label className="block font-medium mb-1">Brand</label>
          <input {...register('brand')} className="input" />
          {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
        </div>

        {/* Weight */}
        <div>
          <label className="block font-medium mb-1">Weight</label>
          <input type="number" {...register('weight')} className="input" />
          {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
        </div>

        {/* Dimensions */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Dimensions (W x H x D)</label>
          <div className="flex gap-4">
            <input placeholder="Width" type="number" {...register('dimensions.width')} className="input" />
            <input placeholder="Height" type="number" {...register('dimensions.height')} className="input" />
            <input placeholder="Depth" type="number" {...register('dimensions.depth')} className="input" />
          </div>
          {errors.dimensions?.width && (
            <p className="text-red-500 text-sm">{errors.dimensions.width.message}</p>
          )}
          {errors.dimensions?.height && (
            <p className="text-red-500 text-sm">{errors.dimensions.height.message}</p>
          )}
          {errors.dimensions?.depth && (
            <p className="text-red-500 text-sm">{errors.dimensions.depth.message}</p>
          )}
        </div>

        {/* Warranty */}
        <div>
          <label className="block font-medium mb-1">Warranty Info</label>
          <input {...register('warrantyInformation')} className="input" />
          {errors.warrantyInformation && (
            <p className="text-red-500 text-sm">{errors.warrantyInformation.message}</p>
          )}
        </div>

        {/* Shipping */}
        <div>
          <label className="block font-medium mb-1">Shipping Info</label>
          <input {...register('shippingInformation')} className="input" />
          {errors.shippingInformation && (
            <p className="text-red-500 text-sm">{errors.shippingInformation.message}</p>
          )}
        </div>

        {/* Availability */}
        <div>
          <label className="block font-medium mb-1">Availability Status</label>
          <input {...register('availabilityStatus')} className="input" />
          {errors.availabilityStatus && (
            <p className="text-red-500 text-sm">{errors.availabilityStatus.message}</p>
          )}
        </div>

        {/* Return Policy */}
        <div>
          <label className="block font-medium mb-1">Return Policy</label>
          <input {...register('returnPolicy')} className="input" />
          {errors.returnPolicy && (
            <p className="text-red-500 text-sm">{errors.returnPolicy.message}</p>
          )}
        </div>

        {/* MOQ */}
        <div>
          <label className="block font-medium mb-1">Minimum Order Qty</label>
          <input type="number" {...register('minimumOrderQuantity')} className="input" />
          {errors.minimumOrderQuantity && (
            <p className="text-red-500 text-sm">{errors.minimumOrderQuantity.message}</p>
          )}
        </div>

        {/* Description - Full Width */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Description</label>
          <textarea rows="4" {...register('description')} className="input resize-none" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
