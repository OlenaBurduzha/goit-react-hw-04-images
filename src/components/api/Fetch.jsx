import axios from 'axios';

const fetchImages = async (query, currentPage) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=31316114-180796932203d7dd4f11923fb&image_type=photo&orientation=horizontal&per_page=12`,
  );

  return data.hits;
};

export default fetchImages;