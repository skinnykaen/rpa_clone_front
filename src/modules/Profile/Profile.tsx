import { UserHttp } from '@/__generated__/graphql';
import AvatarComponent from '@/components/Avatar/Avatar';
import ProfileCard from '@/components/ProfileCard';
import { gql, useQuery } from '@apollo/client';
import { Col, Row, Skeleton, Space, notification } from 'antd';

function ProfileModule() {
    const GET_USER_BY_ID = gql`
        query GetUserById($id: ID!){
            GetUserById(id: $id) {
                ... on UserHttp {
                    id
                    email
                    lastname
                    firstname 
                    nickname
                    middlename
                    createdAt
                    role
                    updatedAt
                }
            }
        }
    `;
    const { loading, data } = useQuery<{ GetUserById: UserHttp }, { id: string }>(
        GET_USER_BY_ID,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            variables: {
                id: "2"
            }
        }
    )
    console.log(data);
    return (
        <>
            {
                loading ? (
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                ) : (
                    <>
                        <Row gutter={{ xs: 8, sm: 16, md: 8, lg: 8 }}>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                <Space direction='vertical' size={'middle'}>
                                    <AvatarComponent />
                                    <ProfileCard isEditMode={true} profileData={data?.GetUserById} />
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