import './style.scss';

import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchApiData } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import noResults from '../../assets/no-results.png';
import { useEffect, useState } from 'react';
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';


const searchResult = () => {

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setloading] = useState(false);
  const { query } = useParams();


  const FetchInitialData = () => {
    setloading(true);
    fetchApiData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1);
      setloading(false);
    });
  }

  const FetchNextPageData = () => {
    fetchApiData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data, results: [...data?.results, ...res.results]
        })
      } else {
        setData(res)
      }
      setPageNum((prev) => prev + 1);
    });
  }

  useEffect(() => {
    // setPageNum(1);
    FetchInitialData();
  }, [query])

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
              {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
  </div>
  <InfiniteScroll
  className='content'
  dataLength={data?.results?.length || [] }
  next={FetchNextPageData}
  hasMore={pageNum <= data?.total_pages}
  loader={<Spinner />}
  >
    {data?.results.map((item, index) => {
if(item.media_type === "person") return;
return (
  <MovieCard key={index} data={item} fromSearch={true} />
)
    })}
  </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">
              Sorry, Results Not Found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default searchResult
