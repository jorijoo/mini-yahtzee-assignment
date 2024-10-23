import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { appContainer } from './styles/styles'
import Header from './components/Header'
import Footer from './components/Footer'
import Gameboard from './components/navigation/screens/Gameboard'
import { PaperProvider } from 'react-native-paper'
import { useState } from 'react'
import en_GB from './constants/en_GB.json'
import LanguageContext from './components/context/LanguageContext'

export default function App() {

	const [locale, setLocale] = useState(en_GB)

	return (
		<PaperProvider>
			<LanguageContext.Provider value={[locale, setLocale]}>
				<View style={appContainer}>
					<Header />
					<Gameboard />
					<StatusBar style="auto" />
					<Footer />
				</View>
			</LanguageContext.Provider >
		</PaperProvider>
	)
}