import React, { useRef, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Reviews } from './Reviews';
import DetailsHouseCleaning from './DetailsHouseCleaning';

const Card = ({ imageSrc, title }) => (
  <div className="m-4 p-1 text-center w-30 h-32 text-gray-900 transition-shadow duration-300 overflow-visible hover:shadow-lg">
    <img src={imageSrc} alt="card" className="w-full h-full object-cover" />
    <p className="mt-1">{title}</p>
  </div>
);

const HouseCleaning = () => {
  const cardItems = [
    { id: 1, imageSrc: 'https://cdn.pixabay.com/photo/2024/01/16/07/51/ai-generated-8511571_1280.jpg', title: 'Home Cleaning' },
    { id: 2, imageSrc: 'https://cdn.pixabay.com/photo/2021/07/19/04/35/workers-6477163_1280.jpg', title: 'Office Cleaning' },
    { id: 3, imageSrc: 'https://cdn.pixabay.com/photo/2014/02/17/14/28/vacuum-cleaner-268179_1280.jpg', title: 'Carpet Cleaning' },
    { id: 4, imageSrc: 'https://cdn.pixabay.com/photo/2021/01/18/16/56/blinds-5928691_1280.jpg', title: 'Window Cleaning' },
    { id: 5, imageSrc: 'https://cdn.pixabay.com/photo/2022/07/31/18/29/road-7356556_1280.jpg', title: 'Post-Construction Cleaning' },
    { id: 6, imageSrc: 'https://cdn.pixabay.com/photo/2017/01/31/12/58/graffiti-2023845_1280.jpg', title: 'Move-In/Move-Out Cleaning' },
  ];
  const leftSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const stickyOffset = leftSectionRef.current.offsetTop;
      if (window.scrollY > stickyOffset) {
        leftSectionRef.current.classList.add('sticky');
      } else {
        leftSectionRef.current.classList.remove('sticky');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-2.5 md:flex-row">
        {/* Left Section */}
        <div
          className="md:w-1/2 text-black flex flex-wrap p-2.5 sticky top-0 max-h-[calc(100vh-40px)] overflow-y-auto"
          ref={leftSectionRef}
        >
          <div className="mb-2.5 mt-2.5 pl-4">
            <h2 className="text-5xl font-extrabold text-center mb-4">House Cleaning Services</h2>
            <p className="mt-2">
              Experience ShimServices' superior house cleaning—efficiency, thoroughness, and a commitment to pristine living spaces.
            </p>
            <div className="flex items-center underline">
              <img
                src="https://t3.ftcdn.net/jpg/04/20/03/48/360_F_420034841_AKpgqQGkkUyeD7oWc9y8vGTMwT4GmbHm.jpg"
                className="h-5 w-20 mt-2"
                alt="rating"
              />
              <p className="ml-2">2M+ satisfied clients</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cardItems.map((item) => (
              <Card key={item.id} imageSrc={item.imageSrc} title={item.title} />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="mx-4 md:w-1/2 mt-24 pl-5 box-border z-[-1]">
          <Carousel fade>
            <Carousel.Item>
              <video
                className="w-full h-[400px] object-cover"
                src="https://videos.pexels.com/video-files/6196256/6196256-uhd_2560_1440_25fps.mp4"
                autoPlay
                muted
                loop
                playsInline
              ></video>
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Discover ShimServices: Where Clean Meets Comfort</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-full h-[400px] object-cover"
                src="https://cdn.pixabay.com/photo/2024/03/28/05/50/cleaning-8660309_1280.jpg"
                alt="carousel item"
              />
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Thorough Cleaning for Your Peace of Mind</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-full h-[400px] object-cover"
                src="https://cdn.pixabay.com/photo/2023/12/17/09/47/door-8453898_1280.jpg"
                alt="carousel item"
              />
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Clean Spaces for Healthier Living</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Additional Section */}
      <div className="flex flex-col-reverse md:flex-row p-2.5 m-6">
        <div className="flex flex-col text-xl md:w-1/2">
          <hr></hr>
          <h2 className="font-bold text-center mt-4">What we offer</h2>
          <div>
            <div className="mb-4">
              At ShimServices, we provide a wide range of house cleaning services to ensure your home is sparkling clean and hygienic. Our services include:
              <ul className="list-disc list-inside mt-4">
                <li><strong>Home Cleaning:</strong> Complete cleaning for all rooms, including dusting, mopping, and surface sanitization.</li>
                <li><strong>Office Cleaning:</strong> Professional cleaning for your workplace to keep it safe and spotless.</li>
                <li><strong>Carpet Cleaning:</strong> Deep cleaning and stain removal to restore your carpets to their original beauty.</li>
                <li><strong>Window Cleaning:</strong> Streak-free window cleaning for crystal-clear views.</li>
                <li><strong>Post-Construction Cleaning:</strong> Thorough cleaning after renovation or construction projects to remove debris and dust.</li>
                <li><strong>Move-In/Move-Out Cleaning:</strong> Comprehensive cleaning to ensure your new or former home is spotless and ready for the next resident.</li>
              </ul>
              Let ShimServices take care of your cleaning needs so you can relax and enjoy a fresh, clean home.
            </div>
            <hr></hr>
            <div className="mt-4">
              <Reviews />
            </div>
          </div>
        </div>
        <div className="flex-6">
          <DetailsHouseCleaning />
        </div>
      </div>
    </>
  );
};

export default HouseCleaning;
