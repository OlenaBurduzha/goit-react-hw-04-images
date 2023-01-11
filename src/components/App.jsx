// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Container/Container';
import ImageGallary from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from './api/Fetch.jsx';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';


function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) return;

    const searchImages = async () => {
      try {
        const request = await fetchImages(query, page);
        if (request.length === 0) {
          return setError(`No found ${query}`);
        }
        setImages(prevImages => [...prevImages, ...request]);
      } catch (error) {
        setError('Oops! Something went wrong')
      } finally {
        setIsLoading(false);
      }
    };

    searchImages();
  }, [page, query]);

  const handleSubmit = newSearch => {
    setQuery(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = evt => {
    setLargeImageURL(evt.target.dataset.source);
    toggleModal(!isLoading);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container>
      <Searchbar
       onHandleSubmit={handleSubmit}
      />
    {error}
    {images.length > 0 && !error && (
      <ImageGallary images={images} error={error} onOpenModal={onOpenModal} />
    )}
      {isLoading && <Loader />}

    {!isLoading && images.length >= 12 && !error &&
        (<Button onLoadMore={onLoadMore} />)}
      
    {showModal && (
         <Modal onToggleModal={toggleModal}
          largeImageURL={largeImageURL} />
        )}
         <ToastContainer autoClose={2500} />
  </Container>
 )
};

export default App;

// class App extends Component{
//   state = {
//     query: '',
//     images: [],
//     largeImageURL: '',
//     page: 1,
//     error: null,
//     isLoading: false,
//     showModal: false,
//   };

//   componentDidUpdate(_prevProps, prevState) {
//     if (prevState.query !== this.state.query) {
//       this.setState({ images: [], page: 1, error: null });
//     }
//   }

//   searchImages = async () => {
//     const { query, page } = this.state;
//     if (query.trim() === '') {
//       return toast.info('Please, use search field! ')
//     }

//     this.toggleLoader();

//     try {
//       const request = await fetchImages(query, page);
//       this.setState(({ images, page }) => ({
//         images: [...images, ...request],
//         page: page + 1,
//       }));
//       if (request.length === 0) {
//         this.setState({ error: `No found ${query}` });
//       }
//     } catch (error) {
//       this.setState({ error: 'Oops! Something went wrong' })
//     } finally {
//       this.toggleLoader();
//     }
//   };

//   handleChange = e => {
//     this.setState({ query: e.target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.searchImages();
//   };

//   onLoadMore = () => {
//     this.searchImages();
//   };

//   onOpenModal = e => {
//     this.setState({ largeImageURL: e.target.dataset.source });
//     this.toggleModal();
//   };

//   toggleLoader = () => {
//     this.setState(({ isLoading }) => ({
//       isLoading: !isLoading,
//     }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };


//   render() {
//     const { query, images, largeImageURL, isLoading, showModal, error } = this.state;
//     return (
//       <Container>
//         <Searchbar
//           onHandleSubmit={this.handleSubmit}
//           onSearchQueryChange={this.handleChange}
//           value={query}
//         />
//         {error}

//          {images.length > 0 && !error && (
//           <ImageGallary images={images} error={error} onOpenModal={this.onOpenModal} />
//         )}

//         {isLoading && <Loader/>}

//         {!isLoading && images.length >= 12 && !error &&
//           (<Button onLoadMore={this.onLoadMore} />)}

//         {showModal && (
//           <Modal onToggleModal={this.toggleModal}
//             largeImageURL={largeImageURL} />
//         )}

//          <ToastContainer autoClose={2500} />
//       </Container>
//     )
//   }
// }

// export default App;
