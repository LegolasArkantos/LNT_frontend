import React from 'react'
import { Link } from 'react-router-dom'

const ProfileDropDown = (props) => {
  return (
      <div class="w-full bg-white rounded-lg shadow">
        <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
            <h class="block px-4 py-4 text-m font-semibold text-purple-900">{props.profile.firstName} {props.profile.lastName}</h>
            </li>
          <li onClick={() => props.setDropDown(false)}>
            <Link to={props.role === "Teacher" ? "/teacher-home-page/my-profile" : "/student-home-page/my-profile"}  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
          </li>
          <li onClick={() => props.handleLogOut()}>
            <h class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Sign out</h>
          </li>
        </ul>
      </div>

  )
}

export default ProfileDropDown