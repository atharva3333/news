"use client"
import { createContext, useContext, useState } from 'react';

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articleData, setArticleData] = useState(null);

  const setArticle = (data) => {
    setArticleData(data);
  };

  return (
    <ArticleContext.Provider value={{ articleData, setArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticle must be used within an ArticleProvider');
  }
  return context;
};
