import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";
import axios from "axios";

export default function AddNews() {
  
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const addNews = async () => {
    try {
      let response = await axios.post(`https://limitless-forest-49003.herokuapp.com/posts`, data);

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
        <button className={styles.btnPost} onClick={addNews}>
          Add New
        </button>
      </div>
    </Layout>
  );
}
