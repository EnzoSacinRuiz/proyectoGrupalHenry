import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./Reviews.module.css";

export const Reviews = () =>
{
  const isLocal = useSelector( state => state.isLocal );
    const [show, setShow] = useState(true);
    const { id } = useParams();
    const [supplements, setSupplements] = useState({});

    useEffect(() => {
      if(isLocal==true)
      {
        axios(`http://localhost:3001/supps/${id}`).then(({ data }) => {
          if (data.name) {
            setSupplements(data);
          } else {
            window.alert("0");
          }
        });
      }
      else
      {
        axios(`https://getfitserver.up.railway.app/supps/${id}`).then(({ data }) => {
          if (data.name) {
            setSupplements(data);
          } else {
            window.alert("0");
          }
        });
      }
      }, [id]);

    return(
        <div className={style.divReviews}>

        <div>
            <button className={style.reviewsBt} onClick={() => setShow(true)}>Descripcion</button>
            <button className={style.reviewsBt} onClick={() => setShow(false)}>Reseñas</button>
        </div>
        <div>
            {show && (
                <div>
                     <h1>Descripcion</h1>
                     <h3>{supplements.description}</h3>
                </div>
            )}
            {!show && (
                <div>
                    <h1>Reseñas</h1>
                    <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex ut perferendis officia ratione ab provident doloribus asperiores ducimus aspernatur, maiores dolore praesentium corrupti. A reiciendis maxime voluptate eligendi rerum excepturi.</h3>
                </div>
            )}
        </div>


        </div>
    )
}