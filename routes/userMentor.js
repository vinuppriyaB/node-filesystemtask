import express from "express";

import {
    getAllStudentOFMentor,
    getMentorName,
    getAllStudentName,
    addMentorName,
    setMentorToMoreStudent,
    pushMoreStudentByMentorName,
    findOldMeentorByStudent,
    setMentorToTheStudent,
    pushStudentByMentorName,
    pulloutStudentWhoAssignToOtherMentor,
    getStudentWithoutMentor,
    addStudentName
} from "../helper.js";

const router = express.Router();
router.post("/student/add",async(request,response)=>{
    const {studentname}= request.body;
    const result = await addStudentName(studentname);
    response.send(result);

})
router.get("/student/get",async(request,response)=>{
  
  let filter =request.query;
    const result = await getAllStudentName(filter);
   
      response.send(result);

})
router.get("/get/student/withoutmentor",async(request,response)=>{
  
  
    const movie = await getStudentWithoutMentor();
   
      response.send(movie);

})
router.put("/assignmentor",async(request,response)=>{
  const {selectedmentorname,selectedstudentname }= request.body

  const result4  = await findOldMeentorByStudent(selectedstudentname); 

   const oldmentorname=result4.mentor  
   
   const result1 = await setMentorToTheStudent( selectedstudentname, selectedmentorname);
  
  const result2=await pushStudentByMentorName( selectedmentorname, selectedstudentname);
                 
  
   const result3 = await pulloutStudentWhoAssignToOtherMentor(oldmentorname, selectedstudentname);
                  

  response.send(result4)   
    

})
router.put("/assignstudents",async(request,response)=>{
  const {selectedmentorname
, selectedstudentname }= request.body
  const client = await setMentorToMoreStudent(selectedstudentname, selectedmentorname);
  
                 
  const result2 = await pushMoreStudentByMentorName( selectedmentorname, selectedstudentname);
  
                 
  response.send(result2);

})
router.post("/mentor/add",async(request,response)=>{
    const {mentorname}= request.body
    const result = await addMentorName(mentorname);
    response.send(result);

})
router.get("/mentor/get",async(request,response)=>{
  
  
  let filter =request.query;
    const movie = await getMentorName(filter);
   
      response.send(movie);
    
   
})

router.get("/mentor",async(request,response)=>{
    const {mentorname}= request.query;
    const result = await getAllStudentOFMentor(mentorname);
   const res= await result.forEach (student =>{
    response.send(student);
        
    })  
    

})


export const studentmentorRouter=router;