import {ReactNode, useState} from 'react'
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar'
import {Box, IconButton, Typography, useTheme} from '@mui/material'
import {Link} from 'react-router-dom'
import {tokens} from '../../theme'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ClearIcon from '@mui/icons-material/Clear'
import CreateIcon from '@mui/icons-material/Create'
import IsoIcon from '@mui/icons-material/Iso'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import PhoneIcon from '@mui/icons-material/Phone'
import Cookies from 'universal-cookie'
import axios from 'axios'
import {ShowChart} from '@mui/icons-material'
import React from 'react'
import ConfirmationModal from '../../components/ConfirmationModal'
import AssetScreener from '../asset_screener/AssetScreener'

type itemProps = {
    title: string
    link: React.ReactElement
    icon: ReactNode
    selected: string
    setSelected: any
}

const Item: React.FunctionComponent<itemProps> = ({title, link, icon, selected, setSelected}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <MenuItem active={selected === title} style={{color: colors.grey[600]}} onClick={() => setSelected(title)} icon={icon} component={link}>
            <Typography sx={{fontsize: 25}}>{title}</Typography>
        </MenuItem>
    )
}

function truncateString(str: string) {
    if (str.length > 10) {
        return str.slice(0, 7) + '...'
    }

    var regexp = new RegExp('(.*W){4}')
    if (str.length > 8 && regexp.test(str)) {
        return str.slice(0, 6) + '...'
    }

    return str
}

const ProSidebar = (props: any) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState('Dashboard')
    const [loggedIn, setLoggedIn] = useState(props.loggedIn)
    const [showModal, setShowModal] = useState(false)
    const [userURL, setUserURL] = useState('/analyst-calls')

    React.useEffect(() => {
        if (props.loggedIn) {
            setLoggedIn(true)
        } else setLoggedIn(false)
    }, [props.loggedIn])

    if (!loggedIn) {
        return <></>
    } else
        return (
            <>
                <Box
                    sx={{
                        '&.pro-sidebar-inner': {
                            background: `${colors.primary[400]} !important`,
                        },
                        '&.pro-icon-wrapper': {
                            backgroundColor: 'transparent !important',
                        },
                        '&.pro-inner-item': {
                            padding: '5px 35px 5px 20px !important',
                        },
                        '&.pro-inner-item:hover': {
                            color: '#868dfb !important',
                        },
                        '&.pro-menu-item:active': {
                            color: '#868dfb !important',
                        },
                    }}
                >
                    <Sidebar defaultCollapsed={isCollapsed}>
                        <Menu>
                            <MenuItem
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                                rootStyles={{
                                    m: '10px 0 20px 0',
                                    color: colors.grey[100],
                                }}
                            >
                                {!isCollapsed && (
                                    <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                        <Typography variant="h5" color={colors.blue[500]}>
                                            NVST
                                        </Typography>
                                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                            <MenuOutlinedIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            </MenuItem>

                            {/* User */}
                            {!isCollapsed && (
                                <Box mb="25px">
                                    <Box textAlign="center">
                                        <Box
                                            display="inline-block"
                                            borderRadius="50%"
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                backgroundColor: 'primary.main',
                                            }}
                                        >
                                            <Typography variant="h1" color={colors.grey[100]} marginTop="10px">
                                                {props.loggedIn ? truncateString(props.username).slice(0, 1).toUpperCase() : ''}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h3" color={colors.blue[500]} fontWeight="bold" sx={{m: '10px 0 0 0'}}>
                                            {props.loggedIn ? truncateString(props.username) : ''}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}

                            {/* Menu Items */}
                            <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                                <Item
                                    title="Dashboard"
                                    link={<Link to="/Dashboard" />}
                                    icon={<ShowChart sx={{fontSize: 20}} />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Typography variant="h6" color={colors.grey[400]} sx={{fontsize: 50, m: 1.5}}>
                                    Tools
                                </Typography>
                                <Item
                                    title="Analyst Calls"
                                    link={<Link to="/analyst-calls" onClick={() => setUserURL('/analyst-calls')} />}
                                    icon={<PhoneIcon sx={{fontSize: 20}} />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Insider Trades"
                                    link={<Link to="/insider-trades"/>}
                                    title="Asset Screener"
                                    link={<Link to="/asset-screener" onClick={() => setUserURL('/asset-screener')} />}
                                    icon={<PhoneIcon sx={{fontSize: 20}} />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Typography variant="h6" color={colors.grey[400]} sx={{fontsize: 50, m: 1.5}}>
                                    {isCollapsed ? 'Acct' : 'Account'}
                                </Typography>
                                <Item
                                    title="Manage Account"
                                    link={<Link to="/account" onClick={() => setUserURL('/account')} />}
                                    icon={<ManageAccountsIcon sx={{fontSize: 20}} />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </Box>
                        </Menu>
                    </Sidebar>
                </Box>
            </>
        )
}

export default ProSidebar
