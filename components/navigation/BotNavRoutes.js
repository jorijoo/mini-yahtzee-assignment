import { useContext } from "react"
import LanguageContext from "../context/LanguageContext"

const BotNavRoutes = () => {

	const [LOCALE] = useContext(LanguageContext)

	return (
		[
			{
				key: 'home',
				title: LOCALE.BOTTOM_NAV.HOME,
				focusedIcon: 'home-circle',
				unfocusedIcon: 'home-account'
			},
			{
				key: 'gameboard',
				title: LOCALE.BOTTOM_NAV.GAMEBOARD,
				focusedIcon: 'dice-6',
				unfocusedIcon: 'dice-6-outline'
			},
			{
				key: 'scoreboard',
				title: LOCALE.BOTTOM_NAV.SCOREBOARD,
				unfocusedIcon: 'format-list-numbered'
			}
		]
	)
}

export default BotNavRoutes