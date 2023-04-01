import axios from "axios";
export class UserServices{

    register = (email,password,plan,name,type) => {
        return axios.post("https://localhost:7217/api/User/Signup",{
            name,
            password,
            email,
            plan,
            type
        })
    }

    login= (email,password) =>{
        return axios.post("https://localhost:7217/api/User/Login",
            {
                email,
                password
            })
    }
    getUser(token,id){
        return axios.get("https://localhost:7217/api/User/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })

    }
    deleteUser(token,id){
        return axios.delete("https://localhost:7217/api/User/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getUsers(token){
        return axios.get("https://localhost:7217/api/User",{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getUserByEmail(token,email){
        return axios.get("https://localhost:7217/api/User/GetByEmail/"+email,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
}