import { formatDateString } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        };
    }[];
    username: string;
    isComment?: boolean;
}

const ThreadCard = async ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    username,
    isComment,
}: Props) => {
    return (
        <div className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link
                            href={`/profile/${author.id}`}
                            className="relative h-11 w-11"
                        >
                            <Image
                                src={author.image}
                                alt="Profile Image"
                                fill
                                className="cursor-pointer rounded-full"
                            />
                        </Link>
                    </div>

                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`}>
                            <div className="flex">
                                <span className="cursor-pointer text-base-semibold text-light-2">
                                    {author.name}
                                </span>

                                <span className="cursor-pointer text-base-semibold text-gray-500 mx-2">
                                    {`@${author.username}`}
                                </span>

                                <span className="mv">
                                    {author.id ===
                                        "user_2bBYATKpB664bkFIAHrhQyVyCyb" && (
                                        <Image
                                            src="/assets/verified.png"
                                            alt="Verified"
                                            height={20}
                                            width={20}
                                        />
                                    )}
                                </span>
                            </div>
                        </Link>

                        <p className="mt-2  mb-3 text-small-regular text-light-2">
                            {content}
                        </p>

                        <div
                            className={`${
                                isComment && `mb-10`
                            }mt-5 flex flex-col gap-3`}
                        >
                            <div className="flex gap-3.5">
                                <Image
                                    src="/assets/heart-gray.svg"
                                    alt="heart"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                />
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        src="/assets/reply.svg"
                                        alt="heart"
                                        width={24}
                                        height={24}
                                        className="cursor-pointer object-contain"
                                    />
                                </Link>
                                <Image
                                    src="/assets/repost.svg"
                                    alt="heart"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                />
                                <Image
                                    src="/assets/share.svg"
                                    alt="heart"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                />
                            </div>
                            {isComment && comments && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">
                                        {comments.length} replies
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* TODO: Delete thread TODO: Show comment logos */}
            </div>
            <div className="items-right">
                {!isComment && community ? (
                    <Link
                        href={`/communities/${community.id}`}
                        className="mt-5 flex items-center"
                    >
                        <p className="text-subtle-medium text-gray-1">
                            {formatDateString(createdAt)} - {community.name}{" "}
                            Community
                        </p>
                        <Image
                            src={community.image}
                            alt={community.name}
                            width={14}
                            height={14}
                            className="ml-1 rounded-full object-cover"
                        />
                    </Link>
                ) : (
                    <p className="mt-3 px-14 text-subtle-medium text-gray-600">
                        {formatDateString(createdAt)}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ThreadCard;
