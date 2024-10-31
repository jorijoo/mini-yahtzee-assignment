import { StyleSheet } from "react-native"
import CONSTANTS from 'expo-constants'

// Define global screen styles
const screens = StyleSheet.create({
	flex: 1,
	// backgroundColor: '#99f'
})

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	header: {
		backgroundColor: '#ff5',
		flex: 1,
		maxHeight: 50,
		justifyContent: 'center',
		alignContent: 'center'
	},
	gameboard: {
		...screens,
	},
	dice_row: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
		marginVertical: 40,
		textAlign: 'center'
	},
	dice_icon: {
		margin: 10
	}
})

// Exclude statusbar from container
export const appContainer = StyleSheet.create({
	...styles.container,
	marginTop: CONSTANTS.statusBarHeight
})

export default styles