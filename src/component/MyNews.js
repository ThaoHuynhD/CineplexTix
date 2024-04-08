import React from 'react'
const newsArr = [
  {
    title: 'DC tung trailer Joker đầy ám ảnh và điên loạn',
    type: 'PHIM ÂU MỸ',
    detail: 'Joker, nhân vật phản diện đình đám nhất của nhà DC, đã chính thức trở lại với một diện mạo mới do nam tài tử Joaquin Phoenix thủ diễn.',
    image: 'https://1.bp.blogspot.com/-UVkSHJG8BdA/XZANa1Qg13I/AAAAAAAAboM/l41FEvdKEZw_GPxHW90JFZVV_iVJCrDxQCLcBGAsYHQ/s2560/5k-joker-joaquin-phoenix-2019-dr-2560x1440.jpg',
  },
  {
    title: 'Lật mặt 6 thu 20 tỉ trong 1 ngày, đạt 45 tỉ đồng tính đến sáng 29.4',
    type: 'PHIM VIỆT',
    detail: 'Hôm qua, 28.4 là ngày chiếu chính thức đầu tiên tại các rạp của bộ phim Lật mặt 6: Tấm vé định mệnh do Lý Hải đạo diễn và thật bất ngờ, phim thu được 20 tỉ đồng chỉ trong 1 ngày chiếu này. Cộng với 2 ngày chiếu sớm (chỉ từ 19 giờ ngày 26-27.4), tình đến sáng 29.4, Lật mặt 6: Tấm vé định mệnh đã đạt doanh thu tổng cộng 45 tỉ đồng.',
    image: 'https://i.pinimg.com/564x/fd/c8/6b/fdc86b5996264fb9dfdc214239220ee9.jpg',
  },
  {
    title: 'Phim mới của Pixar ra mắt tại Cannes 2023',
    type: 'PHIM HOẠT HÌNH',
    detail: 'Tác phẩm hoạt hình mới nhất của Pixar - "Elemental" (Xứ sở các nguyên tố) - công chiếu tại đêm bế mạc Liên hoan phim Cannes 2023, ngày 27/5. ',
    image: 'https://i1-giaitri.vnecdn.net/2023/04/20/ELMTeaserOpposites1sv60Mech9FS-7572-5386-1681978659.png?w=500&h=300&q=100&dpr=1&fit=crop&s=7I3Z976NUus1HGiNvBdoHw',
  },

]
export default function MyNews() {
  return (
    <div id='myNews' className=' py-20'>
      <div className='container lg:p-5 text-center'>
        <span className='px-5 py-2 lg:text-3xl text-2xl mx-auto font-semibold bg-red-700 text-white text-center rounded-lg'>Tin Tức</span>
        <div className='grid lg:grid-cols-3 grid-cols-1 pt-5'>
          {newsArr.map((news, index) => {
            return (
              <div key={index} className='px-2 mx-auto pt-10'>
                <img className='mx-auto' style={{ width: 420, height: 200 }} src={news.image} alt='' />
                <div className='col p-0 lg:px-4 text-left'>
                  <h1 className=' text-yellow-400 text-lg font-bold py-2'>{news.title}</h1>
                  <span className='text-green-600 font-semibold text-right'>{news.type}</span>
                  <p>{news.detail.substring(0, 200)}{news.detail.length > 200 ? '...' : ''}</p>
                </div>
              </div>)
          })}
        </div>
      </div>
    </div>
  )
}
