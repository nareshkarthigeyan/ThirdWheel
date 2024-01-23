import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { UserButton } from "@clerk/nextjs";
import { User, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
    const result = await fetchPosts(1, 30);
    // console.log(result.posts);
    const user = await currentUser();

    return (
        <>
            <h1 className="head-text text-left">Home</h1>

            <h2 className="text-gray-600 text-left font-semibold">
                {user ? (
                    `Welcome @${user?.username}!`
                ) : (
                    <a
                        href="/sign-in"
                        className="text-cyan-500 font-normal underline"
                    >
                        Sign Up / Sign in to ThirdWheel
                    </a>
                )}
            </h2>

            <section className="mt-9 flex flex-col gap-10">
                {result.posts.length === 0 ? (
                    <p className="no-result text-white">
                        No Posts Found. Post something to bring it alive.
                    </p>
                ) : (
                    <>
                        {result.posts.map((post) => (
                            <ThreadCard
                                key={post._id}
                                id={post._id}
                                currentUserId={user?.id || ""}
                                parentId={post.parentId}
                                content={post.text}
                                author={post.author}
                                community={post.community}
                                createdAt={post.createdAt}
                                comments={post.children}
                                username={post.username}
                            />
                        ))}
                    </>
                )}
            </section>
        </>
    );
}
