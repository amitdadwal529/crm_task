// Routes Paths and utility function to create dynamic routes
import { PRIVATE_ROUTES } from '@routes/routes';
import { generateRoute } from '@utils/utils';

// react hooks
import React, { useEffect, useState } from 'react';

// redux hooks to dispatch actions and reducers
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '@redux/thunk/productThunk';

// react router dom hook to access query aparams and link to redirect to other pages
import { useParams, Link } from 'react-router-dom';

// UI Components loader and back button
import Spinner from '@components/ui/loader/Spinner';
import Back from '@components/ui/button/Back';

// react icons
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';
import { placeholderThumbnailImage } from '@config/config';

// utility function
import { getStatusBadgeClass } from '@utils/productUtils';

// Helper function to render stars based on rating value

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


const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState('details'); // State to manage the active tab
  const { id } = useParams(); // get product id from url 
  const dispatch = useDispatch();
  const { productInfo, loading } = useSelector((state) => state.product); // Access product data and loading state from Redux

    // get product details when component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [id, dispatch]);

    // Show loader while data is being fetched
  if (loading) return <Spinner />;

  return (
    <>
    {/*  back button */}

      <Back />
      <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* Product overview section */}
        <div className="flex items-center mb-6">
          <img src={productInfo?.thumbnail?productInfo?.thumbnail:placeholderThumbnailImage} alt={productInfo?.title} className="w-48 h-48 object-cover rounded-md" />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold text-gray-800">{productInfo?.title}</h2>
            <p className="text-md text-gray-500 mt-2">{productInfo?.description}</p>
            <p className="text-xl text-gray-900 font-semibold mt-2">${productInfo?.price}</p>

            {/* Render rating stars */}
            <p className="text-sm text-gray-600 mt-1">
              {renderStars(productInfo?.rating)}
            </p>
            <div className="mt-4">
            <span
  className={` text-xs px-2 py-1 rounded-md ${getStatusBadgeClass(productInfo?.availabilityStatus)}`}
>
  {productInfo?.availabilityStatus || 'Unknown'}
</span>            </div>
          </div>
        </div>

       {/* Tabs for switching between details and reviews */}
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
             // Product reviews tab
             <div>
  <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>
  <div className="mt-4">
    {productInfo?.reviews && productInfo.reviews.length > 0 ? (
      productInfo.reviews.map((review, index) => (
        <div key={index} className="bg-gray-100 shadow-xl rounded-xl p-2 mb-4">
          <p className="font-medium text-lg">{review.reviewerName}</p>
          <p className="text-gray-600">
            {renderStars(review.rating)}
          </p>
          <p className="text-gray-800 mt-2 text-sm">{review.comment}</p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-sm italic">No reviews available.</p>
    )}
  </div>
</div>

          )}
        </div>

{/*  navigate to Update Product page */}
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
