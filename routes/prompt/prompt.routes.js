const express = require("express");
const router = express.Router();
const { Data } = require("./../../model/Data");
const { clientAvatar } = require("./../../utils/prompts");

function formatInfo(info) {
  const improvement_area =
    info["Are you going to IMPROVE your clients health/wealth/relationships?"];
  const target_audience =
    info[
      "What is your target audience within this market? (e.g. entrepreneurs looking to scale their business)"
    ];
  const product_or_service =
    info[
      "What product/service are you planning to provide? (e.g 1:1 coaching sessions to help them scale their business step by step)"
    ];
  const pain_point =
    info[
      "What pain point are you solving? (e.g. not knowing how to scale and struggling to find talent)"
    ];
  const data = {
    improvement_area,
    target_audience,
    product_or_service,
    pain_point,
  };

  return data;
}

router.post("/client-avatar", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        message: "No email address provided",
      });
    }

    const data = await Data.findOne({ email });
    if (!data) {
      return res.json({
        message: `No data found related to this email:${email}`,
      });
    }

    const { info } = data;
    const format_data = formatInfo(info[0]);
    const result = await clientAvatar(format_data);
    const answer = result.data.choices[0].message.content;
    res.json({
      result: answer,
    });
  } catch (error) {
    console.log(error);
    res
      .json({
        message: "Something went wrong!",
      })
      .status(404);
  }
});

module.exports = router;
