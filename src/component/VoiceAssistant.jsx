import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import speech, { useSpeechRecognition } from 'react-speech-recognition';
import { apiKey } from './config';

const VoiceAssistant = () => {
	const { listening, transcript } = useSpeechRecognition();
	const [thinking, setThinking] = useState(false);
	const [aiText, setAiText] = useState('');
	// useEffect(() => {
	// 	speak('Initializing NEXUS..');
	// 	wishMe();
	// 	console.log("h")
	// }, []);
	useEffect(() => {
		if (!listening && transcript) {
			callGptAPI(transcript).then((res) => {
				if (takeCommand(transcript.toLowerCase()) === 0) {
					speak(res);
					setAiText(res);
				}
			});
		}
	}, [transcript, listening]);

	const wishMe = () => {
		const day = new Date();
		const hour = day.getHours();

		if (hour >= 0 && hour < 12) {
			speak('Good Morning Boss...');
		} else if (hour > 12 && hour < 17) {
			speak('Good Afternoon Master...');
		} else {
			speak('Good Evening Sir...');
		}
	};
	const speak = (res) => {
		const speechSynthesis = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance(res);
		utterance.rate = 1.7;
		utterance.volume = 1;
		utterance.pitch = 1;
		speechSynthesis.speak(utterance);
	};
	async function callGptAPI(message) {
		setThinking(true);
		const data = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				messages: [
					{
						role: 'user',
						content: message,
					},
				],
				model: 'gpt-3.5-turbo',
			}),
		}).then((res) => res.json());
		setThinking(false);
		return data.choices[0].message.content;
	}

	const takeCommand = (message) => {
		if (message.includes('hey') || message.includes('hello')) {
			speak('Hello Sir, How May I Help You?');
			setThinking(false);
		} else if (message.includes(' google')) {
			window.open('https://google.com', '_blank');
			speak('Opening Google...');
			setThinking(false);
		} else if (message.includes(' youtube')) {
			window.open('https://youtube.com', '_blank');
			speak('Opening Youtube...');
			setThinking(false);
		} else if (message.includes('linkedin')) {
			window.open('https://www.linkedin.com/in/mobinshahidi/', '_blank');
			setThinking(false);
			speak('Opening linkedin...');
		} else if (message.includes('github')) {
			window.open('https://github.com/Mobinshahidi', '_blank');
			setThinking(false);
			speak('Opening github...');
		} else if (message.includes('pinterest')) {
			window.open('https://www.pinterest.com/mobinshahiidi/', '_blank');
			setThinking(false);
			speak('Opening pinterest...');
		} else if (message.includes('hashnode')) {
			window.open('https://hashnode.com/@mobinshahidi', '_blank');
			setThinking(false);
			speak('Opening hashnode...');
		} else if (message.includes('edclub')) {
			window.open('https://www.typingclub.com/sportal/', '_blank');
			setThinking(false);
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
			setThinking(false);
		} else if (message.includes('wikipedia')) {
			window.open(
				`https://en.wikipedia.org/wiki/${message.replace('wikipedia', '')}`,
				'_blank',
			);
			const finalText =
				'This is what I found on Wikipedia regarding ' + message;
			speak(finalText);
			setThinking(false);
		} else if (message.includes('time')) {
			time = new Date().toLocaleString(undefined, {
				hour: 'numeric',
				minute: 'numeric',
			});
			const finalText = time;
			speak(finalText);
			setThinking(false);
		} else if (message.includes('date')) {
			date = new Date().toLocaleString(undefined, {
				month: 'short',
				day: 'numeric',
			});
			const finalText = date;
			speak(finalText);
			setThinking(false);
		} else if (message.includes('calculator')) {
			window.open('Calculator:///');
			const finalText = 'Opening Calculator';
			speak(finalText);
			setThinking(false);
		} else if (message.includes('code')) {
			window.open('Visual Studio Code:///');
			const finalText = 'Opening vs code';
			speak(finalText);
			setThinking(false);
		} else if (message.includes('spotify')) {
			window.open('Spotify:///');
			const finalText = 'Opening spotify';
			speak(finalText);
			setThinking(false);
		} else if (message.includes('notion')) {
			window.open('Notion:///');
			const finalText = 'Opening notion';
			speak(finalText);
			setThinking(false);
		} else {
			return 0;
		}
	};
	return (
		<div>
			{listening ? (
				<p>Go ahead i'm listening</p>
			) : (
				<p>Click the button and ask me anything</p>
			)}
			<button onClick={() => speech.startListening()}>
				{listening ? 'Stop Listening' : 'Start Listening'}
			</button>
			{transcript && <div>{transcript}</div>}
			{thinking && <div>Thinking...</div>}
			{aiText && <div>{aiText}</div>}
		</div>
	);
};

export default VoiceAssistant;
