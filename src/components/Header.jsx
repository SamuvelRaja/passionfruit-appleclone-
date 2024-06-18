import { navLists } from "../constants/index"
import { appleImg, bagImg,searchImg } from "../utils"


const Header = () => {
    console.log(navLists)
  return (
        <>
            <header className="flex justify-between py-5 px-10">
                <nav className="screen-max-width mx-auto flex justify-between w-full">
                    <img src={appleImg} alt="" />
                
                    <div className="lg:flex justify-center w-full hidden ">
                        {
                            navLists.map((navs)=>{
                                return <a href={"/"+navs} className="px-5 text-xs cursor-pointer text-gray-400 hover:text-white transition-all">{navs}</a>
                            })
                        }
                        
                    </div>
                    <div className="flex gap-7">
                        <img src={searchImg} alt="search" />
                        <img src={bagImg} alt="shop" />
                    </div>
                </nav>
            </header>
            <div className="bg-[#1d1d1f] py-4">
                <p className="text-center text-[13px] font-normal">Get iPhone 15 Pro from ₹5621.00/mo.‡ for 24 months with No Cost EMI from most leading banks. <a href="#" className="text-[#2997ff] hover:underline transition-all">Buy &#10095;</a></p>
            </div>
        </>  
    )
}

export default Header
