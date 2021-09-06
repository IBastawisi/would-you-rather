import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slices';
import { RootState } from '../store';

function Announcer() {
  const announcement = useSelector((state: RootState) => state.app.announcement);
  const [timeoutId, setTimeoutId] = useState<number>()
  const dispatch = useDispatch()

  useEffect(() => {
    if (announcement) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      setTimeoutId(window.setTimeout(() => dispatch(actions.app.clearAnnouncement()), 3000))
    }
    return () => {
      clearTimeout(timeoutId)
      setTimeoutId(undefined)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcement])

  if (!announcement) {
    return null
  }
  return <div>{announcement}</div>
}

export default Announcer;
