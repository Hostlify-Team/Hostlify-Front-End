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
    getUser(id){
        return axios.get("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/users/"+id)

    }
    deleteUser(id){
        return axios.delete("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/users/"+id)
    }
}