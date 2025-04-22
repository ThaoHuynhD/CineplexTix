import React, { useEffect, useState } from 'react'
import { Carousel, message } from 'antd';
import { getMovieBanner } from '../api/api.js';
import { ERROR_MESSAGE } from '../constant/constant.js';

export default function SliderMovie() {
    const [banner, setBanner] = useState([]);
    let fetchData = async () => {
        try {
            let response = await getMovieBanner();
            setBanner(response.data.content);
        } catch {
            message.error(ERROR_MESSAGE);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='SliderMovie'>
            <Carousel autoplay>
                {banner.map((item, index) => {
                    return (
                        <div className='item max-h-650' key={index}>
                            <div className='container mx-auto px-4 relative'>
                                <img className='absolute left-0 lg:left-30 lg:ml-16 top-0 z-10 lg:w-11/12 w-full h-500 lg:h-650' src={item.hinhAnh} alt="" />
                            </div>
                            <div className=' z-0 relative  w-screen
                            after:block after:bg-black after:opacity-70 
                            after:absolute after:top-0 after:left-0 after:z-10
                            after:h-full after:w-screen lg:h-650 h-500'
                                style={{
                                    backgroundImage: `url(${item.hinhAnh})`,
                                    backgroundSize: 'cover', backgroundPositionY: '-100px'
                                }}
                            ></div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    )
}

