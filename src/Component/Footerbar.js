import React from 'react';
import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
const { Footer } = Layout;

const Footerbar = () => {
    return (
        <>
            <Footer style={{ textAlign: 'center' }}>Final Project Sanbercode React JS  <GithubOutlined /> <a href="https://github.com/yusufstawan" target="_blank" rel="noreferrer"> @yusufstawan </a> </Footer >
        </>
    )
};

export default Footerbar;
