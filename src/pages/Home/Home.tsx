import banner from '@/assets/img/Banner.png';
import { HeaderComponent } from '@/components/Header/Header';
import { RecentClothes } from '@/components/RecentClothes/RecentClothes';
import { FooterComponent } from '@/components/Footer/Footer';
import products from '@/productsData';
import './home.css'

function Home() {
  return (
    <>
      <HeaderComponent type='main'/>
      <div className='Banner relative'>
        <img
          src={banner}
          alt="Banner Image"
          draggable="false"
        />
        <div className="titles">
          <p className='subBanner'>New Collection</p>
          <h1 className='tituloBanner'>Gift 
            <span>Season</span>
          </h1>
          <p className='subBanner'>#SOYSHOPI / #HECHOENCOLOMBIA</p>
        </div>
      </div>
      <RecentClothes 
        products={products} 
      />
      <FooterComponent />
    </>
  )
}

export default Home
