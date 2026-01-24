import { NextResponse } from "next/server";
import { PodcastIndex } from "@/lib/podcast-index";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { episodeIds } = body;

		if (!Array.isArray(episodeIds) || episodeIds.length === 0) {
			return NextResponse.json(
				{ error: "episodeIds must be a non-empty array" },
				{ status: 400 }
			);
		}

		if (episodeIds.length > 50) {
			return NextResponse.json(
				{ error: "Maximum 50 episodes per request" },
				{ status: 400 }
			);
		}

		const client = new PodcastIndex();

		// Fetch episodes
		const episodeResults = await Promise.allSettled(
			episodeIds.map((id: number) => client.getEpisodeById(id))
		);

		// Collect unique podcast IDs from successful episode fetches
		const podcastIds = new Set<number>();
		const episodesMap = new Map<number, Awaited<ReturnType<typeof client.getEpisodeById>>>();

		episodeResults.forEach((result, index) => {
			if (result.status === "fulfilled") {
				episodesMap.set(episodeIds[index], result.value);
				podcastIds.add(result.value.feedId);
			}
		});

		// Fetch podcasts for episodes
		const podcastResults = await Promise.allSettled(
			Array.from(podcastIds).map((id) => client.getPodcastById(id))
		);

		const podcastsMap = new Map<number, Awaited<ReturnType<typeof client.getPodcastById>>>();
		podcastResults.forEach((result, index) => {
			if (result.status === "fulfilled") {
				podcastsMap.set(Array.from(podcastIds)[index], result.value);
			}
		});

		// Build response
		const episodes = episodeIds.map((episodeId: number) => {
			const episode = episodesMap.get(episodeId);
			if (!episode) {
				return { episodeId, error: "Failed to fetch episode" };
			}
			const podcast = podcastsMap.get(episode.feedId);
			return {
				episodeId,
				episode,
				podcast: podcast || null,
			};
		});

		return NextResponse.json({ episodes });
	} catch (error) {
		console.error("Error fetching episodes:", error);
		return NextResponse.json(
			{ error: "Failed to fetch episodes" },
			{ status: 500 }
		);
	}
}
