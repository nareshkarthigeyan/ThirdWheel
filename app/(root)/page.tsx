import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { UserButton } from "@clerk/nextjs";
import { User, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
    const result = await fetchPosts(1, 30);
    console.log(result.posts);
    const user = await currentUser();

    console.log(result);

    return (
        <>
            <h1 className="head-text text-left">Home</h1>;
        </>
    );
}
