import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Image, Modal, Row } from 'antd';
import ImageGallery from 'react-image-gallery';
import './detailBookPage.scss'
const ModalViewDetailImage = (props) => {
  const { openViewImageBook, setOpenViewImageBook, currentIndexImage, dataBook, title } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const refGallery = useRef(null)

  const images = dataBook?.items ?? []
  const handleCancel = () => {
    setOpenViewImageBook(false);
  };

  useEffect(() => {
    if (openViewImageBook) {
      setActiveIndex(currentIndexImage)
    }
  }, [openViewImageBook, currentIndexImage])



  return (
    <>
      <Modal
        width={'60vw'}
        height={'60vh'}
        open={openViewImageBook}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        className='modal-detail'
      >
        <Row gutter={[20, 20]}>
          <Col span={16}>
            <div>
              <ImageGallery
                items={images}
                ref={refGallery}
                showFullscreenButton={false}
                startIndex={currentIndexImage}
                showPlayButton={false}
                onSlide={currentIndexImage => setActiveIndex(currentIndexImage)}
                showThumbnails={false}
              />
            </div>
          </Col>
          <Col span={8}>
            <h3 style={{fontSize: 20, marginBottom: 12}}>{dataBook?.mainText}</h3>
            <div>
              <Row gutter={[20, 20]}>
                {images.map((image, index) => {
                  return (
                    <Col key={`image-${index}`}>
                      <Image
                        wrapperClassName='image-slider'
                        width='6rem'
                        height='6rem'
                        src={`${image.thumbnail}`}
                        preview={false}
                        onClick={() => refGallery.current.slideToIndex(index)}
                      />
                      <div className={activeIndex === index ? "active" : ""}></div>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </Modal >
    </>
  );
};

export default ModalViewDetailImage;