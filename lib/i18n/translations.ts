import type { SupportedLanguage } from "./constants";

export type TranslationKeys = {
	// Homepage
	"home.title": string;
	"home.subtitle": string;

	// Category section
	"category.shows": string;

	// Categories
	"category.1": string;
	"category.2": string;
	"category.3": string;
	"category.4": string;
	"category.5": string;
	"category.6": string;
	"category.7": string;
	"category.8": string;
	"category.9": string;
	"category.10": string;
	"category.11": string;
	"category.12": string;
	"category.13": string;
	"category.14": string;
	"category.15": string;
	"category.16": string;
	"category.17": string;
	"category.18": string;
	"category.19": string;
	"category.20": string;
	"category.21": string;
	"category.22": string;
	"category.23": string;
	"category.24": string;
	"category.25": string;
	"category.26": string;
	"category.27": string;
	"category.28": string;
	"category.29": string;
	"category.30": string;
	"category.31": string;
	"category.32": string;
	"category.33": string;
	"category.34": string;
	"category.35": string;
	"category.36": string;
	"category.37": string;
	"category.38": string;
	"category.39": string;
	"category.40": string;
	"category.41": string;
	"category.42": string;
	"category.43": string;
	"category.44": string;
	"category.45": string;
	"category.46": string;
	"category.47": string;
	"category.48": string;
	"category.49": string;
	"category.50": string;
	"category.51": string;
	"category.52": string;
	"category.53": string;
	"category.54": string;
	"category.55": string;
	"category.56": string;
	"category.57": string;
	"category.58": string;
	"category.59": string;
	"category.60": string;
	"category.61": string;
	"category.62": string;
	"category.63": string;
	"category.64": string;
	"category.65": string;
	"category.66": string;
	"category.67": string;
	"category.68": string;
	"category.69": string;
	"category.70": string;
	"category.71": string;
	"category.72": string;
	"category.73": string;
	"category.74": string;
	"category.75": string;
	"category.76": string;
	"category.77": string;
	"category.78": string;
	"category.79": string;
	"category.80": string;
	"category.81": string;
	"category.82": string;
	"category.83": string;
	"category.84": string;
	"category.85": string;
	"category.86": string;
	"category.87": string;
	"category.88": string;
	"category.89": string;
	"category.90": string;
	"category.91": string;
	"category.92": string;
	"category.93": string;
	"category.94": string;
	"category.95": string;
	"category.96": string;
	"category.97": string;
	"category.98": string;
	"category.99": string;
	"category.100": string;
	"category.101": string;
	"category.102": string;
	"category.103": string;
	"category.104": string;
	"category.105": string;
	"category.106": string;
	"category.107": string;
	"category.108": string;
	"category.109": string;
	"category.110": string;
	"category.111": string;
	"category.112": string;

	// Podcast card
	"podcast.by": string;

	// Error page
	"error.title": string;
	"error.message": string;
	"error.tryAgain": string;

	// Podcast detail page
	"podcast.episodes": string;
	"podcast.totalEpisodes": string;

	// Episodes list
	"episodes.search.placeholder": string;
	"episodes.search.noResults": string;
	"episodes.sort.newest": string;
	"episodes.sort.oldest": string;
	"episodes.duration": string;
	"episodes.published": string;
	"episodes.season": string;
	"episodes.episode": string;

	// Pagination
	"pagination.previous": string;
	"pagination.next": string;
	"pagination.page": string;
	"pagination.of": string;

	// Breadcrumb
	"breadcrumb.home": string;
	"breadcrumb.search": string;
	"breadcrumb.history": string;

	// Navigation
	"nav.discover": string;
	"nav.search": string;
	"nav.subscriptions": string;
	"nav.account": string;

	// Search page
	"search.title": string;
	"search.placeholder": string;
	"search.noResults": string;
	"search.empty": string;
	"search.results": string;

	// Player
	"player.play": string;
	"player.pause": string;
	"player.skipForward": string;
	"player.skipBackward": string;
	"player.sleepTimer": string;
	"player.sleepTimer.off": string;
	"player.sleepTimer.minutes": string;
	"player.sleepTimer.hour": string;
	"player.options.download": string;
	"player.options.subscribe": string;
	"player.options.playbackRate": string;
	"player.options.goToPodcast": string;
	"player.options.goToEpisode": string;
	"player.options.setCurrentTime": string;
	"player.noEpisode": string;
	"player.options": string;

	// Subscriptions page
	"subscriptions.title": string;
	"subscriptions.description": string;
	"subscriptions.notSignedIn": string;
	"subscriptions.signIn": string;
	"subscriptions.noSubscriptions": string;
	"subscriptions.sortBy": string;
	"subscriptions.sortBy.name": string;
	"subscriptions.sortBy.author": string;
	"subscriptions.sortBy.lastUpdated": string;
	"subscriptions.sortBy.subscribed": string;

	// Subscription button
	"subscription.subscribe": string;
	"subscription.unsubscribe": string;
	"subscription.subscribing": string;
	"subscription.unsubscribing": string;

	// Login page
	"login.title": string;
	"login.suspended": string;

	// History
	"nav.history": string;
	"history.title": string;
	"history.description": string;
	"history.notSignedIn": string;
	"history.signIn": string;
	"history.noHistory": string;
	"history.continue": string;
	"history.progress": string;
	"history.loadMore": string;
};

export const translations: Record<SupportedLanguage, TranslationKeys> = {
	en: {
		"home.title": "Discover Podcasts",
		"home.subtitle": "Explore trending shows across categories",
		"category.shows": "shows",
		"category.1": "Arts",
		"category.2": "Books",
		"category.3": "Design",
		"category.4": "Fashion",
		"category.5": "Beauty",
		"category.6": "Food",
		"category.7": "Performing",
		"category.8": "Visual",
		"category.9": "Business",
		"category.10": "Careers",
		"category.11": "Entrepreneurship",
		"category.12": "Investing",
		"category.13": "Management",
		"category.14": "Marketing",
		"category.15": "Non-Profit",
		"category.16": "Comedy",
		"category.17": "Interviews",
		"category.18": "Improv",
		"category.19": "Stand-Up",
		"category.20": "Education",
		"category.21": "Courses",
		"category.22": "How-To",
		"category.23": "Language",
		"category.24": "Learning",
		"category.25": "Self-Improvement",
		"category.26": "Fiction",
		"category.27": "Drama",
		"category.28": "History",
		"category.29": "Health",
		"category.30": "Fitness",
		"category.31": "Alternative",
		"category.32": "Medicine",
		"category.33": "Mental",
		"category.34": "Nutrition",
		"category.35": "Sexuality",
		"category.36": "Kids",
		"category.37": "Family",
		"category.38": "Parenting",
		"category.39": "Pets",
		"category.40": "Animals",
		"category.41": "Stories",
		"category.42": "Leisure",
		"category.43": "Animation",
		"category.44": "Manga",
		"category.45": "Automotive",
		"category.46": "Aviation",
		"category.47": "Crafts",
		"category.48": "Games",
		"category.49": "Hobbies",
		"category.50": "Home",
		"category.51": "Garden",
		"category.52": "Video-Games",
		"category.53": "Music",
		"category.54": "Commentary",
		"category.55": "News",
		"category.56": "Daily",
		"category.57": "Entertainment",
		"category.58": "Government",
		"category.59": "Politics",
		"category.60": "Buddhism",
		"category.61": "Christianity",
		"category.62": "Hinduism",
		"category.63": "Islam",
		"category.64": "Judaism",
		"category.65": "Religion",
		"category.66": "Spirituality",
		"category.67": "Science",
		"category.68": "Astronomy",
		"category.69": "Chemistry",
		"category.70": "Earth",
		"category.71": "Life",
		"category.72": "Mathematics",
		"category.73": "Natural",
		"category.74": "Nature",
		"category.75": "Physics",
		"category.76": "Social",
		"category.77": "Society",
		"category.78": "Culture",
		"category.79": "Documentary",
		"category.80": "Personal",
		"category.81": "Journals",
		"category.82": "Philosophy",
		"category.83": "Places",
		"category.84": "Travel",
		"category.85": "Relationships",
		"category.86": "Sports",
		"category.87": "Baseball",
		"category.88": "Basketball",
		"category.89": "Cricket",
		"category.90": "Fantasy",
		"category.91": "Football",
		"category.92": "Golf",
		"category.93": "Hockey",
		"category.94": "Rugby",
		"category.95": "Running",
		"category.96": "Soccer",
		"category.97": "Swimming",
		"category.98": "Tennis",
		"category.99": "Volleyball",
		"category.100": "Wilderness",
		"category.101": "Wrestling",
		"category.102": "Technology",
		"category.103": "True Crime",
		"category.104": "TV",
		"category.105": "Film",
		"category.106": "After-Shows",
		"category.107": "Reviews",
		"category.108": "Climate",
		"category.109": "Weather",
		"category.110": "Tabletop",
		"category.111": "Role-Playing",
		"category.112": "Cryptocurrency",
		"podcast.by": "by",
		"error.title": "Something went wrong!",
		"error.message": "Failed to load podcasts",
		"error.tryAgain": "Try again",
		"podcast.episodes": "Episodes",
		"podcast.totalEpisodes": "episodes",
		"episodes.search.placeholder": "Search episodes...",
		"episodes.search.noResults": "No episodes found",
		"episodes.sort.newest": "Newest first",
		"episodes.sort.oldest": "Oldest first",
		"episodes.duration": "Duration",
		"episodes.published": "Published",
		"episodes.season": "Season",
		"episodes.episode": "Episode",
		"pagination.previous": "Previous",
		"pagination.next": "Next",
		"pagination.page": "Page",
		"pagination.of": "of",
		"breadcrumb.home": "Home",
		"breadcrumb.search": "Search",
		"breadcrumb.history": "History",
		"nav.discover": "Discover",
		"nav.search": "Search",
		"nav.subscriptions": "Subscriptions",
		"nav.account": "Account",
		"search.title": "Search Podcasts",
		"search.placeholder": "Search for podcasts...",
		"search.noResults": "No podcasts found",
		"search.empty": "Enter a search term to find podcasts",
		"search.results": "results",
		"player.play": "Play",
		"player.pause": "Pause",
		"player.skipForward": "Forward 30s",
		"player.skipBackward": "Back 30s",
		"player.sleepTimer": "Sleep Timer",
		"player.sleepTimer.off": "Off",
		"player.sleepTimer.minutes": "minutes",
		"player.sleepTimer.hour": "1 hour",
		"player.options.download": "Download",
		"player.options.subscribe": "Subscribe",
		"player.options.playbackRate": "Playback Speed",
		"player.options.goToPodcast": "Go to Podcast",
		"player.options.goToEpisode": "Go to Episode",
		"player.options.setCurrentTime": "Set current time",
		"player.noEpisode": "No episode selected",
		"player.options": "Options",
		"subscriptions.title": "Subscriptions",
		"subscriptions.description": "Keep track of your favorite podcasts in one place",
		"subscriptions.notSignedIn": "You are not signed in",
		"subscriptions.signIn": "Sign in",
		"subscriptions.noSubscriptions": "You don't have any subscriptions yet",
		"subscriptions.sortBy": "Sort by",
		"subscriptions.sortBy.name": "Podcast Name",
		"subscriptions.sortBy.author": "Author Name",
		"subscriptions.sortBy.lastUpdated": "Last Updated",
		"subscriptions.sortBy.subscribed": "Last Subscribed",
		"subscription.subscribe": "Subscribe",
		"subscription.unsubscribe": "Unsubscribe",
		"subscription.subscribing": "Subscribing...",
		"subscription.unsubscribing": "Unsubscribing...",
		"login.title": "Login",
		"login.suspended": "New member registration is temporarily suspended. This functionality will be returning soon.",
		"nav.history": "History",
		"history.title": "Listening History",
		"history.description": "Resume your recently played episodes",
		"history.notSignedIn": "You are not signed in",
		"history.signIn": "Sign in",
		"history.noHistory": "No listening history yet",
		"history.continue": "Continue",
		"history.progress": "progress",
		"history.loadMore": "Load more",
	},
	pt: {
		"home.title": "Descubra Podcasts",
		"home.subtitle": "Explore programas em alta nas categorias",
		"category.shows": "programas",
		"category.1": "Artes",
		"category.2": "Livros",
		"category.3": "Design",
		"category.4": "Moda",
		"category.5": "Beleza",
		"category.6": "Comida",
		"category.7": "Espetáculos",
		"category.8": "Visual",
		"category.9": "Negócios",
		"category.10": "Carreiras",
		"category.11": "Empreendedorismo",
		"category.12": "Investimentos",
		"category.13": "Gestão",
		"category.14": "Marketing",
		"category.15": "Sem Fins Lucrativos",
		"category.16": "Comédia",
		"category.17": "Entrevistas",
		"category.18": "Improviso",
		"category.19": "Stand-Up",
		"category.20": "Educação",
		"category.21": "Cursos",
		"category.22": "Como Fazer",
		"category.23": "Idiomas",
		"category.24": "Aprendizado",
		"category.25": "Autodesenvolvimento",
		"category.26": "Ficção",
		"category.27": "Drama",
		"category.28": "História",
		"category.29": "Saúde",
		"category.30": "Fitness",
		"category.31": "Alternativo",
		"category.32": "Medicina",
		"category.33": "Mental",
		"category.34": "Nutrição",
		"category.35": "Sexualidade",
		"category.36": "Crianças",
		"category.37": "Família",
		"category.38": "Paternidade",
		"category.39": "Animais",
		"category.40": "Animais",
		"category.41": "Histórias",
		"category.42": "Lazer",
		"category.43": "Animação",
		"category.44": "Mangá",
		"category.45": "Automotivo",
		"category.46": "Aviação",
		"category.47": "Artesanato",
		"category.48": "Jogos",
		"category.49": "Hobbies",
		"category.50": "Casa",
		"category.51": "Jardim",
		"category.52": "Videogames",
		"category.53": "Música",
		"category.54": "Comentários",
		"category.55": "Notícias",
		"category.56": "Diário",
		"category.57": "Entretenimento",
		"category.58": "Governo",
		"category.59": "Política",
		"category.60": "Budismo",
		"category.61": "Cristianismo",
		"category.62": "Hinduísmo",
		"category.63": "Islamismo",
		"category.64": "Judaísmo",
		"category.65": "Religião",
		"category.66": "Espiritualidade",
		"category.67": "Ciência",
		"category.68": "Astronomia",
		"category.69": "Química",
		"category.70": "Terra",
		"category.71": "Vida",
		"category.72": "Matemática",
		"category.73": "Natural",
		"category.74": "Natureza",
		"category.75": "Física",
		"category.76": "Social",
		"category.77": "Sociedade",
		"category.78": "Cultura",
		"category.79": "Documentário",
		"category.80": "Pessoal",
		"category.81": "Diários",
		"category.82": "Filosofia",
		"category.83": "Lugares",
		"category.84": "Viagem",
		"category.85": "Relacionamentos",
		"category.86": "Esportes",
		"category.87": "Beisebol",
		"category.88": "Basquete",
		"category.89": "Críquete",
		"category.90": "Fantasia",
		"category.91": "Futebol Americano",
		"category.92": "Golfe",
		"category.93": "Hóquei",
		"category.94": "Rúgbi",
		"category.95": "Corrida",
		"category.96": "Futebol",
		"category.97": "Natação",
		"category.98": "Tênis",
		"category.99": "Vôlei",
		"category.100": "Natureza Selvagem",
		"category.101": "Luta Livre",
		"category.102": "Tecnologia",
		"category.103": "Crime Real",
		"category.104": "TV",
		"category.105": "Cinema",
		"category.106": "Pós-Shows",
		"category.107": "Resenhas",
		"category.108": "Clima",
		"category.109": "Tempo",
		"category.110": "Jogos de Mesa",
		"category.111": "RPG",
		"category.112": "Criptomoedas",
		"podcast.by": "por",
		"error.title": "Algo deu errado!",
		"error.message": "Falha ao carregar podcasts",
		"error.tryAgain": "Tentar novamente",
		"podcast.episodes": "Episódios",
		"podcast.totalEpisodes": "episódios",
		"episodes.search.placeholder": "Buscar episódios...",
		"episodes.search.noResults": "Nenhum episódio encontrado",
		"episodes.sort.newest": "Mais recentes",
		"episodes.sort.oldest": "Mais antigos",
		"episodes.duration": "Duração",
		"episodes.published": "Publicado",
		"episodes.season": "Temporada",
		"episodes.episode": "Episódio",
		"pagination.previous": "Anterior",
		"pagination.next": "Próximo",
		"pagination.page": "Página",
		"pagination.of": "de",
		"breadcrumb.home": "Início",
		"breadcrumb.search": "Busca",
		"breadcrumb.history": "Histórico",
		"nav.discover": "Descobrir",
		"nav.search": "Buscar",
		"nav.subscriptions": "Inscrições",
		"nav.account": "Conta",
		"search.title": "Buscar Podcasts",
		"search.placeholder": "Buscar podcasts...",
		"search.noResults": "Nenhum podcast encontrado",
		"search.empty": "Digite um termo para encontrar podcasts",
		"search.results": "resultados",
		"player.play": "Reproduzir",
		"player.pause": "Pausar",
		"player.skipForward": "Avançar 30s",
		"player.skipBackward": "Voltar 30s",
		"player.sleepTimer": "Timer de Sono",
		"player.sleepTimer.off": "Desligado",
		"player.sleepTimer.minutes": "minutos",
		"player.sleepTimer.hour": "1 hora",
		"player.options.download": "Baixar",
		"player.options.subscribe": "Inscrever-se",
		"player.options.playbackRate": "Velocidade",
		"player.options.goToPodcast": "Ir para o Podcast",
		"player.options.goToEpisode": "Ir para o Episódio",
		"player.options.setCurrentTime": "Definir tempo atual",
		"player.noEpisode": "Nenhum episódio selecionado",
		"player.options": "Opções",
		"subscriptions.title": "Inscrições",
		"subscriptions.description": "Acompanhe seus podcasts favoritos em um só lugar",
		"subscriptions.notSignedIn": "Você não está conectado",
		"subscriptions.signIn": "Entrar",
		"subscriptions.noSubscriptions": "Você ainda não tem inscrições",
		"subscriptions.sortBy": "Ordenar por",
		"subscriptions.sortBy.name": "Nome do Podcast",
		"subscriptions.sortBy.author": "Nome do Autor",
		"subscriptions.sortBy.lastUpdated": "Última Atualização",
		"subscriptions.sortBy.subscribed": "Última Inscrição",
		"subscription.subscribe": "Inscrever-se",
		"subscription.unsubscribe": "Cancelar Inscrição",
		"subscription.subscribing": "Inscrevendo...",
		"subscription.unsubscribing": "Cancelando...",
		"login.title": "Entrar",
		"login.suspended": "O registro de novos membros está temporariamente suspenso. Esta funcionalidade retornará em breve.",
		"nav.history": "Histórico",
		"history.title": "Histórico de Reprodução",
		"history.description": "Continue seus episódios recentes",
		"history.notSignedIn": "Você não está conectado",
		"history.signIn": "Entrar",
		"history.noHistory": "Nenhum histórico ainda",
		"history.continue": "Continuar",
		"history.progress": "progresso",
		"history.loadMore": "Carregar mais",
	},
	es: {
		"home.title": "Descubre Podcasts",
		"home.subtitle": "Explora programas populares por categorías",
		"category.shows": "programas",
		"category.1": "Artes",
		"category.2": "Libros",
		"category.3": "Diseño",
		"category.4": "Moda",
		"category.5": "Belleza",
		"category.6": "Comida",
		"category.7": "Espectáculos",
		"category.8": "Visual",
		"category.9": "Negocios",
		"category.10": "Carreras",
		"category.11": "Emprendimiento",
		"category.12": "Inversiones",
		"category.13": "Gestión",
		"category.14": "Marketing",
		"category.15": "Sin Fines de Lucro",
		"category.16": "Comedia",
		"category.17": "Entrevistas",
		"category.18": "Improvisación",
		"category.19": "Stand-Up",
		"category.20": "Educación",
		"category.21": "Cursos",
		"category.22": "Cómo Hacer",
		"category.23": "Idiomas",
		"category.24": "Aprendizaje",
		"category.25": "Superación Personal",
		"category.26": "Ficción",
		"category.27": "Drama",
		"category.28": "Historia",
		"category.29": "Salud",
		"category.30": "Fitness",
		"category.31": "Alternativo",
		"category.32": "Medicina",
		"category.33": "Mental",
		"category.34": "Nutrición",
		"category.35": "Sexualidad",
		"category.36": "Niños",
		"category.37": "Familia",
		"category.38": "Crianza",
		"category.39": "Mascotas",
		"category.40": "Animales",
		"category.41": "Historias",
		"category.42": "Ocio",
		"category.43": "Animación",
		"category.44": "Manga",
		"category.45": "Automotriz",
		"category.46": "Aviación",
		"category.47": "Manualidades",
		"category.48": "Juegos",
		"category.49": "Pasatiempos",
		"category.50": "Hogar",
		"category.51": "Jardín",
		"category.52": "Videojuegos",
		"category.53": "Música",
		"category.54": "Comentarios",
		"category.55": "Noticias",
		"category.56": "Diario",
		"category.57": "Entretenimiento",
		"category.58": "Gobierno",
		"category.59": "Política",
		"category.60": "Budismo",
		"category.61": "Cristianismo",
		"category.62": "Hinduismo",
		"category.63": "Islam",
		"category.64": "Judaísmo",
		"category.65": "Religión",
		"category.66": "Espiritualidad",
		"category.67": "Ciencia",
		"category.68": "Astronomía",
		"category.69": "Química",
		"category.70": "Tierra",
		"category.71": "Vida",
		"category.72": "Matemáticas",
		"category.73": "Natural",
		"category.74": "Naturaleza",
		"category.75": "Física",
		"category.76": "Social",
		"category.77": "Sociedad",
		"category.78": "Cultura",
		"category.79": "Documental",
		"category.80": "Personal",
		"category.81": "Diarios",
		"category.82": "Filosofía",
		"category.83": "Lugares",
		"category.84": "Viajes",
		"category.85": "Relaciones",
		"category.86": "Deportes",
		"category.87": "Béisbol",
		"category.88": "Baloncesto",
		"category.89": "Críquet",
		"category.90": "Fantasía",
		"category.91": "Fútbol Americano",
		"category.92": "Golf",
		"category.93": "Hockey",
		"category.94": "Rugby",
		"category.95": "Carrera",
		"category.96": "Fútbol",
		"category.97": "Natación",
		"category.98": "Tenis",
		"category.99": "Voleibol",
		"category.100": "Naturaleza Salvaje",
		"category.101": "Lucha Libre",
		"category.102": "Tecnología",
		"category.103": "Crimen Real",
		"category.104": "TV",
		"category.105": "Cine",
		"category.106": "Post-Shows",
		"category.107": "Reseñas",
		"category.108": "Clima",
		"category.109": "Clima",
		"category.110": "Juegos de Mesa",
		"category.111": "Juegos de Rol",
		"category.112": "Criptomonedas",
		"podcast.by": "por",
		"error.title": "¡Algo salió mal!",
		"error.message": "Error al cargar podcasts",
		"error.tryAgain": "Intentar de nuevo",
		"podcast.episodes": "Episodios",
		"podcast.totalEpisodes": "episodios",
		"episodes.search.placeholder": "Buscar episodios...",
		"episodes.search.noResults": "No se encontraron episodios",
		"episodes.sort.newest": "Más recientes",
		"episodes.sort.oldest": "Más antiguos",
		"episodes.duration": "Duración",
		"episodes.published": "Publicado",
		"episodes.season": "Temporada",
		"episodes.episode": "Episodio",
		"pagination.previous": "Anterior",
		"pagination.next": "Siguiente",
		"pagination.page": "Página",
		"pagination.of": "de",
		"breadcrumb.home": "Inicio",
		"breadcrumb.search": "Búsqueda",
		"breadcrumb.history": "Historial",
		"nav.discover": "Descubrir",
		"nav.search": "Buscar",
		"nav.subscriptions": "Suscripciones",
		"nav.account": "Cuenta",
		"search.title": "Buscar Podcasts",
		"search.placeholder": "Buscar podcasts...",
		"search.noResults": "No se encontraron podcasts",
		"search.empty": "Ingresa un término para buscar podcasts",
		"search.results": "resultados",
		"player.play": "Reproducir",
		"player.pause": "Pausar",
		"player.skipForward": "Adelantar 30s",
		"player.skipBackward": "Retroceder 30s",
		"player.sleepTimer": "Temporizador",
		"player.sleepTimer.off": "Apagado",
		"player.sleepTimer.minutes": "minutos",
		"player.sleepTimer.hour": "1 hora",
		"player.options.download": "Descargar",
		"player.options.subscribe": "Suscribirse",
		"player.options.playbackRate": "Velocidad",
		"player.options.goToPodcast": "Ir al Podcast",
		"player.options.goToEpisode": "Ir al Episodio",
		"player.options.setCurrentTime": "Establecer tiempo actual",
		"player.noEpisode": "Ningún episodio seleccionado",
		"player.options": "Opciones",
		"subscriptions.title": "Suscripciones",
		"subscriptions.description": "Mantén tus podcasts favoritos en un solo lugar",
		"subscriptions.notSignedIn": "No has iniciado sesión",
		"subscriptions.signIn": "Iniciar sesión",
		"subscriptions.noSubscriptions": "Aún no tienes suscripciones",
		"subscriptions.sortBy": "Ordenar por",
		"subscriptions.sortBy.name": "Nombre del Podcast",
		"subscriptions.sortBy.author": "Nombre del Autor",
		"subscriptions.sortBy.lastUpdated": "Última Actualización",
		"subscriptions.sortBy.subscribed": "Última Suscripción",
		"subscription.subscribe": "Suscribirse",
		"subscription.unsubscribe": "Cancelar Suscripción",
		"subscription.subscribing": "Suscribiendo...",
		"subscription.unsubscribing": "Cancelando...",
		"login.title": "Iniciar sesión",
		"login.suspended": "El registro de nuevos miembros está temporalmente suspendido. Esta funcionalidad volverá pronto.",
		"nav.history": "Historial",
		"history.title": "Historial de Reproducción",
		"history.description": "Continúa tus episodios recientes",
		"history.notSignedIn": "No has iniciado sesión",
		"history.signIn": "Iniciar sesión",
		"history.noHistory": "Sin historial todavía",
		"history.continue": "Continuar",
		"history.progress": "progreso",
		"history.loadMore": "Cargar más",
	},
	fr: {
		"home.title": "Découvrez des Podcasts",
		"home.subtitle": "Explorez les émissions tendance par catégories",
		"category.shows": "émissions",
		"category.1": "Arts",
		"category.2": "Livres",
		"category.3": "Design",
		"category.4": "Mode",
		"category.5": "Beauté",
		"category.6": "Nourriture",
		"category.7": "Spectacles",
		"category.8": "Visuel",
		"category.9": "Affaires",
		"category.10": "Carrières",
		"category.11": "Entrepreneuriat",
		"category.12": "Investissement",
		"category.13": "Gestion",
		"category.14": "Marketing",
		"category.15": "Sans But Lucratif",
		"category.16": "Comédie",
		"category.17": "Interviews",
		"category.18": "Improvisation",
		"category.19": "Stand-Up",
		"category.20": "Éducation",
		"category.21": "Cours",
		"category.22": "Tutoriels",
		"category.23": "Langues",
		"category.24": "Apprentissage",
		"category.25": "Développement Personnel",
		"category.26": "Fiction",
		"category.27": "Drame",
		"category.28": "Histoire",
		"category.29": "Santé",
		"category.30": "Fitness",
		"category.31": "Alternatif",
		"category.32": "Médecine",
		"category.33": "Mental",
		"category.34": "Nutrition",
		"category.35": "Sexualité",
		"category.36": "Enfants",
		"category.37": "Famille",
		"category.38": "Parentalité",
		"category.39": "Animaux",
		"category.40": "Animaux",
		"category.41": "Histoires",
		"category.42": "Loisirs",
		"category.43": "Animation",
		"category.44": "Manga",
		"category.45": "Automobile",
		"category.46": "Aviation",
		"category.47": "Artisanat",
		"category.48": "Jeux",
		"category.49": "Loisirs",
		"category.50": "Maison",
		"category.51": "Jardin",
		"category.52": "Jeux Vidéo",
		"category.53": "Musique",
		"category.54": "Commentaires",
		"category.55": "Actualités",
		"category.56": "Quotidien",
		"category.57": "Divertissement",
		"category.58": "Gouvernement",
		"category.59": "Politique",
		"category.60": "Bouddhisme",
		"category.61": "Christianisme",
		"category.62": "Hindouisme",
		"category.63": "Islam",
		"category.64": "Judaïsme",
		"category.65": "Religion",
		"category.66": "Spiritualité",
		"category.67": "Science",
		"category.68": "Astronomie",
		"category.69": "Chimie",
		"category.70": "Terre",
		"category.71": "Vie",
		"category.72": "Mathématiques",
		"category.73": "Naturel",
		"category.74": "Nature",
		"category.75": "Physique",
		"category.76": "Social",
		"category.77": "Société",
		"category.78": "Culture",
		"category.79": "Documentaire",
		"category.80": "Personnel",
		"category.81": "Journaux",
		"category.82": "Philosophie",
		"category.83": "Lieux",
		"category.84": "Voyage",
		"category.85": "Relations",
		"category.86": "Sports",
		"category.87": "Baseball",
		"category.88": "Basketball",
		"category.89": "Cricket",
		"category.90": "Fantaisie",
		"category.91": "Football Américain",
		"category.92": "Golf",
		"category.93": "Hockey",
		"category.94": "Rugby",
		"category.95": "Course",
		"category.96": "Football",
		"category.97": "Natation",
		"category.98": "Tennis",
		"category.99": "Volleyball",
		"category.100": "Nature Sauvage",
		"category.101": "Lutte",
		"category.102": "Technologie",
		"category.103": "Crime Réel",
		"category.104": "TV",
		"category.105": "Cinéma",
		"category.106": "After-Shows",
		"category.107": "Critiques",
		"category.108": "Climat",
		"category.109": "Météo",
		"category.110": "Jeux de Table",
		"category.111": "Jeux de Rôle",
		"category.112": "Cryptomonnaie",
		"podcast.by": "par",
		"error.title": "Quelque chose s'est mal passé!",
		"error.message": "Échec du chargement des podcasts",
		"error.tryAgain": "Réessayer",
		"podcast.episodes": "Épisodes",
		"podcast.totalEpisodes": "épisodes",
		"episodes.search.placeholder": "Rechercher des épisodes...",
		"episodes.search.noResults": "Aucun épisode trouvé",
		"episodes.sort.newest": "Plus récents",
		"episodes.sort.oldest": "Plus anciens",
		"episodes.duration": "Durée",
		"episodes.published": "Publié",
		"episodes.season": "Saison",
		"episodes.episode": "Épisode",
		"pagination.previous": "Précédent",
		"pagination.next": "Suivant",
		"pagination.page": "Page",
		"pagination.of": "sur",
		"breadcrumb.home": "Accueil",
		"breadcrumb.search": "Recherche",
		"breadcrumb.history": "Historique",
		"nav.discover": "Découvrir",
		"nav.search": "Rechercher",
		"nav.subscriptions": "Abonnements",
		"nav.account": "Compte",
		"search.title": "Rechercher des Podcasts",
		"search.placeholder": "Rechercher des podcasts...",
		"search.noResults": "Aucun podcast trouvé",
		"search.empty": "Entrez un terme pour rechercher des podcasts",
		"search.results": "résultats",
		"player.play": "Lecture",
		"player.pause": "Pause",
		"player.skipForward": "Avancer 30s",
		"player.skipBackward": "Reculer 30s",
		"player.sleepTimer": "Minuterie",
		"player.sleepTimer.off": "Désactivé",
		"player.sleepTimer.minutes": "minutes",
		"player.sleepTimer.hour": "1 heure",
		"player.options.download": "Télécharger",
		"player.options.subscribe": "S'abonner",
		"player.options.playbackRate": "Vitesse",
		"player.options.goToPodcast": "Aller au Podcast",
		"player.options.goToEpisode": "Aller à l'Épisode",
		"player.options.setCurrentTime": "Définir l'heure actuelle",
		"player.noEpisode": "Aucun épisode sélectionné",
		"player.options": "Options",
		"subscriptions.title": "Abonnements",
		"subscriptions.description": "Gardez vos podcasts préférés au même endroit",
		"subscriptions.notSignedIn": "Vous n'êtes pas connecté",
		"subscriptions.signIn": "Se connecter",
		"subscriptions.noSubscriptions": "Vous n'avez pas encore d'abonnements",
		"subscriptions.sortBy": "Trier par",
		"subscriptions.sortBy.name": "Nom du Podcast",
		"subscriptions.sortBy.author": "Nom de l'Auteur",
		"subscriptions.sortBy.lastUpdated": "Dernière Mise à Jour",
		"subscriptions.sortBy.subscribed": "Dernier Abonnement",
		"subscription.subscribe": "S'abonner",
		"subscription.unsubscribe": "Se désabonner",
		"subscription.subscribing": "Abonnement...",
		"subscription.unsubscribing": "Désabonnement...",
		"login.title": "Connexion",
		"login.suspended": "L'inscription de nouveaux membres est temporairement suspendue. Cette fonctionnalité reviendra bientôt.",
		"nav.history": "Historique",
		"history.title": "Historique d'écoute",
		"history.description": "Reprenez vos épisodes récents",
		"history.notSignedIn": "Vous n'êtes pas connecté",
		"history.signIn": "Se connecter",
		"history.noHistory": "Pas encore d'historique",
		"history.continue": "Continuer",
		"history.progress": "progression",
		"history.loadMore": "Charger plus",
	},
	de: {
		"home.title": "Entdecke Podcasts",
		"home.subtitle": "Erkunde angesagte Shows nach Kategorien",
		"category.shows": "Shows",
		"category.1": "Kunst",
		"category.2": "Bücher",
		"category.3": "Design",
		"category.4": "Mode",
		"category.5": "Schönheit",
		"category.6": "Essen",
		"category.7": "Aufführungen",
		"category.8": "Visuell",
		"category.9": "Wirtschaft",
		"category.10": "Karriere",
		"category.11": "Unternehmertum",
		"category.12": "Investieren",
		"category.13": "Management",
		"category.14": "Marketing",
		"category.15": "Gemeinnützig",
		"category.16": "Komödie",
		"category.17": "Interviews",
		"category.18": "Improvisation",
		"category.19": "Stand-Up",
		"category.20": "Bildung",
		"category.21": "Kurse",
		"category.22": "Anleitungen",
		"category.23": "Sprachen",
		"category.24": "Lernen",
		"category.25": "Selbstverbesserung",
		"category.26": "Fiktion",
		"category.27": "Drama",
		"category.28": "Geschichte",
		"category.29": "Gesundheit",
		"category.30": "Fitness",
		"category.31": "Alternativ",
		"category.32": "Medizin",
		"category.33": "Mental",
		"category.34": "Ernährung",
		"category.35": "Sexualität",
		"category.36": "Kinder",
		"category.37": "Familie",
		"category.38": "Elternschaft",
		"category.39": "Haustiere",
		"category.40": "Tiere",
		"category.41": "Geschichten",
		"category.42": "Freizeit",
		"category.43": "Animation",
		"category.44": "Manga",
		"category.45": "Automobil",
		"category.46": "Luftfahrt",
		"category.47": "Handwerk",
		"category.48": "Spiele",
		"category.49": "Hobbys",
		"category.50": "Zuhause",
		"category.51": "Garten",
		"category.52": "Videospiele",
		"category.53": "Musik",
		"category.54": "Kommentare",
		"category.55": "Nachrichten",
		"category.56": "Täglich",
		"category.57": "Unterhaltung",
		"category.58": "Regierung",
		"category.59": "Politik",
		"category.60": "Buddhismus",
		"category.61": "Christentum",
		"category.62": "Hinduismus",
		"category.63": "Islam",
		"category.64": "Judentum",
		"category.65": "Religion",
		"category.66": "Spiritualität",
		"category.67": "Wissenschaft",
		"category.68": "Astronomie",
		"category.69": "Chemie",
		"category.70": "Erde",
		"category.71": "Leben",
		"category.72": "Mathematik",
		"category.73": "Natürlich",
		"category.74": "Natur",
		"category.75": "Physik",
		"category.76": "Sozial",
		"category.77": "Gesellschaft",
		"category.78": "Kultur",
		"category.79": "Dokumentation",
		"category.80": "Persönlich",
		"category.81": "Tagebücher",
		"category.82": "Philosophie",
		"category.83": "Orte",
		"category.84": "Reisen",
		"category.85": "Beziehungen",
		"category.86": "Sport",
		"category.87": "Baseball",
		"category.88": "Basketball",
		"category.89": "Cricket",
		"category.90": "Fantasy",
		"category.91": "American Football",
		"category.92": "Golf",
		"category.93": "Hockey",
		"category.94": "Rugby",
		"category.95": "Laufen",
		"category.96": "Fußball",
		"category.97": "Schwimmen",
		"category.98": "Tennis",
		"category.99": "Volleyball",
		"category.100": "Wildnis",
		"category.101": "Ringen",
		"category.102": "Technologie",
		"category.103": "Wahre Verbrechen",
		"category.104": "TV",
		"category.105": "Film",
		"category.106": "After-Shows",
		"category.107": "Rezensionen",
		"category.108": "Klima",
		"category.109": "Wetter",
		"category.110": "Brettspiele",
		"category.111": "Rollenspiele",
		"category.112": "Kryptowährung",
		"podcast.by": "von",
		"error.title": "Etwas ist schiefgelaufen!",
		"error.message": "Podcasts konnten nicht geladen werden",
		"error.tryAgain": "Erneut versuchen",
		"podcast.episodes": "Episoden",
		"podcast.totalEpisodes": "Episoden",
		"episodes.search.placeholder": "Episoden suchen...",
		"episodes.search.noResults": "Keine Episoden gefunden",
		"episodes.sort.newest": "Neueste zuerst",
		"episodes.sort.oldest": "Älteste zuerst",
		"episodes.duration": "Dauer",
		"episodes.published": "Veröffentlicht",
		"episodes.season": "Staffel",
		"episodes.episode": "Episode",
		"pagination.previous": "Zurück",
		"pagination.next": "Weiter",
		"pagination.page": "Seite",
		"pagination.of": "von",
		"breadcrumb.home": "Startseite",
		"breadcrumb.search": "Suche",
		"breadcrumb.history": "Verlauf",
		"nav.discover": "Entdecken",
		"nav.search": "Suchen",
		"nav.subscriptions": "Abonnements",
		"nav.account": "Konto",
		"search.title": "Podcasts suchen",
		"search.placeholder": "Podcasts suchen...",
		"search.noResults": "Keine Podcasts gefunden",
		"search.empty": "Gib einen Suchbegriff ein, um Podcasts zu finden",
		"search.results": "Ergebnisse",
		"player.play": "Abspielen",
		"player.pause": "Pause",
		"player.skipForward": "30s vor",
		"player.skipBackward": "30s zurück",
		"player.sleepTimer": "Schlaf-Timer",
		"player.sleepTimer.off": "Aus",
		"player.sleepTimer.minutes": "Minuten",
		"player.sleepTimer.hour": "1 Stunde",
		"player.options.download": "Herunterladen",
		"player.options.subscribe": "Abonnieren",
		"player.options.playbackRate": "Geschwindigkeit",
		"player.options.goToPodcast": "Zum Podcast",
		"player.options.goToEpisode": "Zur Episode",
		"player.options.setCurrentTime": "Aktuelle Zeit einstellen",
		"player.noEpisode": "Keine Episode ausgewählt",
		"player.options": "Optionen",
		"subscriptions.title": "Abonnements",
		"subscriptions.description": "Behalte deine Lieblingspodcasts an einem Ort",
		"subscriptions.notSignedIn": "Du bist nicht angemeldet",
		"subscriptions.signIn": "Anmelden",
		"subscriptions.noSubscriptions": "Du hast noch keine Abonnements",
		"subscriptions.sortBy": "Sortieren nach",
		"subscriptions.sortBy.name": "Podcast-Name",
		"subscriptions.sortBy.author": "Autorenname",
		"subscriptions.sortBy.lastUpdated": "Zuletzt Aktualisiert",
		"subscriptions.sortBy.subscribed": "Zuletzt Abonniert",
		"subscription.subscribe": "Abonnieren",
		"subscription.unsubscribe": "Abbestellen",
		"subscription.subscribing": "Abonniere...",
		"subscription.unsubscribing": "Abbestelle...",
		"login.title": "Anmelden",
		"login.suspended": "Die Registrierung neuer Mitglieder ist vorübergehend ausgesetzt. Diese Funktion wird bald zurückkehren.",
		"nav.history": "Verlauf",
		"history.title": "Wiedergabeverlauf",
		"history.description": "Setze deine kürzlich gehörten Episoden fort",
		"history.notSignedIn": "Du bist nicht angemeldet",
		"history.signIn": "Anmelden",
		"history.noHistory": "Noch kein Verlauf",
		"history.continue": "Fortsetzen",
		"history.progress": "Fortschritt",
		"history.loadMore": "Mehr laden",
	},
};

/**
 * Get translation for a specific key and language
 */
export function getTranslation(
	language: SupportedLanguage,
	key: keyof TranslationKeys
): string {
	return translations[language][key];
}

/**
 * Get all translations for a specific language
 */
export function getTranslations(language: SupportedLanguage): TranslationKeys {
	return translations[language];
}
