import React, { useEffect, useState, useContext } from "react";
import { NewsContext } from "./NewsContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Bulletin.css";
import {
  FaRegClock,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaSearch,
  FaNewspaper,
} from "react-icons/fa";

function Bulletin() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { setRecentNews } = useContext(NewsContext);
  const navigate = useNavigate();

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=disaster+India&apiKey=20ebe77da7e14006b12788ea2ea3d81b"
        );
        const articles = response.data.articles;

        // Add categories to each article based on keywords in the title
        const categorizedArticles = articles.map((article) => {
          let category = "General";
          const title = article.title.toLowerCase();

          if (
            title.includes("flood") ||
            title.includes("rain") ||
            title.includes("storm")
          ) {
            category = "Flood";
          } else if (title.includes("fire")) {
            category = "Fire";
          } else if (title.includes("earthquake")) {
            category = "Earthquake";
          } else if (
            title.includes("cyclone") ||
            title.includes("hurricane") ||
            title.includes("typhoon")
          ) {
            category = "Cyclone";
          } else if (title.includes("landslide")) {
            category = "Landslide";
          } else if (title.includes("drought")) {
            category = "Drought";
          } else if (
            title.includes("covid") ||
            title.includes("pandemic") ||
            title.includes("virus")
          ) {
            category = "Pandemic";
          }

          return { ...article, category };
        });

        setNews(categorizedArticles);
        if (categorizedArticles.length > 0) {
          setRecentNews(categorizedArticles[0].title);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
        setLoading(false);
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
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filterNews = () => {
    if (!searchTerm) return news;
    return news.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.description &&
          article.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Flood":
        return "#1976d2";
      case "Fire":
        return "#d32f2f";
      case "Earthquake":
        return "#7b1fa2";
      case "Cyclone":
        return "#0097a7";
      case "Landslide":
        return "#8d6e63";
      case "Drought":
        return "#ff8f00";
      case "Pandemic":
        return "#c2185b";
      default:
        return "#455a64";
    }
  };

  const filteredNews = filterNews();

  return (
    <div className="bulletin-container">
      <div className="bulletin-header">
        <button
          onClick={() => navigate("/home")}
          className="back-button"
          title="Back to Home"
        >
          <FaChevronLeft /> Back
        </button>
        <h1>
          <FaNewspaper className="header-icon" /> Disaster News Bulletin
        </h1>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading latest disaster news...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="news-stats">
            <span>{filteredNews.length} news articles found</span>
            {searchTerm && <span>Search results for: "{searchTerm}"</span>}
          </div>

          <div className="news-grid">
            {filteredNews.length > 0 ? (
              filteredNews.map((article, index) => (
                <div key={index} className="news-card">
                  <div
                    className="news-image-container"
                    style={{
                      backgroundImage: article.urlToImage
                        ? `url(${article.urlToImage})`
                        : "none",
                    }}
                  >
                    {!article.urlToImage && (
                      <div className="news-placeholder">
                        <FaNewspaper />
                      </div>
                    )}
                    <div
                      className="category-badge"
                      style={{
                        backgroundColor: getCategoryColor(article.category),
                      }}
                    >
                      {article.category}
                    </div>
                  </div>
                  <div className="news-card-content">
                    <div className="news-meta">
                      <span className="news-source">{article.source.name}</span>
                      <span className="news-date">
                        <FaRegClock /> {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h3 className="news-title">{article.title}</h3>
                    <p className="news-description">
                      {article.description
                        ? article.description.length > 120
                          ? `${article.description.substring(0, 120)}...`
                          : article.description
                        : "No description available."}
                    </p>
                    <button
                      className="read-more-button"
                      onClick={() => handleNewsClick(article)}
                    >
                      Read Full Story
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <FaSearch className="no-results-icon" />
                <h3>No results found</h3>
                <p>Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </>
      )}

      {selectedNews && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="news-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            <div className="modal-header">
              <span
                className="modal-category"
                style={{
                  backgroundColor: getCategoryColor(selectedNews.category),
                }}
              >
                {selectedNews.category}
              </span>
              <h2>{selectedNews.title}</h2>
              <div className="modal-meta">
                <span className="modal-source">{selectedNews.source.name}</span>
                <span className="modal-date">
                  <FaRegClock /> {formatDate(selectedNews.publishedAt)} at{" "}
                  {formatTime(selectedNews.publishedAt)}
                </span>
              </div>
            </div>

            {selectedNews.urlToImage && (
              <div className="modal-image-container">
                <img
                  src={selectedNews.urlToImage}
                  alt={selectedNews.title}
                  className="modal-image"
                />
              </div>
            )}

            <div className="modal-content">
              {selectedNews.description && (
                <p className="modal-description">{selectedNews.description}</p>
              )}

              {selectedNews.content && (
                <div className="modal-full-content">
                  <h3>Full Content</h3>
                  <p>{selectedNews.content.replace(/\[\+\d+ chars\]$/, "")}</p>
                </div>
              )}

              {selectedNews.url && (
                <a
                  href={selectedNews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  Read on {selectedNews.source.name} <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bulletin;
