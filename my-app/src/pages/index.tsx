import Text from "@components/UI/Text.tsx";
import MetaTags from "@components/MetaTags.tsx";

export default function Home() {
    return (
        <>
            <MetaTags
                description={"Welcome to boat store! The leading supplier of luxury performance boats and boating supplies"}/>
            <div className={"flex flex-col w-full"}>
                <Text>
                    Hello World!
                </Text>
            </div>
            ;
        </>
    )
};
