import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { any } from "zod";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { ThreadSkeletons } from "../cards/Skeletons";
import { Suspense } from "react";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
    //TODO: Fetch profile threads
    let result = any;

    if (accountType === "Community") {
        result = await fetchCommunityPosts(accountId);
    } else {
        result = await fetchUserPosts(accountId);
    }

    if (!result) redirect("/");

    const skeletonLength = 5;
    const skeletonArray = Array.from({ length: skeletonLength });

    return (
        <section className="mt-9 flex flex-col gap-10">
            <Suspense
                fallback={skeletonArray.map(() => (
                    <ThreadSkeletons />
                ))}
            >
                {result.threads.map((thread: any) => (
                    <ThreadCard
                        key={thread._id}
                        id={thread._id}
                        username={thread.username}
                        currentUserId={currentUserId}
                        parentId={thread.parentId}
                        content={thread.text}
                        author={
                            accountType === "User"
                                ? {
                                      name: result.name,
                                      username: result.username,
                                      image: result.image,
                                      id: result.id,
                                  }
                                : {
                                      name: thread.author.name,
                                      username: thread.author.username,
                                      image: thread.author.image,
                                      id: thread.author.id,
                                  }
                        } //todo
                        community={thread.community} //todo
                        createdAt={thread.createdAt}
                        comments={thread.children}
                    />
                ))}
            </Suspense>
        </section>
    );
};

export default ThreadsTab;
