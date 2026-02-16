import mongoose, { Schema, model } from "mongoose";

const ContentSchema = new Schema({
    title: String,                          // Title of the content
    link: String,                           // URL or link to the content
    tags: [String],                         // Array of tags
    type: String,                           // Type of content (e.g., 'article', 'video', etc.)
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true                       // The 'userId' field is mandatory to link content to a user
    },
});


const LinkSchema = new Schema({
    // 'hash' is a string that represents the shortened or hashed version of a link
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
});

export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Links", LinkSchema);