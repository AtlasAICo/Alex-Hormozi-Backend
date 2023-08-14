const { sendGetInTouchData } = require("./../utils/email");

const getInTouch = async (req, res) => {
  try {
    const { budget, email, fullName, message, subject } = req.body;
    const from = "gk4051668@gmail.com";
    const to = "Draevyn@atlasco.ai";
    const text = `
    Email: ${email}
    Full Name: ${fullName}
    Message: ${message}
    Budget: ${budget}
    `;
    await sendGetInTouchData(from, to, subject, text);
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Something went wrong",
    });
  }
};
module.exports = {
  getInTouch,
};
