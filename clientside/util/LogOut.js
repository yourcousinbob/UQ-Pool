import SocketConnection from "../socket";
import { useDispatch, } from "react-redux";
import { clearAuthentication, selectAuthentication } from '../slices/userSlice';
import { connect } from "react-redux";

export default function LogOut(dispatch) {
    dispatch(clearAuthentication());
};
connect()(LogOut);