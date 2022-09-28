import axios from "axios";
export class UserServices{
    register = (email,password) => {
        return axios.post("http://localhost:3000/register",{
            email,
            password
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