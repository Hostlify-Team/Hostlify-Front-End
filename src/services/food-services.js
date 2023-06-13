import axios from "axios";
const http = axios.create({
    baseURL:"https://localhost:7217/api/",
    headers: { "Content-type": "application/json" },
})
export class FoodServices{
    postFoodService=(token,foodOrder)=>{
        return http.post("Services/FoodServiceByResource",{
            "roomId": foodOrder.roomId,
            "dish": foodOrder.dish,
            "dishQuantity": foodOrder.dishQuantity,
            "drink": foodOrder.drink,
            "drinkQuantity": foodOrder.drinkQuantity,
            "cream": foodOrder.cream,
            "creamQuantity": foodOrder.creamQuantity,
            "instruction": foodOrder.instruction
        },{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getFoodServiceByRoomId(token,id){
        return http.get("Services/FoodServicebyRoomId?roomId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getFoodServicePendingByRoomId(token,id){
        return http.get("Services/FoodServiceUnAttendedByRoomId?roomId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getFoodServiceHistoryByRoomId(token,id){
        return http.get("Services/FoodServiceAttendedByRoomId?roomId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    attendFoodServiceById(token,id){
        return http.delete("Services/attendFoodService/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    deleteAllFoodServicesByRoomId(token,id){
        return http.delete("Services/deleteAllFoodServicesByRoomId/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getAllFoodServices(token){
        return http.get("Services/GetAllFoodServices",{ headers: {"Authorization" : `Bearer ${token}`} })
    }
}