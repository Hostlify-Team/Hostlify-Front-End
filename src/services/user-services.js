import axios from "axios";
export class UserServices{

    register = (email,password,plan,name) => {
        return axios.post("https://localhost:7217/api/User/Signup",{
            name,
            password,
            email,
            plan
        })
    }

    login= (email,password) =>{
        return axios.post("https://localhost:7217/api/User/Login",
            {
                email,
                password
            })
    }
    getUser(id){
        return axios.get("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/users/"+id)

    }
    deleteUser(id){
        return axios.delete("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/users/"+id)
    }
    getUsers(token){
        return axios.get("https://localhost:7217/api/User",{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getUserByEmail(token,email){
        return axios.get("https://localhost:7217/api/User/GetByEmail/"+email,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    loginTest(email,password){
        return axios.post("https://localhost:7217/api/User/Login",{
            email,
            password
        })
    }
}