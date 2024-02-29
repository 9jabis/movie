// MyPage 컴포넌트
import React from 'react';

function MyPage({ reservations, onCancelReservation }) {
//   // 예약 취소 함수
//   const handleCancelReservation = (reservations) => {
//     onCancelReservation(reservations); // 부모 컴포넌트로 예약 취소 요청 전달
//   };

  return (
    <div>
      <h1>My Page</h1>
      <h2>My Reservations</h2>
      <ul>
        {reservations.map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Directors:</strong> {movie.directors.join(', ')}</p>
            <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
           
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPage;
