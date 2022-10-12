import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:3000/",
    headers: { "Content-type": "application/json" },
})
export class HistoryServices{
    getHistoryForManager(id){
        return http.get("manager/"+id+"/history")
    }
    postRoomHistory(room){
        return http.post("history",{
            "roomName":room.roomName,
            "managerId": room.managerId,
            "guestId": room.guestId,
            "initialDate": room.initialDate,
            "endDate": room.endDate,
            "price": room.price,
            "description": room.description
        })
    }
    deleteRoomHistory(id){
        return http.delete("history/"+id)
    }
}