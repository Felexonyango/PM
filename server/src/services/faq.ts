import { Request, Response, NextFunction, response } from "express";
import { User as UserType } from "../types/user";

import { Faq } from "../model/faq";

export const FaqService = {
  async CreatFaq(req: Request, res: Response, next: NextFunction) {
    try {
      let { question } = req.body;
      const user = req.user as UserType;

      let faq = await Faq.create({
        question,
        askedBy: user?._id,
      });
      let result = await faq.save();

      if (result)
        return res
          .status(200)
          .json({ msg: "Successfully created faq", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  async getAllFaqs(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      
     
        const result = await Faq.find({}).populate(
          "askedBy",
          "-password"
        );

        if (result)
          return res.status(200).json({
            message: `Faqs retrieved successfully`,
            result,
          });
      
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getFaqById(req: Request, res: Response, next: NextFunction) {
    try {
      const { faqId } = req.params;
      const result = await Faq.findById(faqId).populate(
        "askedBy",
        "-password"
      );


      if (!result)
        return res.status(404).json({ message: " Faq not found" });
      res.status(200).json({ msg: "successfully retrieved Faq ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async updateFaq(req: Request, res: Response, next: NextFunction) {
    try {
      const { faqId } = req.params;

      let faq = await Faq.findByIdAndUpdate(faqId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!faq)
        return res.status(404).json({ message: "Faq not found" });
      res
        .status(200)
        .json({ message: "Faq updated successfully", faq });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Comment" });
    }
    next();
  },

  async deleteFaq(req: Request, res: Response, next: NextFunction) {
    try {
      const { faqId } = req.params;
      let findcommentedBy = await Faq.findById(faqId).populate(
        "askedBy"
      );
      const user = req.user as UserType;
      if (findcommentedBy?.askedBy._id.equals(user._id)) {
        const data = await Faq.findByIdAndRemove(faqId);
        if (data) {
          return res.status(200).json({ msg: "faq deleted" });
        }
      } else {
        return res
          .status(403)
          .json({ msg: "You do not have permission to delete this faq" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
};
