const express = require("express");
const router = express.Router();
const DraftTemplate = require("../models/draftTemplate");
const PendingTemplate = require("../models/pendingTempate");
const ApprovedTemplate = require("../models/approvedTemplate");
const auth = require("../utils/auth");
const ExceptionHandler = require("../core/ExceptionHandler");
const BadRequestException = require("../exceptions/BadRequestException");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");

router.get("/:name/:id", auth.authenticate, async (req, res) => {
  try {
    const { name, id } = req.params;
    if (!id) throw new BadRequestException({ message: "Id is missing" });
    let template;
    if (name === "draft") template = await DraftTemplate.findOne({ id });
    if (name === "pending") template = await PendingTemplate.findOne({ id });
    if (name === "approved") template = await ApprovedTemplate.findOne({ id });
    if (!template)
      throw new ResourceNotFoundException({ resouceName: "Template" });
    res.json(template);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});

router.get("/:name", auth.authenticate, async (req, res) => {
  try {
    const { name } = req.params;
    let templates;
    if (name === "draft")
      templates = await DraftTemplate.find({ owner: req.user._id });
    if (name === "pending")
      templates = await PendingTemplate.find({ owner: req.user._id });
    if (name === "approved")
      templates = await ApprovedTemplate.find({ owner: req.user._id });
    res.json(templates);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});

module.exports = router;
