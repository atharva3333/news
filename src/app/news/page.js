"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import { useArticle } from "../context/ArticleContext";
import {auth,app} from "@/utils/firebase.config"
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { redirect } from "next/navigation";

export default function News() {
  const [newsData, setNewsData] = useState(null);
  const { setArticle, articleData } = useArticle();

  const [user] = useAuthState(auth);

   if(user) console.log(user.uid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=b91aa92bd41d4973a4b4ee7e27efc6f9`
        );
        const data = await response.json();
        console.log("got data",data);
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on component mount

  const handleArticleClick = (article) => {
    // Set the article data in the context
    setArticle(article);
  };

  const handleAddArticle = (article) => {
    // Assuming you have the user's ID available
     console.log("article found",article);
    if(article){
      const userId = user.uid;

    // Call the function to add the article
    addFavoriteArticle(userId, article);
    }
    
  };

  const addFavoriteArticle = async (userId, articleData) => {
    const db = getFirestore(app);
    // const userArticlesCollection = collection(db, 'userArticles', userId);

    // console.log(userArticlesCollection);
  
    try {
      // Add the article data to the user's collection
      const docRef = await addDoc(collection(db, userId), articleData);
      console.log('Article added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding article: ', error);
    }
  };

  // useEffect(() => {
  //   if(!user){
  //     redirect("/")
  //   }
  // }, [user])



  // console.log(articleData);

  console.log(newsData);

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-3xl my-8">
        India&apos;s Top Headlines
      </h1>
      {newsData && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {newsData.articles.map((article, index) => (
            <li key={index} className="my-8 pb-4 shadow-xl rounded-[31px]">
              {article.urlToImage &&
              article.urlToImage.startsWith("https://") ? (
                <ImageWithFallback
                  className="w-full rounded-t-[31px]"
                  src={article.urlToImage}
                  fallbackSrc="/assets/not-found.jpg"
                  alt={article.title}
                />
              ) : (
                <Image
                  className="w-full rounded-t-[31px]"
                  src="/assets/not-found.jpg"
                  width={300}
                  height={300}
                  alt="Default Image"
                />
              )}
              <div className="px-8 mt-8">
                <h3 className="font-bold text-xl">{article.title}</h3>
                <p className="my-8">{article.description}</p>

                <div className="sm:flex flex-col gap-4">
                <Link
                  href={"/article"}
                  passHref
                  onClick={() => handleArticleClick(article)}
                  className="text-white flex justify-center bg-blue-600 rounded-full px-8 py-4"
                >
                  Read More..
                </Link>

                <p
                  onClick={() => handleAddArticle(article)}
                  className="text-white text-center bg-blue-600 sm:my-0 my-8 rounded-full px-8 py-4 cursor-default"
                >
                <Image className="inline-block mt-[-3px] mr-3" width="25" height="25" src="https://img.icons8.com/sf-black/64/FFFFFF/star.png" alt="star"/>
                  Add Bookmark
                </p>
                </div>
                
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
