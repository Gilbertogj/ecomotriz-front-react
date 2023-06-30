const BASE_URL = "";

export const userTypeLinks = {
  Administracion: [
    {
      text: "Unidades",
      link: `${BASE_URL}/unidades`,
      id: 1,
    },
   
  ],
  Ventas: [
    {
      text: "Logística",
      link: `${BASE_URL}/logistica`,
      id: 1,
    },
    {
      text: "Comercialización",
      link: `${BASE_URL}/comercializacion`,
      id: 2,
    },
  ],
  Produccion: [
    {
      text: "Logística",
      link: `${BASE_URL}/logistica`,
      id: 1,
    },
    {
      text: "Comercialización",
      link: `${BASE_URL}/comercializacion`,
      id: 2,
    },
    {
      text: "Usuarios",
      link: `${BASE_URL}/users`,
      id: 3,
    },
    {
      text: "Producción",
      link: `${BASE_URL}/produccion`,
      id: 4,
    },
  ],
  Dosificador: [
    {
      text: "Producción",
      link: `${BASE_URL}/produccion`,
      id: 1,
    },
  ],
  Ollero: [
    {
      text: "Producción",
      link: `${BASE_URL}/produccion`,
      id: 1,
    },
  ],
  Operador: [
    {
      text: "Producción",
      link: `${BASE_URL}/produccion`,
      id: 1,
    },
  ],
};

export const produccionMenuUserTypeLinks = {
  Dosificador: [
    {
      text: "Dosificador",
      link: `${BASE_URL}/produccion/pedidos`,
      id: 1,
    },
  ],

  Ollero: [
    {
      text: "Ollero",
      link: `${BASE_URL}/produccion/registros`,
      id: 1,
    },
  ],

  Operador: [
    {
      text: "Bombero",
      link: `${BASE_URL}/produccion/operador`,
      id: 1,
    },
  ],

  Produccion: [
    {
      text: "Jefe de Producción",
      link: `${BASE_URL}/produccion/p-bombeados`,
      id: 1,
    },
  ],

  Administracion: [
    {
      text: "Dosificador",
      link: `${BASE_URL}/produccion/pedidos`,
      id: 1,
    },
    {
      text: "Ollero",
      link: `${BASE_URL}/produccion/registros`,
      id: 2,
    },
    {
      text: "Bombero",
      link: `${BASE_URL}/produccion/operador`,
      id: 3,
    },
    {
      text: "Jefe de Producción",
      link: `${BASE_URL}/produccion/p-bombeados`,
      id: 4,
    },
  ],
};

export const administracionUserTypeLinks = {
  Administracion: [
    {
      text: "Reportes Pedidos",
      link: `${BASE_URL}/dashboard/pedidos`,
      id: 1,
    },
    {
      text: "KPIs",
      link: `${BASE_URL}/dashboard/kpis`,
      id: 2,
    },
  ],
};

export const unidadesLinks = {
  Administracion: [
    // {
    //   text: "Lista de Clientes",
    //   link: `${BASE_URL}/unidades/clientes`,
    //   id: 1,
    // },
    {
      text: "Lista de Unidades",
      link: `${BASE_URL}/unidades/lista`,
      id: 1,
    },

    {
      text: "Dar de alta Unidad",
      link: `${BASE_URL}/unidades/agregar-unidad`,
      id: 2,
    },
    
  ],

  Ventas: [
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
  ],

  Produccion: [
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
  ],
};

export const comercializacionLinks = [
  {
    text: "Elaborar cotización",
    link: `${BASE_URL}/comercializacion/clientes-cotizacion`,
    id: 1,
  },
  {
    text: "Lista cotizaciones",
    link: `${BASE_URL}/comercializacion/cotizaciones`,
    id: 2,
  },
  {
    text: "Lista de clientes",
    link: `${BASE_URL}/comercializacion/clientes`,
    id: 3,
  },
  {
    text: "Mapa",
    link: `${BASE_URL}/comercializacion/mapa`,
    id: 4,
  },
  {
    text: "Proyecciones",
    link: `${BASE_URL}/comercializacion/proyecciones`,
    id: 5,
  },
  {
    text: "Productos",
    link: `${BASE_URL}/comercializacion/productos`,
    id: 6,
  },
];

export const usuariosLinks = [
  {
    text: "Crear usuario",
    link: `${BASE_URL}/users/agregar-usuario`,
    id: 1,
  },
  {
    text: "Lista de usuarios",
    link: `${BASE_URL}/users/usuarios`,
    id: 2,
  },
];

export const facturacionLinks = [
  {
    text: "Lista condiciones de venta",
    link: `${BASE_URL}/facturacion/ventas`,
    id: 1,
  },
  
];
