import axios from "axios";
const http = axios.create({
    baseURL:"https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/",
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
            "guestStayComplete": room.guestStayComplete,
            "price": room.price,
            "image": room.image,
            "description": room.description,
            "emergency":room.emergency,
            "servicePending": room.servicePending,
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
            "guestStayComplete": room.guestStayComplete,
            "price": room.price,
            "image": room.image,
            "description": room.description,
            "emergency":room.emergency,
            "servicePending": room.servicePending,
        })

    }
    deleteRoom(id){
        return http.delete("rooms/"+id)
    }
}