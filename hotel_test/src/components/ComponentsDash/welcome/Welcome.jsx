import { useSelector } from "react-redux";
import styles from "./Welcome.module.css"

export const Welcome = () => {
  const {activeUser} = useSelector((state) => state)
  console.log(activeUser)
  return (
    <div className={styles.welcome}>
      <h1> {`¡Bienvenid@, ${activeUser.name} ${activeUser.surname}!`} </h1>
    </div>
  );
};
