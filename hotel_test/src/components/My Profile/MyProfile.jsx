import { useSelector } from "react-redux";
import { MyActivities } from "./Content/My Activities/MyActivities.jsx";
import { MyData } from './Content/MyData/MyData.jsx';
import { Options } from './Content/Options/Options.jsx';
import { PasswordRecovery } from "./Content/Options/PasswordRecovery/PasswordRecovery.jsx";
import style from './MyProfile.module.css';
import { SideBar } from "./Side Bar/SideBar.jsx";

export const MyProfile = () =>
{
    const { option } = useSelector( state => state );

    return(
        <div className={style.container}>
            <div className={style.sideBar}>
                <SideBar />
            </div>
            <div className={style.content}>
                { option=='My data' && <MyData />}
                { option=='Options' && <Options />}
                { option=='My activities' && <MyActivities />}
                { option=='Recovery' && <PasswordRecovery />}
            </div>
        </div>
    )
}