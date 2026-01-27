import React, { useState, useEffect } from "react";
import { Star, Plus, User, X } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://zwtvmxqyqokomblothlo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dHZteHF5cW9rb21ibG90aGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjExMDYsImV4cCI6MjA4NDYzNzEwNn0.BMvG5uqJCaW4Wwgrxs4ZClGqHXhxr9Gmmt6NFZ-Md3Y";
const supabase = createClient(supabaseUrl, supabaseKey);

const ReviewComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Fetch reviews from Supabase
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("review")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3); // จำกัดให้แสดงแค่ 3 รายการล่าสุด

      if (error) throw error;

      setReviews(data || []);

      // Calculate average rating - ใช้ทุกรีวิวในการคำนวณ
      const { data: allReviews, error: countError } = await supabase
        .from("review")
        .select("rating");

      if (!countError && allReviews && allReviews.length > 0) {
        const avg =
          allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
        setAverageRating(avg);
        setTotalReviews(allReviews.length);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 ${
              star <= Math.floor(rating)
                ? "fill-yellow-500 text-yellow-500"
                : star - rating < 1
                  ? "fill-yellow-500 text-yellow-500 opacity-50"
                  : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      alert("กรุณาให้คะแนนดาว");
      return;
    }

    if (!reviewText.trim()) {
      alert("กรุณาเขียนความคิดเห็น");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("review")
        .insert([
          {
            rating: rating,
            comment: reviewText.trim(),
          },
        ])
        .select();

      if (error) throw error;

      // Success - show message
      alert("ส่งรีวิวสำเร็จ ขอบคุณสำหรับความคิดเห็น! 🎉");

      // Reset form and close popup
      setShowPopup(false);
      setRating(0);
      setHoverRating(0);
      setReviewText("");

      // Refresh reviews
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("เกิดข้อผิดพลาดในการส่งรีวิว กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="pt-[10rem] pb-[5rem] bg-[#387C6B] p-6 flex items-center justify-center" style={{flexDirection: 'column'}}>

        <div className="w-[70%] mx-auto">
       <div style={{width: '100%'}}>
          <h1 className="text-white align-left" style={{ fontSize: '150px'}}>Review</h1>
        </div>
        <div className="w-full  bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-white p-8 border-b border-gray-200">
            <h1 className="text-3xl text-gray-900">
              Review & Comments
            </h1>
          </div>

          {/* Rating Section */}
          <div className="bg-white p-12 text-center">
            <div className="text-9xl  text-teal-700 mb-4">
              {loading ? "..." : averageRating.toFixed(1)}
            </div>
            {renderStars(averageRating)}
            <p className="text-gray-400 mt-4 text-lg">
              ( {totalReviews} reviews )
            </p>
          </div>

          {/* Comments Section */}
          <div className="bg-white px-8 pb-8">
            <h2 className="text-2xl  text-gray-900 mb-6">
              Most Liked Comments
            </h2>

            {loading ? (
              <div className="text-center py-8 text-gray-500">
                กำลังโหลดรีวิว...
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                ยังไม่มีรีวิว
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-teal-600 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">
                          Anonymous User {review.id}
                        </span>
                        <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {new Date(review.created_at).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Review Button */}
            <button
              onClick={() => setShowPopup(true)}
              className="w-full mt-6 bg-[#387C6B] hover:bg-teal-800 text-white font-semibold py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-2 text-lg shadow-lg"
            >
              <Plus className="w-6 h-6" />
              Review
            </button>
          </div>
        </div>

        {/* Review Popup */}
        {showPopup && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPopup(false)}
          >
            <div
              className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Popup Header */}
              <div className="bg-gray-100 p-6 flex text-center items-center justify-center">
                <h2 className="text-2xl text-center text-gray-900">
                  Write Your Review
                </h2>
                {/* <button
                  onClick={() => {
                    setShowPopup(false);
                    setRating(0);
                    setHoverRating(0);
                    setReviewText("");
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button> */}
              </div>

              {/* Popup Content */}
              <div className="bg-gray-300 p-8">
                {/* Text Area */}
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write Your Review"
                  className="w-full h-64 bg-white rounded-3xl p-6 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-teal-600 border-2 border-gray-200"
                />

                {/* Star Rating */}
                <div className="flex justify-center gap-2 mt-4 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-16 h-16 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-gray-400 text-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {/* <p className="text-center text-gray-600 mb-8">
                  {rating > 0 ? `คุณให้ ${rating} ดาว` : "กรุณาเลือกคะแนน"}
                </p> */}

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || reviewText.trim() === ""}
                  className="w-full bg-[#387C6B] hover:bg-teal-800 text-white  py-4 px-6 rounded-full transition-colors text-xl shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
 
      </div>
      <Footer />
    </div>
  );
};

export default ReviewComponent;