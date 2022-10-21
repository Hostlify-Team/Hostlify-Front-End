import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/",
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
            "guestName": room.guestName,
            "guestEmail": room.guestEmail,
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