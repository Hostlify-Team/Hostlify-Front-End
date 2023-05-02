import axios from "axios";

const http = axios.create({
    baseURL:"http://sleepless0000-001-site1.atempurl.com/api/",
    headers: { "Content-type": "application/json" },
})

export class UserServices{

    register = (email,password,plan,name,type) => {
        return http.post("User/Signup",{
            name,
            password,
            email,
            plan,
            type
        })
    }

    login= (email,password) =>{
        return http.post("User/Login",
            {
                email,
                password
            })
    }
    getUser(token,id){
        return http.get("User/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })

    }
    deleteUser(token,id){
        return http.delete("User/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getUserByEmail(token,email){
        return http.get("User/GetByEmail/"+email,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
}