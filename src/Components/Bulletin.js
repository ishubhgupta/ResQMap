import React, { useEffect, useState, useContext } from 'react';
import { NewsContext } from './NewsContext'; // Import the context
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Bulletin.css';

function Bulletin() {
    const [news, setNews] = useState([]); // State for news articles
    const [selectedNews, setSelectedNews] = useState(null); // State for selected news modal
    const { setRecentNews } = useContext(NewsContext); // Access the context
    const navigate = useNavigate();

    // Fetch news data
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/everything?q=disaster+India&apiKey=20ebe77da7e14006b12788ea2ea3d81b'
                );
                const articles = response.data.articles;
                setNews(articles);
                if (articles.length > 0) {
                    setRecentNews(articles[0].title); // Save the most recent news headline
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, [setRecentNews]);

    const handleNewsClick = (article) => {
        setSelectedNews(article);
    };

    const closeModal = () => {
        setSelectedNews(null);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="transparent-dashboard">
            <h1 className="dashboard-header">Latest Disaster News</h1>
            <button 
                onClick={() => navigate('/home')} 
                className="close-dashboard-cross"
                title="Back to Home"
            >
                &times;
            </button>
            <div className="dashboard-content">
                {news.map((article, index) => (
                    <div key={index} className="dashboard-news-box">
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="news-image"
                            />
                        )}
                        <div className="news-content">
                            <div className="news-meta">
                                <span className="news-source">{article.source.name}</span>
                                <span className="news-date">{formatDate(article.publishedAt)}</span>
                            </div>
                            <h3 className="news-title">{article.title}</h3>
                            <button 
                                className="view-summary-button"
                                onClick={() => handleNewsClick(article)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for detailed view */}
            {selectedNews && (
                <div className="news-modal-overlay" onClick={closeModal}>
                    <div className="news-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        {selectedNews.urlToImage && (
                            <img
                                src={selectedNews.urlToImage}
                                alt={selectedNews.title}
                                className="modal-image"
                            />
                        )}
                        <div className="news-meta">
                            <span className="news-source">{selectedNews.source.name}</span>
                            <span className="news-date">{formatDate(selectedNews.publishedAt)}</span>
                        </div>
                        <h2 className="news-title">{selectedNews.title}</h2>
                        <div className="summary-text">
                            <p>{selectedNews.description || "Summary not available."}</p>
                            {selectedNews.content && (
                                <p className="news-content">{selectedNews.content}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bulletin;
