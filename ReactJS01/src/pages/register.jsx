import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, email, password } = values;
        try {
            const res = await createUserApi(name, email, password);
            // Nếu API trả về dữ liệu và không có thuộc tính message lỗi
            if (res && res.id) {
                notification.success({
                    message: "ĐĂNG KÝ THÀNH CÔNG",
                    description: "Tài khoản đã được tạo, vui lòng đăng nhập."
                });
                navigate("/login");
            } else {
                notification.error({
                    message: "ĐĂNG KÝ THẤT BẠI",
                    description: res?.message || "Đã xảy ra lỗi khi tạo tài khoản."
                });
            }
        } catch (error) {
            notification.error({
                message: "LỖI KẾT NỐI",
                description: "Không thể gọi API. Hãy kiểm tra xem BackEnd đã chạy chưa?"
            });
        }
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <legend>Đăng Ký Tài Khoản</legend>
                    <Form
                        name="register_form"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập đúng định dạng Email!' }]}
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

                        <Form.Item
                            label="Họ tên"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Đăng Ký (Submit)
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link to={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    )
}
export default RegisterPage;