import axios from "axios";
export class UserServices{
    register = (email,password,type,plan,name) => {
        return axios.post("http://localhost:3000/register",{
            email,
            password,
            type,
            plan,
            name
        })
    }

    login= (email,password) =>{
        return axios.post("http://localhost:3000/login",
            {
                email,
                password
            })
    }
}