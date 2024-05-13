import React from 'react'
import { useLocation } from 'react-router-dom'

const SessionOverviewPage = () => {

    const location = useLocation();
    const session = location.state.session;

  return (
    <div>
        <h1>
            {session.subject}
        </h1>
    </div>
  )
}

export default SessionOverviewPage