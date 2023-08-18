import React from 'react';
import { Col, Row, Skeleton, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';

import PeekProfile from './PeekProfile';

import { UserHttp } from '@/__generated__/graphql';
import { ME } from '@/graphql/query';

import AvatarComponent from '@/components/Avatar/Avatar';
import ProfileCard from '@/components/ProfileCard';
import { Roles } from '@/models';



function ProfileModule() {
    const location = useLocation();
    const peekUserId = location?.state?.userId;
    const peekUserRole = location?.state?.userRole as string | undefined;

    let Profile = React.Component;
    if (peekUserRole == undefined) {
        Profile = graphql<object, { Me: UserHttp }>(ME)(({ data }) => (
            data?.loading ? (
                <Skeleton avatar paragraph={{ rows: 4 }} />
            ) : (
                <Row gutter={{ xs: 8, sm: 16, md: 8, lg: 8 }}>
                    <Col xs={23} sm={23} md={23} lg={8} xl={8}>
                        <Space direction='vertical' size={'middle'}>
                            <AvatarComponent />
                            <ProfileCard isEditMode={true} profileData={data?.Me} />
                        </Space>
                    </Col>
                </Row>
            )
        ));
        return <Profile id={peekUserId} />;
    } else {
        return <PeekProfile peekUserId={peekUserId} peekUserRole={peekUserRole as Roles} />;
    }
}

export default ProfileModule;