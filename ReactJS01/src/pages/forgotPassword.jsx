import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { forgotPasswordApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { email, newPassword } = values;
        try {
            const res = await forgotPasswordApi(email, newPassword);
            if (res && res.EC === 0) {
                notification.success({ message: "Thành công", description: res.EM });
                navigate("/login");
            } else {
                notification.error({ message: "Thất bại", description: res?.EM ?? "Lỗi" });
            }
        } catch (error) {
            notification.error({ message: "Lỗi kết nối", description: "Không gọi được API" });
        }
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <legend>Quên Mật Khẩu</legend>
                    <Form onFinish={onFinish} layout='vertical'>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Nhập email!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Mật khẩu mới" name="newPassword" rules={[{ required: true, message: 'Nhập mật khẩu mới!' }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>Đổi mật khẩu</Button>
                        </Form.Item>
                    </Form>
                    <Link to={"/login"}><ArrowLeftOutlined /> Quay lại đăng nhập</Link>
                </fieldset>
            </Col>
        </Row>
    )
}
export default ForgotPasswordPage;