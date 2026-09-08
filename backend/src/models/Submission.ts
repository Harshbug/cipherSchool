import {Schema,model} from "mongoose";

const submissionSchema=new Schema({
    attempattemptid: { type: Schema.Types.ObjectId, ref: "Attempt", required: true },
    type:{type:String,enum:["text"],required:true},
    content:{type:String,required:true},
},{timestamps:{createdAt:"submittedAt",updatedAt:false}})  

export const SubmissionModel = model("Submission", submissionSchema);