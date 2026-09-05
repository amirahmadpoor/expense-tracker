import { useEffect } from "react";
import { useMatches } from "react-router";

function PageTitle() {
    const matches = useMatches();

    useEffect(() => {
        const currentRoute = matches.at(-1);

        if (currentRoute?.handle?.title) {
            document.title = currentRoute.handle.title;
        }
    }, [matches]);

    return null;
}

export default PageTitle;