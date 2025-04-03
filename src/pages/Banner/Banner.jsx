import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BannerOne from '../../assets/Banner_1.png';
import BannerTwo from '../../assets/Banner_2.png';
import BannerThree from '../../assets/Banner_3.png';
import BannerFour from '../../assets/Banner_4.png';
import BannerFive from '../../assets/Banner_5.png';

const Banner = () => {
  return (
    <div className=" w-full  mx-auto overflow-hidden ">
    <Carousel>
      <Carousel.Item interval={3000}>
        <img
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          src={BannerOne}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className='font-bold text-3xl text-black'>Your New Art World</h3>
          <p className='text-black text-xl'>Art Gallery Society Event: Christmas Eve in the Art Gallery</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          src={BannerTwo}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className='font-bold text-3xl text-white'>Eclectic Collection</h3>
          <p className='text-white text-xl'>Today the THA's has a leading collection of modern and contemporary art comprising works by international artists which reflects the energy, commitment and diversity of emerging artists.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          src={BannerThree}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className='font-bold text-3xl text-black'>Diversity of Thoughts</h3>
          <p className='text-black text-xl'>Welcome to our range of Original Paintings, Limited and Open Edition Framed Prints and Edge Sculpture. Our gallery presents an extensive selection of wall art, images and frames.</p>
        </Carousel.Caption>
      </Carousel.Item>
       {/* banner 4 */}
      <Carousel.Item interval={3000}>
        <img
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          src={BannerFour}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className='font-bold text-3xl text-white'>Your New Art World</h3>
          <p className='text-white text-xl' >Art Gallery Society Event: Christmas Eve in the Art Gallery</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* banner 5 */}
      <Carousel.Item interval={3000}>
        <img
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          src={BannerFive}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className='font-bold text-3xl text-white'>Eclectic Collection</h3>
          <p className='text-white text-xl'>Welcome to our range of Original Paintings, Limited and Open Edition Framed Prints and Edge Sculpture. Our gallery presents an extensive selection of wall art, images and frames.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
  );
};

export default Banner;
