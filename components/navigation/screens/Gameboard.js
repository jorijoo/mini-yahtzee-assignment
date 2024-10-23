import { Pressable, View } from "react-native"
import { Button, Icon, Text } from "react-native-paper"
import styles from "../../../styles/styles"
import RULES from '../../../constants/rules'
import { useEffect, useState } from "react"

const Gameboard = () => {
	const [roundsLeft, setRoundsLeft] = useState(RULES.ROUNDS)
	const [wins, setWins] = useState(0)
	const [sum, setSum] = useState(0)
	const [status, setStatus] = useState('')
	const [board, setBoard] = useState([])
	const [chosen, setChosen] = useState([])

	// useEffect(() => throwDice(), [])

	// useEffect(() => console.log({ board }), [board])

	useEffect(() => {
		checkWinner()
		if (roundsLeft === RULES.ROUNDS) setStatus('Game has not started')
		if (roundsLeft < 0) {
			setRoundsLeft(RULES.ROUNDS)
			setWins(0)
		}
	}, [roundsLeft])

	const checkWinner = () => {
		if (sum >= RULES.WINNING_POINTS) {
			setWins(wins + 1)
			setStatus('You won')
		}
		else if (sum >= RULES.WINNING_POINTS && roundsLeft === 0) {
			setWins(wins + 1)
			setStatus('You won, game over')
		}
		else if (wins > 0 && roundsLeft === 0) {
			setStatus('You won, game over')
		}
		else if (roundsLeft === 0) {
			setWins(wins + 1)
			setStatus('Game over')
		}
		else {
			setStatus('Keep playing')
		}
	}

	const throwDice = () => {
		setRoundsLeft(roundsLeft - 1)
		setBoard([])
		setSum(0)


		for (let i = 0; i < RULES.DICE; i++) {

			const randomNumber = Math.floor(Math.random() * 6 + 1)

			setSum(sum => sum + randomNumber)
			setBoard(board => [...board, {
				icon: `dice-${randomNumber}`,
				key: `die_${i}`,
				color: '#f0f',
				size: 50
			}])
		}
	}


	return (
		<View style={styles.gameboard}>
			<View style={styles.dice_row}>
				{board.map((die) => {
					return (
						<Pressable
							style={styles.dice_icon}
							key={die.key}
						>
							<Icon
								color={die.color}
								source={die.icon}
								size={die.size}
							/>
						</Pressable>
					)
				})}
			</View>
			<Text>Sum: {sum}</Text>
			<Text>Rounds left: {roundsLeft}</Text>
			<Text>Wins: {wins}</Text>
			<Text>Status: {status}</Text>
			<Button onPress={() => throwDice()}>
				<Text>Button</Text>
			</Button>
		</View>
	)
}

export default Gameboard