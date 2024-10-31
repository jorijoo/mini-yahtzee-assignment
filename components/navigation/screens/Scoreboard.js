import { ScrollView, View } from "react-native"
import { DataTable, Text } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_KEY } from "../../../constants/keys.json"
import { useContext, useEffect, useState } from "react"
import GameContext from "../../context/GameContext"
import styles from "../../../styles/styles"

const Scoreboard = () => {

	const [gamestate, setGamestate] = useContext(GameContext)


	useEffect(() => {
		if (gamestate.score) {
			const newKey = gamestate.scoreboard.length + 1
			const newScore = {
				player: gamestate.username,
				score: gamestate.score,
				key: newKey.toString()
			}
			storeData(newScore)
		}
		getData()
	}, [gamestate.scoreboard])


	const storeData = async (value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
		}
		catch (err) {
			console.log(err);
		}
	}

	const getData = async () => {
		try {
			return AsyncStorage.getItem(STORAGE_KEY)
				.then(req => JSON.parse(req))
				.then(json => {
					if (json === null) {
						json = [];
						console.log(JSON.stringify(json))
					}
					setGamestate({ ...gamestate, scoreboard: json });
				})
				.catch(err => console.log(err))
		}
		catch (err) {
			console.log(err);
		}
	}

	return (
		<View style={styles.scoreboard}>
			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Player</DataTable.Title>
					<DataTable.Title>Score</DataTable.Title>
				</DataTable.Header>
				{gamestate.scoreboard.map((score, i) => (
					<DataTable.Row key={i}>
						<DataTable.Cell>{score.player}</DataTable.Cell>
						<DataTable.Cell numeric>{score.score}</DataTable.Cell>
					</DataTable.Row>
				))}
			</DataTable>
		</View>
	)
}

export default Scoreboard