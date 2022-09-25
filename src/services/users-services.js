import axios from "axios";

export class UsersServices{
    getUsers=()=>{
        return axios.get("http://localhost:3000/comments")
    }
    postUsers=(body,postId)=>{
        return axios.post("http://localhost:3000/comments",
            {
                "body": body,
                "postId": postId
            })
    }
    deleteUsers=(Id)=>{
        return axios.delete("http://localhost:3000/comments/"+Id);
    }
    updateUsers=(body,postId,Id)=>{
        return axios.put("http://localhost:3000/comments/"+Id,{
            "body": body,
            "postId": postId
        })
    }
}