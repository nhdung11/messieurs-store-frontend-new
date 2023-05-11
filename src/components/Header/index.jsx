import React, { useState } from 'react'

import { FaReact } from 'react-icons/fa'
import { BsCart } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { Avatar, Badge, Divider, Drawer, Dropdown, Popover, Space, message } from 'antd'
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { callLogout } from '../../services/apis'
import { doLogoutAction } from '../../redux/account/accountSlice'

import './header.scss'
import { Link, useNavigate } from 'react-router-dom'
import ModalManageAccount from './ModalManageAccount'


const Header = (props) => {

    const { searchTerm, setSearchTerm } = props
    const [open, setOpen] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const user = useSelector(state => state.account.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const carts = useSelector(state => state.order.carts)
    const [openManageAccount, setOpenManageAccount] = useState(false)

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        const res = await callLogout()
        if (res && res?.data) {
            dispatch(doLogoutAction());
            message.success("Đăng xuất thành công")
            navigate('/')
        }
    }
    // Dropdown Account 
    let items = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenManageAccount(true)}
            >Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to='/history' style={{ cursor: 'pointer' }}>Lịch sử mua hàng</Link>,
            key: 'order',
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

    if (user.role === "ADMIN") {
        items.unshift({
            label: <Link to='/admin' style={{ cursor: "pointer" }}>Trang quản trị</Link>,
            key: 'role-admin'
        })
    }
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`
    // console.log("Test url avatar: ", import.meta.env.VITE_BACKEND_URL )

    const backHomePage = () => { navigate('/') }
    // console.log("Carts checkkkk:111 ", carts)


    const handleCartOrder = () => {
        navigate('/order')
    }

    const content = (
        <div className='cart-container'>
            {carts && carts.length > 0 ? <>
                {carts.map((item, index) => {
                    // console.log("item carts: ", item)
                    return (
                        <div className='cart-item' key={`book-${item._id}`}>
                            <img
                                className='cart-item-img'
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`}
                            />
                            <div className='cart-item--text'>
                                <span>{item?.detail?.mainText}</span>
                            </div>
                            <span className='cart-item--price'>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.detail?.price ?? 0)}
                            </span>
                        </div>
                    )
                }
                )}
            </> : <h3 className='empty-cart' style={{ textAlign: 'center', padding: 16 }}>Your cart is empty</h3>}
            <div className='cart-watch' onClick={() => handleCartOrder()}>
                <button className='cart-watch-btn' >Xem Giỏ Hàng</button>
            </div>
        </div>
    );



    return (
        <>
            <div className='header-container'>
                <header className='header'>
                    <div className='header-logo'>
                        <span className='header-logo__large'
                            onClick={() => backHomePage()}
                        >
                            <FaReact className='icon-react' /> Messieurs
                        </span>

                        <AiOutlineMenu className='icon-menu' onClick={showDrawer} />
                    </div>
                    <form className='header-search'>
                        <BsSearch className='icon-search' />
                        <input
                            value={searchTerm}
                            placeholder='Bạn tìm gì hôm nay'
                            className='input-search'
                            onChange={(e) => {
                                console.log(e.target.value)
                                setSearchTerm(e.target.value)
                            }}
                        // value={searchTerm}
                        ></input>
                        <button type='submit' className='submit-search' onClick={(e) => e.preventDefault()}>Tìm kiếm</button>
                    </form>
                    <div className='header-account'>
                        <div className='cart-item'>
                            <Popover
                                placement='bottomRight'
                                content={content}
                                title="Sản phầm mới thêm"
                            // trigger={'click'}
                            >
                                <Badge count={carts?.length ?? 0}>
                                    <BsCart className='icon-cart' />
                                </Badge>
                            </Popover>
                        </div>
                        <div className='account'>
                            {
                                isAuthenticated === true ?
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Avatar src={urlAvatar} />
                                                {user.fullName}

                                            </Space>
                                        </a>
                                    </Dropdown>
                                    :
                                    <span onClick={() => navigate('/login')}>Tài khoản</span>
                            }
                        </div>
                    </div>
                </header>
            </div>
            <ModalManageAccount openManageAccount={openManageAccount} setOpenManageAccount={setOpenManageAccount} />
            <Drawer
                title="Menu"
                placement={'left'}
                onClose={onClose}
                open={open}
            >
                <p
                    onClick={() => {
                        backHomePage();
                        setOpen(false)
                    }}>
                    Trang chủ
                </p>
                <Divider />
                <p
                    onClick={() => setOpenManageAccount(true)}
                >Quản lý tài khoản</p>
                <Divider />
                <p
                    onClick={() => {
                        navigate('/history')
                        setOpen(false)
                        console.log('isAuthenticated: ', isAuthenticated)
                    }}
                >Lịch sử đặt hàng
                </p>
                <Divider />

                {isAuthenticated === false ? <p onClick={() => navigate('/login')}>Đăng nhập</p>
                    :
                    <p onClick={() => {
                        handleLogout()
                        setOpen(false)
                    }}>Đăng xuất</p>
                }




            </Drawer>
        </>

    )
}

export default Header;
