import React from 'react';
import { useRef ,useEffect} from 'react';
import Details from './Details';

import './Appliance.css'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
const Card = ({ imageSrc, title }) => (
  <div className="card">
    <img src={imageSrc} alt="card" className="card-image" />
    <p>{title}</p>
  </div>
);

  
const Appliance = () => {
  
  
  const cardItems = [
    { id: 1, imageSrc: 'https://media.istockphoto.com/id/1308686330/photo/technician-examining-dishwasher.jpg?s=612x612&w=0&k=20&c=dOnBvAdU8y_OlEjDbN_DxAUkSVUxXwg4OSIra5yX93o=', title: 'Appliance Installation' },
    { id: 2, imageSrc: 'https://media.istockphoto.com/id/614135768/photo/repairman-is-repairing-a-washing-machine-on-the-white-background.jpg?s=612x612&w=0&k=20&c=nKCPfBCkfKEBBKWwK4muG8wdhyJoBRIHlLH6JZEBG6k=', title: 'Appliance Servicing' },
    { id: 3, imageSrc: 'https://media.istockphoto.com/id/1180607321/photo/two-young-male-movers-placing-steel-refrigerator-in-kitchen.jpg?s=612x612&w=0&k=20&c=PW4dVclZ9wCgc-qq6BLHuMKzzStEW2N4-DxmlUk0K54=', title: 'Appliance Gas Refill' },
    {id: 4, imageSrc:'https://media.istockphoto.com/id/512511894/photo/repairman-is-repairing-a-washing-machine-entering-malfunction.jpg?s=1024x1024&w=is&k=20&c=iSUTD2qjWJP7uuhTGh5yLccPWy9oqvkJ7QZaWmzXCKg=',title:'Appliance Duct Cleaning'},
    {id: 5, imageSrc:'https://media.istockphoto.com/id/912624814/photo/young-repairman-in-protective-workwear-fixing-oven-in-kitchen.jpg?s=1024x1024&w=is&k=20&c=pIc7EIHJxrkdYsDfKbcfwis6lyOYbx8kw7pxRCEEPgQ=',title:'Thermostat Replacement'},
    {id: 6, imageSrc:'https://cdn.pixabay.com/photo/2020/12/28/09/44/man-5866475_1280.jpg',title:'Appliance Filter Replacement'},
    
    
  ];
  const leftSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const stickyOffset = leftSectionRef.current.offsetTop;
      if (window.scrollY > stickyOffset) {
        leftSectionRef.current.classList.add("sticky");
      } else {
        leftSectionRef.current.classList.remove("sticky");
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const carouselImages = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBThLQZMK3JSdlf-O2kxYofcPPF9bEc1O5AQ&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShQ45mK3Gtuzlg5Qz9HHdeBF4hd9PKhZM3BQ&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOeXNYjqrisIcGW6xo1bjNxBzh6M9XU9FGg&s'];

  return (
    <>
    <div className="container">
       {/* Add heading for left section */}
      <div className="left-section" ref={leftSectionRef}>
        <div className='heading'>
      <h2>Appliances Repair</h2>
      <p>Don't let appliance issues slow you down. ShimServices is here to help.When appliances break, ShimServices fixes them fast?</p>
      <div class="rating">
        <img src="https://t3.ftcdn.net/jpg/04/20/03/48/360_F_420034841_AKpgqQGkkUyeD7oWc9y8vGTMwT4GmbHm.jpg" height="20px" width="70px"></img><p>6M+ bookings till now</p>
      </div>
      </div>
      
        {cardItems.map(item => (
          
          <Card key={item.id} imageSrc={item.imageSrc} title={item.title} />
        ))}
      </div>
      <div className="right-section">
      <Carousel fade>
      <Carousel.Item>
        <video  src="https://videos.pexels.com/video-files/8293017/8293017-hd_1920_1080_30fps.mp4" alt="" autoPlay muted loop playsInline></video>
        <Carousel.Caption>
          <h2>Where Appliances meet Expertise!</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      
        <img src="https://media.istockphoto.com/id/1267057581/photo/a-repairman-checking-the-air-conditioner.jpg?s=612x612&w=0&k=20&c=jsx63zh_etUL0QALeDZNLeE6yIA3bA2xqsv-bRtFBXM=" alt="" />
        <Carousel.Caption>
          <h2>Appliance Rescue, Done Right</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://media.istockphoto.com/id/1347516184/photo/repairman-handshake-in-house-door.jpg?s=612x612&w=0&k=20&c=ePJmBK67AQ1O__VvHkMFKp7UE4rwHbSNhUTNqQ9M2j0=" alt="" />
        <Carousel.Caption>
          <h2>All things done Right. At your pace, At your comfort.</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>  
      {/* details about service */}
      </div>
      <div className='sh'>
          <div className='Text-offer'>
            <h2>What we offer</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit rerum vel sapiente porro. Molestias pariatur eos ducimus distinctio quas provident, rerum aliquid voluptas assumenda quis nemo. Voluptate sit quidem iste, impedit vero corrupti aspernatur fugit doloremque, accusantium expedita praesentium debitis.</p>
        </div>
        <div className='Details-card'>
       <Details/> 
       </div>
       </div>
      </>
    
  );
};

export default Appliance;







* {
    margin: 0;
    box-sizing: border-box;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    
  }
  
  .rating {
    float: left;
    display: flex;
    text-decoration: underline;
    p {
      padding-bottom: 6px;
    }
    img {
      margin-top: 2%;
    }
  }
  
  .heading {
    margin-bottom: 10px;
    margin-top: 10px;
    padding-left: 4%;
  }
  
  .left-section {
    margin:0;
    width: 40%;
    color: black;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    padding: 10px; /* Add padding to the left section */
    position: -webkit-sticky; /* For Safari */
    position: sticky; /* Stick to the top */
    top: 0; /* Distance from the top */
    max-height: calc(100vh - 40px); /* Adjusted height considering top and bottom padding */
    /* overflow-y: auto; Enable scrolling */
  }
  
  .card {
    margin: 16px;
    padding: 2px;
    text-align: center;
    width: 120px; /* Increase card width */
    height: 130px; /* Increase card height */
    color: rgb(17, 17, 17);
    transition: box-shadow 0.3s; /* Add transition effect */
    overflow: visible; /* Hide overflow content */
  }
  
  .card:hover {
    box-shadow: 0 0 10px rgba(239, 227, 102); /* Add box shadow on hover */
  }
  
  .card img {
    width: 100%;
    height: 100%; /* Adjusted image height to fill card container */
    object-fit: cover; /* Ensure the image covers the entire container */
  }
  
  .right-section {
    width: 59%;
    margin-top: 90px; /* Adjust margin-top as needed */
    padding-left: 20px; /* Add padding to the right section */
    box-sizing: border-box; /* Include padding in width calculation */
    z-index: -1;

  }
  
  .carousel-item img {
    width: 100%; /* Ensures the image fills its container */
    height: 500px; /* Set a fixed height for all images */
    object-fit: cover; /* Ensure the image covers the entire space */
  }
  
  .carousel-item video {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
  .sh{
    display: flex;
   
    padding: 10px;
    margin:23px;
    
  }
  .Text-offer{
    flex:4;
    font-size: 24px;
  }
  .Details-card{
    flex:6;
  }