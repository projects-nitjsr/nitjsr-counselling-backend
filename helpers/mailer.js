const { CourierClient } = require("@trycourier/courier");
const mailer = async (mailID, name, reason, redirectLink) => {
  const courier = CourierClient({
    authorizationToken: process.env.COURIER_TOKEN,
  });
  const { requestId } = await courier.send({
    message: {
      to: {
        email: mailID,
      },
      template: "9MC195PX3RMTDHMY33EATCP9CXP6",
      data: {
        recipientName: name,
        reason,
        link: redirectLink,
      },
    },
  });
};
module.exports = mailer;
//drivercode
// const mailer=require ("../helpers/mailer")
// const test = async (req, res) => {
//     await mailer("sarthakgoel1234@gmail.com","sarthak","reason for sending mail","link to be redirected")
//     res.send("message sent succesfully")
// };
// module.exports = test;
