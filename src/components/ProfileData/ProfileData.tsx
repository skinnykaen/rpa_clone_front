import { graphql } from "@apollo/client/react/hoc";
import { Col, Row, Skeleton, Space, Typography } from "antd";

import { RobboGroupHttp, UserHttp } from "@/__generated__/graphql";
import { GET_USER_BY_ID } from "@/graphql/query";
import AvatarComponent from "@/components/Avatar";
import ProfileCard from "@/components/ProfileCard";

interface ProfileDataProps {
    userId: number;
    robboGroup?: RobboGroupHttp;
}

function ProfileData({ userId, robboGroup }: ProfileDataProps) {
    const ProfileData = graphql<{ id: string }, { GetUserById: UserHttp }>(GET_USER_BY_ID)(({ data }) => (
        data?.loading ? (
            <Skeleton avatar paragraph={{ rows: 8 }} />
        ) : (
            <Col xs={24} sm={23} md={23} lg={23} xl={23}>
                <Space direction='vertical' size={'middle'}>
                    <AvatarComponent />
                    <ProfileCard isEditMode={true} profileData={data?.GetUserById} />
                </Space>
            </Col>
        )
    ));
    return <ProfileData id={String(userId)} />;
}

export default ProfileData;