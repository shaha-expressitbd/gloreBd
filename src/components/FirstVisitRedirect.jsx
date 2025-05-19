import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom' // If you're using React Router

const FirstVisitRedirect = () => {
  const history = useHistory()

  useEffect(() => {
    const visited = Cookies.get('visited')

    if (!visited) {
      Cookies.set('visited', 'true', { expires: 30 })

      history.push('/big-deal')
    }
  }, [history])

  return null
}

export default FirstVisitRedirect
