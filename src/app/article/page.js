"use client"
import Link from 'next/link';
import { useArticle } from '../context/ArticleContext';
import Image from 'next/image';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useEffect, useState } from 'react';
export default function Article() {
  const { articleData } = useArticle();
 const [date,setDate] = useState();

 useEffect(() => {
  if (articleData && articleData.publishedAt !== null && articleData.publishedAt !== undefined) {
    const publishedAtString = articleData.publishedAt;
    const publishedAt = new Date(publishedAtString);
    const formattedDate = publishedAt.toLocaleString();
    setDate(formattedDate);
  }
}, [articleData])


  

  console.log(articleData);

  if (!articleData) {
    return <div className='container mx-auto h-screen items-center flex justify-center'>
      <p className='text-2xl'>No Article Found. <Link className='underline text-blue-500' href="/news">Go to News</Link></p>
      
    </div>;
  }

  return (
    <div className=' container max-w-[1200px] mt-16 mx-auto text-center'>
      {articleData.urlToImage &&
        articleData.urlToImage.startsWith("https://") ? (
                <ImageWithFallback
                  className="w-full rounded-t-[31px]"
                  src={articleData.urlToImage}
                  fallbackSrc="/assets/not-found.jpg"
                  alt={articleData.title}
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
                  <div className='sm:flex flex-row justify-around items-center'>
                  {articleData.publishedAt
                  && 
                  <p className='mt-4  px-8 py-4 rounded-full inline-block  font-bold'>Date: {date}</p>
                  }
                  
                  {articleData.author &&
                    <p className='mt-4 px-8 py-4 rounded-full inline-block font-bold' >Author: {articleData.author}</p>
                  }
                  
                  </div>
                 
      <h1 className='sm:text-4xl text-3xl mt-8 font-bold sm:text-left text-justify'>{articleData.title}</h1>
      <p className='text-xl my-8'>{articleData.description}</p>
      {articleData.content 
      &&
      <p className='text-xl my-8'>{articleData.content}</p>
      }
      
      <div className=' my-20 hover:scale-105 ease-in-out duration-300'>
      {articleData.url && (
                  <Link
                    href={articleData.url}
                    className="text-white rounded-full bg-orange-500 hover:bg-orange-600  px-8 py-4 font-bold text-center"
                  >
                    Go to Official website
                  </Link>
                )}
                </div>

               
      
    </div>
  );
}
