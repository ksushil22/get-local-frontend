import React, {createContext, useState} from 'react';

const UserProfileContext = createContext({
    loggedInUser: {email: '', name: '', roles: [], isActive: false},
    setLoggedInUser: () => {}
});

const UserProfileProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState({email: '', name: '', roles: [], isActive: false});

    return <UserProfileContext.Provider value={{loggedInUser , setLoggedInUser}}>
        {children}
    </UserProfileContext.Provider>

}

export {UserProfileContext, UserProfileProvider};
