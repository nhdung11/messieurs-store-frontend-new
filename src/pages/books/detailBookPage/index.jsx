import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import './detailBookPage.scss'
import { Button, InputNumber, Rate, message } from 'antd';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BsCartPlus } from 'react-icons/bs'
import ModalViewDetailImage from './ModalViewImageBook';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { callFetchBookById } from '../../../services/apis';
import LoadingSkeleton from './LoadingSkeleton';
import { useDispatch } from 'react-redux';
import {doAddActionBook} from '../../../redux/order/orderSlider'

const DetailBookPage = () => {

    const refGallery = useRef(null)
    const [openViewImageBook, setOpenViewImageBook] = useState(false)
    const [currentIndexImage, setCurrentIndexImage] = useState(0)
    const [dataBook, setDataBook] = useState()
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    const id = params?.get('id')


    useEffect(() => {
        fetchBookById(id)
    }, [id])
    const fetchBookById = async (id) => {
        const res = await callFetchBookById(id)
        if (res && res.data) {
            let raw = res.data
            raw.items = getImages(raw)
            setTimeout(() => {
                setDataBook(raw)
            }, 2000)
        }
    }
    // console.log("Res book by Id - (data  book): ", dataBook)

    const getImages = (raw) => {
        const images = []
        if (raw.thumbnail) {
            images.push({
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                originalClass: 'original-class',
                thumbnailClass: 'thumbnail-class'
            },)
        }
        if (raw.slider) {
            raw.slider?.map(item => {
                images.push({
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    originalClass: 'original-class',
                    thumbnailClass: 'thumbnail-class'
                },)
            })

        }
        return images;
    }

    const images = dataBook?.items ?? []
    const openViewDetailBookImage = () => {
        setOpenViewImageBook(true)
        setCurrentIndexImage(refGallery?.current?.getCurrentIndex() ?? 0)
        // console.log("current index: ", currentIndexImage)
    }

    const handleChangeButton =(type) => {
        if(type === "MINUS") {
            if(currentQuantity - 1 <= 0) return ;
            setCurrentQuantity(currentQuantity -1)
        }
        if(type === "PLUS") {
            if(currentQuantity === +dataBook?.quantity) return ;
            setCurrentQuantity(currentQuantity + 1)
        }
    }
    const handleChangeInput = (value) => {
        if(!isNaN(value)){
            if(+value > 0 && value <= +dataBook.quantity) {
                setCurrentQuantity(+value)
            }
        }
    }

    const handleAddToCart = (quantity, book) => {
        dispatch(doAddActionBook({quantity, detail: book, _id: book._id}))
    }
    return (
        <div style={{ background: '#efefef' }} className='book-container'>
            <div className='book-detail' >
                {dataBook && dataBook._id ?
                    <>
                        <div className='book-detail--img' style={{ background: "#ffffff", padding: '20px' }}>
                            <ImageGallery
                                items={images}
                                ref={refGallery}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                renderLeftNav={() => { <></> }}
                                renderRightNav={() => <></>}
                                onClick={() => openViewDetailBookImage()}
                            />

                        </div>
                        <div className='book-detail--content' style={{ background: "#ffffff", padding: '20px' }}>
                            <div className='author'>
                                Tác giả: <a href="#">{dataBook?.author}</a>
                            </div>
                            <div className='title'>
                                {dataBook?.mainText}
                            </div>
                            <div className='rating'>
                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                <span className="rate-text">Đã bán {dataBook?.sold}</span>
                            </div>
                            <div className='price'>
                                <span>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook?.price)}
                                </span>
                            </div>
                            <div className='shipping'>
                                Vận chuyển:
                                <span style={{ display: 'flex', justifyItems: 'end' }}>
                                    <img
                                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/74f3e9ac01da8565c3baead996ed6e2a.png'
                                        style={{ height: '20px', marginRight: '10px' }}
                                    />
                                    Miễn phí vận chuyển</span>
                            </div>
                            <div className='quantity'>
                                <div>
                                    Số lượng:
                                </div>
                                <div className='quantity-btn'>
                                    <button onClick={() => handleChangeButton("MINUS")}><AiOutlineMinus /></button>
                                    <input onChange={(e) => handleChangeInput(+e.target.value)} value={currentQuantity} />
                                    <button onClick={() => handleChangeButton("PLUS")}><AiOutlinePlus /></button>
                                </div>
                            </div>
                            <div className='buy'>
                                <button className='btn-cart'
                                    onClick={() => {
                                        handleAddToCart(currentQuantity, dataBook)
                                        console.log("dataBook new: ", dataBook, currentQuantity)
                                    }}
                                >
                                    <BsCartPlus />
                                    <span>Thêm vào giỏ hàng</span>
                                </button>
                                <button 
                                className='btn-text'
                                // onClick={() => {
                                //     handleAddToCart(currentQuantity, dataBook)
                                //     navigate('/order')
                                // }}
                                >
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <LoadingSkeleton />

                }
            </div>
            <ModalViewDetailImage
                openViewImageBook={openViewImageBook}
                dataBook={dataBook}
                currentIndexImage={currentIndexImage}
                setOpenViewImageBook={setOpenViewImageBook}

            />
        </div>

    )
}

export default DetailBookPage;
