import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import cn from 'classnames'

const Main = () => {

    const [ username , setUsername ] = useState('')
    const [ usersList , setUsersList ] = useState([])
    const [ currentUser , setCurrentUser ] = useState('')
    const [ currentUserInfo , setCurrentUserInfo ] = useState('')

    const [sortOrder, setSortOrder] = useState('asc');




    const [ profileVisibility , setProfileVisibility ] = useState('invisible')



    useEffect(() => {

        // if (username) {
        axios.get(`https://api.github.com/search/users?q=${username}&sort=repositories&order=${sortOrder}`)
        .then((response) => {
            const usersData = response.data.items;
            setUsersList(usersData);
          })

        .catch(function (error) {
          console.log(error);
        })
        // }

    }, [username])
    
    function handleSorting() {
        if (sortOrder === 'asc') {
            setSortOrder('desc')
        } else {
            setSortOrder('asc')
        }
    }    

    const showProfile = (e) =>{
        console.log(e.target.id);
        const user = e.target.id;
        setCurrentUser(user)
    }

    useEffect(() => {

        // if (currentUser) {
        axios.get(`https://api.github.com/users/${currentUser}`)
        .then((response) => {
            const userData = response.data;
            console.log(userData);
            setCurrentUserInfo(userData);
          })

        .catch(function (error) {
          console.log(error);
        })
        // }
    }, [currentUser])



  return (
    <div className='container' >

        {currentUser ?
        <div className={cn('profileBlock', 'profileVisibility' )}  >

            <div key={currentUserInfo.id} className='profile' >
                <img className='icon' src={currentUserInfo.avatar_url} alt="" />
                <div className='profileInfo' >
                    <h2 className='login'>{currentUserInfo.login}</h2>
                    <h3 className='userInfo'>followers: {currentUserInfo.followers} </h3>
                    <h3 className='userInfo' >public repos: {currentUserInfo.public_repos}</h3>
                </div> 
                
            </div>
        </div> : null}
        

        <div className='heading'>enter username</div>

        <div className='inputBlock' >
            <input value={username} onChange={(e) => setUsername(e.target.value)} className='input'></input>
            <button onClick={handleSorting} className='sortButton'> sort {sortOrder === 'asc' ? 'ascending' : 'descending'} </button>
        </div>
 
        <div className='userBlock' >
            <ul className='usersList'>
                {usersList.length ?
                    usersList.map((user) => {
                        return (
                        <div>
                            <li 
                            id={user.login}
                            onClick={showProfile} 
                            className='userItem' 
                            key={user.id}>
                            {user.login}
                            </li>
                        </div>)
                        
                    }) : null
                }
            </ul>
        </div>
    </div>
  )
}

export default Main