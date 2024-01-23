import Image from "next/image";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    type?: "User" | "Community";
    profileId: string;
}

const ProfileHeader = ({
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio,
    type,
    profileId,
}: Props) => {
    return (
        <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 px-5">
                    <div className="relative h-20 w-20 object-cover">
                        <Image
                            src={imgUrl}
                            alt="Profile Image"
                            fill
                            className="rounded-full object-cover shadow-sm"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-stretch">
                            <h2 className="text-left text-heading3-bold text-light-1">
                                {name}
                            </h2>
                            <p className="mt-1.5 mx-3 max-w-lg text-base-regular text-light-2">
                                {profileId === accountId && (
                                    <a
                                        href="/onboarding"
                                        className="text-gray-400"
                                    >
                                        Edit Profile
                                    </a>
                                )}
                            </p>
                        </div>
                        <p className="text-base-medium text-gray-1">
                            @{username}
                        </p>
                        <div className="flex">
                            <p className="mt-3 max-w-lg text-base-regular text-light-2">
                                {bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*TODO COMMUNITY=!*/}

            <div className="mt-8 h-0.5 w-full bg-dark-3" />
        </div>
    );
};
export default ProfileHeader;
