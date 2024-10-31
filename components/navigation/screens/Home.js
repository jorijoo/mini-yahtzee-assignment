import { useState, useContext } from "react"
import { Keyboard } from "react-native"
import { Button, Headline, Text, TextInput } from "react-native-paper"
import Header from "../../Header"
import Footer from "../../Footer"
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

const Home = () => {
	const [user, setUser] = useState(false)
	const [gamestate, setGamestate] = useContext(GameContext)
	const [, setScreenNmb] = useContext(NavigationContext)

	const handleName = (name) => {
		setGamestate({ 
			...gamestate, 
			username: name,
			scoreboard: [
				{ player: 'Jori', score: 400, key: '1' },
				{ player: 'Jori', score: 405, key: '2' },
				{ player: 'Jori', score: 543, key: '3' },
				{ player: 'Homer', score: 545, key: '4' } ,
			],
			score: 0
		})
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
			<Header />
			{!user ?
				<>
					<Headline>Your name for the scoreboard:</Headline>
					<TextInput
						label={'Username'}
						value={gamestate.username}
						onChangeText={name => handleName(name)}
						autoFocus={true} />
					<Button
						mode={'contained-tonal'}
						onPress={handleNameSave}
					>
						Next
					</Button>
				</>
				:
				<>
					<Headline>Rules of the game</Headline>
					<Text multiline={true}>
						THE GAME: Upper section of the classic Yahtzee
						dice game. You have {DICE} dice and
						for the every die you have {ROUNDS} throws.
						After each throw you can keep dices in
						order to get same dice spot counts as many as
						possible. In the end of the turn you must select
						your points from {MIN_SPOT} to {MAX_SPOT}. Game
						ends when all points have been selected.
						The order for selecting those is free.
					</Text>
					<Text multiline={true}>
						POINTS: After each turn game calculates the sum
						for the dices you selected. Only the dices having
						the same spot count are calculated. Inside the
						game you can not select same points from
						{MIN_SPOT} to {MAX_SPOT} again.
					</Text>
					<Text multiline={true}>
						GOAL: To get points as much as possible.
						{BONUS_POINTS_LIMIT} points is the limit of
						getting bonus which gives you {BONUS_POINTS}
						points more.

					</Text>
					<Headline>Good luck, {gamestate.username}</Headline>
					<Button
						mode={'contained-tonal'}
						onPress={() => setScreenNmb(1)}
					>
						PLAY
					</Button>
					<Button
						onPress={handleReset}>
						Reset your name
					</Button>
				</>
			}
			<Footer />
		</>
	)
}

export default Home