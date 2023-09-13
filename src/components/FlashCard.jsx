import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { koreanEnglish } from '../assets/koreanEnglish';

function FlashCard() {
  const getNewFlashCardIndex = () => {
    return Math.floor(Math.random() * koreanEnglish.length);
  };

  const [flashCardIndex, setFlashCardIndex] = useState(getNewFlashCardIndex());
  const [currentWord, setCurrentWord] = useState(null);
  const [flashCardLanguage, setFlashCardLanguage] = useState("ENGLISH");

  useEffect(() => {
    const word = koreanEnglish.find(wordSet => wordSet.id === flashCardIndex + 1);
    setCurrentWord(word);
  }, [flashCardIndex]);

  const dictate = (word) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.cancel();
    utterThis.default = true;
    utterThis.lang = "ko-KR";
    utterThis.rate = 0.5;
    synth.speak(utterThis);
  };

  const flashCardContents = (
    currentWord ? 
      <>
        { flashCardLanguage === "KOREAN" ? 
          <div className="absolute top-0 left-0 ml-1">
            <FontAwesomeIcon onClick={() => dictate(currentWord.koreanText)} className="cursor-pointer" icon="fa-solid fa-volume-high" />
          </div> : 
        <></>}
        <div className="absolute top-0 right-0 mr-1">
          {
            flashCardLanguage === "KOREAN" ? <span className="cursor-pointer" onClick={() => setFlashCardLanguage("ENGLISH")}>ENG</span> :
            <span className="cursor-pointer" onClick={() => setFlashCardLanguage("KOREAN")}>KOR</span>
          }
        </div>
        <div className="text-center text-[40px]">
          { flashCardLanguage === "ENGLISH" ? currentWord.englishText : currentWord.koreanText }
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