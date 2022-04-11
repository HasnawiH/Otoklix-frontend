import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import styles from "../../../styles/Card.module.css";
import axios from "axios";
import moment from "moment";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [detail, setDetail] = useState();

  const getDetailNews = async () => {
    try {
      let response = await axios.get(`https://limitless-forest-49003.herokuapp.com/posts/${id}`);

      if (response?.status === 200) {
        setDetail(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailNews();
  }, [id]);

  return (
    <Layout>
      <div>
        <p className={styles.date}>{moment(detail?.published_at).format('LLLL')}</p>
        <p className={styles.title}>{detail?.title}</p>
        <p >{detail?.content}</p>
      </div>
    </Layout>
  );
};

export default Detail;
