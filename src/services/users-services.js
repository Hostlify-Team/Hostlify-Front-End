import axios from "axios";

export class UsersServices{
    getUsers=()=>{
        return axios.get("http://localhost:3000/users")
    }
    postUsers=(name,email,password,plan,type)=>{
        return axios.post("http://localhost:3000/users", {
            "type": type,
            "plan": plan,
            "name": name,
            "email": email,
            "password": password
        },)
    }
    deleteUsers=(Id)=>{
        return axios.delete("http://localhost:3000/users/"+Id);
    }
    updateUsers=(user,Id)=>{
        return axios.put("http://localhost:3000/users/"+Id,user)
    }
}