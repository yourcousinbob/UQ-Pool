import SocketConnection from '../socket';
import { clearAuthentication } from '../slices/userSlice';

export default function LogOut(dispatch, sid) {
    connection = SocketConnection.getConnection();
        let data = ({
            sid: sid,
        });
    console.log(data)
    connection.sendPayload('logout', data);
    connection.recievePayload('logout');
    dispatch(clearAuthentication());
};
