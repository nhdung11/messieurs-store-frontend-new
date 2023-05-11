import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
  ExceptionOutlined,
  DollarCircleOutlined,
  DownOutlined,
  HeartTwoTone
} from '@ant-design/icons';
import { Avatar, Button, Col, Divider, Dropdown, Layout, Menu, Row, Space, message, theme } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './admin.scss';
import { callLogout } from '../../services/apis';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { Footer } from 'antd/es/layout/layout';
import ModalManageAccount from '../../components/Header/ModalManageAccount';




const { Header, Sider, Content } = Layout;
const items = [
  {
    key: 'dashboard',
    icon: <AppstoreOutlined />,
    label: <Link to='/admin'>Dashboard</Link>
  },
  {
    icon: <UserOutlined />,
    label: <span>Manage User</span>,
    children: [
      {
        icon: <TeamOutlined />,
        key: 'crud',
        label: <Link to='/admin/user'>CRUD</Link>
      },
      // {
      //   icon: <TeamOutlined />,
      //   key: 'files',
      //   label: "Files1"
      // }
    ]
  },
  {
    key: 'book',
    icon: <ExceptionOutlined />,
    label: <Link to='/admin/books'>Manage Books</Link>,
  },
  {
    key: 'order',
    icon: <DollarCircleOutlined />,
    label: <Link to='/admin/order'>Manage Orders</Link>,
  },
]




const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector(state => state.account.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openManageAccount, setOpenManageAccount] = useState(false)
  const handleLogout = async () => {
    const res = await callLogout()
    if (res && res?.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công")
      navigate('/')
    }
  }

  let itemsDropdown = [
    {
      label: <Link to='/'>Trang chủ</Link>,
      key: 'homepage',
    },
    {
      label: <label
        style={{ cursor: 'pointer' }}
        onClick={() => setOpenManageAccount(true)}
      >Quản lý tài khoản</label>,
      key: 'account',
    },
    {
      label: <label
        style={{ cursor: 'pointer' }}
        onClick={() => handleLogout()}
      >
        Đăng xuất
      </label>,
      key: 'logout',
    }
  ];

  const urlAvatar = ` ${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`

  return (
    <Layout className='admin-page' style={{ minHeight: "100vh" }}>

      <Sider
        breakpoint='md'
        collapsedWidth={window.innerWidth > 768 ? '80' : '0'}
        trigger={window.innerWidth > 768 ? '' : null}
        // width='50vw'
        collapsible={window.innerWidth > 768 ? 'true' : 'false'}
        theme='light'
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, textAlign: 'center' }}>Admin</div>
        <Menu

          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>


      <Layout >

        <Header
          style={{
            background: "#f2f2f2"
          }}
          className='header-admin'
        >

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='header-admin__btn'

          ></Button>



          <Dropdown menu={{ items: itemsDropdown }} trigger={['click']} >
            <a onClick={(e) => e.preventDefault()} className='header-admin__account'>
              <Space>
                <Avatar src={urlAvatar} />
                {user.fullName}

              </Space>
            </a>
          </Dropdown>

        </Header>

        <Content
          style={{
            padding: 24,
            background: "#f2f2f2"
          }}
        >
          <Outlet />
        </Content>

        <Footer style={{ padding: '1rem 0', textAlign: 'center' }}>
          &copy; Messieurs - Made with <HeartTwoTone />
        </Footer>
        <ModalManageAccount openManageAccount= {openManageAccount} setOpenManageAccount = {setOpenManageAccount}/>

      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;