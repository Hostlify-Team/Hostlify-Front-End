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
    deleteFoodServiceById(token,id){
        return http.delete("Services/deleteFoodService/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    getAllFoodServices(token){
        return http.get("Services/GetAllFoodServices",{ headers: {"Authorization" : `Bearer ${token}`} })
    }
}