import { fetchUser } from "@/lib/actions/user.actions";
import {
    OrganizationSwitcher,
    SignOutButton,
    SignedIn,
    currentUser,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

async function Topbar() {
    const user = await currentUser();

    let element;

    if (!user) {
        element = (
            <>
                <Link href={`/sign-in`}>
                    <Image
                        src="/assets/login.svg"
                        alt="logout"
                        width={26}
                        height={26}
                    />
                </Link>
            </>
        );
    }

    const userInfo = user ? await fetchUser(user.id) : null;

    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image
                    src="/assets/logo2.svg"
                    alt="logo"
                    width={40}
                    height={40}
                />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">
                    ThirdWheel
                </p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image
                                    src="/assets/logout.svg"
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>

                <div>
                    {user ? (
                        <div className="px-2">
                            <Link
                                href={`/profile/${userInfo.id}`}
                                className="flex items-center gap-4"
                            >
                                <Image
                                    src={userInfo.image}
                                    alt="Profile Image"
                                    height={40}
                                    width={40}
                                    className="cursor-pointer rounded-full"
                                />
                            </Link>
                        </div>
                    ) : (
                        element
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Topbar;
