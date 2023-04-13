import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material'
import {Box} from '@mui/system'
import Watchlist from '../watchlist/Watchlist'
import {useEffect, useState} from 'react'

const Dashboard = () => {
    const theme = useTheme()

    const [userWatchlists, setUserWatchlists] = useState([])

    useEffect(() => {
        fetchUserWatchlists()
    }, [])

    async function fetchUserWatchlists() {
        try {
            // const response = await fetch(`http://127.0.0.1:8080/populateWatchlist?WL=${props.name}?userID=${userID}`, {}).then(
            const response = await fetch(
                `http://127.0.0.1:8080/getUserWatchlists?user_ID=27`,
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
    ////////// LINE 22 hard coded user_ID

    const [watchlistSelected, setWatchlistSelected] = useState(0)

    const [showWatchlist, setShowWatchlist] = useState(false)

    function handleLoadingWatchlist(wl_ID: number) {
        setShowWatchlist(true)
        setWatchlistSelected(wl_ID)
    }

    // useEffect(() => {
    //     console.log(watchlistSelected, 'watchlistSelected')
    // }, [watchlistSelected])

    return (
        <Box>
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
                                    // console.log(userWatchlists[key][0])
                                    handleLoadingWatchlist(
                                        Number(userWatchlists[key][0])
                                    )
                                }
                            >
                                {userWatchlists[key][2]}
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>

            {/* {showWatchlist && ( */}
            <Watchlist wl_ID={watchlistSelected} />
            {/* <Watchlist wl_ID={watchlistSelected['wl_ID']} /> */}
            {/* )} */}
        </Box>
    )
}
export default Dashboard
