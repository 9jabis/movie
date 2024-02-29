import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

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
        setNowPlayingMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/upcoming',
          {
            params: {
              api_key: 'fd092d72824835fa7545060bb30323c9',
            },
          }
        );
        setUpcomingMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    fetchNowPlayingMovies();
    fetchUpcomingMovies();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <h2>Now Playing Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {nowPlayingMovies.map(movie => (
          <div key={movie.id} style={{ margin: '10px' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
      <h2>Upcoming Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {upcomingMovies.map(movie => (
          <div key={movie.id} style={{ margin: '10px' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
