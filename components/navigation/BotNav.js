import { useContext, useState } from 'react'
import { BottomNavigation } from 'react-native-paper'
import Gameboard from './screens/Gameboard'
import Home from './screens/Home'
import Scoreboard from './screens/Scoreboard'
import BotNavRoutes from './BotNavRoutes'
import NavigationContext from '../context/NavigationContext'
import GameContext from '../context/GameContext'


const BotNav = () => {

	const [index, setIndex] = useContext(NavigationContext)
	const [routes] = useState(BotNavRoutes())
	const [gamestate] = useContext(GameContext)

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
			barStyle={{ display: (index == 0 && gamestate.username.length == 0) ? 'none' : 'flex' }}
		/>
	)
}

const renderScene = BottomNavigation.SceneMap({
	home: Home,
	gameboard: Gameboard,
	scoreboard: Scoreboard
});

export default BotNav