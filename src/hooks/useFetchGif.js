import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetchGif = ({ keyword } = { keyword: '' }) => {
  const [gifUrl, setGifUrl] = useState('');

  const fetchGif = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.replace(
          ' ',
          ''
        )}&limit=1`
      );
      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (keyword) fetchGif();
  }, [keyword]);

  return gifUrl;
};

export default useFetchGif;
