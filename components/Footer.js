import { View } from "react-native"
import { Appbar } from "react-native-paper"
import styles from '../styles/styles'
import { useContext } from "react"
import LanguageContext from "./context/LanguageContext"

const Footer = () => {

	const [LOCALE] = useContext(LanguageContext)

	return (
			<Appbar.Header>
				<Appbar.Content title={`${LOCALE.AUTHOR_NAMES}`} mode='center-aligned' />
			</Appbar.Header>
	)
}

export default Footer