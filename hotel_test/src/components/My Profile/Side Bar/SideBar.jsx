import { useDispatch } from "react-redux";
import { changeOption } from "../../../redux/actions/actions";

export const SideBar = () =>
{
    const dispatch = useDispatch()

    const switchOption = (text) =>
    {
        dispatch( changeOption(text) );
    }

    return(
        <div>
            <button onClick={() => switchOption('My data')}>
                My info
            </button>
            <button onClick={() => switchOption('Options')}>
                Options
            </button>
            <button onClick={() => switchOption('My activities')}>
                My activities
            </button>
        </div>
    )
}