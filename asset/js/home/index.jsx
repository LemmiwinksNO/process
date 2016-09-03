import React from 'react'
import { Link, browserHistory } from 'react-router'

export default function Home({ children }) {
	return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/qms">QMS</Link>
        {' '}
        <a href="/qms">QMS as well homie</a>
      </header>
      <div>
        <button onClick={() => browserHistory.push('/qms')}>Go to /qms</button>
      </div>
      <div>{children}</div>
    </div>
	)
}