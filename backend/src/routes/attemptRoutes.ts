import{Router} from "express"
import * as attemptService from "../services/attempService"

const router=Router();

router.post("/attempts",async(req,res)=>{
    const {problemId,learnerId}=req.body;
    const attempt=await attemptService.startAttempt(problemId,learnerId)
    res.status(201).json(attempt);
})

router.post("/attempts/:id/submit",async(req,res)=>{
    try{
        const attempt=await attemptService.submitAttempt(req.params.id,req.body.content)
        res.json(attempt);

    }catch(err){
        res.status(400).json({error:(err as Error).message});
    }
})

router.get("/attempt/:id",async(req,res)=>{
    const detail=await attemptService.getAttemptDetail(req.params.id);
    res.json(detail);
})

router.get("/learners/:learnerId/attempts",async(req,res)=>{
    const history=await attemptService.getAttemptHistory(req.params.learnerId);
    res.json(history);
})

export default router;