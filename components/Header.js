import { View } from "react-native"
import { Text } from "react-native-paper"
import styles from "../styles/styles"
import LanguageContext from "./context/LanguageContext"
import { useContext } from "react"

const Header = () => {

	const [LOCALE] = useContext(LanguageContext)

	return (
		<View style={styles.header}>
			<Text>
				{LOCALE.HEADER}
			</Text>
		</View>
	)
}

export default Header