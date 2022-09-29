import axios from "axios";
export class PlanServices{
    getPlans=()=>{
        return axios.get("http://localhost:3000/plans")
    }
}