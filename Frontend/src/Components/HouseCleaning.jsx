import React, { useRef, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Reviews } from './Reviews';
// import DetailsHouseCleaning from './DetailsHouseCleaning';
import Details from './Details';

const Card = ({ imageSrc, title }) => (
  <div className="m-4 p-1 text-center w-30 h-32 text-gray-900 transition-shadow duration-300 overflow-visible hover:shadow-lg">
    <img src={imageSrc} alt="card" className="w-full h-full object-cover" />
    <p className="mt-1">{title}</p>
  </div>
);

const HouseCleaning = () => {
  const services = [
    {
      id: 1,
      imgSrc: 'https://tse4.mm.bing.net/th?id=OIP.29Xa0yXmjpfzJn1hPoplVAHaE8&pid=Api&P=0&h=180',
      title: 'Kitchen Cleaning',
      description: [
        'Dusting & Vacuuming',
        'Mopping & Sanitizing',
        'Kitchen & Bathroom Cleaning'
      ],
      price: 60
    },
    {
      id: 2,
      imgSrc: 'https://media.istockphoto.com/id/1393767111/photo/young-female-cleaner-in-workwear-using-mop-while-cleaning-floor-in-office.jpg?s=612x612&w=0&k=20&c=T8ZAIpzwVSVLmegTR4l2cSDcs9hVktkmS5CDWlf52M4=',
      title: 'Deep Cleaning',
      description: [
        'Desk & Floor Cleaning',
        'Trash Removal',
        'Disinfecting Workspaces'
      ],
      price: 100
    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1167411789/photo/person-cleaning-stain-on-carpet.jpg?s=612x612&w=0&k=20&c=Nhf9uDH5VoW0-3j5KJ_sfBlr7TgQfhI3FCuEtpWzEg4=',
      title: 'Carpet Cleaning',
      description: [
        'Stain Removal',
        'Deep Cleaning',
        'Odor Elimination'
      ],
      price: 70
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/2164840232/photo/beautiful-smiling-young-woman-cleaning-window-with-window-cleaner.jpg?s=612x612&w=0&k=20&c=6eqocDJF9QImCO3PaEEtxXx64GJ5oeR1mziT0XQIOCU=',
      title: 'Window Cleaning',
      description: [
        'Interior Cleaning',
        'Exterior Washing',
        'Streak-Free Shine'
      ],
      price: 55
    },
    {
      id: 5,
      imgSrc: 'https://media.istockphoto.com/id/1789004313/photo/a-young-man-vacuums-the-landing-in-a-repair-room.jpg?s=612x612&w=0&k=20&c=PZONQhDiTZqyDzsu1PI7PQKmw1eG25cWzx955DS8Xno=',
      title: 'Post-Construction Cleaning',
      description: [
        'Debris Removal',
        'Dusting & Mopping',
        'Detailed Finishing'
      ],
      price: 75
    },
    {
      id: 6,
      imgSrc: 'https://tse1.mm.bing.net/th?id=OIP.DtFkNLe6S082oS9-TML9lgHaDw&pid=Api&P=0&h=180',
      title: 'Bathroom Cleaning',
      description: [
        'Full House Cleaning',
        'Trash Removal',
        'Deep Cleaning All Rooms'
      ],
      price: 65
    }
  ];
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
       
          <div>
            <div className="mb-4">
            
              <h2 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-2">What We Offer</h2>
<p className="text-lg text-center text-gray-600 mb-4">
  ShimServices provides professional cleaning services for homes and offices.
</p>
<ul className="list-none space-y-3 text-gray-700 mt-4">
  <li className="flex items-center">
    <i className="fas fa-home text-blue-600 mr-2"></i>
    <span className="font-medium text-lg">Home Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-briefcase text-gray-600 mr-2"></i>
    <span className="font-medium text-lg">Office Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-carpet text-red-600 mr-2"></i>
    <span className="font-medium text-lg">Carpet Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-window-maximize text-green-600 mr-2"></i>
    <span className="font-medium text-lg">Window Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-hard-hat text-yellow-500 mr-2"></i>
    <span className="font-medium text-lg">Post-Construction Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-arrow-alt-circle-right text-purple-600 mr-2"></i>
    <span className="font-medium text-lg">Move-In/Move-Out Cleaning</span>
  </li>
</ul>


             
            </div>
            <hr></hr>
            <div className="mt-4">
              <Reviews serviceName={"House Cleaning"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-4 md:w-1/2">
        <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
        <div className="flex-6">
       
        <Details services={services} service_name={"House Cleaning"} />
        </div>
        </div>
      </div>
    </>
  );
};

export default HouseCleaning;
