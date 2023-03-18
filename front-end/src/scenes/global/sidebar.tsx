import { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpModeOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarCharModeOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartModeOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineModeOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapModeOutlinedIcon from "@mui/icons-material/MapOutlined";

type itemProps = {
  title: string;
  to: string;
  icon: string;
  selected: string;
  setSelected: any;
};

const Item: React.FunctionComponent<itemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const ProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  return (
    <>
      <Box
        sx={{
          "&.pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "&.pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "&.pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "&.pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "&.pro-menu-item:active": {
            color: "#868dfb !important",
          },
        }}
      />
      <Button onClick={() => toggleSidebar}>toggle</Button>
      <Sidebar defaultCollapsed={isCollapsed}>
        <Menu>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            rootStyles={{ m: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.blue[500]}>
                  Sidebar
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
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  //src={"../../assets/DefaultAccountPic.JPG"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.blue[500]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Default User
                </Typography>
                <Typography variant="h5" color={colors.green[300]}>
                  No Status
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}></Box>
        </Menu>
      </Sidebar>
    </>
  );
};

export default ProSidebar;
