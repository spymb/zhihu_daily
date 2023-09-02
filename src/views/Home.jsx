import React, { useState, useEffect } from "react";
import HomeHead from "../components/HomeHead";
import _ from "../assets/utils";
import { Swiper, Image } from "antd-mobile";
import { Link } from "react-router-dom";
import api from '../api';
import './Home.less';

const Home = () => {
  const [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}"));
  const [bannerData, setBannerData] = useState([]);
  const [newsList, setNewsList] = useState([]);

  /* 第一次渲染完毕:向服务器发送数据请求 */
  useEffect(() => {
    (async () => {
      try {
        let { date, stories, top_stories } = await api.queryNewsLatest();
        setToday(date);
        setBannerData(top_stories);
        // 更新新闻列表状态
        newsList.push({
          date,
          stories,
        });
        setNewsList([...newsList]);
      } catch (_) {}
    })();
  }, []);

  return (
    <div className="home-box">
      {/* 头部 */}
      <HomeHead today={today} />

      {/* 轮播图 */}
      <div className="swiper-box">
        {bannerData.length > 0 ? (
          <Swiper autoplay={true} loop={true}>
            {bannerData.map((item) => {
              let { id, image, title, hint } = item;
              return (
                <Swiper.Item key={id}>
                  <Link to={{ pathname: `/detail/${id}` }}>
                    <Image src={image} lazy />
                    <div className="desc">
                      <h3 className="title">{title}</h3>
                      <p className="author">{hint}</p>
                    </div>
                  </Link>
                </Swiper.Item>
              );
            })}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
