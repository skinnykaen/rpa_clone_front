import { graphql } from "@apollo/client/react/hoc";
import { Col, Row, Skeleton, Space, Typography } from "antd";

import { RobboGroupHttp, UserHttp } from "@/__generated__/graphql";
import { GET_USER_BY_ID } from "@/graphql/query";
import AvatarComponent from "@/components/Avatar";
import ProfileCard from "@/components/ProfileCard";

interface ProfileDataProps {
    userId: number;
    isEditMode?: boolean;
    robboGroup?: RobboGroupHttp;
}

function ProfileData({ userId, isEditMode = false }: ProfileDataProps) {
    const ProfileData = graphql<{ id: string, isEditMode: boolean }, { GetUserById: UserHttp }>(GET_USER_BY_ID)(({ data }) => (
        data?.loading ? (
            <Skeleton avatar paragraph={{ rows: 8 }} />
        ) : (
            <Col xs={24} sm={23} md={23} lg={23} xl={23}>
                <Space direction='vertical' size={'middle'}>
                    <AvatarComponent />
                    <ProfileCard isEditMode={isEditMode} profileData={data?.GetUserById} />
                </Space>
            </Col>
        )
    ));
    return <ProfileData id={String(userId)} isEditMode={isEditMode} />;
}

export default ProfileData;