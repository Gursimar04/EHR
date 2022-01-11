import { useState, useEffect } from 'react';
import { Menu, Button, message, notification} from 'antd';
import dummyStyle from './Dummy.module.scss'
import Loader from './Loader'
import Not from './Notification'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined
} from '@ant-design/icons';


function Nav() {
    
    const { SubMenu } = Menu;
    const [collapsed,setCollapsed] = useState(true);
    const [Notifs,setNotifs] = useState(false);


      useEffect(() => {
        message.warning('You have unread Notifications');
        const openNotification = placement => {
            notification.info({
              message: `Appointment Alert`,
              description: "Follow Up on Diabetic Retaonpathy at 4:30 pm",
              placement,
            });
          };

          setTimeout(function() {
            openNotification('topLeft')
        }, 2000)

      },[]);

  return (
      <div className = {dummyStyle.app}>
    <div className = {dummyStyle.nav}>
        <Button type="primary" onClick={()=>{setCollapsed(!collapsed)}}>
          { (collapsed && <MenuUnfoldOutlined/>) || <MenuFoldOutlined/>}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
      //    defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" onClick ={()=>{setNotifs(true)}} icon={<MailOutlined/>}>
            Read Notifications
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Grant Authorization
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            View Medical Records
          </Menu.Item>
          <SubMenu key="sub1" icon={<ContainerOutlined />} title="Add/Update Data">
            <Menu.Item key="5">Appointment</Menu.Item>
            <Menu.Item key="12">Prognosis</Menu.Item>
            <Menu.Item key="6">Prescription</Menu.Item>
            <Menu.Item key="7">Update</Menu.Item>
            <Menu.Item key="8">Scan</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Your Profile">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    {(Notifs && <Not/>) || <Loader/> }
    </div>
  );
}

export default Nav;