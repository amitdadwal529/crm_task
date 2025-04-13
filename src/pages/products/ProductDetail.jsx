import { PRIVATE_ROUTES } from '@routes/routes';
import { generateRoute } from '@utils/utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getProductDetail } from '@redux/thunk/productThunk';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productInfo, loading } = useSelector((state) => state.product);
  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [id, dispatch]);
  console.log(productInfo, "product info")

  // Loading state
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <div className="flex items-center mb-6">
        <img src={productInfo?.thumbnail} alt={productInfo?.title} className="w-48 h-48 object-cover rounded-md" />
        <div className="ml-6">
          <h2 className="text-3xl font-semibold text-gray-800">{productInfo?.title}</h2>
          <p className="text-lg text-gray-600">{productInfo?.category}</p>
          <p className="text-xl text-gray-900 font-semibold mt-2">${productInfo?.price}</p>
          <p className="text-sm text-gray-600 mt-1">
            Rating: <span className="font-semibold">{productInfo?.rating}</span> | Stock: {productInfo?.stock}
          </p>
          <div className="mt-4">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">{productInfo?.availabilityStatus}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Description</h3>
        <p className="text-lg text-gray-600 mt-2">{productInfo?.description}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Brand</h3>
          <p className="text-lg text-gray-600 mt-2">{productInfo?.brand}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">SKU</h3>
          <p className="text-lg text-gray-600 mt-2">{productInfo?.sku}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Dimensions</h3>
        <ul className="list-disc pl-6 text-lg text-gray-600 mt-2">
          <li>Width: {productInfo?.dimensions?.width} cm</li>
          <li>Height: {productInfo?.dimensions?.height} cm</li>
          <li>Depth: {productInfo?.dimensions?.depth} cm</li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Warranty Information</h3>
        <p className="text-lg text-gray-600 mt-2">{productInfo?.warrantyInformation}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Shipping Information</h3>
        <p className="text-lg text-gray-600 mt-2">{productInfo?.shippingInformation}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Return Policy</h3>
        <p className="text-lg text-gray-600 mt-2">{productInfo?.returnPolicy}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Tags</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {productInfo?.tags?.map((tag, index) => (
            <span key={index} className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">{tag}</span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>
        <div className="mt-4">
          {productInfo?.reviews?.map((review, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <p className="font-semibold text-lg">{review.reviewerName}</p>
              <p className="text-gray-600">Rating: {review.rating}</p>
              <p className="text-gray-800 mt-2">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Link
            to={generateRoute(PRIVATE_ROUTES.UPDATE_PRODUCT, { id:id})}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Update Product
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
