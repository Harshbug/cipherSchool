import { Schema,model } from "mongoose";

const criterionResultSchema=new Schema({
    key:{type:String,required:true},
    score:{type:Number,required:true},
    evidence:{type:String,required:true},
    concern:{type:String,required:true},
    suggestion:{type:String,required:true},
    confidence:{type:Number,required:true},


},{_id:false});

const evaluationSchema=new Schema({
    attemptId:{type:Schema.Types.ObjectId,ref:"attempt",required: true },
    status:{type:String,enum:["evaluating","completed","failed"],required:true,default:"evaluating"},
    results: [criterionResultSchema],
    overallScore: { type: Number },
    errorMessage: { type: String },
    completedAt: { type: Date }
},{ timestamps: { createdAt: true, updatedAt: false }})


export const EvaluationModel = model("Evaluation", evaluationSchema);