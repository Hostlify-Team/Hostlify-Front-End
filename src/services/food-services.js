import axios from "axios";
export class FoodServices{
    getFoodServices=()=>{
        return axios.get("http://localhost:3000/foodServices")
    }
    postFoodService=(foodOrder)=>{
        return axios.post("http://localhost:3000/foodServices",{
            "id": foodOrder.id,
            "roomId": foodOrder.roomId,
            "managerId": foodOrder.managerId,
            "dish": foodOrder.dish,
            "dishQuantity": foodOrder.dishQuantity,
            "drink": foodOrder.drink,
            "drinkQuantity": foodOrder.drinkQuantity,
            "cream": foodOrder.cream,
            "creamQuantity": foodOrder.creamQuantity,
            "instruction": foodOrder.instruction
        })
    }
    getFoodServiceByRoomId(id){
        return axios.get("http://localhost:3000/room/"+id+"/foodServices")
    }
    deleteFoodServiceByRoomId(id){
        return axios.delete("http://localhost:3000/room/"+id+"/foodServices")
    }
    deleteFoodServiceById(id){
        return axios.delete("http://localhost:3000/foodServices/"+id)
    }
}