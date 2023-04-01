import axios from "axios";

export class PlanServices{
    getPlans=()=>{
        return axios.get("https://my-json-server.typicode.com/Hostlify-Team/hostlify-data/plans")
    }
}