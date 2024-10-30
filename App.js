import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { appContainer } from './styles/styles'
import { PaperProvider } from 'react-native-paper'
import { useState } from 'react'
import en_GB from './constants/en_GB.json'
import LanguageContext from './components/context/LanguageContext'
import GameContext from './components/context/GameContext'
import NavigationContext from './components/context/NavigationContext'
import BotNav from './components/navigation/BotNav'

export default function App() {

	const [locale, setLocale] = useState(en_GB)
	const [gamestate, setGamestate] = useState({ username: '' })
	const [screenNmb, setScreenNmb] = useState(0)

	return (
		<PaperProvider>
			<NavigationContext.Provider value={[screenNmb, setScreenNmb]}>
					<LanguageContext.Provider value={[locale, setLocale]}>
						<GameContext.Provider value={[gamestate, setGamestate]}>
							<View style={appContainer}>
								<StatusBar style="auto" />
								{/* <Footer /> */}
								<BotNav />
							</View>
						</GameContext.Provider>
					</LanguageContext.Provider >
			</NavigationContext.Provider>
		</PaperProvider >
	)
}