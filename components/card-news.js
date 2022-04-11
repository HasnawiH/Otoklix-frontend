import { useRouter } from "next/router";
import styles from "../styles/Card.module.css";
import stylesHome from "../styles/Home.module.css";
import axios from "axios";
import moment from "moment";

const CardNews = ({ item, fetching }) => {
  const router = useRouter();
  const deleteNews = async (id) => {
    try {
      let response = await axios.delete(`https://limitless-forest-49003.herokuapp.com/posts/${id}`);

      if (response?.status === 200) {
        fetching();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNews = async (id) => {
    router.push(`/news/${id}/detail`)
  };

  const editNews = async (id) => {
    router.push(`/news/${id}/edit`)
  };

  return (
    <div className={styles.conCard}>
      <div>
        <p className={styles.date}>{moment(item?.published_at).format('LLLL')}</p>
        <p className={styles.title}>{item?.title}</p>
        <p className={styles}>{item?.content}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <button style={{marginBottom:"4px", background: "",}} className={stylesHome.btnPost}  onClick={() => editNews(item?.id)} >Edit</button>
        <button style={{marginBottom:"4px", background: "#F24A72"}} className={stylesHome.btnPost} onClick={() => deleteNews(item.id)}>Delete</button>
        <button style={{marginBottom:"4px", background: "",}} className={stylesHome.btnPost} onClick={() => updateNews(item?.id)}>Detail</button>
      </div>
    </div>
  );
};

export default CardNews;
