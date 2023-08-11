import Carousel from 'react-bootstrap/Carousel';

import "./slider.styles.scss";

function SliderOperador({
    
  placasFrontal,
  placasTrasera,
  tarjetaCirculacion,
  operador,
  licenciaFrontal,
  licenciaTrasera,
 
    
}) {
  return (
    <Carousel >
      <Carousel.Item>
        <a href={placasFrontal} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={placasFrontal}
          alt="Fotografía placas frontal"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía placas frontal</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={placasTrasera} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={placasTrasera}
          alt="Fotografía placas trasera"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía placas trasera</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={tarjetaCirculacion} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={tarjetaCirculacion}
          alt="Fotografía tarejta de circulación"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía tarejta de circulación</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={operador} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={operador}
          alt="Fotografía del operador"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía del operador</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={licenciaFrontal} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={licenciaFrontal}
          alt="Fotografía licencia frontal"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía licencia frontal</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      {/*  */}

      <Carousel.Item>
        <a href={licenciaTrasera} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={licenciaTrasera}
         
          
          alt="Fotografía licencia posterior"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía licencia posterior</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      
      
    </Carousel>
  );
  
}

export default SliderOperador;