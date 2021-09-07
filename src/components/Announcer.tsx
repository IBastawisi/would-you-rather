import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slices';
import { RootState } from '../store';
import Snackbar from '@mui/material/Snackbar';

function Announcer() {
  const announcement = useSelector((state: RootState) => state.app.announcement);
  const dispatch = useDispatch()

  const handleClose = () => dispatch(actions.app.clearAnnouncement());

  return <Snackbar
    open={announcement !== null}
    autoHideDuration={3000}
    onClose={handleClose}
    message={announcement}
  />
}

export default Announcer;
