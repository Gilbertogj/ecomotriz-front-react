const BASE_URL = "/inblock";

export const inblockLinks = [
  {
    text: "Logística",
    link: `${BASE_URL}/logistica`,
    id: 1,
  },
  {
    text: "Facturación",
    link: `${BASE_URL}/facturacion`,
    id: 2,
  },
  {
    text: "Usuarios",
    link: `${BASE_URL}/usuarios`,
    id: 3,
  },
];

export const inblockLogisticaLinks = [
  {
    text: "Lista de Clientes",
    link: `${BASE_URL}/logistica/clientes`,
    id: 1,
  },
  {
    text: "Lista de Pedidos",
    link: `${BASE_URL}/logistica/pedidos`,
    id: 2,
  },
  {
    text: "Realizar Pedido",
    link: `${BASE_URL}/logistica/clientes-pedido`,
    id: 3,
  },
  {
    text: "Registros de Viaje",
    link: `${BASE_URL}/logistica/viajes`,
    id: 4,
  },
  {
    text: "Realizar Viaje",
    link: `${BASE_URL}/logistica/crear-viajes`,
    id: 5,
  },
  {
    text: "Conductores",
    link: `${BASE_URL}/logistica/conductores`,
    id: 6,
  },
];

export const inblockFacturacionLinks = [
  {
    text: "Lista de Condiciones de Venta",
    link: `${BASE_URL}/facturacion/ventas`,
    id: 1,
  },
  
];

export const inblockUsuariosLinks = [
  {
    text: "Crear usuario",
    link: `${BASE_URL}/usuarios/agregar-usuario`,
    id: 1,
  },
  {
    text: "Lista de usuarios",
    link: `${BASE_URL}/usuarios/lista-usuarios`,
    id: 2,
  },
];