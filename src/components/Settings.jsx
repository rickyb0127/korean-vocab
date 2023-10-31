import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

function Settings(props) {
  const auth = useContext(AuthContext);

  const handlePreferredLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    props.setPreferredLanguage(selectedLanguage);
  };

  const handleRateChange = (e) => {
    e.preventDefault();
    const value = parseFloat(e.target.value);
    props.setRateValue(value);

    dictate(value);
  };
  
  const dictate = (rate) => {
    const samplePhrase = "안녕하세요";
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(samplePhrase);
    window.speechSynthesis.cancel();
    utterThis.default = true;
    utterThis.lang = "ko-KR";
    utterThis.rate = rate;
    synth.speak(utterThis);
  };

  const submitForm = async(e) => {
    e.preventDefault();

    if(auth.signedInUser && auth.currentUserId) {
      try {
        const user = auth.signedInUser;

        const settings = {
          preferredLanguage: props.preferredLanguage,
          rateValue: props.rateValue
        };

        const updatedUser = {
          ...user,
          settings
        };

        await auth.updateUserData(auth.currentUserId, updatedUser);
      } catch(err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center mt-[100px]">
        <form className="text-center">
          <div>
            <label htmlFor="preferredLanguage">Preferred Card Starting Language:</label>

            <div>
              <select name="preferredLanguage" id="preferredLanguage" value={props.preferredLanguage} onChange={handlePreferredLanguageChange}>
                <option value="KOREAN">Korean</option>
                <option value="ENGLISH">English</option>
              </select>
            </div>
          </div>

          <div className="pt-5">
            <label htmlFor="rate">Speech Rate:</label>
            <div>
              <input
                type="range"
                value={props.rateValue}
                min="0.5"
                max="2"
                step="0.1"
                onChange={handleRateChange}
              />
            </div>
          </div>

          <div className="pt-5">
            <button onClick={ submitForm } className="w-[300px] bg-blue-500 rounded-sm">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Settings;