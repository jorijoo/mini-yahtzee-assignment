import { useState, useContext } from "react"
import { Image, Keyboard, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import {
	DICE,
	ROUNDS,
	MIN_SPOT,
	MAX_SPOT,
	BONUS_POINTS,
	BONUS_POINTS_LIMIT
} from '../../../constants/rules.json'
import GameContext from "../../context/GameContext"
import NavigationContext from "../../context/NavigationContext"
import styles from "../../../styles/styles"

const Home = () => {
	const [user, setUser] = useState(false)
	const [gamestate, setGamestate] = useContext(GameContext)
	const [, setScreenNmb] = useContext(NavigationContext)

	const textVariant = 'titleLarge'

	const handleName = (name) => {
		setGamestate({ ...gamestate, username: name })
	}

	const handleNameSave = () => {
		if (gamestate.username.trim().length > 0) {
			setUser(!user)
			Keyboard.dismiss()
		}
	}

	const handleReset = () => {
		setUser(!user)
		handleName('')
	}

	return (
		<>
			{!user ?
				<>
					<Image
						style={[styles.logo, styles.flex1]}
						resizeMode="contain"
						source={require('../../../assets/miniy.png')} />
					<Text style={styles.customFont} variant={textVariant}>Your name for the scoreboard:</Text>
					<View style={styles.flex1}>
						<TextInput
							style={styles.textInput}
							label={'Username'}
							value={gamestate.username}
							onChangeText={name => handleName(name)}
							autoFocus={true} />
						<Button
							style={styles.button}
							mode={'contained-tonal'}
							onPress={handleNameSave}
						>
							<Text style={styles.customFont} variant="displayLarge">NEXT</Text>
						</Button>
					</View>
				</>
				:
				<>
					<Text style={styles.customFont} variant={textVariant}>Rules of the game</Text>
					<Text multiline={true} style={styles.customFont} variant={textVariant}>
						Upper section of the classic Yahtzee
						dice game. You have {DICE} dice and
						for the every die you have {ROUNDS} throws.
						After each throw you can keep dices in
						order to get same dice spot counts as many as
						possible. In the end of the turn you must select
						your points from {MIN_SPOT} to {MAX_SPOT}. Game
						ends when all points have been selected.
						The order for selecting those is free.
					</Text>
					<Text style={styles.customFont} variant={textVariant}>Points</Text>
					<Text multiline={true} style={styles.customFont} variant={textVariant}>
						After each turn game calculates the sum
						for the dices you selected. Only the dices having
						the same spot count are calculated. Inside the
						game you can not select same points from
						{MIN_SPOT} to {MAX_SPOT} again.
					</Text>
					<Text style={styles.customFont} variant={textVariant}>Goal</Text>
					<Text multiline={true} style={styles.customFont} variant={textVariant}>
						To get points as much as possible.
						{BONUS_POINTS_LIMIT} points is the limit of
						getting bonus which gives you {BONUS_POINTS}
						points more.

					</Text>
					<Text style={styles.customFont} variant={textVariant}>Good luck, {gamestate.username}</Text>
					<View style={styles.flex1}>
						<Button
							style={styles.button}
							mode={'contained-tonal'}
							onPress={() => setScreenNmb(1)}
						>
							<Text style={styles.customFont} variant="displayLarge">PLAY</Text>
						</Button>
						<Button
							style={styles.button}
							mode={'contained-tonal'}
							onPress={handleReset}>
							<Text style={styles.customFont} variant={textVariant}>Reset your name</Text>
						</Button>
					</View>
				</>
			}
		</>
	)
}

export default Home