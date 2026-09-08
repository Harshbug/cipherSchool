import {Schema,model} from "mongoose";

const problemSchema=new Schema({
    title:{type:String,required:true},
    statement:{type:String,required:true},
    requirements:[{type:String}],
    constraints:[{type:String}],

},{timestamps:true})

export const ProblemMode=model("problem",problemSchema);