import express from "express";
import { client } from "./index.js";

async function getAllStudentOFMentor(mentorname) {
  const pipeline = [
    {
      '$match': {
        'mentorname': mentorname
      }
    }, {
      '$project': {
        'student': 1,
        '_id': 0
      }
    }
  ];
//   const client = await createConnection();
  const result = client
    .db("B27rwd")
    .collection("mentor")
    .aggregate(pipeline);
  return result;
}

async function getMentorName(filter) {
//   const client = await createConnection();
  const movie = await client
    .db("B27rwd")
    .collection("mentor")
    .find(filter)
    .toArray();
  return movie;
}
async function getAllStudentName(filter) {
    // const client = await createConnection();
    const result = await client
      .db("B27rwd")
      .collection("student")
      .find(filter)
      .toArray();
    return result;
  }

async function addMentorName(mentorname) {
//   const client = await createConnection();
  const result = await client.db("B27rwd").collection("mentor").insertOne({mentorname:mentorname});
  return result;
}

async function setMentorToMoreStudent(selectedstudentname, selectedmentorname) {
//   const client = await createConnection();
  for (let i = 0; i < selectedstudentname.length; i++) {
    let name = selectedstudentname[i];
    const result1 = await client.db("B27rwd")
      .collection("student")
      .updateOne({ studentname: name },
        { $set: { mentor: selectedmentorname } });



  }
  return "sucess";
}

async function pushMoreStudentByMentorName(selectedmentorname, selectedstudentname) {
//   const client = await createConnection();
  const result2 = await client.db("B27rwd")
    .collection("mentor")
    .updateOne({ mentorname: selectedmentorname },
      { $push: { student: { $each: selectedstudentname } } });
  return result2;
}

async function findOldMeentorByStudent(selectedstudentname) {
//   const client = await createConnection();
  const result4 = await client.db("B27rwd")
    .collection("student")
    .findOne({ studentname: selectedstudentname });
  return result4;
}

async function setMentorToTheStudent(selectedstudentname, selectedmentorname) {
//   const client = await createConnection();
  const result1 = await client.db("B27rwd")
    .collection("student")
    .updateOne({ studentname: selectedstudentname },
      { $set: { mentor: selectedmentorname } });
  return result1;
}

async function pushStudentByMentorName(selectedmentorname, selectedstudentname) {
//   const client = await createConnection();
  const result2 = await client.db("B27rwd")
    .collection("mentor")
    .updateOne({ mentorname: selectedmentorname },
      { $push: { student: selectedstudentname } });
      return result2;
}

async function pulloutStudentWhoAssignToOtherMentor(oldmentorname, selectedstudentname) {
//   const client = await createConnection();
  const result3 = await client.db("B27rwd")
    .collection("mentor")
    .updateOne({ mentorname: oldmentorname },
      { $pull: { student: selectedstudentname } });
  return result3;
}

async function getStudentWithoutMentor() {
//   const client = await createConnection();
  const result = await client
    .db("B27rwd")
    .collection("student")
    .find({ mentor: "null" })
    .toArray();
  return result;
}

async function addStudentName(studentname) {
//   const client = await createConnection();
  const result = await client.db("B27rwd")
    .collection("student")
    .insertOne({ studentname: studentname, mentor: "null" });
  return result;
}

export{
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
    addStudentName,
}