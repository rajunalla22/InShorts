
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
// import News.css from 'component.css';

 const CATAGEROIES = [
    "general",
    "science",
    "business",
    "entertainment",
    "health",
    "sports",
    "technology"
    ]

const News = () => {
    const [articles, setArticles] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [totalRecords, setTotalrecords] = useState()
    const [category, setCategory] = useState('general')

    const getNews =(pageNo) => {
        axios({
            url: "https://newsapi.org/v2/top-headlines",
            method: "GET",
            params: {
                country: "in",
                apiKey: "793c34cd996641ed92a93452464126b8",
                page: pageNo,
                category:category 
            }
        }).then((response) => {
            setArticles([...articles, ...response.data.articles])
            setTotalrecords([response.data.totalRecords])
            setPageNumber(pageNo)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getNews(pageNumber)
    },[])

    useEffect(() => {
        getNews(1)
    },[category])

    
    const fetchData = () => {
        getNews(pageNumber + 1)
    }
    const handleClick = (clickedCatagory) => {
        setArticles([])
        setTotalrecords()
        setPageNumber(1)
        setCategory(clickedCatagory);
    }

    return(
        <>
        <div>
        <h1 style={{textAlign:"center", fontFamily: "Trirong Font"}}>Latest News</h1>
        {
            CATAGEROIES.map((catg, index) =>{
                return(
                    <button 
                    className={category == catg ? "btn btn-danger" : "btn btn-primary"} 
                    style={{margin: 20}}
                     key= {index}
                     onClick={() => {handleClick(catg)}}
                     >
                        {catg.toUpperCase()}
                    </button>
                )
            })
        }
        </div>
        <InfiniteScroll style={{display : 'flex', flexWrap: "wrap"}}
            dataLength={articles.length} // This is important field to render the next data
            next={fetchData}
            hasMore={totalRecords !== articles.length}
            loader={<h4>Loading...</h4>}
>
            {
            articles.map((article, index) => {
                return(
                    <div key={index} className='card border-dark mb-3 text-center' style={{width: 400, margin: 20, height: 500}}>
                        <img className='cardImgTop' src= {article.urlToImage} width = "100%" style={{
                            backgroundColor: "grey", 
                            minHeight: "200", 
                            height: 200}}></img>
                            <div className='cardTitle' style={{overflowY: "scroll", overflowX: "hidden", color: "CaptionText"}} >
                            <h3>{article.title}</h3>
                            </div>
                        <p style={{overflowY: "scroll", overflowX: "hidden"}} className='cardText' height = "20" >{article.description}</p>
                        <a href={"article.url"} className="btn btn-primary">More</a>
                        <small className="text-muted">Last updated 4 hrs ago</small>
                    </div>
                )
            })
        }
    </InfiniteScroll>
       
        </>
    )
}

export default News;