import React from "react";

const MovieCard = ({ movie, onToggleFavorite, isFavorite, onViewDetails }) => {
  const fallbackPoster = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"><rect width="500" height="750" fill="#1f2937"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="#e5e7eb" font-family="Arial, sans-serif" font-size="36">No Poster</text><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="22">Image unavailable</text></svg>`,
  )}`;

  const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value || "");
  const posterUrl = movie.poster_url
    ? movie.poster_url
    : movie.poster_path
      ? isAbsoluteUrl(movie.poster_path)
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : fallbackPoster;

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-lg">
      {/* Poster */}
      <img
        className="w-full h-96 object-cover group-hover:scale-110 duration-300"
        src={posterUrl}
        alt={movie.title}
        onError={(event) => {
          event.currentTarget.src = fallbackPoster;
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 duration-300 flex flex-col justify-center items-center text-center p-4">
        <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
        <p className="text-gray-300 mb-4">
          {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
        </p>
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onViewDetails(movie.id)}
          >
            Details
          </button>
          <button
            onClick={() => onToggleFavorite(movie)}
            className={`btn btn-sm ${
              isFavorite ? "btn-error" : "btn-secondary"
            }`}
          >
            {isFavorite ? "Remove" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
