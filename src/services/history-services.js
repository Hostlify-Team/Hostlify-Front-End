import axios from "axios";
const http = axios.create({
    baseURL:"https://localhost:7217/api/",//
    headers: { "Content-type": "application/json" },
})
export class HistoryServices{
    getHistoryForManager(id){
        return http.get("manager/"+id+"/history")
    }
    postRoomHistory(token,room){
        return http.post("History/byResource",{
            "roomName":room.roomName,
            "managerId": room.managerId,
            "guestName": room.guestName,
            "initialDate": room.initialDate,
            "endDate": room.endDate,
            "price": room.price
        },{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    deleteRoomHistory(id){
        return http.delete("history/"+id)
    }
}