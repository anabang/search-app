import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import cn from 'classnames'
import { setCurrentPage, setTotal } from '../redux/paginationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createPages } from '../utils/createPages'

const Main = () => {

    const [ username , setUsername ] = useState('')
    const [ usersList , setUsersList ] = useState([])
    const [ currentUser , setCurrentUser ] = useState('')
    const [ currentUserInfo , setCurrentUserInfo ] = useState('')
    const [sortOrder, setSortOrder] = useState('asc');

    const perPage = 12;
    const pages = []
    const dispatch = useDispatch()
    const page = useSelector((state) => state.pagination.currentPage)
    const usersTotal = useSelector((state) => state.pagination.totalCount)
    const pagesTotal = Math.ceil(Number(usersTotal / perPage))

    if (usersList) {
        createPages (pages, pagesTotal, page)
    }

    useEffect(() => {

        if (username) {
            axios.get(`https://api.github.com/search/users?q=${username}&sort=repositories&order=${sortOrder}&per_page=${perPage}&page=${page}`)
            .then((response) => {
                setUsersList(response.data.items);
                setTotal(response.data.total_count)
            })

            .catch(function (error) {
            console.log(error);
            })
        }

    }, [username, sortOrder, page])
    
    const handleSorting = () => {
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

        if (currentUser) {
        axios.get(`https://api.github.com/users/${currentUser}`)
        .then((response) => {
            const userData = response.data;
            console.log(userData);
            setCurrentUserInfo(userData);
          })

        .catch(function (error) {
          console.log(error);
        })
        }
    }, [currentUser])


    const setPage = (e) => {
        const pageNumber = e.target.outerText
        dispatch(setCurrentPage(+pageNumber))
    }


  return (
    <div className='container' >

        {currentUser ?
        <div className={cn('profileBlock', 'profileVisibility' )}  >

            <div key={currentUserInfo.id} className='profile' >
                <img className='icon' src={currentUserInfo.avatar_url} alt="" />
                <div className='profileInfo' >
                    <h2 className='login'>{currentUserInfo.login}</h2>
                    <h3 className='userInfo'>followers: {currentUserInfo.followers} </h3>
                    <h3 className='userInfo'>public repos: {currentUserInfo.public_repos}</h3>
                </div> 
                
            </div>
        </div> : null}
        

        <div className='heading'>enter username</div>

        <div className='inputBlock' >
            <input value={username} onChange={(e) => setUsername(e.target.value)} className='input'></input>
            <button onClick={() => handleSorting(sortOrder)} className='sortButton'> sort {sortOrder === 'asc' ? 'ascending' : 'descending'} </button>

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
        {usersList.length ?
            <div className='pages' >
                {pages.map((page) => 
                    <div onClick={setPage} className='page' key={page}>{page}</div>)}
            </div> 
        : null}

    </div>
  )
}

export default Main