import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className="wrapper">
            <svg className='header-text'>
                <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                    Anonymous Chat
                </text>
            </svg>
        </div>
    )
}

export default Header