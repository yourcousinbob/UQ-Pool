import SocketConnection from "../socket";
import { useDispatch, } from "react-redux";
import { clearAuthentication, selectAuthentication } from '../slices/userSlice';
import store from '../store'

export default function logout() {
    store.dispatch(clearAuthentication());
};
