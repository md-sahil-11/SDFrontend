import * as React from 'react';
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import UploadIcon from '@mui/icons-material/Upload';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { usePdfAuthContext } from 'src/contexts/pdf-auth-context';


export default function BottomNav() {
  
  const { user, router, pathname } = usePdfAuthContext()
  const [value, setValue] = React.useState(pathname);

  React.useEffect(() => {
    if (!!value) {
      router.push(value)
    }
  }, [value])

  React.useEffect(() => {
    setValue(pathname)
  }, [pathname])

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction value={"/pdf-help"} label="All Pdfs" icon={<PictureAsPdfIcon />} />
          <BottomNavigationAction value={"/pdf-help/account"} label="Profile" icon={<Avatar sx={{scale: "0.65"}} alt={user?.name} src={user?.image} />} />
        </BottomNavigation>
      </Paper>
  );
}