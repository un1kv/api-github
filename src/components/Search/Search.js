import React from 'react'

const Search = ({ setGitUser, gitUser }) => {
    return (
      <input
        type="text"
        value={gitUser}
        onChange={(e) => setGitUser(e.target.value)}
      />
    );
  };

export default Search