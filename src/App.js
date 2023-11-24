import React, { useState, useEffect } from 'react';

const StadiumCards = () => {
  const [stadiums, setStadiums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://myfakeapi.com/api/football/stadiums')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStadiums(data.stadiums);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredStadiums = stadiums.filter(stadium =>
    stadium.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 py-5">
    <h2 className='text-center'>Search Football Ground</h2>
      <div className="row py-5">
        <div className="col-md-12 mb-3 text-center">
          <input
            type="text"
            placeholder="Search stadiums..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control w-50 mx-auto"
          />
        </div>
      </div>
      <div className="row">
        {filteredStadiums.map(stadium => (
          <div key={stadium.id} className="col-md-4 mb-3">
            <div className="card h-100 p-3">
              <img
                src={stadium.image}
                className="card-img-top img-fluid"
                alt={stadium.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{stadium.name}</h5>
                <p className="card-text">{stadium.city}</p>
                {/* You can display more details here if needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StadiumCards;
