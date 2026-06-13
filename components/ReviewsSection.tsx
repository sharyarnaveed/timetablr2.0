"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  id: string;
  userName: string;
  userImage: string;
  date: string;
  score: number;
  text: string;
  url: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const json = await res.json();
        if (json.success && json.reviews?.data) {
          setReviews(json.reviews.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-card/30 border-y border-border/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-5"
          >
            Loved by students.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Don't just take our word for it. Here is what users on the Play Store are saying about Timetablr.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 9).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="bg-background p-6 rounded-3xl border border-border/50 shadow-sm flex flex-col hover:shadow-md transition-shadow hover:border-border cursor-default"
            >
              <div className="flex items-center gap-4 mb-4">
                {review.userImage ? (
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xl font-bold">{review.userName.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-foreground">{review.userName}</h4>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-3.5 h-3.5 ${index < review.score ? "fill-current" : "text-muted stroke-current"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed flex-1 text-sm italic line-clamp-4">
                "{review.text}"
              </p>
              <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground">
                <span>{new Date(review.date).toLocaleDateString()}</span>
                <a href={review.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Play Store
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
