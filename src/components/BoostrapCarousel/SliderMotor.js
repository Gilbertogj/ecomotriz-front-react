import Carousel from 'react-bootstrap/Carousel';

import "./slider.styles.scss";

function SliderMotor({
    
  frontal,
  derecha,
  izquierda,
  serie,
  chasis,
  
    
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
        <a href={serie} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={serie}
          alt="Fotografía no. serie motor"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía no. serie motor</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={chasis} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={chasis}
          alt="Fotografía no. serie chasis"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía no. serie chasis</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      {/*  */}

      
      
      
    </Carousel>
  );
  
}

export default SliderMotor;