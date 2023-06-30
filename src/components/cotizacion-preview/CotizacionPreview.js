import React from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";

import Localizacion from "../../assets/img/Localizacion.png";
import Telefono from "../../assets/img/telefono.png";
import Internet from "../../assets/img/internet.png";
import Logo from "../../assets/img/logo-slogan.png";
import Tarjetas from "../../assets/img/tarjetas.png";
import Credito from "../../assets/img/credito.png";

export const CotizacionPreview = ({
  cotizacionData,
  form,
  handleSubmit,
  handleChange,
  handleDescargarPdf,
  actualizarEstatusBtnRef,
}) => {
  const isDesktop = useIsDesktop();

  return (
    <div className="cotizacion-container">
      <div className="d-flex justify-content-md-between justify-content-center mb-1 mb-md-5 actualizar-estatus">
        <form
          className="d-flex flex-column flex-md-row align-items-center align-items-md-end"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column">
            <label htmlFor="aprobacion">Aprobación</label>
            <select
              name="aprobacion"
              value={form.aprobacion}
              className="select-pedido form-select"
              id="aprobacion"
              onChange={handleChange}
              required
            >
              <option value="Aceptada">Aceptada</option>
              <option value="Rechazada">Rechazada</option>
            </select>
          </div>
          <div className="d-flex flex-column mx-0 mx-md-3 my-3 my-md-0">
            <label htmlFor="status">Estatus</label>
            <select
              name="estado"
              value={form.estado}
              className="select-pedido form-select"
              id="status"
              onChange={handleChange}
              required
            >
              <option value="Aprobada">Aprobada</option>
              <option value="Por aprobar">Por aprobar</option>
            </select>
          </div>
          <div>
            <input
              type="submit"
              value="Actualizar Estatus"
              className="btn btn-primary"
              ref={actualizarEstatusBtnRef}
              disabled
            />
          </div>
        </form>
        {isDesktop && (
          <div className="d-flex align-items-end">
            <button className="btn btn-success" onClick={handleDescargarPdf}>
              Descargar PDF
            </button>
          </div>
        )}
      </div>

      <div className="to-image">
        <div className="cotizacion-header-container  py-3">
          <div className="d-flex align-items-center">
            <img src={Logo} alt="logo" />
          </div>
          <div className="d-flex flex-column align-items-center text-center">
            <h5>Premezclados Concreco S.A de C.V</h5>
            <div className="text-dark">
              <div>
                <img src={Localizacion} alt="localizacion-pgn" />
                <strong>
                  Blvd. José Ma. Morelos #2735 <br /> Col. Las Maravillas
                </strong>
              </div>
              <div>
                <img src={Telefono} alt="telefono-png" />
                <strong> (477) 771 6550 y 90 </strong>
              </div>
              <div>
                <img src={Internet} alt="internet-png" />
                <strong> www.concreco.com </strong>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <table className="blue-table">
              <tbody>
                <tr>
                  <td>Folio Cotización:</td>
                  <td className="text-center">{cotizacionData.folio}</td>
                </tr>
                <tr>
                  <td>Fecha de elaboración:</td>
                  <td className="text-center">
                    {cotizacionData.created_at
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                </tr>
                <tr>
                  <td>Vigencia de cotización:</td>
                  <td className="text-center">
                    {cotizacionData.vigencia.split("-").reverse().join("-")}
                  </td>
                </tr>
                <tr>
                  <td>Estado de la Cotización:</td>
                  <td className="text-center">{cotizacionData.estado}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center m-3">
          <h1>COTIZACIÓN</h1>
        </div>

        <div className="mb-3">
          <div className="table-responsive">
            <table className="w-100 blue-table tabla-cliente text-dark">
              <thead>
                <tr className="text-center">
                  <th colSpan={4}>Datos Generales del Cliente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Razon social :</td>
                  <td colSpan={3}>{cotizacionData.cliente_nombre}</td>
                </tr>
                <tr>
                  <td>Atención :</td>
                  <td colSpan={3}>{cotizacionData.atencion}</td>
                </tr>
                <tr>
                  <td>Obra :</td>
                  <td colSpan={3}>{cotizacionData.obra_nombre}</td>
                </tr>
                {isDesktop ? (
                  <tr>
                    <td className="col-3">Asesor Comercial:</td>
                    <td className="col-3">
                      {cotizacionData.asesor_comercial.name}
                    </td>
                    <td className="col-3">Correo electrónico asesor:</td>
                    <td className="col-3">
                      {cotizacionData.asesor_comercial.email}
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td>Asesor Comercial:</td>
                      <td>
                        {cotizacionData.asesor_comercial.name}
                      </td>
                    </tr>
                    <tr>
                      <td>Correo electrónico asesor:</td>
                      <td>
                        {cotizacionData.asesor_comercial.email}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <table className="blue-table tabla-diseños tabla-detalles-diseños w-100">
          <thead>
            <tr>
              <th className="col-5">
                <div className="d-flex justify-content-center">
                  Diseño del Concreto
                </div>
              </th>
              <th className="col-2">
                <div className="d-flex justify-content-center">
                  Precio Unitario
                </div>
              </th>
              <th className="col-1">
                {isDesktop ? (
                  <div className="d-flex justify-content-center">Cantidad</div>
                ) : (
                  <div className="d-flex justify-content-center">Cant.</div>
                )}
              </th>
              <th className="col-2">
                <div className="d-flex justify-content-center">Unidad</div>
              </th>
              <th className="col-2">
                <div className="d-flex justify-content-center">
                  Precio Subtotal
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {cotizacionData.lineas_pedido.map((linea, i) => (
              <tr key={i}>
                <td>{linea.producto_detail.diseño}</td>
                <td>{formatNumToMxnCurrency(linea.precio_unitario)}</td>
                <td>{linea.cantidad}</td>
                <td>{linea.unidad}</td>
                <td>{formatNumToMxnCurrency(linea.precio_neto)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex flex-md-row flex-column justify-content-between my-3">
          <div className="d-flex flex-column col-12 col-md-6 text-dark">
            <div>
              <strong> PLAZOS Y CUENTAS BANCARIAS: </strong>
            </div>
            <div>
              El pago es de Contado (1 día antes del suministro), excepto los
              Clientes que tengan una Línea de Crédito disponible, de acuerdo a
              lo solicitado por el Comité de Crédito.
            </div>
            <div>
              Aceptamos todas las tarjetas.
              <img src={Tarjetas} alt="tarjetas" />
            </div>
            <div>
              Tramita con nosotros tu crédito
              <img src={Credito} alt="credito" />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center order-first order-md-last">
            <table className="col-12 blue-table text-center my-3">
              <tbody>
                {cotizacionData.tipo_venta === "F" && (
                  <>
                    <tr>
                      <td className="col-6">
                        <strong>Subtotal:</strong>
                      </td>
                      <td className="text-dark">
                        {formatNumToMxnCurrency(cotizacionData.subtotal)}
                      </td>
                    </tr>
                    <tr>
                      <td className="col-6">
                        <strong>IVA:</strong>
                      </td>
                      <td className="text-dark">
                        {formatNumToMxnCurrency(
                          Number(cotizacionData.subtotal) * 0.16
                        )}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <td className="col-6">
                    <strong>Total:</strong>
                  </td>
                  <td className="text-dark">
                    {formatNumToMxnCurrency(cotizacionData.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <table className="w-100 blue-table text-center tabla-servicios">
            <thead>
              <tr className="text-center">
                <th colSpan={4}>Servicios Adicionales</th>
              </tr>
            </thead>
            <tbody className="tabla-servicios-body">
              <tr>
                <td rowSpan={5} className="col-3">
                  Cargo por flete de vacío
                </td>
                <td rowSpan={5} className="col-3">
                  Pedidos menores a 3.5m3 tendrán un cargo adicional
                </td>
                <td className="col-3 servicio cursor-default servicio-1">
                  Olla c/3 m3
                </td>
                <td className="col-3 servicio cursor-default servicio-1">
                  $210.00
                </td>
              </tr>
              <tr>
                <td className="servicio cursor-default servicio-2">
                  Olla c/2.5 m3
                </td>
                <td className="servicio cursor-default servicio-2">$255.00</td>
              </tr>
              <tr>
                <td className="servicio cursor-default servicio-3">
                  Olla c/2 m3
                </td>
                <td className="servicio cursor-default servicio-3">$380.00</td>
              </tr>
              <tr>
                <td className="servicio cursor-default servicio-4">
                  Olla c/1.5 m3
                </td>
                <td className="servicio cursor-default servicio-4">$500.00</td>
              </tr>
              <tr>
                <td className="servicio cursor-default servicio-5">
                  Olla c/1 m3
                </td>
                <td className="servicio cursor-default servicio-5">$640.00</td>
              </tr>
              <tr>
                <td className="col-3">Servicio de bomba pluma</td>
                <td
                  colSpan={2}
                  className="col-6 servicio cursor-default servicio-6"
                >
                  El mínimo de bombeo para un servicio es de 10m3 ($220.00 más
                  IVA x10m3)
                </td>
                <td className="col-3 servicio cursor-default servicio-6">
                  $2,200.00
                </td>
              </tr>
              <tr>
                <td>Servicio de bomba estacionaria</td>
                <td colSpan={2} className="servicio cursor-default servicio-7">
                  El mínimo de bombeo para un servicio es de 15m3 ($264.00 más
                  IVA x15m3)
                </td>
                <td className="servicio cursor-default servicio-7">
                  $3,959.00
                </td>
              </tr>
              <tr>
                <td>Apertura de planta fuera de horario</td>
                <td colSpan={2} className="servicio cursor-default servicio-8">
                  El horario de atención es de lunes a viernes de 7:00-18:00hrs
                  y sábados de 7:00-14:00hrs. Fuera de este horario se tendrá
                  una tarifa por hora adicional.
                </td>
                <td className="servicio cursor-default servicio-8">
                  $1577.58
                </td>
              </tr>
              <tr>
                <td>Apertura de planta en día festivo de horario</td>
                <td colSpan={2} className="servicio cursor-default servicio-9">
                  La apertura de planta es por un volumen mínimo de 60m3
                </td>
                <td className="servicio cursor-default servicio-9">
                  $8448.27
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex flex-md-row flex-column justify-content-between my-3 text-dark">
          <div className="col-12 col-md-6 cotizacion-condiciones">
            <div>
              <strong> CONDICIONES: </strong>
            </div>
            <p>
              * Precio con Cobertura de 15 Kilómetros a la redonda, según
              ubicación de planta.
            </p>
            <p>
              <strong> * Precios exclusivos para esta obra.</strong>
            </p>
            <p>* Cotización sujeta a cambios sin previo aviso.</p>
            <p>
              * El cliente dispone de máximo 30 mins para la recepción del
              concreto a partir de la llegada del mismo a la obra, después de
              este lapso, la empresa no se resposabiliza de las características
              (revenimiento, resistencia, etc) del producto conforme a la norma
              NMX C-155.
            </p>
            <p>
              * Para realizar alguna cancelación y/o modificación se requiere
              que se realice mínimo 3:30 hrs antes del suministro
            </p>
            <p>
              * En caso de modificaciones al concreto en obra, adicionando
              materia prima, agua, fibras u otros elementos, la empresa no se
              hace responsable del comportamiento del concreto.
            </p>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center">
            <div>
              <div className="my-3">
                <strong>
                  En espera de vernos favorecidos con su preferencia me despido
                  quedando a sus órdenes para cualquier duda o aclaración.
                </strong>
              </div>
              <div className="mt-3">
                <div>
                  <strong>Asesor comercial: </strong>
                  {cotizacionData.is_ventas
                    ? cotizacionData.vendedor
                    : "Administración"}
                </div>
                <div>
                  <strong>Contacto: </strong>
                  {cotizacionData.asesor_comercial.email}
                </div>
                <div>
                  <strong>Razón social: </strong>
                  {cotizacionData.cliente_nombre}
                </div>
                <div>
                  <strong>Atención: </strong>
                  {cotizacionData.atencion}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
