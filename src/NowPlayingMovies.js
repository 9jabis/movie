import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NowPlayingMovies({ onReservation }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing',
          {
            params: {
              api_key: 'fd092d72824835fa7545060bb30323c9',
            },
          }
        );
        const nowPlayingMovies = response.data.results;
        setMovies(nowPlayingMovies);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  const handleClick = async (movieId) => {
    try {
      const [detailsResponse, creditsResponse] = await axios.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: 'fd092d72824835fa7545060bb30323c9',
          },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          params: {
            api_key: 'fd092d72824835fa7545060bb30323c9',
          },
        }),
      ]);

      const movieDetails = detailsResponse.data;
      const credits = creditsResponse.data;

      setSelectedMovie({
        ...movieDetails,
        directors: credits.crew.filter(person => person.job === 'Director').map(director => director.name),
        cast: credits.cast.slice(0, 3).map(actor => actor.name), // 상위 3명의 출연진만 가져옴
      });
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleReservation = () => {
    if (selectedMovie) {
      onReservation(selectedMovie); // 예약 정보를 부모 컴포넌트로 전달
      setSelectedMovie(null);
    }
  };

  return (
    <div>
      <h1>Now Playing Movies</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map(movie => (
          <div key={movie.id} style={{ margin: '10px', cursor: 'pointer' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              onClick={() => handleClick(movie.id)}
            />
            <p style={{ textAlign: 'center', marginTop: '5px' }}>{movie.title}</p>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="modal" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999}}>
          <div className="modal-content" style={{position: 'relative', margin: '100px auto', padding: '20px', width: '60%', backgroundColor: '#fff'}}>
            <span className="close" onClick={() => setSelectedMovie(null)}>&times;</span>
            <h2>{selectedMovie.title}</h2>
            <p><strong>Genres:</strong> {selectedMovie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Directors:</strong> {selectedMovie.directors.join(', ')}</p>
            <p><strong>Cast:</strong> {selectedMovie.cast.join(', ')}</p>
            <p><strong>Overview:</strong> {selectedMovie.overview}</p>
            <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
            <img
              src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <button onClick={handleReservation}>예약</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NowPlayingMovies;
