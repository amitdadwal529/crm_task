import { PRIVATE_ROUTES } from '@routes/routes';
import { generateRoute } from '@utils/utils';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getProductDetail } from '@redux/thunk/productThunk';
import Spinner from '@components/ui/loader/Spinner';
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';
import Back from '@components/ui/button/Back';

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState('details'); // State for active tab

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoMdStar key={`full-${i}`} className="text-yellow-500 inline text-lg" />);
    }

    if (halfStar) {
      stars.push(<IoMdStarHalf key="half" className="text-yellow-500 inline text-lg" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<IoMdStarOutline key={`empty-${i}`} className="text-yellow-500 inline text-lg" />);
    }

    return stars;
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const { productInfo, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [id, dispatch]);

  if (loading) return <Spinner />;

  return (
    <>
      <Back />
      <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <img src={productInfo?.thumbnail} alt={productInfo?.title} className="w-48 h-48 object-cover rounded-md" />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold text-gray-800">{productInfo?.title}</h2>
            <p className="text-md text-gray-500 mt-2">{productInfo?.description}</p>
            <p className="text-xl text-gray-900 font-semibold mt-2">${productInfo?.price}</p>
            <p className="text-sm text-gray-600 mt-1">
              {renderStars(productInfo?.rating)}
            </p>
            <div className="mt-4">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">{productInfo?.availabilityStatus}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex border-b border-gray-300">
          <button
            className={`py-2 px-4 text-md font-normal  ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`py-2 px-4 text-md font-normal  ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews & Ratings
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'details' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Brand</h3>
                  <p className="text-md text-gray-600 ">{productInfo?.brand}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">SKU</h3>
                  <p className="text-md text-gray-600 ">{productInfo?.sku}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Dimensions</h3>
                  <ul className="list-disc pl-6 text-md text-gray-600 ">
                    <li>Width: {productInfo?.dimensions?.width} cm</li>
                    <li>Height: {productInfo?.dimensions?.height} cm</li>
                    <li>Depth: {productInfo?.dimensions?.depth} cm</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Warranty Information</h3>
                  <p className="text-md text-gray-600 ">{productInfo?.warrantyInformation}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Shipping Information</h3>
                  <p className="text-md text-gray-600">{productInfo?.shippingInformation}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Return Policy</h3>
                  <p className="text-md text-gray-600">{productInfo?.returnPolicy}</p>
                </div>

                <div >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {productInfo?.tags?.map((tag, index) => (
                      <span key={index} className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

            </>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>
              <div className="mt-4">
                {productInfo?.reviews?.map((review, index) => (
                  <div key={index} className="bg-gray-100 shadow-xl rounded-xl p-2 mb-4">
                    <p className="font-medium text-lg">{review.reviewerName}</p>
                    <p className="text-gray-600">
                      {renderStars(review.rating)}
                    </p>
                    <p className="text-gray-800 mt-2 text-sm">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link
            to={generateRoute(PRIVATE_ROUTES.UPDATE_PRODUCT, { id: id })}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update Product
          </Link>
        </div>
      </div>
    </>

  );
};

export default ProductDetail;
