const express = require("express");
const router = express.Router();
const Template = require("../models/template");
const ArchivedTemplate = require("../models/archivedTemplate");
const ApprovedTemplate = require("../models/approvedTemplate");
const auth = require("../utils/auth");
const ExceptionHandler = require("../core/ExceptionHandler");
const BadRequestException = require("../exceptions/BadRequestException");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");
const UnauthorisedException = require("../exceptions/UnauthorisedException");

router.post("/submit", auth.authenticate, async (req, res) => {
  try {
    const { id } = req.body;
    let template = await Template.findOne({ id });
    if (!template)
      throw new ResourceNotFoundException({ resouceName: "Template" });
    if (!template.owner._id.equals(req.user._id))
      throw new UnauthorisedException({ message: "Unauthorised User" });
    template.status = "Pending";
    template.time = Date.now();
    await template.save();
    res.json(template);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});

router.post(
  "/approve",
  auth.authenticate,
  //   auth.verifyAdmin,
  async (req, res) => {
    try {
      const { id } = req.body;
      let template = await Template.findOne({ id });
      if (!template)
        throw new ResourceNotFoundException({ resouceName: "Template" });
      const { name, owner, creationTime, lastUpdated, data } = template;
      let approvedTemplate = new ApprovedTemplate({
        name,
        owner,
        creationTime,
        lastUpdated,
        data,
        id,
        approvedBy: req.user._id,
        time: Date.now(),
      });
      const prevTemplate = await ApprovedTemplate.findOne({ id });
      if (prevTemplate) {
        const {
          name,
          owner,
          creationTime,
          lastUpdated,
          data,
          version,
          approvedBy,
        } = prevTemplate;
        const archivedTemplate = new ArchivedTemplate({
          name,
          owner,
          creationTime,
          lastUpdated,
          data,
          id,
          approvedBy,
          version,
          time: Date.now(),
        });
        await archivedTemplate.save();
        await ApprovedTemplate.findOneAndDelete({ id });
        approvedTemplate.version = version + 1;
      } else {
        approvedTemplate.version = 1;
      }
      await approvedTemplate.save();
      await Template.findOneAndDelete({ id });
      res.json(approvedTemplate);
    } catch (err) {
      const e = ExceptionHandler(err);
      res.status(e.code).json(e);
    }
  }
);
router.post(
  "/reject",
  auth.authenticate,
  //auth.verifyAdmin,
  async (req, res) => {
    try {
      const { id } = req.body;
      let template = await Template.findOne({ id });
      if (!template)
        throw new ResourceNotFoundException({ resouceName: "Template" });
      template.status = "Rejected";
      template.time = Date.now();
      await template.save();
      res.json(template);
    } catch (err) {
      const e = ExceptionHandler(err);
      res.status(e.code).json(e);
    }
  }
);
router.get("/:name/:id", auth.authenticate, async (req, res) => {
  try {
    const { name, id } = req.params;
    if (!id) throw new BadRequestException({ message: "Id is missing" });
    let template;
    if (name === "archived") template = await ArchivedTemplate.findOne({ id });
    else if (name === "approved")
      template = await ApprovedTemplate.findOne({ id });
    else if (name === "draft" || name === "pending" || name === "rejected") {
      template = await Template.findOne({ id });
      const check = name.charAt(0).toUpperCase() + name.slice(1);
      if (template.status !== check)
        throw new ResourceNotFoundException({
          message: `This template has been moved to ${template.status} `,
        });
    }
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
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    let skip = (page - 1) * limit;
    if (skip < 0) skip = 0;
    let templates = [];
    if (name === "draft" || name === "pending" || name === "rejected")
      templates = await Template.find({
        owner: req.user._id,
        status: name.charAt(0).toUpperCase() + name.slice(1),
      })
        .limit(limit)
        .skip(skip);
    if (name === "archived")
      templates = await ArchivedTemplate.find({ owner: req.user._id })
        .limit(limit)
        .skip(skip);
    if (name === "approved")
      templates = await ApprovedTemplate.find({ owner: req.user._id })
        .limit(limit)
        .skip(skip);
    res.json(templates);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});

router.delete("/draft/:id", auth.authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findOne({ id });
    if (!template)
      throw new ResourceNotFoundException({ resouceName: "Template" });
    if (!template.owner._id.equals(req.user._id))
      throw new UnauthorisedException({ message: "Unauthorised User" });
    await Template.findOneAndDelete({ id });
    res.send("Deleted");
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});
module.exports = router;
