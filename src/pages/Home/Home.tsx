import { useState } from 'react';
import banner from '@/assets/img/Banner.png';
import { HeaderComponent } from '@/components/Header/Header';
import { RecentClothes } from '@/components/RecentClothes/RecentClothes';
import { FooterComponent } from '@/components/Footer/Footer';
import { WishlistComponent } from '@/components/Wishlist/Wishlist';
import './home.css'

function Home() {
  const [wishlistState, setWishlistState] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]);

  const toggleWishlistState = () => {
    setWishlistState(!wishlistState);
  };

  const handleSelectedIdxChange = (newSelectedIdx: number[]) => {
    setSelectedIdx(newSelectedIdx);
  };

  const handleRemoveFromWishlist = (productId: number) => {
    // Encuentra el índice correspondiente al producto eliminado en el array products
    const productIndex = products.findIndex((product) => product.productCode === productId);

    // Filtra los índices que no coinciden con el índice del producto eliminado
    const updatedSelectedIdx = selectedIdx.filter((id) => id !== productId);

    // Actualiza el estado de selectedIdx
    setSelectedIdx(updatedSelectedIdx);

    // Realiza cualquier otra lógica necesaria
    console.log("Producto eliminado con índice:", productIndex);
  };

  const products = [
    { productCode: 11001, name: "Sudadera Scarface negra", price: "199,900 COP", imageUrl: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_1.jpg?t=1695631766956&amp;imwidth=750"},
    { productCode: 11002, name: "Camisa manga larga oxford rayas", price: "109,900 COP", imageUrl: "https://static.bershka.net/4/photos2/2023/I/0/2/p/6400/777/250/3c4d2c4b7d13a60cf790ccf390bf001b-6400777250_2_4_0.jpg" },
    { productCode: 11003, name: "Hoodie Loose Fit", price: "84,900 COP", imageUrl: "https://hmcolombia.vtexassets.com/arquivos/ids/2815539-600-900?v=638235354321130000&width=600&height=900&aspect=true" },
    { productCode: 11004, name: "Camiseta Loose Fit", price: "49,900 COP", imageUrl: "https://hmcolombia.vtexassets.com/arquivos/ids/3250185-600-900?v=638352868825400000&width=600&height=900&aspect=true" },
  ];

  return (
    <>
      <HeaderComponent toggleWishlist={toggleWishlistState} />
      <div className='Banner relative'>
        <img src={banner} draggable="false"/>
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
        onSelectedIdxChange={handleSelectedIdxChange}
      />
      <FooterComponent />
      {wishlistState && (
        <WishlistComponent 
          products={products}
          selectedIdx={selectedIdx}
          onClose={toggleWishlistState}
          onSelectedIdxChange={handleRemoveFromWishlist}
        />
      )}
    </>
  )
}

export default Home
