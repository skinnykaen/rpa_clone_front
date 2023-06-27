import { UserHttp } from '@/__generated__/graphql';
import AvatarComponent from '@/components/Avatar/Avatar';
import ProfileCard from '@/components/ProfileCard';
import { ME } from '@/graphql/query';
import { useQuery } from '@apollo/client';
import { Col, Row, Skeleton, Space, notification } from 'antd';

function ProfileModule() {
    const { loading, data } = useQuery<{ Me: UserHttp }>(
        ME,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
        }
    )
    return (
        <>
            {
                loading ? (
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                ) : (
                    <>
                        <Row gutter={{ xs: 8, sm: 16, md: 8, lg: 8 }}>
                            <Col xs={23} sm={23} md={23} lg={8} xl={8}>
                                <Space direction='vertical' size={'middle'}>
                                    <AvatarComponent />
                                    <ProfileCard isEditMode={true} profileData={data?.Me} />
                                </Space>
                            </Col>
                        </Row>
                    </>
                )
            }
        </>
    )
}

export default ProfileModule;