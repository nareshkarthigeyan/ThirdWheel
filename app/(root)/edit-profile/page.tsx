import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo ? userInfo?.username : user?.username,
        name: userInfo ? userInfo?.name : user?.firstName || "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user?.imageUrl,
    };
    return (
        <div>
            <div className="flex flex-col">
                {/* {userInfo.onboarded && (
                    <main className="mx-auto flex max-w-3xl flex-col justify-center px-7 py-20">
                        <h1 className="head-text text-light-2">
                            Welcome to ThirdWheel
                        </h1>
                        <p className="text-base-regular text-light-2">
                            Complete your profile now to use ThirdWheel
                        </p>
                        <p className="text-xxs text-light-1">
                            NOTE: Image should be under 1 MB
                        </p>
                    </main>
                )} */}

                <section
                    className=" bg-dark-2 p-10 mb-10
            "
                >
                    <AccountProfile user={userData} btnTitle="Continue" />
                </section>
            </div>
        </div>
    );
}

export default Page;
