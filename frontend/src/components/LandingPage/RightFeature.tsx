
const RightFeature = (props:any) => {
  const { pretitle, title, subtitle, image } = props.content;
  return (
    <section className='section'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:gap-x-[30px]'>
          <div className='flex-1' data-aos='fade-right' data-aos-offset={props.paraoffset ? props.paraoffset : "100"}  >
            <div className='pretitle'>{pretitle}</div>
            <h2 className='title'>{title}</h2>
            <p className='lead'>{subtitle}</p>
          </div>
          <div className='flex-1' data-aos='fade-left' data-aos-offset={props.imgoffset ? props.imgoffset : "100"}  >
            <img src={image} alt='' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightFeature;
