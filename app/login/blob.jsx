const BlobAnimation = () => {
  return (
    <div className='relative -z-10 h-full w-full overflow-hidden rounded-xl bg-[#f1ebe8]'>
      <div className="absolute inset-0 rounded-3xl after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('https://i.imgur.com/PsjPzdO.png')] after:bg-[length:200px] after:mix-blend-overlay after:content-['']">
        <div className='animate-in-login-screen absolute left-1/2 top-1/2 block h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2'>
          <div className='absolute h-full w-full animate-circular2 rounded-full bg-[#ed4928] bg-opacity-80 mix-blend-multiply blur-[80px]' />
          <div className='absolute h-full w-full animate-circular rounded-full bg-[#FF4D00] bg-opacity-50 mix-blend-multiply blur-[80px]' />
          <div className='absolute h-full w-full animate-circular-slow rounded-full bg-[#FF4D00] mix-blend-multiply blur-[80px]' />
        </div>
      </div>
    </div>
  );
};

export default BlobAnimation;
