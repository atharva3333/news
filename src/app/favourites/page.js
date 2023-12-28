"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, app } from "@/utils/firebase.config";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageWithFallback";
import Link from "next/link";

export default function Favourites() {
  const [user] = useAuthState(auth);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);

      try {
        const querySnapshot = await getDocs(collection(db, user.uid));
        const fetchedArticles = [];
        querySnapshot.forEach((doc) => {
          fetchedArticles.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setArticles(fetchedArticles);
        console.log(articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="container">
      <h1 className="my-8 font-bold text-3xl">Favourites</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <div className="flex gap-8 my-16">
              {article.data.urlToImage &&
              article.data.urlToImage.startsWith("https://") ? (
                <ImageWithFallback
                  className="rounded-md"
                  src={article.data.urlToImage}
                  fallbackSrc="/assets/not-found.jpg"
                  alt={article.data.title}
                />
              ) : (
                <Image
                  className="rounded-md"
                  src="/assets/not-found.jpg"
                  width={300}
                  height={300}
                  alt="Default Image"
                />
              )}
              <div className="flex flex-col">
                <h1 className="font-bold text-xl">{article.data.title}</h1>
                {article.data.url && (
                  <Link
                    href={article.data.url}
                    className="text-white w-[300px] hover:scale-105 ease-in-out duration-300 rounded-full bg-orange-500 hover:bg-orange-600 mt-16  px-8 py-4 font-bold text-center"
                  >
                    Go to Official website
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
