import moment from 'moment';
import Image from 'next/image';

type Card = {
	title: string;
	description: string;
	category?: string | null;
	date: string;
};

export const Card = (card: Card) => {
	return (
		<div className="p-4 md:w-1/3">
			<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
				<Image
					className="lg:h-48 md:h-36 w-full object-cover object-center"
					width="720"
					height="400"
					src="https://dummyimage.com/720x400"
					alt="blog"
				/>
				<div className="p-6">
					<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
						{card.category ? card.category + ' | ' : ''}
						{card.date}
					</h2>
					<h1 className="title-font text-lg font-medium text-gray-900 mb-3">
						{card.title}
					</h1>
					<p className="leading-relaxed mb-3">{card.description}</p>
					<div className="flex items-center flex-wrap ">
						<a
							href=""
							className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
						>
							Learn More
							<svg
								className="w-4 h-4 ml-2"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14"></path>
								<path d="M12 5l7 7-7 7"></path>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
