import axios from "axios";
const http = axios.create({
    baseURL:"https://localhost:7217/api/",
    headers: { "Content-type": "application/json" },
})

export class RoomServices{
    getRooms(){
        return http.get("rooms")
    }
    getRoomsForManager(token,id){
        return http.get("Rooms/byManagerId?managerId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getRoomForGuest(token,id){
        return http.get("Rooms/byGuestId?guestId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    evictGuest(token,id){
        return http.put("Rooms/evict/"+id,{},{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    postRoom(token,room){
        return http.post("Rooms",{
            "roomName":room.roomName,
            "ManagerId": room.managerId,
            "Description": room.description
        },{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    updateRoom(token,id,room){
        let initialDate="";let endDate=""
        if(room.status){initialDate="none";endDate="none"}
        else {initialDate=room.initialDate;endDate=room.endDate}
        return http.put("Rooms/"+id,{
            "roomName":room.roomName,
            "guestId": room.guestId,
            "managerId": room.managerId,
            "initialDate": initialDate,
            "endDate": endDate,
            "status": room.status,
            "price": room.price,
            "description": room.description,
            "emergency":room.emergency,
            "servicePending": room.servicePending,
        },{ headers: {"Authorization" : `Bearer ${token}`} })

    }
    deleteRoom(token,id){
        return http.delete("Rooms/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    registerGuest(token,id,registerGuest){
        return http.put("Rooms/register/"+id,{
            "Id":registerGuest.roomId,
            "name": registerGuest.name,
            "password": registerGuest.password,
            "email": registerGuest.email,
            "initialDate": registerGuest.initialDate,
            "endDate": registerGuest.endDate,
            "price": registerGuest.price
        },{ headers: {"Authorization" : `Bearer ${token}`} })

    }
}