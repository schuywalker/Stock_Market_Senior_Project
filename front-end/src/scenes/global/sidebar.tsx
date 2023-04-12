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

type itemProps = {
    title: string
    link: React.ReactElement
    icon: ReactNode
    selected: string
    setSelected: any
}

const Item: React.FunctionComponent<itemProps> = ({
    title,
    link,
    icon,
    selected,
    setSelected,
}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <MenuItem
            active={selected === title}
            style={{color: colors.grey[600]}}
            onClick={() => setSelected(title)}
            icon={icon}
            component={link}
        >
            <Typography sx={{fontsize: 25}}>{title}</Typography>
        </MenuItem>
    )
}

function truncateString(str: string) {
    if (str.length > 10) {
        return str.slice(0, 7) + '...'
    }

    var regexp = new RegExp('(.*W){4}')
    if(str.length > 8 && regexp.test(str)){
        return(str.slice(0,6) + "...")
    }

    return(str)
}

const cookies = new Cookies()

const ProSidebar = (props: any) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState('Dashboard')

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
                    display: props.loggedIn ? '' : 'none',
                }}
            >
                <Sidebar defaultCollapsed={isCollapsed}>
                    <Menu>
                        <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={
                                isCollapsed ? <MenuOutlinedIcon /> : undefined
                            }
                            rootStyles={{
                                m: '10px 0 20px 0',
                                color: colors.grey[100],
                            }}
                        >
                            {!isCollapsed && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml="15px"
                                >
                                    <Typography
                                        variant="h5"
                                        color={colors.blue[500]}
                                    >
                                        NVST
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            setIsCollapsed(!isCollapsed)
                                        }
                                    >
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
                                        <Typography
                                            variant="h1"
                                            color={colors.grey[100]}
                                            marginTop="10px"
                                        >
                                            {props.loggedIn
                                                ? truncateString(
                                                      cookies.get('user')
                                                  )
                                                      .slice(0, 1)
                                                      .toUpperCase()
                                                : ''}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="h3"
                                        color={colors.blue[500]}
                                        fontWeight="bold"
                                        sx={{m: '10px 0 0 0'}}
                                    >
                                        {props.loggedIn
                                            ? truncateString(
                                                  cookies.get('user')
                                              )
                                            : ''}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* Menu Items */}
                        <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                            <Typography
                                variant="h6"
                                color={colors.grey[400]}
                                sx={{fontsize: 50, m: 1.5}}
                            >
                                Tools
                            </Typography>
                            <Item
                                title="Analyst Calls"
                                link={<Link to="/analystCalls" />}
                                icon={<PhoneIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Typography
                                variant="h6"
                                color={colors.grey[400]}
                                sx={{fontsize: 50, m: 1.5}}
                            >
                                {isCollapsed ? 'Lists' : 'Watchlists'}
                            </Typography>
                            <Item
                                title="View Watchlists"
                                link={<Link to="/watchlist" />}
                                icon={<VisibilityIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            {/* <Select>Watchlists</Select> */}
                            <Item
                                title="Create Watchlist"
                                link={<Link to="/watchlist" />}
                                icon={<CreateIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Edit Watchlist"
                                link={<Link to="/watchlist" />}
                                icon={<IsoIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Delete Watchlist"
                                link={<Link to="/watchlist" />}
                                icon={<ClearIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Typography
                                variant="h6"
                                color={colors.grey[400]}
                                sx={{fontsize: 50, m: 1.5}}
                            >
                                {isCollapsed ? 'Acct' : 'Account'}
                            </Typography>
                            <Item
                                title="Manage Account"
                                link={<Link to="/account" />}
                                icon={
                                    <ManageAccountsIcon sx={{fontSize: 20}} />
                                }
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Delete Account"
                                link={
                                    <Link
                                        to=""
                                        onClick={async () => {
                                            await axios
                                                .post(
                                                    'http://127.0.0.1:8080/deleteUser?user=' +
                                                        cookies.get('user')
                                                )
                                                .then(() => {
                                                    cookies.remove('user')
                                                    cookies.remove('password')
                                                    window.location.reload()
                                                })
                                        }}
                                    ></Link>
                                }
                                icon={<DeleteIcon sx={{fontSize: 20}} />}
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
