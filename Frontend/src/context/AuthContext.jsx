// import { createContext, useEffect, useState } from "react";


// export const AuthContext = createContext();

// export const AuthContextProvider = ({children}) =>{
//     const [currentUser,setCurrentUser] = useState(
//         localStorage.getItem("user") || null
//     )

//     const updateUser = (data)=>{
//         setCurrentUser(data)
//     }

//     useEffect(()=>{
//         localStorage.setItem("user", JSON.stringify(currentUser))
//     },[currentUser])
    
//     return(
//         <AuthContext.Provider value={{currentUser,updateUser}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }


import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Initialize currentUser safely with a fallback to null
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;  // Only parse if valid data is available
    } catch (e) {
      console.error("Error parsing user data from localStorage:", e);
      return null;  // Return null if data is not valid
    }
  });

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));  // Save updated user to localStorage
    } else {
      localStorage.removeItem("user");  // Remove user data if null
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
