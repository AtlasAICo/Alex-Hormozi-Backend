const express = require("express");
const router = express.Router();
const { Data } = require("./../../model/Data");
const { Output } = require("../../model/Output");
const {
  clientAvatar,
  painPoints,
  dreamOutcomes,
  solutions,
  grandSlamOffer,
} = require("./../../utils/prompts");

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

router.get("/offer-time", async (req, res) => {
  const offerEndTime = new Date("2023-08-31T24:00:00Z").getTime();
  res.json({ offerEndTime });
});

router.post("/client-avatar", async (req, res) => {
  try {
    const outputType = "client-avatar";
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

    const existingResult = await Output.findOne({ email, outputType });
    if (!existingResult) {
      const newResult = new Output({ email, outputType, output: answer });
      await newResult.save();
      console.log("New client avatar saved to database.");
    } else {
      await Output.updateOne({ email, outputType }, { output: answer });
      console.log("Client avatar updated.");
    }

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

router.post("/pain-points", async (req, res) => {
  try {
    const outputType = "pain-points";
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

    const clientAvatar = await Output.findOne({
      email,
      outputType: "client-avatar",
    });
    if (!clientAvatar) {
      return res.json({
        message: `No client-avatar created yet.`,
      });
    }

    const { info } = data;
    const format_data = formatInfo(info[0]);
    format_data.clientAvatar = clientAvatar;
    const result = await painPoints(format_data);
    const answer = result.data.choices[0].message.content;

    const existingResult = await Output.findOne({ email, outputType });
    if (!existingResult) {
      const newResult = new Output({ email, outputType, output: answer });
      await newResult.save();
      console.log("New pain points saved to database.");
    } else {
      await Output.updateOne({ email, outputType }, { output: answer });
      console.log("Pain points updated.");
    }

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

router.post("/dream-outcomes", async (req, res) => {
  try {
    const outputType = "dream-outcomes";
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

    const painPoints = await Output.findOne({
      email,
      outputType: "pain-points",
    });
    if (!clientAvatar) {
      return res.json({
        message: `No pain-points created yet.`,
      });
    }

    const { info } = data;
    const format_data = formatInfo(info[0]);
    format_data.painPoints = painPoints;
    const result = await dreamOutcomes(format_data);
    const answer = result.data.choices[0].message.content;

    const existingResult = await Output.findOne({ email, outputType });
    if (!existingResult) {
      const newResult = new Output({ email, outputType, output: answer });
      await newResult.save();
      console.log("New dream outcomes saved to database.");
    } else {
      await Output.updateOne({ email, outputType }, { output: answer });
      console.log("Dream outcomes updated.");
    }

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

router.post("/solutions", async (req, res) => {
  try {
    const outputType = "solutions";
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

    const dreamOutcomes = await Output.findOne({
      email,
      outputType: "dream-outcomes",
    });
    if (!dreamOutcomes) {
      return res.json({
        message: `No dream-outcomes created yet.`,
      });
    }

    const { info } = data;
    const format_data = formatInfo(info[0]);
    format_data.dreamOutcomes = dreamOutcomes;
    const result = await solutions(format_data);
    const answer = result.data.choices[0].message.content;

    const existingResult = await Output.findOne({ email, outputType });
    if (!existingResult) {
      const newResult = new Output({ email, outputType, output: answer });
      await newResult.save();
      console.log("New solutions saved to database.");
    } else {
      await Output.updateOne({ email, outputType }, { output: answer });
      console.log("Solutions updated.");
    }

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

router.post("/offer", async (req, res) => {
  try {
    const outputType = "offer";
    const { email } = req.body;

    if (!email) {
      return res.json({
        message: "No email address provided",
      });
    }

    const data = await Data.findOne({ email });
    if (!data) {
      return res.json({
        message: `No data found related to this email: ${email}`,
      });
    }

    const clientAvatar = await Output.findOne({
      email,
      outputType: "client-avatar",
    });
    if (!clientAvatar) {
      return res.json({
        message: `No client-avatar created yet.`,
      });
    }

    const painPoints = await Output.findOne({
      email,
      outputType: "pain-points",
    });
    if (!painPoints) {
      return res.json({
        message: `No pain-points created yet.`,
      });
    }

    const dreamOutcomes = await Output.findOne({
      email,
      outputType: "dream-outcomes",
    });
    if (!dreamOutcomes) {
      return res.json({
        message: `No dream-outcomes created yet.`,
      });
    }

    const solutions = await Output.findOne({ email, outputType: "solutions" });
    if (!solutions) {
      return res.json({
        message: `No solutions created yet.`,
      });
    }

    const { info } = data;
    const format_data = formatInfo(info[0]);
    format_data.clientAvatar = clientAvatar;
    format_data.painPoints = painPoints;
    format_data.dreamOutcomes = dreamOutcomes;
    format_data.solutions = solutions;

    const result = await grandSlamOffer(format_data);
    const answer = result.data.choices[0].message.content;

    const existingResult = await Output.findOne({ email, outputType });
    if (!existingResult) {
      const newResult = new Output({ email, outputType, output: answer });
      await newResult.save();
      console.log("New offer saved to database.");
    } else {
      await Output.updateOne({ email, outputType }, { output: answer });
      console.log("Offer updated.");
    }

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
