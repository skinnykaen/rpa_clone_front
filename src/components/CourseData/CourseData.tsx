import { useState } from "react";
import { Avatar, Button, Col, Modal, Row, Skeleton, Space, Tooltip, Typography } from "antd";
import { MailOutlined, LineChartOutlined, MoreOutlined, SelectOutlined, LockOutlined } from '@ant-design/icons';

import { CourseHttp, Role } from "@/__generated__/graphql";
import { CourseOverview } from "@/models";
import { courseDescriptionParser } from "@/utils";
import { EDX_TEST_COURSES_ADDRESS } from "@/consts";
import CourseAccess from "../CourseAccess";
import { useAppSelector } from "@/store";

interface CourseDataProps {
    loading: boolean;
    data?: CourseHttp;
}

function CourseData({ loading = true, data }: CourseDataProps) {
    const [open, setOpen] = useState(false);
    const userRole = useAppSelector(state => state.authReducer.userRole);

    const openCourseButtonHandler = () => {
        window.open(EDX_TEST_COURSES_ADDRESS + data?.course_id + '/about');
    };

    const courseOverview: CourseOverview = courseDescriptionParser(data?.overview || "");
    return (
        loading ? <Skeleton avatar paragraph={{ rows: 5 }} /> :
            <Space direction={'vertical'} size={'small'}>
                <Space size={'middle'}>
                    <Avatar shape='square' size={128}
                        src={data?.media?.image?.large}
                    />
                    <Col>
                        <Typography.Title level={3}>
                            {data?.name}
                        </Typography.Title>
                        <Space.Compact block>
                            <Tooltip title='Связь с преподавателем'>
                                <Button icon={<MailOutlined />} />
                            </Tooltip>
                            <Tooltip title='Прогресс'>
                                <Button icon={<LineChartOutlined />} />
                            </Tooltip>
                            <Tooltip title='Открыть'>
                                <Button icon={<SelectOutlined />} onClick={openCourseButtonHandler} />
                            </Tooltip>
                            <Tooltip title='Настроить доступ'>
                                <Button icon={<LockOutlined />} onClick={() => setOpen(true)}/>
                            </Tooltip>
                            <Tooltip title='Дополнительные ресурсы'>
                                <Button icon={<MoreOutlined />} />
                            </Tooltip>
                        </Space.Compact>
                    </Col>
                </Space>
                <Row>
                    <Typography.Title level={4}>
                        Описание
                    </Typography.Title>
                    <Typography.Text>
                        {
                            courseOverview.about
                        }
                    </Typography.Text>
                </Row>
                <Row>
                    <Typography.Title level={4}>
                        Необходимая подготовка
                    </Typography.Title>
                    <Typography.Text>
                        {
                            courseOverview.prerequisites
                        }
                    </Typography.Text>
                </Row>
                <Row>
                    <Typography.Title level={4}>
                        Часто задаваемые вопросы
                    </Typography.Title>
                    <Space direction={'vertical'} size={'small'} style={{ margin: '0 1rem' }}>
                        <ul>
                            {
                                courseOverview.faq.map(item => (
                                    <li>
                                        <Typography.Title level={5}>
                                            {item.question}
                                        </Typography.Title>
                                        <Typography.Text>
                                            {item.response}
                                        </Typography.Text>
                                    </li>
                                ))
                            }
                        </ul>
                    </Space>
                </Row>
                <Modal
                    title={'Доступ к курсу'}
                    centered
                    open={open}
                    onOk={() => setOpen(true)}
                    onCancel={() => setOpen(false)}
                    width='50%'
                >
                    <CourseAccess courseId={data?.course_id || ""} userRole={userRole}/>
                </Modal>
            </Space>
    );
}

export default CourseData;
