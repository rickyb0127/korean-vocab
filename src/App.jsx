import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlashCard from "./components/FlashCard";
import NavBar from './components/NavBar';
import Settings from './components/Settings';
import { AuthProvider } from './AuthContext';
import { useState, useEffect } from "react";

function App() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState("ENGLISH");
  const [rateValue, setRateValue] = useState(1);

  const toggleProfileDropdown = (e) => {
    const id = e.target.id;
    const elem = document.getElementById("profile-dropdown");

    if(elem) {
      if(id === "profile-click") {
        const newShowProfileDropdown = !showProfileDropdown;
        setShowProfileDropdown(newShowProfileDropdown);
        newShowProfileDropdown ? elem.classList.remove("hidden") : elem.classList.add("hidden");
      } else {
        setShowProfileDropdown(false);
        elem.classList.add("hidden");
      }
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem('korean-vocab.user');

    if(user) {
      const currentUserSettings = JSON.parse(user).settings;

      if(currentUserSettings) {
        setRateValue(currentUserSettings.rateValue);
        setPreferredLanguage(currentUserSettings.preferredLanguage);
      }
    }
  }, []);

  return (
    <div onClick={(e) => toggleProfileDropdown(e)}>
      <AuthProvider>
        <NavBar setShowUserSettings={setShowUserSettings} />
        <div className="container">
          <div className="py-8">
            <FlashCard preferredLanguage={preferredLanguage} setPreferredLanguage={setPreferredLanguage} rateValue={rateValue} setRateValue={setRateValue} />
          </div>
        </div>
        { showUserSettings ?
          <div className="absolute z-[1000] h-full w-full bg-slate-50 top-0">
            <div className="absolute right-4 top-4 text-[24px] cursor-pointer" onClick={() => setShowUserSettings(false)}><FontAwesomeIcon icon="fa-solid fa-xmark" /></div>
            <Settings preferredLanguage={preferredLanguage} setPreferredLanguage={setPreferredLanguage} rateValue={rateValue} setRateValue={setRateValue} />
          </div> :
          <></>
        }
      </AuthProvider>
    </div>
  )
}

library.add(fab, fas, far);
export default App;