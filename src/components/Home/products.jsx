import { Col, Divider, Pagination, Rate, Row, Spin, Tabs } from "antd"
import './products.scss'
import { useEffect, useState } from "react"
import { callFetchBooks } from "../../services/apis"
import { Navigate, useNavigate } from "react-router-dom"
import { FilterTwoTone } from "@ant-design/icons"
import FilterMobile from "./FilterMobile"

const Products = (props) => {
    const [listBooks, setListBooks] = useState([])
    const [isLoadingBooks, setIsLoadingBooks] = useState(false)
    const [currentPageBooks, setCurrentPageBooks] = useState(1)
    const [pageSizeBooks, setPageSizeBooks] = useState(10)
    const [total, setTotal] = useState(0)
    const [openFilterMobile, setOpenFilterMobile] = useState(false)
    // const [filtersBooks, setFiltersBooks] = useState('')
    // const [sortQueryBooks, setSortQueryBooks] = useState('sort=-sold')
    const navigate = useNavigate()
    const { filtersBooks, setFiltersBooks, sortQueryBooks, setSortQueryBooks, searchTerm, setSearchTerm} = props
    useEffect(() => {
        fetchBooks()
    }, [currentPageBooks, pageSizeBooks, filtersBooks, sortQueryBooks, searchTerm])

    const fetchBooks = async () => {
        setIsLoadingBooks(true)

        let query = `current=${currentPageBooks}&pageSize=${pageSizeBooks}`

        if (filtersBooks) {
            query += `&${filtersBooks}`
            // console.log("query: ", query)
        }

        if (sortQueryBooks) {
            query += `&${sortQueryBooks}`
        }

        if(searchTerm) {
            setCurrentPageBooks(1)
            query += `&mainText=/${searchTerm}/i`
        }
        const res = await callFetchBooks(query)
        console.log("Res data books: ", res)
        console.log("Query: ", query)
        if (res && res.data) {
            setListBooks(res.data.result);
            setTotal(res.data.meta.total)
            console.log('list books - res:  ', listBooks)
        }
        setIsLoadingBooks(false)
    }

    const onChange = (key) => {
        setSortQueryBooks(key)
        setCurrentPageBooks(1)
    };



    const items = [
        {
            key: '1',
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: 'sort=-updatedAt',
            label: `Hàng mới`,
            children: <></>,
        },
        {
            key: 'sort=price',
            label: `Giá thấp đến cao`,
            children: <></>,
        },
        {
            key: 'sort=-price',
            label: `Giá cao xuống thấp`,

            children: <></>,
        },


    ];

    const handleOnChangePage = (page, pageSize) => {
        // console.log("page, pageSize: ", page, pageSize )
        if (page !== currentPageBooks) {
            setCurrentPageBooks(page)
        }
        if (pageSize !== pageSizeBooks) {
            setPageSizeBooks(pageSize)
        }
    }


    const nonAccentVietnamese = (str) => {
        str = str.toLowerCase();
        //     We can also use this instead of from line 11 to line 17
        //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
        //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
        //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
        //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
        //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
        //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
        //     str = str.replace(/\u0111/g, "d");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    const convertSlug = function (str) {
        str = nonAccentVietnamese(str)
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        // var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        // var to = "aaaaaeeeeeiiiiooooouuuunc------";
        let from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        let to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    };
    const handleConvertSlug = (text) => {
        const slug = convertSlug(text.mainText)
        navigate(`/book/${slug}?id=${text._id}`)
    }

    return (
        <Spin spinning={isLoadingBooks}>

            <Row>
                <Col span={24}>
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                    />
                </Col>
            </Row>
            <Row>
                <h4
                    className="filter-icon"
                    onClick={() => setOpenFilterMobile(true)}
                >
                    <FilterTwoTone /> Lọc
                </h4>
            </Row>
            <Row className="customize-row">

                {listBooks.map((item) => {
                    // console.log("Item list: ", item.mainText)
                    return (
                        <div className="column" key={item._id}
                            onClick={() => handleConvertSlug(item)}
                        >
                            <div className="wrapper">
                                <div className="thumbnail">
                                    {/* <img src={`http://localhost:8080/images/book/${item.thumbnail}`}></img> */}
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`}></img>
                                </div>
                                <div className="text">{item.mainText}</div>
                                {/* <div className="text">{`${item.mainText.length > 55 ? `${item.mainText.substring(0, 55)}...` : item.mainText }`}</div> */}

                                <div className="price">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                </div>
                                <div className="rating">
                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                    <span>Đã bán {item.sold}</span>
                                </div>
                            </div>
                        </div>

                    )

                })}


            </Row>
            <Divider />
            <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    total={total}
                    current={currentPageBooks}
                    pageSize={pageSizeBooks}
                    responsive
                    onChange={(page, pageSize) => handleOnChangePage(page, pageSize)}
                />
            </Row>
            <FilterMobile
                filtersBooks={filtersBooks}
                setFiltersBooks={setFiltersBooks}
                sortQueryBooks={sortQueryBooks}
                setSortQueryBooks={setSortQueryBooks}
                openFilterMobile={openFilterMobile}
                setOpenFilterMobile={setOpenFilterMobile}
            />
        </Spin>
    )
}


export default Products;