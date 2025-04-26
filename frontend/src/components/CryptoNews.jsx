import React, { useState, useEffect } from 'react';

export default function CryptoNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'pub_77443a32f3a2e2adf2d464032d1022e0f7d04'; // ✅ Your API Key
  const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=crypto&language=en`; // ✅ Uses general news API

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          setNews(data.results.slice(0, 10)); 
        } else {
          setError('No crypto news found');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 ">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded ">
          <strong className="font-bold">Error!</strong> {error}
        </div>
      </div>
    );
  }

  return (
    
    <div className='bg-gray-900'>
      
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-white">🚀 Top Crypto News</h2>
      <div className="space-y-4 ">
        {news.map((article, index) => (
          <div key={index} className="bg-white flex justify-between  p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
           <div className='w-200'>
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{article.description || 'No description available'}</p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-blue-500 hover:text-blue-700 underline"
            >
              Read more
            </a>
           </div>
           
           <div>
           {article.image_url && (
              <img
              
                src={article.image_url}
                alt={article.title}
                className="w-100 object-cover rounded-lg mb-4"
              />
            )}
           </div>
          </div>
          
        ))}
      </div>
    </div>
    </div>
  );
}
