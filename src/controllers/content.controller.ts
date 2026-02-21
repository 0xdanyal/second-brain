import { Response } from "express";
import { AuthRequest } from "../middleware";
import { ContentModel, LinkModel } from "../models/content.model";

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
export const deleteContent = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const contentId = req.body._id;

    if (!userId || !contentId) {
        return res.status(400).json({ message: "Invalid request" });
    }

    const deletedContent = await ContentModel.findOneAndDelete({
        _id: contentId,
        userId,
    });

    if (!deletedContent) {
        return res.status(404).json({ message: "Content not found or not authorized" });
    }

    res.json({ message: "Deleted" });
}

// Delete content based on contentId and userId.
await ContentModel.deleteOne({ _id: contentId, userId }); // Delete the content.
res.json({ message: "Deleted" }); // Send success response.
};


// Route 6: Share Content Link
export const shareContent = async (req: AuthRequest, res: Response) => {
    const { share } = req.body;
    if (share) {
        // Check if a link already exists for the user.
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash }); // Send existing hash if found.
            return;
        }

        // Generate a new hash for the shareable link.
        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash });
        res.json({ hash }); // Send new hash in the response.
    } else {
        // Remove the shareable link if share is false.
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" }); // Send success response.
    }
};

// Route 7: Get Shared Content
export const getSharedContent = async (req: Request, res: Response) => {
    const hash = req.params.shareLink;

    // Find the link using the provided hash.
    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
        return;
    }

    // Fetch content and user details for the shareable link.
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }

    res.json({
        username: user.username,
        content
    }); // Send user and content details in response.
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});