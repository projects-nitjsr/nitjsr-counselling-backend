const { CourierClient } = require("@trycourier/courier");
const mailer=async(mailID,studentName)=>{
  const courier = CourierClient({ authorizationToken: process.env.COURIER_TOKEN });

const { requestId } = await courier.send({
  message: {
    to: {
      email:mailID,
    },
    template: "9MC195PX3RMTDHMY33EATCP9CXP6",
    data: {
      recipientName:studentName,
    },
  },
});
}

module.exports=mailer;
//drivercode
// const mailer=require ("../helpers/mailer")
// const test = async (req, res) => {
//     await mailer("sarthakgoel1234@gmail.com","sarthak")
//     res.send("message sent succesfully")
// };
// module.exports = test;