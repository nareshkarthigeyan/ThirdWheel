import { SearchSkeletons } from "@/components/cards/Skeletons";
import UserCard from "@/components/cards/UserCard";
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function Page() {
    const skeletonLength = 9;
    const skeletonArray = Array.from({ length: skeletonLength });
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    //Fetch User Data:
    const result = await fetchUsers({
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 25,
    });

    return (
        <section>
            <h1 className="head-text mb-10 px-3">Search</h1>

            {/* Search bar */}
            <Suspense
                fallback={skeletonArray.map(() => (
                    <SearchSkeletons />
                ))}
            >
                <div className="mt-14 flex flex-col gap-9">
                    {result.users.length === 0 ? (
                        <p className="no-result">No users</p>
                    ) : (
                        <>
                            {result.users.map((person) => (
                                <UserCard
                                    key={person.id}
                                    id={person.id}
                                    name={person.name}
                                    username={person.username}
                                    imgUrl={person.image}
                                    personType="User"
                                />
                            ))}
                        </>
                    )}
                </div>
            </Suspense>
        </section>
    );
}

export default Page;
