import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, updateProduct } from '@redux/thunk/productThunk';
import Spinner from '@components/ui/loader/Spinner';

import FormInput from '@components/ui/form/FormInput';
import FormTextarea from '@components/ui/form/FormTextArea';
import NumberInput from '@components/ui/form/NumberInput';
import DimensionFields from '@components/ui/form/DimensionFields';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  price: yup.number().typeError('Must be a number').positive('Price must be positive').required('Price is required'),
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
  const dispatch = useDispatch();
  const { productInfo, loading } = useSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productInfo && Object.keys(productInfo).length > 0) {
      reset({
        title: productInfo.title || '',
        description: productInfo.description || '',
        category: productInfo.category || '',
        price: productInfo.price || '',
        discountPercentage: productInfo.discountPercentage || '',
        brand: productInfo.brand || '',
        weight: productInfo.weight || '',
        dimensions: {
          width: productInfo?.dimensions?.width || '',
          height: productInfo?.dimensions?.height || '',
          depth: productInfo?.dimensions?.depth || '',
        },
        warrantyInformation: productInfo.warrantyInformation || '',
        shippingInformation: productInfo.shippingInformation || '',
        availabilityStatus: productInfo.availabilityStatus || '',
        returnPolicy: productInfo.returnPolicy || '',
        minimumOrderQuantity: productInfo.minimumOrderQuantity || '',
      });
    }
  }, [productInfo, reset]);

  const onSubmit = (data) => {
    data.dimensions.width = Number(data.dimensions.width);
    data.dimensions.height = Number(data.dimensions.height);
    data.dimensions.depth = Number(data.dimensions.depth);

    dispatch(updateProduct({ id: id, data: data }));
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Title" name="title" register={register} error={errors.title} />
        <FormInput label="Category" name="category" register={register} error={errors.category} />
        <NumberInput label="Price" name="price" register={register} error={errors.price} />
        <NumberInput label="Discount %" name="discountPercentage" register={register} error={errors.discountPercentage} />
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

        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 opacity-100 text-white p-3 mt-3 rounded-md hover:opacity-90 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
