import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlashCard from "./FlashCard";
import Settings from './Settings';
import { AuthContext } from '../AuthContext';
import { useState, useEffect, useContext } from "react";

function MainContent(props) {
  const auth = useContext(AuthContext);
  const [preferredLanguage, setPreferredLanguage] = useState("ENGLISH");
  const [rateValue, setRateValue] = useState(1);

  useEffect(() => {
    if(auth.signedInUser) {
      const currentUserSettings = auth.signedInUser.settings;

      if(currentUserSettings) {
        setRateValue(currentUserSettings.rateValue);
        setPreferredLanguage(currentUserSettings.preferredLanguage);
      }
    }
  }, [auth]);

  return (
    <div>
      <FlashCard preferredLanguage={preferredLanguage} setPreferredLanguage={setPreferredLanguage} rateValue={rateValue} setRateValue={setRateValue} />
      { props.showUserSettings ?
        <div className="absolute z-[1000] h-full w-full bg-slate-50 top-0 left-0">
          <div className="absolute right-4 top-4 text-[24px] cursor-pointer" onClick={() => props.setShowUserSettings(false)}><FontAwesomeIcon icon="fa-solid fa-xmark" /></div>
          <Settings preferredLanguage={preferredLanguage} setPreferredLanguage={setPreferredLanguage} rateValue={rateValue} setRateValue={setRateValue} setShowUserSettings={props.setShowUserSettings} />
        </div> :
        <></>
      }
    </div>
  )
}

export default MainContent;