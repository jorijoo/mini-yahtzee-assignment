import { Pressable, View, Image } from "react-native"
import { Button, Dialog, Icon, Portal, Text } from "react-native-paper"
import styles from "../../../styles/styles"
import {
	DICE,
	ROLLS,
	MAX_SPOT,
	BONUS_POINTS_LIMIT,
	BONUS_POINTS
} from '../../../constants/rules'
import { useContext, useEffect, useState } from "react"
import GameContext from "../../context/GameContext"

const Gameboard = () => {

	const [gamestate] = useContext(GameContext)

	const [visible, setVisible] = useState(false)
	const toggleDialog = () => setVisible(!visible)

	const [rollsLeft, setRollsLeft] = useState(ROLLS)
	const [sum, setSum] = useState(0)
	const [total, setTotal] = useState(0)
	const [status, setStatus] = useState('Throw dice')
	const [board, setBoard] = useState(new Array(DICE).fill(''))
	const [selectedDice, setSelectedDice] = useState(new Array(DICE).fill(false))
	const [assignedPoints, setAssignedPoints] = useState(new Array(MAX_SPOT).fill(null))


	const points = new Array(MAX_SPOT).fill('')
	const textVariant = 'titleLarge'

	useEffect(() => {
		if (rollsLeft < 0) {
			setRollsLeft(ROLLS - 1)
		}

		if (rollsLeft === ROLLS) {
			setStatus('Roll dice to begin')
		} else if (rollsLeft > 0) {
			setStatus('Roll dice')
		} else {
			setStatus('Assign points')
		}
	}, [rollsLeft])

	useEffect(() => {
		setTotal((sum >= BONUS_POINTS_LIMIT) ? sum + BONUS_POINTS : sum)
	}, [sum])

	useEffect(() => {
		if (assignedPoints.indexOf(null) === -1) {
			setStatus('Game is over, play again?')
			toggleDialog()
		}
	}, [assignedPoints])

	const resetGame = () => {
		toggleDialog()

		setRollsLeft(ROLLS)
		setSum(0)
		setStatus('Throw dice')
		setBoard(board.fill(''))
		setSelectedDice(selectedDice.fill(false))
		setAssignedPoints(assignedPoints.fill(null))
	}

	const RollButton = () => {
		return (
			<Button
				style={styles.button}
				mode={'contained-tonal'}
				disabled={rollsLeft < 1}
				onPress={() => rollDice()}>
				<Text variant="displayLarge" style={styles.customFont}>ROLL DICE</Text>
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
									color={selectedDice[i] ? 'steelblue' : 'orange'}
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
							<Text style={styles.customFont} variant={textVariant}>{assignedPoints[i]}</Text>
							<Icon
								color={assignedPoints[i] != null ? 'steelblue' : 'orange'}
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
			<Portal>
				<Dialog visible={visible} onDismiss={resetGame}>
					<Dialog.Title>Game over</Dialog.Title>
					<Dialog.Content>
						<Text style={styles.customFont} variant="displayMedium">Your score is: </Text>
						<Text style={styles.customFont} variant="displayLarge">{total} </Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button style={styles.customFont} onPress={resetGame}>Play again</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<View style={styles.flex1}>
				<Points />
			</View>
			{
				rollsLeft === ROLLS && <Image
					style={[styles.logo, styles.flex1]}
					resizeMode="contain"
					source={require('../../../assets/miniy.png')} />
			}
			<View style={styles.flex1}>
				<Text style={styles.customFont} variant={textVariant}>Total points: {total}</Text>
				<Text style={styles.customFont} variant={textVariant}>{(sum < BONUS_POINTS_LIMIT) ? `You are ${BONUS_POINTS_LIMIT - sum} points away from bonus points` : `Bonus of ${BONUS_POINTS} added to your points`}</Text>
				<Text style={styles.customFont} variant={textVariant}>Rolls left: {rollsLeft}</Text>
				<Text style={styles.customFont} variant={textVariant}>Tip:</Text>
				<Text style={styles.customFont} variant={textVariant}>{status}</Text>
			</View>
			{
				rollsLeft !== ROLLS && <Dice />
			}
			<View style={styles.flex1}>
				<RollButton />
				<Text style={styles.customFont} variant={textVariant}>Player: {gamestate.username}</Text>
			</View>
		</View >
	)
}

export default Gameboard