import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:3000/",
    headers: { "Content-type": "application/json" },
})

export class RoomServices{
    getRooms(){
        return http.get("rooms")
    }
    postRoom(room){
        return http.post("rooms",{
            "roomName":room.roomName,
            "guestId": room.guestId,
            "date": room.date,
            "status": room.status,
            "time": room.time,
            "image": room.image,
            "description": room.description
        })
    }
    updateRoom(id,room){
        return http.put("rooms/"+id,{
            "roomName":room.roomName,
            "guestId": room.guestId,
            "date": room.date,
            "status": room.status,
            "time": room.time,
            "image": room.image,
            "description": room.description
        })

    }
    deleteRoom(id){
        return http.delete("rooms/"+id)
    }
}