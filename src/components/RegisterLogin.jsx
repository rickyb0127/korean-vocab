import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';

function RegisterLogin(props) {
  const auth = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, []);

  const validateForm = (action) => {
    if(action === "LOGIN") {
      if(!emailInput) {
        setErrorMessage("please enter your email");
        return false;
      } else if(!passwordInput) {
        setErrorMessage("please enter your password");
        return false;
      }

      return true;
    }

    if(action === "REGISTER") {
      if(!firstNameInput) {
        setErrorMessage("please enter a first name");
        return false;
      } else if(!lastNameInput) {
        setErrorMessage("please enter a last name");
        return false;
      } else if(!emailInput) {
        setErrorMessage("please enter a email");
        return false;
      } else if(!passwordInput) {
        setErrorMessage("please enter a password");
        return false;
      }

      return true;
    }

    return false;
  };

  const loginOrRegister = async(e) => {
    e.preventDefault();
    const action = showRegister ? "REGISTER" : "LOGIN";

    if(validateForm(action)) {
      try {
        await auth.authenticateUser(showRegister, emailInput, passwordInput, firstNameInput, lastNameInput);
        props.setShowRegisterLogin(false);
      } catch(err) {
        console.log(err)
        switch(err.message) {
          case "auth/email-already-in-use":
            setErrorMessage("email already in use");
            break;
          case "auth/invalid-login-credentials":
            setErrorMessage("email or password is incorrect");
            break;
          case "auth/too-many-requests":
            setErrorMessage("too many requests");
            break;
          case "auth/weak-password":
            setErrorMessage("password must be at least 6 characters");
            break;
          default:
            setErrorMessage("something went wrong");
        }
      }
    }
  };
  
  return (
    <>
      <div className="flex justify-center mt-[100px]">
        <form className="grid gap-y-4 grid-cols-1 text-center">
          {showRegister ? <>
            <input
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              className="pl-[20px] mr-auto ml-auto rounded-sm h-[40px] w-[300px] border-gray-300 border solid"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="first name" />
            <input
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              className="pl-[20px] mr-auto ml-auto rounded-sm h-[40px] w-[300px] border-gray-300 border solid"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="last name" />
            </> : null}
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="pl-[20px] mr-auto ml-auto rounded-sm h-[40px] w-[300px] border-gray-300 border solid" 
            type="email" 
            name="email" 
            id="email"
            placeholder="email"
          />
          <input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="pl-[20px] mr-auto ml-auto rounded-sm h-[40px] w-[300px] border-gray-300 border solid" 
            type="password" 
            name="password" 
            id="password"
            placeholder="password"
          />
          <div>
            <button onClick={ loginOrRegister } className="h-[50px] w-[300px] bg-blue-500 rounded-md">
              {showRegister ? "Register" : "Log In"}
            </button>
          </div>
          <div className="text-red-500 text-center">{ errorMessage }</div>
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