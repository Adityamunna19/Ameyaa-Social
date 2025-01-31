import React, { useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ravindra V",
    role: "Professional Singer",
    content:
      "The studio is an absolutely delightful space, exuding warmth and coziness that immediately makes you feel at ease upon entering. The atmosphere is welcoming, with soft lighting and a well-thought-out design that fosters a sense of relaxation and creativity. It is spacious yet intimate, with just the right balance of openness and comfort, making it an ideal environment for leisure.The ventilation in the studio is exceptional, ensuring a constant flow of fresh air that keeps the space cool and comfortable at all times. This contributes to an overall sense of well-being, allowing you to focus and enjoy your time without feeling stuffy or confined",
    rating: 5,
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjU0u3a8maqV6ht-X5sIMQ-IG2PHYK9Lr7PLV-tO2Wc7HnVQgEx-=w54-h54-p-rp-mo-br100",
  },
  {
    name: "Bharadwaj ",
    role: "Music Producer",
    content:
      "I recently had the pleasure of visiting this studio and was thoroughly impressed. The ambiance is perfect, cozy—well-ventilated and beautifully designed. The sound quality is outstanding, thanks to a top-notch music system making it the best in the city for karaoke singing.I also appreciate the owners for their commitment to a no-plastic policy and their dedication to sustainability and eco-friendliness.#highly recommended #eco-friendly #sound quality #greatambience#lovelyatmosphere #music #singing",
    rating: 5,
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjXRyUKY0Si-DwGzbYjUoZTZK_ztfVg6L5OFni0gjv1plUbSaxLIsA=w54-h54-p-rp-mo-br100",
  },
  {
    name: "Sri Varsha",
    role: "Band Member",
    content:
      "Studio was really well structured creates pleasent feeling while entering into it.. All arrangements were made in an Artistic way with nice ventilation and Lighting ..Sound system was really great🎤🎙️🎶 😃👍👍 ❤️❤️ Location is also near to main road .. peaceful environment ❤️❤️😃",
    rating: 5,
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjVKFqkTjCmczNTRzAyBMVcxSBo7KfPqM20PtbGPwf9o7a4FSr60Tg=w54-h54-p-rp-mo-br100",
  },
];

export function Reviews() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What our clients say
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col justify-between bg-white p-8 shadow-lg ring-1 ring-gray-200 rounded-2xl">
      <div>
        <div className="flex items-center gap-x-2 mb-4">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-[#FFC40C] text-[#FFC40C]" />
          ))}
        </div>
        <p className="text-lg leading-6 text-gray-900">
          {isExpanded
            ? review.content
            : `${review.content.substring(0, 150)}...`}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-500 hover:underline"
        >
          {isExpanded ? "Show Less" : "View Full Review"}
        </button>
      </div>
      <div className="mt-6 flex items-center">
        <img
          className="h-12 w-12 rounded-full"
          src={review.image}
          alt={review.name}
        />
        <div className="ml-4">
          <p className="text-base font-semibold leading-6 text-gray-900">
            {review.name}
          </p>
          <p className="text-sm leading-6 text-gray-600">{review.role}</p>
        </div>
      </div>
    </div>
  );
}
