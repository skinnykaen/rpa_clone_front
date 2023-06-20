import { ReactNode } from 'react';
import { Layout } from 'antd';

import AppSider from '@/components/AppSider';

const { Content } = Layout;

type PropsWithChildren<P> = P & { children: ReactNode };

function PageLayout({ children }: PropsWithChildren<any>) {
    return (
        <Layout style={{ height: '100%' }}>
            <AppSider />
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default PageLayout;