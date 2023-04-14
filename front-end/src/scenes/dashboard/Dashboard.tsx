import {List, ListItem, ListItemButton, useTheme} from '@mui/material'
import {Box} from '@mui/system'
import {useEffect, useState} from 'react'
import Cookies from 'universal-cookie'
import Watchlist from '../watchlist/Watchlist'
import Searchbar from '../../components/UI/Searchbar'

const Dashboard = () => {
    const theme = useTheme()

    const [userWatchlists, setUserWatchlists] = useState([])
    const [wl_name, set_wl_name] = useState('Select a Watchlist')

    const cookies = new Cookies()

    useEffect(() => {
        fetchUserWatchlists()
    }, [])

    async function fetchUserWatchlists() {
        try {
            const response = await fetch(
                `http://127.0.0.1:8080/getUserWatchlists?user_ID=${cookies.get(
                    'user_id'
                )}`,
                {}
            ).then((response) => {
                response.json().then((json) => {
                    setUserWatchlists(json[0])
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    const [watchlistSelected, setWatchlistSelected] = useState(0)

    const [showWatchlist, setShowWatchlist] = useState(false)

    function handleLoadingWatchlist(wl_ID: number, wl_name: string) {
        setShowWatchlist(true)
        setWatchlistSelected(wl_ID)
        console.log(wl_name)
        set_wl_name(wl_name)
    }

    return (
        <Box>
            <Searchbar />
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': {padding: 0},
                    m: '3%',
                    itemSize: '46',
                    // display: 'inline',
                }}
            >
                {userWatchlists.map((_userWatchlists, key) => {
                    return (
                        <ListItem
                            sx={{fontSize: theme.typography.h4}}
                            key={key}
                        >
                            <ListItemButton
                                onClick={() =>
                                    handleLoadingWatchlist(
                                        Number(userWatchlists[key][0]),
                                        userWatchlists[key][2]
                                    )
                                }
                            >
                                {userWatchlists[key][2]}
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Watchlist wl_ID={watchlistSelected} wl_name={wl_name} />
        </Box>
    )
}
export default Dashboard
