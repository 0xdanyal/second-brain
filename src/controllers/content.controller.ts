import { Response } from "express";
import { AuthRequest } from "../middleware";
import { ContentModel } from "../models/content.model";

export const contentController = async (req: AuthRequest, res: Response) => {
    const { link, type, title } = req.body;

    if (!req.userId) {
        res.status(403).json({ message: "Unauthenticated" });
        return;
    }

    // Create a new content entry linked to the logged-in user.
    await ContentModel.create({
        link,
        type,
        title,
        userId: req.userId, // userId is guaranteed to be a string here due to the check
        tags: [] // Initialize tags as an empty array.
    });

    res.json({ message: "Content added" }); // Send success response.
};


// delete content==========================================
// export const deleteContent = async (req: AuthRequest, res: Response) => {
//     const contentId = req.body.contentId;

//     // Delete content based on contentId and userId.
//     await ContentModel.deleteMany({ contentId, userId: req.userId });
//     res.json({ message: "Deleted" }); // Send success response.
// };