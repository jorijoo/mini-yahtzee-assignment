import { useContext, useState } from 'react'
import { BottomNavigation } from 'react-native-paper'
import Gameboard from './screens/Gameboard'
import Home from './screens/Home'
import Scoreboard from './screens/Scoreboard'
import BotNavRoutes from './BotNavRoutes'
import NavigationContext from '../context/NavigationContext'


const BotNav = () => {

	const [index, setIndex] = useContext(NavigationContext)
	const [routes] = useState(BotNavRoutes())

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	)
}

const renderScene = BottomNavigation.SceneMap({
	home: Home,
	gameboard: Gameboard,
	scoreboard: Scoreboard
});

export default BotNav