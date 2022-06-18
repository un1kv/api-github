
import './App.css';
import axios from 'axios'
import {useEffect, useState} from 'react'
import Search from './components/Search/Search';
import Button from './components/Button/Button';
import UserCard from './components/UserCard/UserCard';
import Select from './components/Select/Select';

function App() {
const [gitUser, setGitUser] = useState("");
const [searchedUser, setSearchedUser] = useState("");
const [users, setUsers] = useState([]);
const [sortUser, setSortUser] = useState({});
console.log(users);

  useEffect(()=> {
    try{
    async function fetchData(){
      const githubApiUrl = `https://api.github.com/users/${searchedUser}`;
      if(gitUser==="") return
      const {data} = await axios.get(githubApiUrl);
      const {avatar_url, created_at, login, public_repos } = data;
      setUsers([...users,{ avatar_url, created_at, login, public_repos }]);

      console.log(avatar_url, created_at, login, public_repos);
    }
    fetchData();
  }catch(e){
    console.log(e);
  }
  }, [searchedUser])

  useEffect(()=>{
    console.log("users",users)
  },[sortUser])
  
  return (
    <div className="App">
        <Search setGitUser={setGitUser} gitUser={gitUser} />
      <Button
        text={"Search"}
        clickEvent={() => {
          console.log("search");
          setSearchedUser(gitUser);
        }}
      />
      <Button 
        text={"Reset all"}
        clickEvent={() => {
           console.log("Reset")
          setUsers([])
          setGitUser("")
           }} />
     
      {users.map((user,i) =>
        <UserCard  key={user.login} id={user.login} users={user} resetOne={(e)=>{
         const id = e.target.parentElement.id
        console.log(id);
       const newUsers= users.filter((thisUser)=>{
        return thisUser.login!==id
       })
       console.log(newUsers);

        setUsers(newUsers)

      }
      }
        />
      )}
      <Select options={(e) =>{

        if(e.target.value==="name"){
          console.log(e.target.value);
          setUsers(users.sort((a,b)=>
            a.login.toUpperCase()<b.login.toUpperCase()? -1
            : a.login.toUpperCase()>b.login.toUpperCase()? 1 : 0
          ))
          console.log(users);
          console.log(sortUser)
        }
       if(e.target.value==="repositories"){
        console.log(e.target.value)
        setUsers(users.sort((a,b)=>
          a.public_repos-b.public_repos
        ))
        console.log(users);
        console.log(sortUser)
       } 
       if(e.target.value==="date"){
        console.log(e.target.value)
        setUsers(users.sort((a,b)=>
        new Date(a.created_at.split("T")[0]).getTime() -new Date(b.created_at.split("T")[0]).getTime()
        ))
        console.log(users);
        console.log(sortUser)
       }
       setSortUser(users)
       console.log(sortUser);
      }}/>
        
    </div>
  );
}

export default App;
