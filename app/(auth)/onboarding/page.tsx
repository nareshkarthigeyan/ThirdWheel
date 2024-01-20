import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
    const user = await currentUser();

    const userInfo = {};

    const userDate = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
    };
    return (
        <>
            <div className="flex flex-col items-center">
                <main className="mx-auto flex max-w-3xl flex-col justify-center px-10 py-20">
                    <h1 className="head-text text-light-2">Onboarding</h1>
                    <p className="mt-3 text-base-regular text-light-2">
                        Complete your profile now to use ThirdWheel
                    </p>
                </main>
                <section
                    className="mt-9 bg-dark-2 p-10 mb-10
            "
                >
                    <AccountProfile user={userDate} btnTitle="Continue" />
                </section>
            </div>
        </>
    );
}

export default Page;
