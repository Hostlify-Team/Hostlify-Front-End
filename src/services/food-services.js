import axios from "axios";
const http = axios.create({
    baseURL:"http://sleepless0000-001-site1.atempurl.com/api/",
    headers: { "Content-type": "application/json" },
})
export class FoodServices{
    getFoodServices=()=>{
        return axios.get("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/foodServices")
    }
    postFoodService=(token,foodOrder)=>{
        return http.post("FoodServices/byResource",{
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
        return http.get("FoodServices/byRoomId?roomId="+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
    deleteFoodServiceByRoomId(id){
        return axios.delete("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/room/"+id+"/foodServices")
    }
    deleteFoodServiceById(token,id){
        return http.delete("FoodServices/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    }
}