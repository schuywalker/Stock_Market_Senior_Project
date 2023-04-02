import {ReactNode, useState} from 'react'
import {Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar'
import {Box, Button, IconButton, Typography, useTheme} from '@mui/material'
import {Link} from 'react-router-dom'
import {tokens} from '../../theme'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VisibilityIcon from '@mui/icons-material/Visibility'
import BuildIcon from '@mui/icons-material/Build'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ClearIcon from '@mui/icons-material/Clear'
import CreateIcon from '@mui/icons-material/Create'
import IsoIcon from '@mui/icons-material/Iso'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LogoutIcon from '@mui/icons-material/Logout'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import {isComputedPropertyName} from 'typescript'
import SignUpForm from '../../components/SignUpForm'
import Cookies from 'universal-cookie';

type itemProps = {
    title: string
    to: string
    icon: ReactNode
    selected: string
    setSelected: any
}

const Item: React.FunctionComponent<itemProps> = ({
    title,
    to,
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
            component={<Link to={to} />}
        >
            <Typography sx={{fontsize: 25}}>{title}</Typography>
        </MenuItem>
    )
}

const cookies = new Cookies();

const ProSidebar = (props: any) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState('Dashboard')
    const {collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl} =
        useProSidebar()
    const [displayName,setDisplayName] = useState("");

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
                                        Stock Website
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
                                    <AccountBoxIcon sx={{fontSize: 60}} />
                                    <Typography
                                        variant="h3"
                                        color={colors.blue[500]}
                                        fontWeight="bold"
                                        sx={{m: '10px 0 0 0'}}
                                    >
                                        {(props.loggedIn?cookies.get('user'):"")}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color={colors.green[300]}
                                    >
                                        {props.loggedIn?"No Status":""}
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
                                {isCollapsed ? 'Lists' : 'Watchlists'}
                            </Typography>
                            <Item
                                title="View Watchlists"
                                to="/watchlist"
                                icon={<VisibilityIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Create Watchlist"
                                to="/watchlist"
                                icon={<CreateIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Edit Watchlist"
                                to="/watchlist"
                                icon={<IsoIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Delete Watchlist"
                                to="/watchlist"
                                icon={<ClearIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Typography
                                variant="h6"
                                color={colors.grey[400]}
                                sx={{fontsize: 50, m: 1.5}}
                            >
                                {isCollapsed ? 'Prefs' : 'Preferences'}
                            </Typography>
                            <Item
                                title="Preferences"
                                to="/analyst-calls"
                                icon={<ColorLensIcon sx={{fontSize: 20}} />}
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
                                title="View Account"
                                to="/analyst-calls"
                                icon={<PersonIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Manage Account"
                                to="/analyst-calls"
                                icon={
                                    <ManageAccountsIcon sx={{fontSize: 20}} />
                                }
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Logout"
                                to="/analyst-calls"
                                icon={<LogoutIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Delete Account"
                                to="/analyst-calls"
                                icon={<DeleteIcon sx={{fontSize: 20}} />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Typography
                                variant="h6"
                                color={colors.grey[400]}
                                sx={{fontsize: 50, m: 1.5}}
                            >
                                {isCollapsed ? 'Opts' : 'Options'}
                            </Typography>
                            <Item
                                title="Tools"
                                to="/analyst-calls"
                                icon={<BuildIcon sx={{fontSize: 20}} />}
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
