import {Typography} from '@mui/material'
import {Box} from '@mui/system'
import Watchlist from '../watchlist/Watchlist'
import {useEffect, useState} from 'react'

const Dashboard = () => {
    const [userWatchlists, setUserWatchlists] = useState([
        'value',
        'growth',
        'option plays',
    ])

    useEffect(() => {
        fetchUserWatchlists()
    }, [])

    //request.args.get('user_ID'), request.args.get('includeDeleted')
    async function fetchUserWatchlists() {
        try {
            // const response = await fetch(`http://127.0.0.1:8080/populateWatchlist?WL=${props.name}?userID=${userID}`, {}).then(
            const response = await fetch(
                `http://127.0.0.1:8080/getUserWatchlists?user_ID=27`,
                {}
            ).then((response) => {
                response.json().then((json) => {
                    setUserWatchlists(json)
                    console.log(json)
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box>
            {userWatchlists}
            <Watchlist />
        </Box>
    )
}
export default Dashboard
