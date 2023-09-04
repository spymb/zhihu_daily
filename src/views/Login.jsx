import React, { useState } from "react";
import { Form, Input } from "antd-mobile";
import "./Login.less";
import ButtonAgain from "../components/ButtonAgain";
import NavBarAgain from "../components/NavBarAgain";
import _ from "../assets/utils";

/* 自定义表单校验规则 */
const validate = {
  phone(_, value) {
    value = value.trim();
    let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
    if (value.length === 0) return Promise.reject(new Error("手机号是必填项!"));
    if (!reg.test(value)) return Promise.reject(new Error("手机号格式有误!"));
    return Promise.resolve();
  },
  code(_, value) {
    value = value.trim();
    let reg = /^\d{6}$/;
    if (value.length === 0) return Promise.reject(new Error("验证码是必填项!"));
    if (!reg.test(value)) return Promise.reject(new Error("验证码格式有误!"));
    return Promise.resolve();
  },
};

const Login = function Login(props) {
  /* 状态 */
  const [formIns] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [sendText, setSendText] = useState("发送验证码");

  /* 发送验证码 */
  const send = async () => {
    try {
      await formIns.validateFields(["phone"]);
      let phone = formIns.getFieldValue("phone");
      // 发送成功
      setDisabled(true);
    } catch (_) {}
  };

  /* 表单提交 */
  const submit = async () => {
    try {
      await formIns.validateFields();
    } catch (_) {}
  };

  return (
    <div className="login-box">
      <NavBarAgain title="登录/注册" />

      <Form
        layout="horizontal"
        style={{ "--border-top": "none" }}
        footer={
          <ButtonAgain color="primary" onClick={submit}>
            提交
          </ButtonAgain>
        }
        form={formIns}
        initialValues={{ phone: "", code: "" }}
      >
        <Form.Item
          name="phone"
          label="手机号"
          rules={[{ validator: validate.phone }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          name="code"
          label="验证码"
          rules={[{ validator: validate.code }]}
          extra={
            <ButtonAgain
              size="small"
              color="primary"
              disabled={disabled}
              onClick={send}
            >
              {sendText}
            </ButtonAgain>
          }
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
