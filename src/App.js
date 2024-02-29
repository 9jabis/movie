import React, { useState } from 'react';
import NowPlayingMovies from './NowPlayingMovies';
import UpcomingMovies from './UpcomingMovies';
import MyPage from './MyPage';
import Home from './Home';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [reservations, setReservations] = useState([]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleReservation = (movie) => {
    setReservations([...reservations, movie]);
  };

  return (
    <div>
      <div>
        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}>
          <li style={{ margin: '10px', cursor: 'pointer' }} onClick={() => handleMenuClick('home')}>
            Home
          </li>
          <li style={{ margin: '10px', cursor: 'pointer' }} onClick={() => handleMenuClick('now_playing')}>
            Now Playing Movies
          </li>
          <li style={{ margin: '10px', cursor: 'pointer' }} onClick={() => handleMenuClick('upcoming')}>
            Upcoming Movies
          </li>
          <li style={{ margin: '10px', cursor: 'pointer' }} onClick={() => handleMenuClick('my_page')}>
            My Page
          </li>
        </ul>
      </div>
      
      {selectedMenu === 'home'}
      {selectedMenu === 'now_playing' && <NowPlayingMovies limit={5} onReservation={handleReservation} />}
      {selectedMenu === 'upcoming' && <UpcomingMovies limit={5} onReservation={handleReservation} />}
      {selectedMenu === 'my_page' && <MyPage reservations={reservations} />} 
    </div>
    
  );
}

export default App;
