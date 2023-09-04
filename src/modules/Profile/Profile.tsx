import { Col, Row, Skeleton, Space } from 'antd';
import { graphql } from '@apollo/client/react/hoc';

import { QueryGetChildrenByParentArgs, Role, UserHttp, UsersList } from '@/__generated__/graphql';
import { GET_CHILDREN_BY_PARENT, ME } from '@/graphql/query';

import AvatarComponent from '@/components/Avatar/Avatar';
import ProfileCard from '@/components/ProfileCard';
import { ACCESS_TOKEN } from '@/consts';
import StudentDrawer from '@/modules/StudentDrawer';
import UsersListComponent from '@/components/UsersList';



function ProfileModule() {
    // const location = useLocation();
    // const peekUserId = location?.state?.userId;
    // const peekUserRole = location?.state?.userRole as string | undefined;

    // let Profile = React.Component;
    // if (peekUserRole == undefined) {
    //     Profile = graphql<object, { Me: UserHttp }>(ME, {skip: !localStorage.getItem(ACCESS_TOKEN)})(({ data }) => (
    //         data?.loading ? (
    //             <Skeleton avatar paragraph={{ rows: 4 }} />
    //         ) : (
    //             <Row gutter={{ xs: 8, sm: 16, md: 8, lg: 8 }}>
    //                 <Col xs={23} sm={23} md={23} lg={8} xl={8}>
    //                     <Space direction='vertical' size={'middle'}>
    //                         <AvatarComponent />
    //                         <ProfileCard isEditMode={true} profileData={data?.Me} />
    //                     </Space>
    //                 </Col>
    //             </Row>
    //         )
    //     ));
    //     return <Profile />;
    // } else {
    //     return <PeekProfile peekUserId={peekUserId} peekUserRole={peekUserRole as Roles} />;
    // }
    const Children = graphql<QueryGetChildrenByParentArgs, { GetChildrenByParent: UsersList }>(GET_CHILDREN_BY_PARENT)(({ data }) => (
        <UsersListComponent
            isLoading={data?.loading || false}
            users={data?.GetChildrenByParent?.users}
            countRows={data?.GetChildrenByParent?.countRows || 0}
            renderDrawer={(isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) =>
                <StudentDrawer isOpen={isOpen} setOpen={setOpen} studentId={userId} />
            }
        />
    ));
    const Profile = graphql<object, { Me: UserHttp }>(ME, { skip: !localStorage.getItem(ACCESS_TOKEN) })(({ data }) => (
        data?.loading ? (
            <Skeleton avatar paragraph={{ rows: 4 }} />
        ) : (
            <Row gutter={{ xs: 8, sm: 16, md: 8, lg: 8 }}>
                <Col xs={23} sm={23} md={23} lg={8} xl={8}>
                    <Space direction='vertical' size={'middle'}>
                        <AvatarComponent />
                        <ProfileCard isEditMode={true} profileData={data?.Me} />
                    </Space>
                    {
                        data?.Me?.role == Role.Parent &&
                        <Children parentId={data.Me.id}/>
                    }
                </Col>
            </Row>
        )
    ));
    return <Profile />;
}

export default ProfileModule;