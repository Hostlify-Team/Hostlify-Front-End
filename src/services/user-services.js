import axios from "axios";

const http = axios.create({
    baseURL:"https://webapi-hostlify.azurewebsites.net/api/",
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
    postCustomPlan(email,roomsNumber){
        return http.post("User/PostRoomsLimit",{
            "email":email,
            "roomsLimit":roomsNumber
        })
    }
    getLimitRoom(token,id){
        return http.get("User/GetRoomsLimit/"+id,{headers: {"Authorization" : `Bearer ${token}`}})
    }
    updateUserPlan(token,id,actualPlan,changedPlan,newCustomRoomLimit){
        return http.put("User/UpdateRoomsPlan/"+id,{
            "actualPlan": actualPlan,
            "changedPlan": changedPlan,
            "newCustomRoomLimit": newCustomRoomLimit
        },{headers: {"Authorization" : `Bearer ${token}`}})
    }
}