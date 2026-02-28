import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const Reviews = ({ productId, reviews = [] }) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
    pros: '',
    cons: ''
  });
  const [sortBy, setSortBy] = useState('most_recent');
  const [filterRating, setFilterRating] = useState('all');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
      : 0
  }));

  const filteredAndSortedReviews = reviews
    .filter(review => filterRating === 'all' || review.rating === parseInt(filterRating))
    .sort((a, b) => {
      switch (sortBy) {
        case 'most_recent':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest_rating':
          return b.rating - a.rating;
        case 'lowest_rating':
          return a.rating - b.rating;
        case 'most_helpful':
          return (b.helpful || 0) - (a.helpful || 0);
        default:
          return 0;
      }
    });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.title.trim() || !newReview.content.trim()) {
      return;
    }
    // In a real app, this would submit to an API
    console.log('Submitting review:', newReview);
    setNewReview({
      rating: 5,
      title: '',
      content: '',
      pros: '',
      cons: ''
    });
    setShowWriteReview(false);
  };

  const handleHelpfulVote = (reviewId, isHelpful) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: isHelpful
    }));
  };

  const renderStars = (rating, size = 'small') => {
    const sizeClass = size === 'small' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClass} ${
              i < rating ? 'fill-current text-yellow-400' : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Write a Review
        </button>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}</div>
          {renderStars(Math.round(averageRating), 'large')}
          <div className="text-gray-600 mt-2">{reviews.length} Reviews</div>
        </div>
        
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-16">
                <span className="text-sm">{rating}</span>
                <Star className="h-4 w-4 fill-current text-yellow-400" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 w-12 text-right">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="border-t pt-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({...newReview, rating})}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= newReview.rating
                          ? 'fill-current text-yellow-400'
                          : 'fill-gray-300 text-gray-300'
                      } hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
              <textarea
                value={newReview.content}
                onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Share your experience with this product"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pros (Optional)</label>
                <textarea
                  value={newReview.pros}
                  onChange={(e) => setNewReview({...newReview, pros: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="What did you like?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cons (Optional)</label>
                <textarea
                  value={newReview.cons}
                  onChange={(e) => setNewReview({...newReview, cons: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="What could be improved?"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowWriteReview(false)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter:</span>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stars</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="most_recent">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="highest_rating">Highest Rating</option>
              <option value="lowest_rating">Lowest Rating</option>
              <option value="most_helpful">Most Helpful</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          {filteredAndSortedReviews.length} of {reviews.length} reviews
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {review.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{review.name}</div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {renderStars(review.rating)}
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                    {review.verified && (
                      <span className="text-green-600 font-medium">Verified Purchase</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
              <p className="text-gray-700">{review.content}</p>
            </div>

            {(review.pros || review.cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {review.pros && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-green-800 mb-1">Pros:</div>
                    <div className="text-sm text-green-700">{review.pros}</div>
                  </div>
                )}
                {review.cons && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-red-800 mb-1">Cons:</div>
                    <div className="text-sm text-red-700">{review.cons}</div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Was this helpful?</span>
                <button
                  onClick={() => handleHelpfulVote(review.id, true)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
                    helpfulVotes[review.id] === true
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Yes ({review.helpful || 0})</span>
                </button>
                <button
                  onClick={() => handleHelpfulVote(review.id, false)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
                    helpfulVotes[review.id] === false
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>No ({review.notHelpful || 0})</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredAndSortedReviews.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">No reviews found matching your criteria.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
