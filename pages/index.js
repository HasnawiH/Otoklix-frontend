import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import CardNews from "../components/card-news";
import styles from "../styles/Home.module.css";
import axios from "axios";

const Home = () => {
  const router = useRouter();
  const [listNews, setListnews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      let response = await axios.get(`https://limitless-forest-49003.herokuapp.com/posts`);

      if (response?.status === 200) {
        setListnews(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNews = async () => {
    router.push("/news/add-news");
  };
  
  return (
    <Layout>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom:"0.5rem" }}>
          <p></p>
          <button onClick={addNews} className={styles.btnPost}>
            Post News
          </button>
        </div>

        <p className={styles.labelList}>List news</p>
        {listNews &&
          listNews.length > 0 &&
          listNews.map((item, ind) => {
            return <CardNews item={item} fetching={getNews} />;
          })}
      </div>
    </Layout>
  );
};

export default Home;
