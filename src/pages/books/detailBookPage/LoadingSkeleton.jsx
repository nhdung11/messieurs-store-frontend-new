import { Skeleton, Space } from "antd";

const LoadingSkeleton = () => {
    return (
        <>
            <div className='book-detail--img' style={{ background: "#ffffff", padding: '20px' }}>
                <Skeleton.Input
                    active
                    block={true}
                    style={{ width: '100%', height: 350 }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, gap: 20 }}>
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                </div>

            </div>
            <div className='book-detail--content' style={{ background: "#ffffff", padding: '20px' }}>
                <div>
                    <Skeleton
                        active
                        paragraph = {{width: [800, 700, 400]}}
                    />
                </div>
                {/* <div style={{ marginTop: 16 }}>
                    <Skeleton.Input
                        active
                        block={true}
                        style={{ width: '100%', height: 48 }}
                    />
                </div> */}

                <div>
                    <Skeleton
                        active
                        paragraph={{ rows: 2, width: [600, 400] }}
                        style={{ marginTop: 32 }}
                    />
                </div>

                <div style={{marginTop: 60}}>
                    <Skeleton.Button 
                        active
                        style={{width: 160, height: 40, marginRight: 32}}
                    />
                    <Skeleton.Button 
                        active
                        style={{width: 100, height: 40}}
                    />
                </div>
            </div>
        </>



    )
}

export default LoadingSkeleton;