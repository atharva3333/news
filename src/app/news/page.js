"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function News() {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=b91aa92bd41d4973a4b4ee7e27efc6f9`
        );
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on component mount

  console.log(newsData);

  return (
    <div className="container mx-auto">
      <h1 className="text-center font-bold text-4xl my-8">
        India&apos;s Top Headlines
      </h1>
      {newsData && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {newsData.articles.map((article, index) => (
            <li key={index} className="my-8 pb-4 shadow-xl rounded-[31px]">
              {article.urlToImage &&
                article.urlToImage.startsWith("https://") && (
                  <ImageWithFallback
                    
                    src={article.urlToImage}
                    fallbackSrc="/assets/not-found.jpg"
                    alt={article.title}
                  />
                )}
              {!article.urlToImage ||
                (article.urlToImage &&
                  !article.urlToImage.startsWith("https://") && (
                    <Image
                      className="w-full rounded-t-[31px]"
                      src="/assets/not-found.jpg"
                      width={300}
                      height={300}
                      alt="Default Image"
                    />
                  ))}
              <div className="px-8 mt-8">
                <h3 className="font-bold text-xl">{article.title}</h3>
                <p className="my-8">{article.description}</p>
                {article.url && (
                  <Link
                    href={article.url}
                    className="text-blue-500 underline text-center"
                  >
                    Read Full article
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
