import React from 'react'
import useApiPrivate from '../hooks/useAPIPrivaate';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthValues } from '../features/auth';

const StudentHomePage = () => {
    const apiPrivate = useApiPrivate();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try {
            const response = await apiPrivate.get(
                "/auth/logout", {
                withCredentials: true
            }
            )
            if (response.status === 200) {
                dispatch(removeAuthValues());
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div onClick={handleLogOut}>StudentHomePage
    </div>
  )
}

export default StudentHomePage