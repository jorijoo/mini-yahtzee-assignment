import { Pressable, View } from "react-native"
import { Button, Dialog, Divider, Headline, Icon, Portal, Text } from "react-native-paper"
import styles from "../../../styles/styles"
import {
	DICE,
	ROLLS,
	WINNING_POINTS,
	MIN_SPOT,
	MAX_SPOT,
	BONUS_POINTS_LIMIT,
	BONUS_POINTS
} from '../../../constants/rules'
import { useContext, useEffect, useState } from "react"
import GameContext from "../../context/GameContext"

const Gameboard = () => {
	const [rollsLeft, setRollsLeft] = useState(ROLLS)
	const [wins, setWins] = useState(0)
	const [sum, setSum] = useState(0)
	const [status, setStatus] = useState('Throw dice')
	const [board, setBoard] = useState(new Array(DICE).fill(''))
	const [selectedDice, setSelectedDice] = useState(new Array(DICE).fill(false))

	const [points, setPoints] = useState(new Array(MAX_SPOT).fill(''))
	const [assignedPoints, setAssignedPoints] = useState(new Array(MAX_SPOT).fill(null))

	const [gamestate, setGamestate] = useContext(GameContext)

	// useEffect(() => throwDice(), [])


	useEffect(() => {
		// checkWinner()
		if (rollsLeft === ROLLS) setStatus('Game has not started')
		if (rollsLeft < 0) {
			setRollsLeft(ROLLS)
			setWins(0)
		}
	}, [rollsLeft])


	// const checkWinner = () => {
	// 	if (sum >= WINNING_POINTS) {
	// 		setWins(wins + 1)
	// 		setStatus('You won')
	// 	}
	// 	else if (sum >= WINNING_POINTS && rollsLeft === 0) {
	// 		setWins(wins + 1)
	// 		setStatus('You won, game over')
	// 	}
	// 	else if (wins > 0 && rollsLeft === 0) {
	// 		setStatus('You won, game over')
	// 	}
	// 	else if (rollsLeft === 0) {
	// 		setWins(wins + 1)
	// 		setStatus('Game over')
	// 	}
	// 	else {
	// 		setStatus('Keep playing')
	// 	}
	// }

	const RollButton = () => {
		return (
			<Button
				mode={'contained-tonal'}
				disabled={rollsLeft < 1}
				onPress={() => rollDice()}>
				<Text>Button</Text>
			</Button>
		)
	}

	const rollDice = () => {
		setRollsLeft(rollsLeft - 1)
		setBoard(board.map((die, i) => {

			const randomNumber = Math.floor(Math.random() * MAX_SPOT + 1)

			if (!selectedDice[i]) {
				// Reroll each unselected die
				return (
					{
						...die,
						key: `die_${i}`,
						value: randomNumber
					}
				)
			} else {
				// Don't reroll a selected die
				return die
			}
		}))
	}

	const Dice = () => {

		const handleDiePress = (i) => {
			const dice = [...selectedDice]
			dice[i] = selectedDice[i] ? false : true
			setSelectedDice(dice)
		}

		return (
			<View style={styles.dice_row}>
				{board.map((die, i) => {
					if (board[0] !== '') {
						return (
							<Pressable
								style={styles.dice_icon}
								key={die.key}
								// disabled={rollsLeft === 0}
								onPress={() => handleDiePress(i)}>
								<Icon
									color={selectedDice[i] ? 'black' : 'steelblue'}
									source={`dice-${die.value}`}
									size={70} />
							</Pressable>
						)
					}
				})}
			</View>
		)
	}

	const Points = () => {

		const handlePointsPress = (i) => {
			const pips = +i + 1

			if (rollsLeft > 0) {

				setStatus(`Roll the dice ${rollsLeft} more ${rollsLeft == 1 ? 'time' : 'times'}`)

			} else {

				if (assignedPoints[i] === null) {

					// Extract face values
					const values = board.map((x) => x.value)

					// Sum values of selected pips
					const outcome = values.reduce((prev, next) => ((next === pips) ? prev + next : prev), 0)

					// Assign 
					const points = [...assignedPoints]
					points[i] = assignedPoints[i] === null ? outcome : null
					setAssignedPoints(points)
					setSum(sum + points[i])
					setRollsLeft(ROLLS)
					setSelectedDice(selectedDice.fill(false))
					rollDice()

				} else {

					setStatus(`You already selected points for ${pips}`)

				}

			}
		}


		return (
			<View style={styles.dice_row}>
				{points.map((pips, i) => {
					return (
						<Pressable
							style={styles.dice_icon}
							key={i}
							// disabled={(assignedPoints[i] !== null || rollsLeft !== 0)}
							onPress={() => handlePointsPress(i)}>
							<Headline>{assignedPoints[i]}</Headline>
							<Icon
								color={assignedPoints[i] != null ? 'black' : 'steelblue'}
								source={`numeric-${i + 1}-circle`}
								size={50} />
						</Pressable>
					)
				})}
			</View>
		)
	}

	return (
		<View style={styles.gameboard}>
			<Points />
			<Headline>Total points: {sum}</Headline>
			<Text>Rolls left: {rollsLeft}</Text>
			<Text>Wins: {wins}</Text>
			<Headline>{status}</Headline>
			<Dice />
			<RollButton />
			<Text>Player: {gamestate.username}</Text>
		</View>
	)
}

export default Gameboard