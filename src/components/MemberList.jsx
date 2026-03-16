import React, { useEffect, useState } from 'react';

const MemberList = () => {
    //1. 로컬스토리지에서 회원가입했을 때 저장했던 회원정보들 다 가져오기
    const users= JSON.parse(localStorage.getItem("users"));

    //관리자로 로그인하면 회원목록 보이고, 관리자가 아니면 안보이게 할거임
    //2. 로그인한 사용자 상태 초기화
    const [currentUser, setCurrentUser]= useState(null); //currentUser에 id, password속성

    //3. 로컬스토리지에서 로그인했을 때 저장한 사용자 정보 가져온다.
    useEffect(()=>{
        const storedUser=JSON.parse(localStorage.getItem("currentUser"));
        setCurrentUser(storedUser);

    },[]);


    return (
        <div>
            <h1>회원 목록</h1>
             {/* 관리자로 로그인하면 회원목록 보이고 */}
            {currentUser && currentUser.userId==="admin" && 
            currentUser.password==="admin" ? (
                <ul>
                    {users.length > 0 ? (
                        users.map((user, index) => <li key={index}>{user.userId}</li>)
                    ) : (
                        <li>회원 없다</li>
                    )
                }
                </ul>

            )  :( //관리자가 아니면 회원목록 안보이게 할거임
                <div>
                    <div>회원목록은 관리자만 볼 수 있습니다</div>
                </div>
            )       
        }     
        </div>
    ); 
};

export default MemberList;