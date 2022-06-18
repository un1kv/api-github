import React from 'react'

const UserCard = ({users, resetOne, id}) => {
  return (
    <div id={id}>
        <h1>{users.login}</h1>
        <img src={users.avatar_url} />
        <h3>{users.created_at}</h3>
        <h3>repositories: {users.public_repos}</h3>
        <button onClick={resetOne}>reset one</button>
    </div>
  )
}

export default UserCard