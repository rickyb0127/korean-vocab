import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import { AuthProvider } from './AuthContext';
import { useState } from "react";

function App() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);

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

  return (
    <div onClick={(e) => toggleProfileDropdown(e)}>
      <AuthProvider>
        <NavBar setShowUserSettings={setShowUserSettings} />
        <div className="container">
          <MainContent showUserSettings={showUserSettings} setShowUserSettings={setShowUserSettings} />
        </div>
      </AuthProvider>
    </div>
  )
}

library.add(fab, fas, far);
export default App;