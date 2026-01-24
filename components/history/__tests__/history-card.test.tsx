import { render, screen, fireEvent } from "@testing-library/react";
import { HistoryCard } from "../history-card";
import type { Episode, Podcast } from "@/lib/podcast-index";
import type { TranslationKeys } from "@/lib/i18n/translations";

// Mock next/image
jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img alt={alt} {...props} />
	),
}));

// Mock the player hook
const mockPlay = jest.fn();
const mockPause = jest.fn();
const mockPlayerState = {
	currentEpisode: null as Episode | null,
	isPlaying: false,
	play: mockPlay,
	pause: mockPause,
};

jest.mock("@/components/player", () => ({
	usePlayer: () => mockPlayerState,
}));

const mockPodcast: Podcast = {
	id: 123,
	title: "Test Podcast",
	description: "A test podcast",
	url: "https://example.com/feed.xml",
	originalUrl: "https://example.com/feed.xml",
	link: "https://example.com",
	author: "Test Author",
	image: "https://example.com/podcast.jpg",
	artwork: "https://example.com/artwork.jpg",
	language: "en",
	categories: {},
	ownerName: "Owner",
	lastUpdateTime: 1704067200,
	lastCrawlTime: 1704067200,
	lastParseTime: 1704067200,
	lastGoodHttpStatusTime: 1704067200,
	lastHttpStatus: 200,
	contentType: "application/rss+xml",
	type: 0,
	dead: 0,
	crawlErrors: 0,
	parseErrors: 0,
	locked: 0,
	imageUrlHash: 123456,
};

const mockEpisode: Episode = {
	id: 456,
	title: "Test Episode",
	link: "https://example.com/episode",
	description: "Episode description",
	guid: "episode-456",
	datePublished: 1704067200,
	datePublishedPretty: "January 1, 2024",
	dateCrawled: 1704067200,
	enclosureUrl: "https://example.com/episode.mp3",
	enclosureType: "audio/mpeg",
	enclosureLength: 1000000,
	duration: 3600,
	explicit: 0,
	image: "https://example.com/episode.jpg",
	feedId: 123,
	feedLanguage: "en",
	feedDead: 0,
};

const mockTranslations: TranslationKeys = {
	"player.pause": "Pause",
	"history.continue": "Continue",
} as TranslationKeys;

describe("HistoryCard", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockPlayerState.currentEpisode = null;
		mockPlayerState.isPlaying = false;
	});

	it("renders episode title", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		expect(screen.getByText("Test Episode")).toBeInTheDocument();
	});

	it("renders podcast title", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		expect(screen.getByText("Test Podcast")).toBeInTheDocument();
	});

	it("links to episode with from=history parameter", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		const episodeLinks = screen.getAllByRole("link");
		const episodeLink = episodeLinks.find((link) =>
			link.getAttribute("href")?.includes("/episode/")
		);
		expect(episodeLink).toHaveAttribute(
			"href",
			"/en/podcast/123/episode/456?from=history"
		);
	});

	it("links to podcast with from=history parameter", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		const links = screen.getAllByRole("link");
		const podcastLink = links.find(
			(link) =>
				link.getAttribute("href") === "/en/podcast/123?from=history"
		);
		expect(podcastLink).toBeInTheDocument();
	});

	it("uses correct language in links", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="pt"
				translations={mockTranslations}
			/>
		);
		const links = screen.getAllByRole("link");
		links.forEach((link) => {
			expect(link.getAttribute("href")).toContain("/pt/");
		});
	});

	it("displays formatted current time", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={3665}
				duration={7200}
				language="en"
				translations={mockTranslations}
			/>
		);
		// 3665 seconds = 1:01:05
		expect(screen.getByText("1:01:05")).toBeInTheDocument();
	});

	it("displays formatted remaining time", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		// 3600 - 600 = 3000 seconds = 50:00
		expect(screen.getByText("50:00")).toBeInTheDocument();
	});

	it("formats duration without hours correctly", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={125}
				duration={600}
				language="en"
				translations={mockTranslations}
			/>
		);
		// 125 seconds = 2:05
		expect(screen.getByText("2:05")).toBeInTheDocument();
	});

	it("calls play with currentTime when button clicked", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(mockPlay).toHaveBeenCalledWith(mockEpisode, mockPodcast, 600);
	});

	it("calls pause when episode is playing and button clicked", () => {
		mockPlayerState.currentEpisode = mockEpisode;
		mockPlayerState.isPlaying = true;

		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(mockPause).toHaveBeenCalled();
		expect(mockPlay).not.toHaveBeenCalled();
	});

	it("shows continue aria-label when not playing", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-label", "Continue");
	});

	it("shows pause aria-label when playing", () => {
		mockPlayerState.currentEpisode = mockEpisode;
		mockPlayerState.isPlaying = true;

		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-label", "Pause");
	});

	it("handles zero duration gracefully", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={0}
				duration={0}
				language="en"
				translations={mockTranslations}
			/>
		);
		// Should render without crashing
		expect(screen.getByText("Test Episode")).toBeInTheDocument();
	});

	it("renders episode image when available", () => {
		render(
			<HistoryCard
				episode={mockEpisode}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		const image = screen.getByAltText("Test Episode");
		expect(image).toBeInTheDocument();
	});

	it("falls back to podcast artwork when episode has no image", () => {
		const episodeWithoutImage = { ...mockEpisode, image: "" };
		render(
			<HistoryCard
				episode={episodeWithoutImage}
				podcast={mockPodcast}
				currentTime={600}
				duration={3600}
				language="en"
				translations={mockTranslations}
			/>
		);
		const image = screen.getByAltText("Test Episode");
		expect(image).toBeInTheDocument();
	});
});
