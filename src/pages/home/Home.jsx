import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import './style.scss';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';
import UpComing from './upComing/UpComing';



const Home = () => {
  return (<>
    <div className='heroPage'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      <UpComing />
    </div>
    </>
  )
}

export default Home
