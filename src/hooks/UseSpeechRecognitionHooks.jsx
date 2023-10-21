import { useState, useEffect } from 'react';

const UseSpeechRecognition = () => {
	const [transcript, setTranscript] = useState('');
	const [isListening, setIsListening] = useState(false);

	useEffect(() => {
		// speak('Initializing JARVIS..');
		// wishMe();
	}, []);

	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();

	const speak = (text) => {
		const text_speak = new SpeechSynthesisUtterance(text);
		text_speak.rate = 1.7;
		text_speak.volume = 1;
		text_speak.pitch = 0;
		window.speechSynthesis.speak(text_speak);
	};

	const wishMe = () => {
		const day = new Date();
		const hour = day.getHours();

		if (hour >= 0 && hour < 12) {
			speak('Good Morning Boss...');
		} else if (hour >= 12 && hour < 17) {
			speak('Good Afternoon Master...');
		} else {
			speak('Good Evening Sir...');
		}
	};
	const takeCommand = (message) => {
		if (message.includes('hey') || message.includes('hello')) {
			speak('Hello Sir, How May I Help You?');
			setIsListening(false);
		} else if (message.includes(' google')) {
			window.open('https://google.com', '_blank');
			speak('Opening Google...');
			setIsListening(false);
		} else if (message.includes(' youtube')) {
			window.open('https://youtube.com', '_blank');
			speak('Opening Youtube...');
			setIsListening(false);
		} else if (message.includes('linkedin')) {
			window.open('https://www.linkedin.com/in/mobinshahidi/', '_blank');
			setIsListening(false);
			speak('Opening linkedin...');
		} else if (message.includes('github')) {
			window.open('https://github.com/Mobinshahidi', '_blank');
			setIsListening(false);
			speak('Opening github...');
		} else if (message.includes('pinterest')) {
			window.open('https://www.pinterest.com/mobinshahiidi/', '_blank');
			setIsListening(false);
			speak('Opening pinterest...');
		} else if (message.includes('hashnode')) {
			window.open('https://hashnode.com/@mobinshahidi', '_blank');
			setIsListening(false);
			speak('Opening hashnode...');
		} else if (message.includes('edclub')) {
			window.open('https://www.typingclub.com/sportal/', '_blank');
			setIsListening(false);
			speak('Opening ed club...');
		} else if (
			message.includes('what is') ||
			message.includes('who is') ||
			message.includes('what are')
		) {
			window.open(
				`https://www.google.com/search?q=${message.replace(' ', '+')}`,
				'_blank',
			);
			const finalText =
				'This is what I found on the internet regarding ' + message;
			speak(finalText);
			setIsListening(false);
		} else if (message.includes('wikipedia')) {
			window.open(
				`https://en.wikipedia.org/wiki/${message.replace('wikipedia', '')}`,
				'_blank',
			);
			const finalText =
				'This is what I found on Wikipedia regarding ' + message;
			speak(finalText);
			setIsListening(false);
		} else if (message.includes('time')) {
			time = new Date().toLocaleString(undefined, {
				hour: 'numeric',
				minute: 'numeric',
			});
			const finalText = time;
			speak(finalText);
			setIsListening(false);
		} else if (message.includes('date')) {
			date = new Date().toLocaleString(undefined, {
				month: 'short',
				day: 'numeric',
			});
			const finalText = date;
			speak(finalText);
			setIsListening(false);
		} else if (message.includes('calculator')) {
			window.open('Calculator:///');
			const finalText = 'Opening Calculator';
			speak(finalText);
			setIsListening(false);
		} else if (message.includes('code')) {
			window.open('Visual Studio Code:///');
			const finalText = 'Opening vs code';
			speak(finalText);
			setIsListening(false);
		} else if (message.includes('spotify')) {
			window.open('Spotify:///');
			const finalText = 'Opening spotify';
			speak(finalText);
			setIsListening(false);
		} else if (message.includes('notion')) {
			window.open('Notion:///');
			const finalText = 'Opening notion';
			speak(finalText);
			setIsListening(false);
		} else {
			window.open(
				`https://www.google.com/search?q=${message.replace(' ', '+')}`,
				'_blank',
			);
			setIsListening(false);
			const finalText =
				'I found some information for ' + message + ' on Google';
			speak(finalText);
		}
	};

	const startListening = () => {
		setTranscript('');
		setIsListening(true);
		recognition.start();
	};

	const stopListening = () => {
		setIsListening(false);
		recognition.stop();
	};

	recognition.onresult = (event) => {
		const currentIndex = event.resultIndex;
		const transcript = event.results[currentIndex][0].transcript;
		setTranscript(transcript);
		takeCommand(transcript.toLowerCase());
	};

	return {
		transcript,
		isListening,
		startListening,
		stopListening,
		hasRecognition: !!recognition,
	};
};
export default UseSpeechRecognition;
