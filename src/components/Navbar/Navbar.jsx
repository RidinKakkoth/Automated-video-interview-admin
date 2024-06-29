import './Navbar.css'

import images from '../../assets/assets'

const Navbar = () => {
  return (
    <div className=' flex justify-between items-center py-3 px-[4%]'>
      <img className='w-[max(10%,100px)] ' src={images.logo} alt="Logo" />
      <img className='w-10 ' src={images.profile_image} alt="" />
    </div>
  )
}

export default Navbar