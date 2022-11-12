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

const templateMapper = {
  draft: Template,
  pending: Template,
  rejected: Template,
  approved: ApprovedTemplate,
  archived: ArchivedTemplate,
};

router.post("/redraft", auth.authenticate, async (req, res) => {
  try {
    const { id } = req.body;
    let template = await Template.findOne({ id });
    if (!template)
      throw new ResourceNotFoundException({ resouceName: "Template" });
    if (!template.owner._id.equals(req.user._id))
      throw new UnauthorisedException({ message: "Unauthorised User" });
    if (template.status !== "Rejected")
      throw new BadRequestException({
        message: "This template is not yet Rejceted",
      });
    template.status = "Draft";
    await template.save();
    res.json(template);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});

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
  auth.verifyAdmin,
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
  auth.verifyAdmin,
  async (req, res) => {
    try {
      const { id, feedback } = req.body;
      let template = await Template.findOne({ id });
      if (!template)
        throw new ResourceNotFoundException({ resouceName: "Template" });
      template.status = "Rejected";
      template.feedback = feedback;
      template.time = Date.now();
      await template.save();
      res.json(template);
    } catch (err) {
      const e = ExceptionHandler(err);
      res.status(e.code).json(e);
    }
  }
);
router.get("/archive/:id/:version", auth.authenticate, async (req, res) => {
  try {
    const { id, version } = req.params;
    const template = await ArchivedTemplate.findOne({ id, version });
    if (!template)
      throw new ResourceNotFoundException({ resourceName: "Template" });
    if (!template.owner._id.equals(req.user._id))
      throw new UnauthorisedException({ message: "Unauthorised User" });
    res.json(template);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});
router.get("/:name/:id", auth.authenticate, async (req, res) => {
  try {
    const { name, id } = req.params;
    if (!id) throw new BadRequestException({ message: "Id is missing" });
    const template = await templateMapper[name].findOne({ id });
    if (!template)
      throw new ResourceNotFoundException({ resourceName: "Template" });
    if (
      name !== "approved" &&
      !req.user.isAdmin &&
      !template.owner._id.equals(req.user._id)
    )
      throw new UnauthorisedException({
        message: "You don't own this Template",
      });
    if (name === "draft" || name === "pending" || name === "rejected") {
      const check = name.charAt(0).toUpperCase() + name.slice(1);
      if (template.status !== check)
        throw new ResourceNotFoundException({
          message: `This template has been moved to ${template.status} `,
        });
    }
    res.json(template);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});

router.get("/:name", auth.authenticate, async (req, res) => {
  try {
    const { name } = req.params;
    const { page = 1, limit = 10, search } = req.query;
    const opt = new RegExp(`${search}`);
    let skip = (page - 1) * limit;
    if (skip < 0) skip = 0;
    let queryObject = {
      owner: req.user._id,
    };
    if (name !== "draft" && req.user.isAdmin) queryObject = {};
    if (name === "approved") queryObject = {};
    if (search && search.length > 0) {
      queryObject.name = { $regex: opt, $options: "i" };
    }
    switch (name) {
      case "draft":
        queryObject.status = "Draft";
        break;
      case "pending":
        queryObject.status = "Pending";
        break;
      case "rejected":
        queryObject.status = "Rejected";
        break;
    }
    let templates = await templateMapper[name]
      .find(queryObject)
      .limit(limit)
      .skip(skip);
    let totalPages = await templateMapper[name].countDocuments(queryObject);
    totalPages = Math.ceil(totalPages / limit);
    const response = {
      data: templates,
      totalPages,
    };
    res.json(response);
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
    if (template.status !== "Draft")
      throw new ResourceNotFoundException({
        message: `This template is not present in Draft `,
      });
    await Template.findOneAndDelete({ id });
    res.send("Deleted");
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});
module.exports = router;
