import React from 'react'

export default function NoData() {
    let imgURL = '/img/nodata.svg';
    let boldTitle = "There’s nothing here";
    let smallTitle = "Please reset the page or try again later!";
    // let buttonTitleLeft = "Clear Filter";
    // let buttonTitleRight = "Change Filter";

    return (
        <div class="w-full lg:h-500 flex items-center flex-wrap justify-center">
            <div class="w-120 h-360">
                <div className='wx-auto p-10 grid justify-center'>
                    <img src={imgURL} alt='file-nodata' /></div>
                <div>
                    <h2 class="text-center font-bold text-lg leading-7 pb-1">{boldTitle}</h2>
                    <p class="text-center pb-4">{smallTitle} </p>
                    {/* <div class="flex gap-3">
                        <button class="w-full px-3 py-2 rounded-full border"> {buttonTitleLeft} </button>
                        <button class="w-full px-3 py-2 bg-red-600 hover:bg-red-700 transition-all duration-500 rounded-full leading-4"> {buttonTitleRight} </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
