import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(params.id);
    if (!userInfo?.onboarded) redirect("/edit-profile");

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
                profileId={user.id}
            />

            <div className="mt-5">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger
                                key={tab.label}
                                value={tab.value}
                                className="tab"
                            >
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>

                                {tab.label === "Posts" && (
                                    <p className="ml-1 rounded-full bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {userInfo.threads.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {profileTabs.map((tab) => (
                        <TabsContent
                            key={`content-${tab.label}`}
                            value={tab.value}
                            className="w-full text-light-1"
                        >
                            {userInfo.threads.length === 0 ? (
                                <div className=" m-10 items-center flex flex-col text-center text-gray-500">
                                    <div>*checks database*</div>
                                    <div>It's Empty here. Post something.</div>
                                    {/* <div className="text-xxs max-w-96 m-1">
                                        And in case you did, it doesn't work for
                                        some reason, I have been debugging for
                                        hours and gave up. Welp! it's a new
                                        feature then.
                                        <br></br> Go touch some grass.
                                    </div> */}
                                </div>
                            ) : (
                                <ThreadsTab
                                    currentUserId={user.id}
                                    accountId={userInfo.id}
                                    accountType="User"
                                />
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}

export default Page;
