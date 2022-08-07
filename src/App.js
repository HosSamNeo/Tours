import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
const url = 'https://course-api.com/react-tours-project';

function App() {
  const [loading , setLoading] = useState(false);
  const [tours , setTours] = useState([]);

  const removeTour = (id) => {
    let newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const toursData = await response.json();
      setTours(toursData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTours();
  }, [] )


  if(loading){
    return <main><Loading /></main>
  }else if(tours.length === 0){
    return <main>
              <div className="title">
                <h2> No Tours Left ! </h2>
                <button className='btn' onClick={() => fetchTours()}>Refresh</button>
              </div>
            </main>
  }else{
    return <main><Tours tours={tours} removeTour={removeTour}/></main>
  }
  
  
}

export default App;
