import React from "react";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import  Styles  from "../HomeUser/HomeUser.module.css"

export const HomeUser = () => {
  const [show, setShow] = useState(true);

  return (
    <div className={"container"}>
      <div className={"p-2"}>
        <Carousel className={"w-20 h-10"}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://c0.wallpaperflare.com/preview/186/124/897/red-and-white-air-jordan-1-shoe-on-concrete-floor.jpg" 
              alt="First slide"
              height="600"
            />
            <Carousel.Caption>
              <p>Feature</p>
              <button className={Styles.button}>IR A</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://insidemdp.com.ar/wp-content/uploads/2022/07/gimnasios-en-mar-del-plata.jpg" 
              alt="Second slide"
              height="600"
            />
            <Carousel.Caption>
              <p>Feature</p>
              <button className={Styles.button}>IR A</button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className={Styles.productsButtonContainer}>
        <button onClick={() => setShow(true)}>Productos nuevos!</button>
        <button onClick={() => setShow(false)}>Más vendido 🔥</button>
      </div>
      <div>
        {show && (
          <div className="container">
            <h1 >Productos nuevos!</h1>
            <div className="row">
              <div className="col-md-4 mb-2">
                <img
                  src="https://acdn.mitiendanube.com/stores/002/792/557/products/111-c7ccbb618ba67781e516748430608238-640-0.png"
                  className="img-fluid rounded w-100 h-100"
                  alt="Producto 1"
                />
              </div>
              <div className="col-md-4 mb-2">
                <img
                  src="https://i.blogs.es/7ed9de/100-whey-protein/650_1200.jpg"
                  className="rounded w-100 h-100"
                  alt="Producto 2"
                />
              </div>
              <div className="col-md-4 mb-1">
                <img
                  src="https://acdn.mitiendanube.com/stores/002/792/557/products/111-c7ccbb618ba67781e516748430608238-640-0.png"
                  className="img-fluid rounded w-100 h-100"
                  alt="Producto 3"
                />
              </div>
              <div className="col-md-4 mb-2">
                <img
                  src="https://i.blogs.es/7ed9de/100-whey-protein/650_1200.jpg"
                  className="rounded w-100 h-100"
                  alt="Producto 4"
                />
              </div>
            </div>
          </div>
        )}
        {!show && (
          <div className="container">
          <h1>Más vendido 🔥</h1>
          <div className="row">
            <div className="col-md-4 mb-2">
              <img
                src="https://acdn.mitiendanube.com/stores/002/792/557/products/111-c7ccbb618ba67781e516748430608238-640-0.png"
                className="img-fluid rounded w-100 h-100"
                alt="Producto 1"
              />
            </div>
            <div className="col-md-4 mb-2">
              <img
                src="https://i.blogs.es/7ed9de/100-whey-protein/650_1200.jpg"
                className="rounded w-100 h-100"
                alt="Producto 2"
              />
            </div>
            
          </div>
        </div>
          
        )}
      </div>
    </div>
  );
};
