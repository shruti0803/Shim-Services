import React from 'react';

const VideoCarousel = () => {
  const videos = [
    { src: 'https://videos.pexels.com/video-files/9472831/9472831-sd_540_960_24fps.mp4', text: 'Bathroom Cleaning' },
    { src: 'https://videos.pexels.com/video-files/6872477/6872477-sd_540_960_25fps.mp4', text: 'Deep Automobile Cleaning' },
    { src: 'https://videos.pexels.com/video-files/3886380/3886380-hd_720_1366_50fps.mp4', text: 'Radiance Makeup' },
    { src: 'https://videos.pexels.com/video-files/5972916/5972916-sd_540_960_25fps.mp4', text: 'Craftmanship' }
  ];

  const handleMouseEnter = (index) => {
    const video = document.getElementById(`video${index}`);
    video.play();
  };

  const handleMouseLeave = (index) => {
    const video = document.getElementById(`video${index}`);
    video.pause();
  };

  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-semibold font-serif">Exemplar Ensemble</h2>
      </div>

      {/* Video Carousel */}
      <div className="flex flex-wrap justify-center">
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative w-full md:w-1/3 lg:w-1/4 p-4"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <video
              id={`video${index}`}
              src={video.src}
              muted
              loop
              className="w-full h-[300px] md:h-[450px] lg:h-[600px] object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-0 w-full text-center text-white text-5xl pb-4 font-bold">
              {video.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
