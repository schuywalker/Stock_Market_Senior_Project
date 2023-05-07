import {List, ListItem, ListItemButton, useTheme} from '@mui/material'
import {Box} from '@mui/system'
import {useEffect, useState} from 'react'
import Cookies from 'universal-cookie'
import {getUserWL} from '../../config/WebcallAPI'
import AddTickersButton from '../watchlist/WL_Action_Buttons/Add_Tickers_Button'
import CreateWLButton from '../watchlist/WL_Action_Buttons/Create_Button'
import DeleteTickersButton from '../watchlist/WL_Action_Buttons/Delete_Tickers_Button'
import DeleteWLButton from '../watchlist/WL_Action_Buttons/Delete_WL_Button'
import RenameWLButton from '../watchlist/WL_Action_Buttons/Rename_Button'
import Watchlist from '../watchlist/Watchlist'

const Dashboard = () => {
    const theme = useTheme()

    const controller = new AbortController()

    const [userWatchlists, setUserWatchlists] = useState([])
    const [wl_name, set_wl_name] = useState('Select a Watchlist')

    const [newWLName, setNewWLName] = useState('')

    const [wlDeleted, setWLDeleted] = useState(false)

    const [wlUpdatedToggle, setWLUpdated] = useState(false)

    const cookies = new Cookies()

    useEffect(() => {
        fetchUserWatchlists()
    }, [wlUpdatedToggle])

    async function fetchUserWatchlists() {
        const signal = controller.signal
        try {
            const response = await fetch(getUserWL(cookies.get('user_id')), {
                signal,
            }).then((response) => {
                response.json().then((json) => {
                    setUserWatchlists(json[0])
                    if (newWLName !== '') {
                        set_wl_name(newWLName)
                        setNewWLName('')
                    }
                })
            })
            if (wlDeleted) {
                set_wl_name('Select a Watchlist')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const [watchlistSelected, setWatchlistSelected] = useState(0)

    const [showWatchlist, setShowWatchlist] = useState(false)

    function handleLoadingWatchlist(wl_id: number, wl_name: string) {
        setShowWatchlist(true)
        setWatchlistSelected(wl_id)
        set_wl_name(wl_name)
    }

    return (
        <Box>
            {/* <Searchbar /> */}
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
                        <ListItem sx={{fontSize: theme.typography.h4}} key={key}>
                            <ListItemButton onClick={() => handleLoadingWatchlist(Number(userWatchlists[key][0]), userWatchlists[key][2])}>
                                {userWatchlists[key][2]}
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Box sx={{margin: 2}}>
                <CreateWLButton user_id={cookies.get('user_id')} wlUpdatedFunction={setWLUpdated} wlUpdated={wlUpdatedToggle} />
                <AddTickersButton
                    user_id={cookies.get('user_id')}
                    wl_id={watchlistSelected}
                    wl_name={wl_name}
                    wlUpdatedFunction={setWLUpdated}
                    wlUpdated={wlUpdatedToggle}
                />
                <DeleteTickersButton
                    user_id={cookies.get('user_id')}
                    wl_id={watchlistSelected}
                    wl_name={wl_name}
                    wlUpdatedFunction={setWLUpdated}
                    wlUpdated={wlUpdatedToggle}
                />
                <RenameWLButton
                    user_id={cookies.get('user_id')}
                    wl_id={watchlistSelected}
                    wl_name={wl_name}
                    wlUpdatedFunction={setWLUpdated}
                    wlUpdated={wlUpdatedToggle}
                    newName={setNewWLName}
                />
                <DeleteWLButton
                    user_id={cookies.get('user_id')}
                    wl_id={watchlistSelected}
                    wl_name={wl_name}
                    wlUpdatedFunction={setWLUpdated}
                    wlUpdated={wlUpdatedToggle}
                    setWLDeleted={setWLDeleted}
                />
            </Box>
            <Watchlist
                wl_id={watchlistSelected}
                wl_name={wl_name}
                set_wl_name={set_wl_name}
                wlUpdated={wlUpdatedToggle}
                wlDeleted={wlDeleted}
                setWLDeleted={setWLDeleted}
                controller={controller}
            />
        </Box>
    )
}
export default Dashboard
