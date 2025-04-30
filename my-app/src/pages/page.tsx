import Text from "@components/UI/Text.tsx";
import MetaTags from "@components/MetaTags.tsx";

export default function Home() {
    return (
        <>
            <MetaTags
                description={"Welcome to boat store! The leading supplier of luxury performance boats and boating supplies"}/>
            <div className={"flex flex-col w-full gap-4 items-center text-center"}>
                <Text className={"text-2xl"}>
                    Welcome to Boat store!
                </Text>
                <Text className={"text-xl"}>
                    Where luxury meets the open sea. Explore top-of-the-line boats &
                </Text>
                <Text className={"text-lg"}>
                    premium supplies,
                    designed for those who demand the best. Your next adventure starts here.
                </Text>
            </div>
        </>
    )
};
