import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [recentNews, setRecentNews] = useState(null);

    return (
        <NewsContext.Provider value={{ recentNews, setRecentNews }}>
            {children}
        </NewsContext.Provider>
    );
};