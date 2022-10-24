import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { Link as RouterLink } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function Header({ token, isWorker, setToken, setUserInfo, setIsWorker, removeCookie }) {
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("login")
    setToken("");
    setUserInfo({});
    setIsWorker(false);

    window.alert("정상적으로 로그아웃 되었습니다.")
    navigate('/');
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link
            style={{ margin: "0 50px 0 0", fontSize: "40px" }}
            variant="h6"
            underline="none"
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ fontSize: 24 }}
          >
            {"Gigtopia"}
          </Link>
          {token ?
            <>
              <Box sx={{ flex: 1 }} />
              <Link
                style={{ color: "pink" }}
                variant="h6"
                underline="none"
                component={RouterLink}
                to="/findworker"
                sx={rightLink}
              >
                {"Find Worker"}
              </Link>
              <Link
                style={{ color: "pink" }}
                variant="h6"
                underline="none"
                component={RouterLink}
                to="/findorder"
                sx={rightLink}
              >
                {"Find Order"}
              </Link>

              {isWorker ?
                <>
                  <Link
                    style={{ color: "pink" }}
                    variant="h6"
                    underline="none"
                    component={RouterLink}
                    to="/governance"
                    sx={rightLink}
                  >
                    {"Governance"}
                  </Link>
                  <Link
                    style={{ color: "pink" }}
                    variant="h6"
                    underline="none"
                    component={RouterLink}
                    to="/workerInfo"
                    sx={rightLink}
                  >
                    {"My Info"}
                  </Link>
                </>
                :
                <Link
                  style={{ color: "pink" }}
                  variant="h6"
                  underline="none"
                  component={RouterLink}
                  to="/clientInfo"
                  sx={rightLink}
                >
                  {"My Info"}
                </Link>
              }
            </>
            : null}
          {!token ?
            <>
              <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  component={RouterLink}
                  to="/signin"
                  sx={rightLink}
                >
                  {"Sign In"}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  component={RouterLink}
                  to="/signup"
                  sx={{ ...rightLink, color: "secondary.main" }}
                >
                  {"Sign Up"}
                </Link>
              </Box>
            </>
            :
            <>
              <Box sx={{ flex: 0.3, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" endIcon={<SendIcon />} onClick={logout}>
                  Log Out
                </Button>
              </Box>
            </>}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Header;