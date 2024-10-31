import { Dimensions, StyleSheet } from "react-native"
import CONSTANTS from 'expo-constants'

// Define global screen styles
const screens = StyleSheet.create({
	flex: 1,
	marginHorizontal: 10,
	flexDirection: 'column'
})

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	flex1: {
		flex: 1,
		justifyContent: "space-evenly"
	},
	textInput: {
		backgroundColor: 'white',
		fontSize: 30
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
	button: {
		backgroundColor: 'orange',
	},
	customFont: {
		fontFamily: 'monospace',
		textAlign: 'center',
		paddingTop: 20
	}
	,
	dice_row: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
		marginVertical: 40,
		textAlign: 'center'
	},
	dice_icon: {
		margin: 10
	},
	logo: {
		width: '100%'
	}
})

// Exclude statusbar from container
export const appContainer = StyleSheet.create({
	...styles.container,
	marginTop: CONSTANTS.statusBarHeight
})

export default styles