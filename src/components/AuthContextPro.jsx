import React, { createContext, useContext, useState } from 'react';

const AuthContext=createContext();
 //- 로그인 사용자 저장
    //- 로그아웃 기능
    //- 모든 컴포넌트에서 로그인 상태 사용 가능

const AuthContextPro = ({children}) => {

    //로그인버튼 누르면 로그인한 사용자들 로컬스토리지에 저장했다(Login.jsx)
    //사용자들 가져오기
    const [currentUser, setCurrentUser]=useState(
        JSON.parse(localStorage.getItem("currentUser")) || null,
    );

    const logout=()=>{
       setCurrentUser(null);
       localStorage.removeItem("currentUser");
    };

    //로그인한 사용자 정보, 로그인 상태 (로그인/로그아웃)=> 모든 컴포넌트에서 사용 가능함
    return (
        <AuthContext.Provider value={ {currentUser,setCurrentUser,logout }} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>useContext(AuthContext);

export default AuthContextPro;