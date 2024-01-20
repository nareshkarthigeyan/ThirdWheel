"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string;
    name: string;
    username: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser({
    userId,
    name,
    username,
    bio,
    image,
    path,
}: Params): Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }
        );

        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update User: ${error.message}`);
    }
}

export async function fetchUser(userId: String) {
    try {
        connectToDB();

        return await User.findOne({ id: userId });
        // .populate ({
        //     path: "communities"
        //     model: Community
        // })
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}
