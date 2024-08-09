const BlobAnimation = () => {
  return (
    <div className='bg-[#f1ebe8] w-full h-full overflow-hidden relative rounded-xl -z-10'>
      <div className="rounded-3xl inset-0 absolute after:content-[''] after:w-full after:h-full after:bg-[url('https://i.imgur.com/PsjPzdO.png')] after:bg-[length:200px] after:mix-blend-overlay after:absolute after:top-0 after:left-0">
        <div className='w-[50vh] h-[50vh] block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-in-login-screen'>
          <div className='w-full h-full rounded-full absolute bg-[#ed4928] mix-blend-multiply blur-[80px] animate-circular2 bg-opacity-80' />
          <div className='w-full h-full rounded-full absolute bg-[#FF4D00] mix-blend-multiply blur-[80px] animate-circular bg-opacity-50' />
          <div className='w-full h-full rounded-full absolute bg-[#FF4D00] mix-blend-multiply blur-[80px] animate-circular-slow' />
        </div>
      </div>
    </div>
  );
};

export default BlobAnimation;
