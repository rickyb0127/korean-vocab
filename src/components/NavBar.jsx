import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext } from "react";
import RegisterLogin from "./RegisterLogin";
import { AuthContext } from '../AuthContext';

function NavBar(props) {
  const auth = useContext(AuthContext);
  const [showRegisterLogin, setShowRegisterLogin] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);

  const onProfileHover = () => {
    const elem = document.getElementById("profile-dropdown");
    elem.classList.remove("hidden")
  };

  const onProfileLeave = () => {
    const elem = document.getElementById("profile-dropdown");
    elem.classList.add("hidden")
  };
  
  return (
    <>
      <nav id="nav" className="bg-slate-300 drop-shadow-lg relative z-[1000]">
        <div className="px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center justify-start">
              <div className="flex flex-shrink-0 items-center">
                <div className="text-cyan-500 cursor-pointer">Korean Vocab Practice</div>
                {/* <div className="text-cyan-500 cursor-pointer">한국어 단어 연습</div> */}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-shrink-0 items-center">
                <div className="text-cyan-500">
                  { auth.signedInUser ?
                    <div className="h-[64px] mt-[40px] cursor-pointer" onMouseEnter={() => onProfileHover()} onMouseLeave={() => onProfileLeave()}>
                      { auth.signedInUser.firstName }
                      <div id="profile-dropdown" className="absolute hidden right-[-30px] z-[10000] mt-2 w-48 origin-top-right rounded-md bg-white text-black py-1 shadow-lg">
                        <ul>
                          <li onClick={() => setShowUserSettings(true)}>Settings</li>
                          <li onClick={() => auth.signOutUser()}>Sign Out</li>
                        </ul>
                      </div>
                    </div> : 
                    <div className="cursor-pointer" onClick={() => setShowRegisterLogin(true)}>Log In</div> 
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      { showRegisterLogin ?
        <div className="absolute z-[1000] h-full w-full bg-slate-50 top-0">
          <div className="absolute right-4 top-4 text-[24px] cursor-pointer" onClick={() => setShowRegisterLogin(false)}><FontAwesomeIcon icon="fa-solid fa-xmark" /></div>
          <RegisterLogin setShowRegisterLogin={setShowRegisterLogin} />
        </div> :
        <></>
      }
    </>
  )
}

export default NavBar