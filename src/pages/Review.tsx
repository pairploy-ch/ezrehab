import React, { useState, useEffect, ChangeEvent } from "react";
import { Star, Plus, User, Image as ImageIcon, Trash2 } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zwtvmxqyqokomblothlo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dHZteHF5cW9rb21ibG90aGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjExMDYsImV4cCI6MjA4NDYzNzEwNn0.BMvG5uqJCaW4Wwgrxs4ZClGqHXhxr9Gmmt6NFZ-Md3Y";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Review {
  id: number;
  name?: string;
  rating: number;
  comment: string;
  images?: string[];
  created_at: string;
}

const ReviewComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

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
        .limit(3);

      if (error) throw error;
      setReviews(data || []);

      const { data: allReviews, error: countError } = await supabase
        .from("review")
        .select("rating");

      if (!countError && allReviews && allReviews.length > 0) {
        const avg =
          allReviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / allReviews.length;
        setAverageRating(avg);
        setTotalReviews(allReviews.length);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    if (selectedImages.length + fileArray.length > 5) {
      alert("สามารถอัปโหลดรูปได้สูงสุด 5 รูปเท่านั้น");
      return;
    }

    const validFiles = fileArray.filter((file: File) => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} ไม่ใช่ไฟล์รูปภาพ`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} มีขนาดใหญ่เกิน 5MB`);
        return false;
      }
      return true;
    });

    setSelectedImages([...selectedImages, ...validFiles]);

    validFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setImagePreview(imagePreview.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];
    const uploadedUrls: string[] = [];

    for (const file of selectedImages) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('review-images').getPublicUrl(fileName);
      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const renderStars = (rating: number) => (
    <div className="flex justify-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 sm:w-8 sm:h-8 ${
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

  const handleSubmitReview = async () => {
    if (!userName.trim()) { alert("กรุณาใส่ชื่อของคุณ"); return; }
    if (rating === 0) { alert("กรุณาให้คะแนนดาว"); return; }
    if (!reviewText.trim()) { alert("กรุณาเขียนความคิดเห็น"); return; }

    try {
      setUploading(true);
      const imageUrls = await uploadImages();

      const { error } = await supabase
        .from("review")
        .insert([{
          name: userName.trim(),
          rating,
          comment: reviewText.trim(),
          images: imageUrls.length > 0 ? imageUrls : null,
        }])
        .select();

      if (error) throw error;

      setShowPopup(false);
      setRating(0);
      setHoverRating(0);
      setReviewText("");
      setUserName("");
      setSelectedImages([]);
      setImagePreview([]);
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="pt-24 sm:pt-36 pb-12 sm:pb-20 bg-[#387C6B] px-4 sm:px-6 flex flex-col items-center">

        {/* Title */}
        <div className="w-full max-w-3xl">
          <h1 className="text-white text-6xl sm:text-8xl lg:text-[120px] font-medium leading-none mb-6 sm:mb-8">
            Review
          </h1>
        </div>

        {/* Card */}
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h1 className="text-xl sm:text-3xl text-gray-900">Review & Comments</h1>
          </div>

          {/* Rating Section */}
          <div className="py-8 sm:py-12 px-6 text-center">
            <div className="text-7xl sm:text-9xl text-teal-700 mb-4">
              {loading ? "..." : averageRating.toFixed(1)}
            </div>
            {renderStars(averageRating)}
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              ( {totalReviews} reviews )
            </p>
          </div>

          {/* Comments Section */}
          <div className="px-4 sm:px-8 pb-6 sm:pb-8">
            <h2 className="text-xl sm:text-2xl text-gray-900 mb-4 sm:mb-6">Latest Comments</h2>

            {loading ? (
              <div className="text-center py-8 text-gray-500">กำลังโหลดรีวิว...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">ยังไม่มีรีวิว</div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-2 border-gray-200 rounded-2xl p-4 sm:p-6 hover:border-teal-600 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">
                          {review.name || "Anonymous User"}
                        </span>
                        <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                star <= review.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {review.comment}
                    </p>

                    {review.images && review.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {review.images.map((imageUrl, idx) => (
                          <img
                            key={idx}
                            src={imageUrl}
                            alt={`Review image ${idx + 1}`}
                            className="w-full h-24 sm:h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => window.open(imageUrl, '_blank')}
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-gray-400 text-xs sm:text-sm mt-2">
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
              className="w-full mt-6 bg-[#387C6B] hover:bg-teal-800 text-white font-semibold py-3 sm:py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-2 text-base sm:text-lg shadow-lg"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
              Review
            </button>
          </div>
        </div>
      </div>

      {/* Review Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-xl sm:max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popup Header */}
            <div className="bg-gray-100 p-4 sm:p-6 text-center">
              <h2 className="text-xl sm:text-2xl text-gray-900">Write Your Review</h2>
            </div>

            {/* Popup Content */}
            <div className="bg-gray-300 p-4 sm:p-8">

              {/* Name Input */}
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="ชื่อของคุณ"
                className="w-full bg-white rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 border-2 border-gray-200 mb-3 sm:mb-4 text-sm sm:text-base"
              />

              {/* Text Area */}
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write Your Review"
                className="w-full h-36 sm:h-64 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-teal-600 border-2 border-gray-200 text-sm sm:text-base"
              />

              {/* Image Upload */}
              <div className="mt-3 sm:mt-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  เพิ่มรูปภาพ (สูงสุด 5 รูป)
                </label>

                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-14 sm:h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 sm:p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {selectedImages.length < 5 && (
                  <label className="cursor-pointer">
                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 sm:p-6 text-center hover:border-teal-600 transition-colors">
                      <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600 text-sm sm:text-base">
                        คลิกเพื่อเลือกรูปภาพ ({selectedImages.length}/5)
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm mt-1">
                        รองรับ JPG, PNG, GIF (สูงสุด 5MB ต่อรูป)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-1 sm:gap-2 mt-5 sm:mt-6 mb-3 sm:mb-4">
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
                      className={`w-10 h-10 sm:w-16 sm:h-16 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "fill-gray-400 text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleSubmitReview}
                disabled={!userName.trim() || rating === 0 || reviewText.trim() === "" || uploading}
                className="w-full bg-[#387C6B] hover:bg-teal-800 text-white py-3 sm:py-4 px-6 rounded-full transition-colors text-base sm:text-xl shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {uploading ? "กำลังอัปโหลด..." : "Share"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ReviewComponent;