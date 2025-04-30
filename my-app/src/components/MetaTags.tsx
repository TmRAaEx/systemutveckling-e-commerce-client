import {Helmet} from "react-helmet-async";

interface MetaTagProps {
    title?: string,
    description?: string,
    canonicalUrl?: string,
}

export default function MetaTags(props: MetaTagProps) {
    return (
        <Helmet>
            {/*Probably only works as expected after building*/}
            <title>{props.title ? props.title : "Home"} | Boat store</title>
            <meta name="description" content={props.description}/>
            <link rel="canonical" href={props.canonicalUrl}/>
        </Helmet>
    )
}