
const { CourierClient } =require("@trycourier/courier");
const messager=async(phoneNumber,messageTitle,messageData)=>{

 const courier = CourierClient(
   { authorizationToken: process.env.COURIER_TOKEN});
 
 const { requestId } = await courier.send({
   message: {
     to: {
       phone_number: phoneNumber,
     },
     routing: {
       method: "single",
       channels: ["sms"]
     },
     channels : {
       sms: {
         providers: ["twilio"] 
       }
     },
     content: {
       title: messageTitle,
       body: messageData,
     }
   }
 });
}
module.exports=messager
//driverCode
// const messager=require ("../helpers/messager")
// const test = async (req, res) => {
//     await messager("+919636731474","hii","hello this is Sarthak Goel")
//     res.send("message sent succesfully")
// };
// module.exports = test;