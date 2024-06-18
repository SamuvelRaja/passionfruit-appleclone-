import { navLists } from "../constants/index"
import { appleImg } from "../utils"


const Header = () => {
    console.log(navLists)
  return (
    <header className="flex justify-between">
        <div className="w-full">
            <img src={appleImg} alt="" />
        </div>
        <div className="flex justify-between w-full">
            {
                navLists.map((navs)=>{
                    return <nav><a href={"/"+navs}>{navs}</a></nav>
                })
            }
            
        </div>
    </header>
  )
}

export default Header
