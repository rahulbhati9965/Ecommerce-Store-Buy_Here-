// import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

// const Ratings = ({ value, text, color }) => {
//   const fullStars = Math.floor(value);
//   const halfStars = value - fullStars >= 0.5 ? 1 : 0;
//   const emptyStars = 5 - fullStars - halfStars;

//   return (
//     <div className="flex items-center">
//       {[...Array(fullStars)].map((_, index) => (
//         <FaStar key={index} className={`text-${color} ml-1`} />
//       ))}

//       {halfStars === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}
//       {[...Array(emptyStars)].map((_, index) => (
//         <FaRegStar key={index} className={`text-${color} ml-1`} />
//       ))}

//       <span className={`rating-text ml-[2rem] text-${color}`}>
//         {text && text}
//       </span>
//     </div>
//   );
// };

// export default Ratings;

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value = 0, text, color = "yellow-500" }) => {
  // Ensure value is a valid number and clamp it between 0 and 5
  const ratingValue = Math.min(Math.max(Number(value) || 0, 0), 5);

  const fullStars = Math.floor(ratingValue);
  const halfStars = ratingValue - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className={`text-${color} ml-1`} />
      ))}

      {/* Render half star if applicable */}
      {halfStars === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className={`text-${color} ml-1`} />
      ))}

      {/* Render optional text */}
      <span className={`rating-text ml-[2rem] text-${color}`}>
        {text && text}
      </span>
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};

export default Ratings;
