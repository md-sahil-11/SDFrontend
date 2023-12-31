import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
	CollectionsBookmark,
	Edit,
	Feedback,
	Help,
	PermMedia,
	UploadFile,
	Work,
} from "@mui/icons-material";

function TopDrawer() {
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const iemsList = (anchor) => (
		<Box
			sx={{
				width: anchor === "top" ||
					anchor === "bottom" ? "auto" : 250,
				backgroundColor: "#09212E",
				height: '100%'
			}}
			role="drawer"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<Typography
				sx={{ textAlign: "center", pt: 4,
					color: "green", fontSize: 20 }}
			>
				GeeksforGeeks
			</Typography>
			<List>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						{<Help />}
					</ListItemIcon>
					<ListItemText primary={"How to write"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						{<CollectionsBookmark />}
					</ListItemIcon>
					<ListItemText primary={"Posts"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						{<UploadFile />}
					</ListItemIcon>
					<ListItemText primary={"Pick Article"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						{<Edit />}
					</ListItemIcon>
					<ListItemText primary={"Improve"} />
				</ListItemButton>
			</List>
			<Divider />
			<List>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						{<Edit />}
					</ListItemIcon>
					<ListItemText primary={"Suggest"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						{<Work />}
					</ListItemIcon>
					<ListItemText primary={"Work with us"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						{<PermMedia />}
					</ListItemIcon>
					<ListItemText primary={"Media"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						{<Feedback />}
					</ListItemIcon>
					<ListItemText primary={"Contact us"} />
				</ListItemButton>
			</List>
			<Typography
				sx={{
					backgroundColor: "blue",
					color: "white",
					borderRadius: 10,
					textAlign: "center",
					padding: 1,
					margin: 2,
				}}
			>
				Sign In
			</Typography>
		</Box>
	);

	return (
		<div>
			<div style={{ textAlign: "center", color: "green" }}>
				<h1>GeeksforGeeks</h1>
				<h2>React MUI Drawer Navigation</h2>
			</div>
			<center>
				{["left", "right", "top", "bottom"].map((anchor) => (
					<React.Fragment key={anchor}>
						<Button onClick={toggleDrawer(anchor, true)}>
							{anchor}
						</Button>
						<Drawer
							anchor={anchor}
							open={state[anchor]}
							onClose={toggleDrawer(anchor, false)}
						>
							{iemsList(anchor)}
						</Drawer>
					</React.Fragment>
				))}
			</center>
		</div>
	);
}

export default TopDrawer;
