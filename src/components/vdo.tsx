import React, { useRef, useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import vdo02 from "../assets/vdo/vdo.mp4";
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

const VDO = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
    fetchLatestReviews();
  }, []);

  const fetchLatestReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("review")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#387C6B]">
      {/* Review Section with Video and Comments */}
      <div className="w-full">
        <div className="py-8 md:py-12 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white">
                Review
              </h2>
            </div>

            {/* Main Content: Video Left + Reviews Right */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
              {/* Video Container - Left Side */}
              <div
                className="w-full lg:flex-1 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: "16/9" }}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  controls
                >
                  <source src={vdo02} type="video/mp4" />
                </video>
              </div>

              {/* Reviews Container - Right Side */}
              <div
                className="w-full lg:w-[400px] flex flex-col gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-white reviews-container"
                style={{
                  maxHeight: '480px',
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(128, 128, 128, 0.3) transparent",
                }}
              >
                {loading ? (
                  <div className="text-center text-gray-600 text-lg md:text-xl py-8">
                    กำลังโหลดรีวิว...
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center text-gray-600 text-lg md:text-xl py-8">
                    ยังไม่มีรีวิว
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-300 hover:border-gray-400 transition-colors"
                    >
                      <div className="flex items-start gap-2 md:gap-3 mb-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 block text-sm md:text-base">
                            User {review.id}
                          </span>
                          <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 md:w-4 md:h-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-300 text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                        {review.comment}
                      </p>

                      {/* แสดงรูปภาพ */}
                      {review.images && review.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-3 md:mt-4">
                          {review.images.map((imageUrl, idx) => (
                            <img
                              key={idx}
                              src={imageUrl}
                              alt={`Review image ${idx + 1}`}
                              className="w-full h-16 md:h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => window.open(imageUrl, "_blank")}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles for Webkit Scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .reviews-container::-webkit-scrollbar {
          width: 6px;
        }
        .reviews-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .reviews-container::-webkit-scrollbar-thumb {
          background: rgba(128, 128, 128, 0.3);
          border-radius: 3px;
        }
        .reviews-container::-webkit-scrollbar-thumb:hover {
          background: rgba(128, 128, 128, 0.5);
        }
        
        /* Mobile: Stack vertically */
        @media (max-width: 1023px) {
          .reviews-container {
            max-height: 400px !important;
          }
        }
      `,
        }}
      />
    </div>
  );
};

export default VDO;