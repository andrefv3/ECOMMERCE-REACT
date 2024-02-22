import { HeaderComponent } from '@/components/Header/Header';
import { RecentClothes } from '@/components/RecentClothes/RecentClothes';
import { FooterComponent } from '@/components/Footer/Footer';
import { Carousel } from './components/Carousel/Carousel';
import './home.css'

function Home() {
  return (
    <>
      <HeaderComponent type='main'/>
      <Carousel />
      <RecentClothes />
      <FooterComponent />
    </>
  )
}

export default Home
