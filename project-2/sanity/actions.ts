import { groq } from "next-sanity";
import { readClient } from "./lib/client";
import { buildQuery } from "./utils";

interface GetReourcesParams {
    query: string;
    category: string;
    page: string;
}

export const getResources = async (params: GetReourcesParams) => {
    const { query, category, page } = params
    try {
        const resources = await readClient.fetch(
            groq`${buildQuery({
                type: 'resource',
                query,
                category,
                page: parseInt(page),
            })}{
                title,
                _id,
                downloadLink,
                "image":poster.asset->url,
                views,
                slug,
                category
            }`
        )

        return resources
    } catch (error) {
        console.log(error);
    }
}