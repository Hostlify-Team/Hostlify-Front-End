import axios from "axios";

export class PlansServices{
    getPlans=()=>{
        return axios.get("http://localhost:3000/plans")
    }
}