import axios from "axios";
const http = axios.create({
    baseURL:"https://webapi-hostlify.azurewebsites.net/api/",
    headers: { "Content-type": "application/json" },
})
export class CleaningServices{
    postCleaningService=(token,CleaningOrder)=>{
        return http.post("Services/CleaningServiceByResource",{
            "roomId": CleaningOrder.roomId,
            "instruction": CleaningOrder.instruction
        },{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getCleaningByRoomId(token,id){
        return http.get("Services/CleaningServicebyRoomId?roomId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getCleaningPendingByRoomId(token,id){
        return http.get("Services/CleaningServiceUnAttendedByRoomId?roomId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getCleaningHistoryByRoomId(token,id){
        return http.get("Services/CleaningServiceAttendedByRoomId?roomId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    attendCleaningById(token,id){
        return http.delete("Services/attendCleaningService/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    deleteAllCleaningServiceByRoomId(token,id){
        return http.delete("Services/deleteAllCleaningServiceByRoomId/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getAllCleaningServices(token){
        return http.get("Services/GetAllCleaningServices",{ headers: {"Authorization" : `Bearer ${token}`} })
    }
}