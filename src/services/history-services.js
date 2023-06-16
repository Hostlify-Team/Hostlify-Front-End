import axios from "axios";
const http = axios.create({
    baseURL:"https://webapi-hostlify.azurewebsites.net/api/",//
    headers: { "Content-type": "application/json" },
})
export class HistoryServices{
    getHistoryForManager(token,id){
        return http.get("History/byManagerId?managerId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    deleteRoomHistory(token,id){
        return http.delete("History/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
}