import { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { fetchApiData } from './utils/api';
import './App.css'

import { useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice';

import Home from './pages/home/Home';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/pageNotFound';



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    FetchApiConfig();
    genresCall();
  }, []);

  const FetchApiConfig = () => {
    fetchApiData('/configuration').then((res) => { 
      console.log(res); 

      const url = {
        backdrop: res.images.
        secure_base_url + "original",
        poster: res.images.
        secure_base_url + "original",
        profile: res.images.
        secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url))
    })
  };


  const genresCall = async() => {
    let promises  =  []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchApiData(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item))
    });

    dispatch(getGenres(allGenres));

  }

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route  path="/" element={ <Home /> } />
        <Route path="/:mediaType/:id" element={ <Details /> } />
        <Route path="/search/:query" element={ <SearchResult /> } />
        <Route path="/explore/:mediaType" element={ <Explore /> } />
        <Route path="*" element={ <PageNotFound /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
