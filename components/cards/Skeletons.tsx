import Image from "next/image";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function ThreadSkeletons() {
    return (
        <div className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>

                    <div className="flex w-full flex-col">
                        <div className="flex">
                            <div className="space-y-2">
                                <div className="space-y-3">
                                    <div className="flex">
                                        <Skeleton className="h-4 w-[120px]" />
                                        <Skeleton className="mx-2 mt-0.5 h-3 w-[100px] bg-slate-500" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <Skeleton className="h-3 w-[400px]" />
                                        <Skeleton className="h-3 w-[350px]" />
                                        <div className="flex mt-3">
                                            <Skeleton className="mr-3 h-4 w-[18px] bg-slate-700" />
                                            <Skeleton className="mx-3 flex-col h-4 w-[18px] bg-slate-700" />
                                            <Skeleton className="mx-3 flex-col h-4 w-[18px] bg-slate-700" />
                                            <Skeleton className="mx-3 flex-col h-4 w-[18px] bg-slate-700" />
                                        </div>
                                        <Skeleton className="mt-4 flex-col h-2.5 w-[130px] bg-slate-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex gap-3.5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SearchSkeletons() {
    return (
        <>
            <div className="mt-9">
                <article className="user-card">
                    <div className="user-card_avatar">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 text-ellipsis space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-3 bg-gray-500 w-[160px]" />
                        </div>
                    </div>

                    <div>
                        <Skeleton className="h-8 w-18 " />
                        <Skeleton className="min-w-[74px] rounded-lg text-[12px] text-light-1 !important" />
                    </div>
                </article>
            </div>
        </>
    );
}
