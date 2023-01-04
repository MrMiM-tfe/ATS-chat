import React from 'react';

const UserProfileToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className='user-dropdown'
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));


export default UserProfileToggle