import axios from "axios";
export class FoodServices{
    getFoodServices=()=>{
        return axios.get("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/foodServices")
    }
    postFoodService=(foodOrder)=>{
        return axios.post("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/foodServices",{
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
        return axios.get("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/room/"+id+"/foodServices")
    }
    deleteFoodServiceByRoomId(id){
        return axios.delete("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/room/"+id+"/foodServices")
    }
    deleteFoodServiceById(id){
        return axios.delete("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/"+id)
    }
}