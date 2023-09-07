import React, { Suspense, useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import routes from "./routes";
import { Mask, DotLoading, Toast } from "antd-mobile";
import store from "../store";
import action from "../store/action";

const shouldCheckLogin = (path) => {
  const {
    base: { info },
  } = store.getState();
  const checkList = ["/personal", "/store", "/update"];
  return !info && checkList.includes(path);
};

/* 统一路由配置 */
const Element = function Element(props) {
  const { component: Component, meta, path } = props;
  const isShownDirectly = !shouldCheckLogin(path);
  const [_, setRandom] = useState(0);

  // 登录态校验
  useEffect(() => {
    if (isShownDirectly) return;

    (async () => {
      const infoAction = await action.base.queryUserInfoAsync();
      if (!infoAction.info) {
        // 如果获取后还是不存在:没有登录
        Toast.show({
          icon: "fail",
          content: "请先登录",
        });
        // 跳转到登录页
        navigate(
          {
            pathname: "/login",
            search: `?to=${path}`,
          },
          { replace: true }
        );
        return;
      }
      // 如果获取到了信息,说明是登录的,我们派发任务把信息存储到容器中
      store.dispatch(infoAction);
      setRandom(+new Date());
    })();
  });

  // 修改页面的TITLE
  const { title = "知乎日报-WebApp" } = meta || {};
  document.title = title;

  // 获取路由信息,基于属性传递给组件
  const navigate = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams();

  return (
    <>
      {isShownDirectly ? (
        <Component
          navigate={navigate}
          location={location}
          params={params}
          usp={usp}
        />
      ) : (
        <Mask visible={true}>
          <DotLoading color="white" />
        </Mask>
      )}
    </>
  );
};

export default function RouterView() {
  return (
    <Suspense
      fallback={
        <Mask visible={true}>
          <DotLoading color="white" />
        </Mask>
      }
    >
      <Routes>
        {routes.map((item) => {
          let { name, path } = item;
          return (
            <Route key={name} path={path} element={<Element {...item} />} />
          );
        })}
      </Routes>
    </Suspense>
  );
}
