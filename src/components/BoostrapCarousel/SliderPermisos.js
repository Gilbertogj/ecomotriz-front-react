import Carousel from 'react-bootstrap/Carousel';

import "./slider.styles.scss";

function SliderPermisos({
    
  cartaResponsivaEntrega,
  cartaResponsivaOperador,
  permisoCarga,
  permisoEmpresa,
  verificacionEstatal,
  verificacionFederal,
 
    
}) {
  return (
    <Carousel >
      <Carousel.Item>
        <a href={cartaResponsivaEntrega} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={cartaResponsivaEntrega}
          alt="Fotografía carta responsiva entrega"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía carta responsiva entrega</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={cartaResponsivaOperador} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={cartaResponsivaOperador}
          alt="Fotografía carta responsiva operador"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía carta responsiva operador</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={permisoCarga} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={permisoCarga}
          alt="Fotografía permiso de carga"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía permiso de carga</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={permisoEmpresa} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={permisoEmpresa}
          alt="Fotografía permiso empresa"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía permiso empresa</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <a href={verificacionEstatal} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={verificacionEstatal}
          alt="Fotografía verificación estatal"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía verificación estatal</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      {/*  */}

      <Carousel.Item>
        <a href={verificacionFederal} target="_blank"><img class="slider-image"
          className="d-block w-100 slider-image"
        //   src="holder.js/800x400?text=First slide&bg=373940"
          src={verificacionFederal}
         
          
          alt="Fotografía verificación federal"
        />
        </a>
        <Carousel.Caption>
          <h3>Fotografía verificación federal</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      
      
    </Carousel>
  );
  
}

export default SliderPermisos;