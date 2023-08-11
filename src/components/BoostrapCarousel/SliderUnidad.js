import Carousel from 'react-bootstrap/Carousel';

import "./slider.styles.scss";

function SliderUnidad({
    
  frontal,
  derecha,
  izquierda,
  trasera,
  cabina,
  placa,
    
}) {
  return (
    <Carousel >
      <Carousel.Item>
        <a href={frontal} target="_blank"><img class="slider-image" 
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={frontal}
          alt="Fotografía frontal"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía frontal</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={derecha} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={derecha}
          alt="Fotografía derecha"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía derecha</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={izquierda} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={izquierda}
          alt="Fotografía izquierda"
        />
        
        </a>
        <Carousel.Caption>
          <h3>Fotografía izquierda</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={trasera} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={trasera}
          alt="Fotografía trasera"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía trasera</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={cabina} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={cabina}
          alt="Fotografía cabina"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía cabina</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      {/*  */}

      <Carousel.Item>
        <a href={placa} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={placa}
         
          
          alt="Fotografía placa de identificación"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía placa de identificación</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      
      
    </Carousel>
  );
  
}

export default SliderUnidad;