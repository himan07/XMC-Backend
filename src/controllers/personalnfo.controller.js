const personalInfoModal = require("../models/personalnfo.model");

exports.createPersonalInfo = async (req, res) => {
  try {
    const emailExists = await personalInfoModal.findOne({
      email: req.body.email,
    });
    if (emailExists) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    // const mobileRecord = await personalInfoModal.findOne({
    //   mobile: req.body.mobile,
    // });
    // if (mobileRecord && mobileRecord.email !== req.body.email) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "Mobile number already associated with another email",
    //   });
    // }

    let uuid;

    if (!emailExists) {
      const generateNumericUUID = () => {
        return Math.floor(10000 + Math.random() * 90000);
      };

      const randomId = generateNumericUUID();
      uuid = `MXD${randomId}`;
    }

    const createPersonalInfoData = {
      ...req.body,
      uuid,
    };

    const personalInfo = await personalInfoModal.create(createPersonalInfoData);
    res.status(201).json({
      status: "success",
      data: {
        personalInfo,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
