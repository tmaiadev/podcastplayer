import { NextResponse } from "next/server";
import { PodcastIndex } from "@/lib/podcast-index";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { podcastIds } = body;

		if (!Array.isArray(podcastIds) || podcastIds.length === 0) {
			return NextResponse.json(
				{ error: "podcastIds must be a non-empty array" },
				{ status: 400 }
			);
		}

		if (podcastIds.length > 50) {
			return NextResponse.json(
				{ error: "Maximum 50 podcasts per request" },
				{ status: 400 }
			);
		}

		const client = new PodcastIndex();
		const results = await Promise.allSettled(
			podcastIds.map((id: number) => client.getPodcastById(id))
		);

		const podcasts = results.map((result, index) => {
			if (result.status === "fulfilled") {
				return { id: podcastIds[index], podcast: result.value };
			}
			return { id: podcastIds[index], error: "Failed to fetch podcast" };
		});

		return NextResponse.json({ podcasts });
	} catch (error) {
		console.error("Error fetching podcasts:", error);
		return NextResponse.json(
			{ error: "Failed to fetch podcasts" },
			{ status: 500 }
		);
	}
}
