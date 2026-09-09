import {Router} from "express"
import * as problemService from "../services/problemService"

const router=Router();

router.get("/problem",async(req,res)=>{
   const problem=await problemService.listProblems();
   res.json(problem)
})

router.get("/problem/:id",async(req,res)=>{
    const problembyId=await problemService.getProblems(req.params.id)
    if(!problembyId) return res.status(404).json({error:"Problem not found"})
    res.json(problembyId)
})

export default router;