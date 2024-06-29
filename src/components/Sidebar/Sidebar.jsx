import images from '../../assets/assets'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='text-[max(1vw,10px)] w-[18%] min-h-screen border-[1.5px] border-[solid] border-[#a9a9a9] border-t-[0]'>
        <div className=' pt-[50px] pl-[20%] flex flex-col gap-5 '>
            <NavLink  to='/add' className='sidebar-option'>
                <img className='' src={images.add_icon} alt="" />
                <p>Add Interview</p>
            </NavLink>
            <NavLink to='/list' className='sidebar-option'>
                <img src={images.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className='sidebar-option'>
                <img src={images.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar