import React, { useState } from "react";
import { Button } from "antd-mobile";

const ButtonAgain = function ButtonAgain(props) {
  /* props中包含了调用<Button>组件时候的属性 */
  let options = { ...props };
  const { children, onClick } = options;
  delete options.children;

  /* 状态 */
  let [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } catch (_) {}
    setLoading(false);
  };

  if (onClick) {
    options.onClick = handleClick;
  }

  return (
    <Button {...options} loading={loading}>
      {children}
    </Button>
  );
};

export default ButtonAgain;
