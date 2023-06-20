import { Button, Form, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';

function ForgotPassword() {
    const [, forceUpdate] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        forceUpdate({});
    }, []);
    return (
        <Form
            onFinish={() => console.log('forgot password')}
            form={form}
        >
            <Typography.Text>
                Введите ваш email, на который мы
                отправим Вам инструкцию для востановления доступа к аккаунту.
            </Typography.Text>
            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваш email',
                    },
                    {
                        min: 6,
                        message: 'Пожалуйста, введите корректный email',
                    },
                ]}
            >
                <Input
                    placeholder='Email'
                    size='middle'
                />
            </Form.Item>
            <Form.Item shouldUpdate>
                {
                    () => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Отправить
                        </Button>
                    )
                }
            </Form.Item>
        </Form>
    );
}

export default ForgotPassword;