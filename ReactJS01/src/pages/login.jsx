import React, { useContext } from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { loginApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';
import { ArrowLeftOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const onFinish = async (values) => {
        const { email, password } = values;
        try {
            const res = await loginApi(email, password);

            if (res && res.EC === 0) {
                // Lưu token vào LocalStorage để các lần gọi API sau tự lấy dùng
                localStorage.setItem("access_token", res.access_token);

                notification.success({
                    message: "ĐĂNG NHẬP THÀNH CÔNG",
                    description: "Chào mừng bạn quay trở lại!"
                });

                // Cập nhật trạng thái đăng nhập toàn cục
                setAuth({
                    isAuthenticated: true,
                    user: {
                        email: res?.user?.email ?? "",
                        name: res?.user?.name ?? ""
                    }
                });
                navigate("/");
            } else {
                notification.error({
                    message: "ĐĂNG NHẬP THẤT BẠI",
                    description: res?.EM ?? "Email hoặc mật khẩu không chính xác."
                });
            }
        } catch (error) {
            notification.error({
                message: "LỖI HỆ THỐNG",
                description: "Server BackEnd không phản hồi. Vui lòng kiểm tra Terminal của ExpressJS."
            });
        }
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <legend>Đăng Nhập Hệ Thống</legend>
                    <Form
                        name="login_form"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Đăng Nhập (Login)
                            </Button>
                            <div style={{ textAlign: "right", marginBottom: "10px" }}>
                                <Link to={"/forgot-password"}>Quên mật khẩu?</Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Link to={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Chưa có tài khoản? <Link to={"/register"}>Đăng ký ngay</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    )
}
export default LoginPage;