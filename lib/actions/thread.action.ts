"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string;
    author: String;
    communityId: string | null;
    path: string;
}

export async function createThread({
    text,
    author,
    communityId,
    path,
}: Params) {
    try {
        connectToDB();

        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });

        //Update user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id },
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`error creating Post: ${error.message}`);
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    //Calc no. of posts to skip:
    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery = Thread.find({
        parentId: { $in: [null, undefined] },
    })
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: "author", model: User })
        .populate({
            path: "children",
            populate: {
                path: "author",
                model: User,
                select: "_id name parentId image",
            },
        });

    const totalPostsCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
}

export async function fetchThreadById(id: string) {
    connectToDB();

    try {
        //TODO: Populate Community
        const thread = await Thread.findById(id)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image",
            })
            .populate({
                path: "children",
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "_id id name parentId image",
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image",
                        },
                    },
                ],
            })
            .exec();

        return thread;
    } catch (error: any) {
        throw new Error(`Error fetching thread: ${error.mesage}`);
    }
}
