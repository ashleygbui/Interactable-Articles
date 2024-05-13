import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom'; 
import './index.css';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA2DWWi36MFD1AZUjWXQmcJHdYF0O8wc7k",
  authDomain: "articles-and-thumbnail.firebaseapp.com",
  projectId: "articles-and-thumbnail",
  storageBucket: "articles-and-thumbnail.appspot.com",
  messagingSenderId: "178370145393",
  appId: "1:178370145393:web:ac43836e5a7f4913187fd0",
  measurementId: "G-F8FNWW8MWN"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesRef = collection(firestore, 'articles');
        const snapshot = await getDocs(articlesRef);
        console.log('Snapshot:', snapshot);
        
        if (snapshot.docs.length > 0) {
          const firstDocument = snapshot.docs[0];
          const data = firstDocument.data();
          console.log('Data of the first document:', data);
        }
        
        const articlesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Fetched Articles:', articlesData);
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    
    fetchArticles();
  }, []);
  
  return (
    <div>
      <h1>Bay Area News</h1>
      <ul>
      {articles.map(article => (
          <li key={article.id}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h2>{article.headline}</h2>
              <img src={article.thumbnail} alt={article.headline} style={{ width: '100px', height: 'auto' }} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
