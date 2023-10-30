import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { koreanEnglish } from '../assets/koreanEnglish';

function FlashCard(props) {
  const getNewFlashCardIndex = () => {
    return Math.floor(Math.random() * koreanEnglish.length);
  };

  const [flashCardIndex, setFlashCardIndex] = useState(getNewFlashCardIndex());
  const [currentPhrase, setCurrentPhrase] = useState(null);

  useEffect(() => {
    const selectedPhrase = koreanEnglish.find(phrase => phrase.id === flashCardIndex + 1);
    setCurrentPhrase(selectedPhrase);
  }, [flashCardIndex]);

  const dictate = (phrase) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(phrase);
    window.speechSynthesis.cancel();
    utterThis.default = true;
    utterThis.lang = "ko-KR";
    utterThis.rate = props.rateValue;
    synth.speak(utterThis);
  };

  const flashCardContents = (
    currentPhrase ? 
      <>
        { props.preferredLanguage === "KOREAN" ? 
          <div className="absolute top-0 left-0 ml-1">
            <FontAwesomeIcon onClick={() => dictate(currentPhrase.koreanText)} className="cursor-pointer" icon="fa-solid fa-volume-high" />
          </div> : 
        <></>}
        <div className="absolute top-0 right-0 mr-1">
          {
            props.preferredLanguage === "KOREAN" ? <span className="cursor-pointer" onClick={() => props.setPreferredLanguage("ENGLISH")}>ENG</span> :
            <span className="cursor-pointer" onClick={() => props.setPreferredLanguage("KOREAN")}>KOR</span>
          }
        </div>
        <div className="text-center text-[40px]">
          { props.preferredLanguage === "ENGLISH" ? currentPhrase.englishText : currentPhrase.koreanText }
        </div>
        <div className="absolute bottom-0 right-0 mr-1">
          <FontAwesomeIcon onClick={() => {
              const index = getNewFlashCardIndex();
              setFlashCardIndex(index);
            }} 
            className="cursor-pointer" 
            icon="fa-solid fa-circle-right" 
          />
        </div>
      </> : 
    <></>
  );

  return (
    <>
      <div className="flex justify-center">
        <div className="flex relative justify-center items-center w-[450px] h-[250px] bg-blue-300">
          { flashCardContents }
        </div>
      </div>
    </>
  )
}

export default FlashCard;