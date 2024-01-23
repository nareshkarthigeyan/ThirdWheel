import mongoose from "mongoose";
import { number } from "zod";

const threadSchema = new mongoose.Schema({
    text: { type: String, reuired: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commuinty",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: String,
    },
    children: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread", //recursion
    },
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
