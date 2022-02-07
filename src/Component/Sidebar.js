import React from 'react';
import { Layout, Menu } from 'antd';
import { PlayCircleTwoTone, CarTwoTone, SettingTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => {
    return (
        <>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" icon={<PlayCircleTwoTone />} title="Manage Movie">
                        <Menu.Item key="1"><Link to={'/dashboard/movies'}>Tabel Movie</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={'/dashboard/movies/create'}>Create Movie</Link></Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" icon={<CarTwoTone />} title="Manage Games">
                        <Menu.Item key="3"><Link to={'/dashboard/games'}>Tabel Games</Link></Menu.Item>
                        <Menu.Item key="4"><Link to={'/dashboard/games/create'}>Create Games</Link></Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub3" icon={<SettingTwoTone />} title="Manage Account">
                        <Menu.Item key="5"><Link to={'/reset'}>Change Password</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        </>
    )
};

export default Sidebar;
