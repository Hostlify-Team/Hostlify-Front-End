import axios from "axios";
const http = axios.create({
    baseURL:"http://localhost:3000/",
    headers: { "Content-type": "application/json" },
})

export class RoomServices{
    getRooms(){
        return http.get("rooms")
    }
    getRoomsForManager(id){
        return http.get("manager/"+id+"/rooms")
    }
    getRoomForGuest(id){
        return http.get("guest/"+id+"/rooms")
    }
    postRoom(room){
        return http.post("rooms",{
            "roomName":room.roomName,
            "managerId": room.managerId,
            "guestId": room.guestId,
            "initialDate": room.initialDate,
            "endDate": room.endDate,
            "status": room.status,
            "progressTime": room.progressTime,
            "price": room.price,
            "image": room.image,
            "description": room.description
        })
    }
    updateRoom(id,room){
        return http.put("rooms/"+id,{
            "roomName":room.roomName,
            "managerId": room.managerId,
            "guestId": room.guestId,
            "initialDate": room.initialDate,
            "endDate": room.endDate,
            "status": room.status,
            "progressTime": room.progressTime,
            "price": room.price,
            "image": room.image,
            "description": room.description
        })

    }
    deleteRoom(id){
        return http.delete("rooms/"+id)
    }
}