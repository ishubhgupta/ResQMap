import React, { useEffect, useState, useContext } from "react";
import { NewsContext } from "./NewsContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/Bulletin.module.css"; // Updated to use CSS modules
import {
  FaRegClock,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaSearch,
  FaNewspaper,
  FaFilter,
  FaWater,
  FaFire,
  FaGlobeAsia,
  FaWind,
  FaMountain,
  FaSun,
  FaViruses,
  FaTimes,
  FaDownload,
  FaShareAlt,
  FaBookmark,
  FaHome
} from "react-icons/fa";

function Bulletin() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { setRecentNews } = useContext(NewsContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Define news categories with icons and colors
  const categories = [
    { id: "all", name: "All News", icon: <FaNewspaper />, color: "#455a64" },
    { id: "flood", name: "Flood", icon: <FaWater />, color: "#1976d2" },
    { id: "fire", name: "Fire", icon: <FaFire />, color: "#d32f2f" },
    { id: "earthquake", name: "Earthquake", icon: <FaGlobeAsia />, color: "#7b1fa2" },
    { id: "cyclone", name: "Cyclone", icon: <FaWind />, color: "#0097a7" },
    { id: "landslide", name: "Landslide", icon: <FaMountain />, color: "#8d6e63" },
    { id: "drought", name: "Drought", icon: <FaSun />, color: "#ff8f00" },
    { id: "pandemic", name: "Pandemic", icon: <FaViruses />, color: "#c2185b" }
  ];

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
          const content = article.content?.toLowerCase() || "";
          const description = article.description?.toLowerCase() || "";
          const text = title + " " + content + " " + description;

          if (text.includes("flood") || text.includes("rain") || text.includes("storm")) {
            category = "Flood";
          } else if (text.includes("fire")) {
            category = "Fire";
          } else if (text.includes("earthquake")) {
            category = "Earthquake";
          } else if (text.includes("cyclone") || text.includes("hurricane") || text.includes("typhoon")) {
            category = "Cyclone";
          } else if (text.includes("landslide")) {
            category = "Landslide";
          } else if (text.includes("drought")) {
            category = "Drought";
          } else if (text.includes("covid") || text.includes("pandemic") || text.includes("virus")) {
            category = "Pandemic";
          }

          return { 
            ...article, 
            category,
            categoryId: category.toLowerCase()
          };
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
    // When a news article is opened, scroll to top of modal
    setTimeout(() => {
      const modalElement = document.querySelector(".news-modal");
      if (modalElement) modalElement.scrollTop = 0;
    }, 10);
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

  const toggleCategory = (categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategories([]);
      return;
    }
    
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(cat => cat !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const filterNews = () => {
    let filtered = news;
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(article => 
        selectedCategories.includes(article.categoryId)
      );
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (article.description &&
            article.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : "#455a64";
  };

  const getCategoryIcon = (category) => {
    const categoryLower = category.toLowerCase();
    const cat = categories.find(c => c.id === categoryLower);
    return cat ? cat.icon : <FaNewspaper />;
  };

  const filteredNews = filterNews();

  return (
    <div className={styles.bulletinContainer}>
      <div className={styles.bulletinHeader}>
        <button
          onClick={() => navigate("/home")}
          className={styles.homeButton}
          title="Back to Home"
        >
          <FaHome /> Home
        </button>
        
        <h1 className={styles.headerTitle}>
          <FaNewspaper className={styles.headerIcon} /> Disaster News Bulletin
        </h1>
        
        <div className={styles.headerControls}>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <button 
            className={styles.filterToggleButton}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className={styles.categoryFilterContainer}>
          <div className={styles.filterHeader}>
            <h3>Filter by Category</h3>
            <button 
              className={styles.clearFilters}
              onClick={() => setSelectedCategories([])}
              disabled={selectedCategories.length === 0}
            >
              <FaTimes /> Clear Filters
            </button>
          </div>
          <div className={styles.categoryButtons}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryFilterButton} ${
                  (selectedCategories.length === 0 && category.id === 'all') || 
                  selectedCategories.includes(category.id) 
                    ? styles.active 
                    : ''
                }`}
                onClick={() => toggleCategory(category.id)}
                style={{
                  '--category-color': category.color
                }}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryName}>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.newsStats}>
        <span className={styles.newsCount}>
          <strong>{filteredNews.length}</strong> news articles found
        </span>
        {searchTerm && (
          <span className={styles.searchInfo}>
            Search results for: <strong>"{searchTerm}"</strong>
            <button 
              className={styles.clearSearch} 
              onClick={() => setSearchTerm("")}
              title="Clear search"
            >
              <FaTimes />
            </button>
          </span>
        )}
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading latest disaster news...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className={styles.newsGrid}>
          {filteredNews.length > 0 ? (
            filteredNews.map((article, index) => (
              <div key={index} className={styles.newsCard}>
                <div
                  className={styles.newsImageContainer}
                  style={{
                    backgroundImage: article.urlToImage
                      ? `url(${article.urlToImage})`
                      : "none",
                  }}
                >
                  {!article.urlToImage && (
                    <div className={styles.newsPlaceholder}>
                      {getCategoryIcon(article.category)}
                    </div>
                  )}
                  <div
                    className={styles.categoryBadge}
                    style={{
                      backgroundColor: getCategoryColor(article.category),
                    }}
                  >
                    {getCategoryIcon(article.category)} {article.category}
                  </div>
                </div>
                <div className={styles.newsCardContent}>
                  <div className={styles.newsMeta}>
                    <span className={styles.newsSource}>{article.source.name}</span>
                    <span className={styles.newsDate}>
                      <FaRegClock /> {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <h3 className={styles.newsTitle}>{article.title}</h3>
                  <p className={styles.newsDescription}>
                    {article.description
                      ? article.description.length > 120
                        ? `${article.description.substring(0, 120)}...`
                        : article.description
                      : "No description available."}
                  </p>
                  <button
                    className={styles.readMoreButton}
                    onClick={() => handleNewsClick(article)}
                  >
                    Read Full Story
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <FaSearch className={styles.noResultsIcon} />
              <h3>No results found</h3>
              <p>Try adjusting your search terms or category filters</p>
              <button 
                className={styles.resetSearchButton}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategories([]);
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {selectedNews && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.newsModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              <FaTimes />
            </button>

            <div className={styles.modalHeader}>
              <span
                className={styles.modalCategory}
                style={{
                  backgroundColor: getCategoryColor(selectedNews.category),
                }}
              >
                {getCategoryIcon(selectedNews.category)} {selectedNews.category}
              </span>
              <h2>{selectedNews.title}</h2>
              <div className={styles.modalMeta}>
                <span className={styles.modalSource}>{selectedNews.source.name}</span>
                <span className={styles.modalDate}>
                  <FaRegClock /> {formatDate(selectedNews.publishedAt)} at{" "}
                  {formatTime(selectedNews.publishedAt)}
                </span>
              </div>
              
              <div className={styles.modalActions}>
                <button className={`${styles.modalActionButton} ${styles.bookmark}`}>
                  <FaBookmark /> Save
                </button>
                <button className={`${styles.modalActionButton} ${styles.share}`}>
                  <FaShareAlt /> Share
                </button>
                <button className={`${styles.modalActionButton} ${styles.download}`}>
                  <FaDownload /> Download
                </button>
              </div>
            </div>

            {selectedNews.urlToImage && (
              <div className={styles.modalImageContainer}>
                <img
                  src={selectedNews.urlToImage}
                  alt={selectedNews.title}
                  className={styles.modalImage}
                />
              </div>
            )}

            <div className={styles.modalContent}>
              {selectedNews.description && (
                <p className={styles.modalDescription}>{selectedNews.description}</p>
              )}

              {selectedNews.content && (
                <div className={styles.modalFullContent}>
                  <h3>Full Content</h3>
                  <p>{selectedNews.content.replace(/\[\+\d+ chars\]$/, "")}</p>
                </div>
              )}

              <div className={styles.modalFooter}>
                <div className={styles.relatedCategories}>
                  <h4>Related Categories:</h4>
                  <div className={styles.categoryTags}>
                    <span className={styles.categoryTag}>
                      {selectedNews.category}
                    </span>
                    <span className={styles.categoryTag}>Disaster News</span>
                    <span className={styles.categoryTag}>Emergency</span>
                  </div>
                </div>
                
                {selectedNews.url && (
                  <a
                    href={selectedNews.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceLink}
                  >
                    Read Original Article <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bulletin;
