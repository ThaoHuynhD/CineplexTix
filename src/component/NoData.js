import React from 'react'

export default function NoData({ smallTitle }) {
    let imgURL = '/img/nodata.svg';
    let boldTitle = "There’s nothing here";
    let sTitle = smallTitle ? smallTitle : "Please reset the page or try again later!";
    return (
        <div class="w-full lg:h-500 flex items-center flex-wrap justify-center">
            <div class="w-120 h-360">
                <div className='wx-auto p-10 grid justify-center'>
                    <img src={imgURL} alt='file-nodata' /></div>
                <div>
                    <h2 class="text-center font-bold text-lg leading-7 pb-1">{boldTitle}</h2>
                    <p class="text-center pb-4">{sTitle} </p>
                </div>
            </div>
        </div>
    )
}
