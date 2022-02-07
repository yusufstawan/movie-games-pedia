import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Nav from '../Component/Nav';
import Sidebar from '../Component/Sidebar';
import Footerbar from '../Component/Footerbar';
import Cookies from 'js-cookie';

const { Content } = Layout;

const LayoutComponent = (props) => {
    return (
        <>
            {props.login && props.content}
            {props.register && props.main}
            {props.main && (
                <Layout>
                    <Nav />
                    <Layout>
                        {Cookies.get('token') && <Sidebar />}
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 500,
                                }}
                            >
                                {props.content}
                            </Content>
                            <Footerbar />
                        </Layout>
                    </Layout>
                </Layout>
            )}
        </>
    )
};

export default LayoutComponent;
