import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import styles from "../../../styles/Home.module.css";
import axios from "axios";

export default function EditNews() {
  
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getDetailNews();
  }, [id]);

  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const getDetailNews = async () => {
    try {
      let response = await axios.get(`https://limitless-forest-49003.herokuapp.com/posts/${id}`);

      if (response?.status === 200) {
        setData({...data, title: response?.data?.title, content: response?.data?.content});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editNews = async () => {
    try {
      let response = await axios.put(`https://limitless-forest-49003.herokuapp.com/posts/${id}`, data);

      if (response?.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <p className={styles.labelList}>Please post your news:</p>
      <div>
        <input
          className={styles.input}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          value={data?.title}
          placeholder="input title"
        />
      </div>

      <textarea
        className={styles.input}
        onChange={(e) => setData({ ...data, content: e.target.value })}
        value={data?.content}
        placeholder="input content"
        style={{ minHeight: "20rem" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          style={{ marginBottom: "4px", background: "#F24A72" }}
          className={styles.btnPost}
          onClick={() => router.push("/")}
        >
          Cancel
        </button>
        <button className={styles.btnPost} onClick={editNews}>
          Edit New
        </button>
      </div>
    </Layout>
  );
}
