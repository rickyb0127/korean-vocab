import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';

function RegisterLogin(props) {
  const auth = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    auth.setErrorMessage("");
  }, []);

  const submitForm = async(e) => {
    e.preventDefault();

    await auth.authenticateUser(showRegister, emailInput, passwordInput, firstNameInput, lastNameInput);
    props.setShowRegisterLogin(false);
  };
  
  return (
    <>
      <div className="flex justify-center mt-[100px]">
        <form className="grid gap-y-4 grid-cols-1 text-center">
          {showRegister ? <>
            <input
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              className="mr-auto ml-auto rounded-sm w-[300px] border-gray-300 border solid"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="first name" />
            <input
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              className="mr-auto ml-auto rounded-sm w-[300px] border-gray-300 border solid"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="last name" />
            </> : null}
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="mr-auto ml-auto rounded-sm w-[300px] border-gray-300 border solid" 
            type="email" 
            name="email" 
            id="email"
            placeholder="email"
          />
          <input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="mr-auto ml-auto rounded-sm w-[300px] border-gray-300 border solid" 
            type="password" 
            name="password" 
            id="password"
            placeholder="password"
          />
          <div>
            <button onClick={ submitForm } className="w-[300px] bg-blue-500 rounded-sm">
              {showRegister ? "Register" : "Log In"}
            </button>
          </div>
          <div className="text-red-500 text-center">{ auth.errorMessage }</div>
          <div className="text-center">
            {showRegister ? 
              <div>
                <div>Are you already registered?</div> 
                <div className="cursor-pointer" onClick={ () => {setShowRegister(!showRegister)} }>Log in</div>
              </div> : 
              <div>
                <div>Not registered yet?</div>
                <div className="cursor-pointer" onClick={ ()=> {setShowRegister(!showRegister)} }>Create your free account here</div>
              </div>
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterLogin