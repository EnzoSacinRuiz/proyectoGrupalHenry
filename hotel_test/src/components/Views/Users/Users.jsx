import { useDispatch, useSelector } from "react-redux";
import style from './Users.module.css';

export const Users= () =>
{
    const { allUsers } = useSelector( state => state );
    const dispatch = useDispatch();

    return(
        <div className={style.container}>
                <div className={style.user}>
                    <h1> USERS </h1>
                    {allUsers.length>0 &&
                        allUsers.map(( user )=>
                        <div>
                            <h1> { user.name } {user.surname} </h1>
                            <p> Username: {user.username} </p>
                            <p> Password: {user.password} </p>
                        </div>)}
                </div>
        </div>
    )
}