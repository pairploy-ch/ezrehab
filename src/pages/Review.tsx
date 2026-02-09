import React, { useState, useEffect, ChangeEvent } from "react";
import { Star, Plus, User, X, Image as ImageIcon, Trash2 } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://zwtvmxqyqokomblothlo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dHZteHF5cW9rb21ibG90aGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjExMDYsImV4cCI6MjA4NDYzNzEwNn0.BMvG5uqJCaW4Wwgrxs4ZClGqHXhxr9Gmmt6NFZ-Md3Y";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Review {
  id: number;
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
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw uploadError;
      }

    
      const { data } = supabase.storage
        .from('review-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const renderStars = (rating: number) => {
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
      setUploading(true);

  
      const imageUrls = await uploadImages();

  
      const { data, error } = await supabase
        .from("review")
        .insert([
          {
            rating: rating,
            comment: reviewText.trim(),
            images: imageUrls.length > 0 ? imageUrls : null,
          },
        ])
        .select();

      if (error) throw error;

      

  
      setShowPopup(false);
      setRating(0);
      setHoverRating(0);
      setReviewText("");
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
              Latest Comments
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
                    
                    {/* แสดงรูปภาพ */}
                    {review.images && review.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {review.images.map((imageUrl, idx) => (
                          <img
                            key={idx}
                            src={imageUrl}
                            alt={`Review image ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => window.open(imageUrl, '_blank')}
                          />
                        ))}
                      </div>
                    )}
                    
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
              className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Popup Header */}
              <div className="bg-gray-100 p-6 flex text-center items-center justify-center">
                <h2 className="text-2xl text-center text-gray-900">
                  Write Your Review
                </h2>
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

                {/* Image Upload Section */}
                <div className="mt-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    เพิ่มรูปภาพ (สูงสุด 5 รูป)
                  </label>
                  
                  {/* Image Preview */}
                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  {selectedImages.length < 5 && (
                    <label className="cursor-pointer">
                      <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-teal-600 transition-colors">
                        <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">
                          คลิกเพื่อเลือกรูปภาพ ({selectedImages.length}/5)
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
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
                <div className="flex justify-center gap-2 mt-6 mb-4">
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

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || reviewText.trim() === "" || uploading}
                  className="w-full bg-[#387C6B] hover:bg-teal-800 text-white  py-4 px-6 rounded-full transition-colors text-xl shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {uploading ? "กำลังอัปโหลด..." : "Share"}
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