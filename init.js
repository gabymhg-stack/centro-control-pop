const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  return pool;
}

const SEED = [
  {id:1, titulo:'Formato de Comisión Lev Cap Excel', area:'Director', responsable:'Enrique', prioridad:'Alta', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Entregable', notas:'', top:true, flag:true},
  {id:2, titulo:'Customer Journey', area:'Director', responsable:'Enrique', prioridad:'Alta', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Entregable', notas:'', top:true, flag:true},
  {id:3, titulo:'Dinero Gerardo Sada – Estado de cuenta', area:'Director', responsable:'Enrique', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:4, titulo:'Ver con Memo y Jorge – Esquema 5-15', area:'Director', responsable:'Enrique', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Junta a agendar', notas:'', top:false, flag:false},
  {id:5, titulo:'Diseño piso 35', area:'Director', responsable:'Enrique', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:6, titulo:'RUTA FIFA IDEAS SHOWROOM', area:'Director', responsable:'Enrique', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:7, titulo:'Proyecto Larisso – correo Saúl', area:'Director', responsable:'Enrique', prioridad:'Media', estado:'En proceso', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:8, titulo:'Comunicado de combinar', area:'Director', responsable:'Enrique', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:9, titulo:'Horarios / Acuerdos Erick', area:'Director', responsable:'Enrique', prioridad:'Media', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Junta a agendar', notas:'', top:false, flag:false},
  {id:10, titulo:'Listado de plantillas – dividido ut/mkt', area:'Ventas', responsable:'Osvaldo', prioridad:'Alta', estado:'Pdte. aprobación Enrique', fecha:'2026-05-14', tipo:'Entregable', notas:'', top:true, flag:true},
  {id:11, titulo:'Esquema de promociones anual', area:'Ventas', responsable:'Osvaldo', prioridad:'Alta', estado:'Pdte. aprobación Enrique', fecha:'2026-04-16', tipo:'Entregable', notas:'', top:false, flag:true},
  {id:12, titulo:'Plan Nacional de Brokers', area:'Brokers', responsable:'Erick', prioridad:'Alta', estado:'En proceso', fecha:'2026-05-15', tipo:'Entregable', notas:'', top:true, flag:false},
  {id:13, titulo:'Carpeta Brokers', area:'Brokers', responsable:'Erick', prioridad:'Media', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:true},
  {id:14, titulo:'Capacitaciones brokers', area:'Brokers', responsable:'Erick', prioridad:'Baja', estado:'Rutinario', fecha:'', tipo:'Rutinario', notas:'', top:false, flag:false},
  {id:15, titulo:'Comparación Calendly', area:'Brokers', responsable:'Erick', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:16, titulo:'Customer Journey – Mkt. Trad.', area:'Mkt. Tradicional', responsable:'Gaby', prioridad:'Alta', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Entregable', notas:'Heredado de Andrea', top:true, flag:false},
  {id:17, titulo:'Comprobantes de Larissa', area:'Mkt. Tradicional', responsable:'Practicante', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:18, titulo:'Locales Comerciales PTK sin techo', area:'Mkt. Tradicional', responsable:'Practicante', prioridad:'Media', estado:'En proceso', fecha:'', tipo:'Tarea general', notas:'Renders en proceso', top:false, flag:false},
  {id:19, titulo:'Cargar facturas pagos mayo 2026', area:'Mkt. Tradicional', responsable:'Practicante', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:20, titulo:'Pop Gallery – Mkt. Trad.', area:'Mkt. Tradicional', responsable:'Practicante', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:21, titulo:'Profet – Dashboard actualizado', area:'Mkt. Digital', responsable:'Luis', prioridad:'Media', estado:'En proceso', fecha:'2026-05-06', tipo:'Entregable', notas:'', top:false, flag:false},
  {id:22, titulo:'WISE – Seguimiento pago', area:'Mkt. Digital', responsable:'Luis', prioridad:'Alta', estado:'Pendiente', fecha:'2026-05-08', tipo:'Tarea general', notas:'', top:true, flag:false},
  {id:23, titulo:'META ADS', area:'Mkt. Digital', responsable:'Luis', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:24, titulo:'WhatsApp Business', area:'Mkt. Digital', responsable:'Luis', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:25, titulo:'Pago WISE – fechas compromiso pipeline', area:'Mkt. Digital', responsable:'Luis', prioridad:'Alta', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:true},
  {id:26, titulo:'Auditar leads BVRO (c/2 días)', area:'Mkt. Digital', responsable:'Luis', prioridad:'Media', estado:'Rutinario', fecha:'', tipo:'Rutinario', notas:'', top:false, flag:false},
  {id:27, titulo:'Junta con equipo de ventas', area:'Mkt. Digital', responsable:'Luis', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Junta a agendar', notas:'', top:false, flag:false},
  {id:28, titulo:'Manera de auditar BVRO / Leads', area:'Mkt. Digital', responsable:'Luis', prioridad:'Alta', estado:'Pendiente', fecha:'', tipo:'Entregable', notas:'', top:true, flag:false},
  {id:29, titulo:'Celular TYCSA ERG', area:'Chief of Staff', responsable:'Gaby', prioridad:'Alta', estado:'En proceso', fecha:'2026-06-12', tipo:'Tarea general', notas:'', top:true, flag:false},
  {id:30, titulo:'Reembolso Enrique Seguro', area:'Chief of Staff', responsable:'Gaby', prioridad:'Alta', estado:'En proceso', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:31, titulo:'Insumos del Showroom', area:'Chief of Staff', responsable:'Gaby', prioridad:'Media', estado:'En proceso', fecha:'2026-06-03', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:32, titulo:'Presentación TPK confirmar', area:'Chief of Staff', responsable:'Gaby', prioridad:'Alta', estado:'Pendiente', fecha:'2026-06-04', tipo:'Entregable', notas:'', top:true, flag:false},
  {id:33, titulo:'Revisión política ventas con ER', area:'Chief of Staff', responsable:'Gaby', prioridad:'Alta', estado:'Pdte. aprobación Enrique', fecha:'2026-06-04', tipo:'Junta a agendar', notas:'', top:false, flag:false},
  {id:34, titulo:'Revisar domiciliación: Bellpay', area:'Chief of Staff', responsable:'Gaby', prioridad:'Media', estado:'Pdte. aprobación Enrique', fecha:'2026-06-04', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:35, titulo:'POP INV → POP', area:'Chief of Staff', responsable:'Gaby', prioridad:'Media', estado:'Pendiente', fecha:'2026-06-27', tipo:'Tarea general', notas:'', top:false, flag:true},
  {id:36, titulo:'Info Brenda Serfimex', area:'Chief of Staff', responsable:'Gaby', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:37, titulo:'Receta + Cotización medicamentos', area:'Chief of Staff', responsable:'Gaby', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:38, titulo:'POPSYS9 – Pedir ERG final', area:'Chief of Staff', responsable:'Gaby', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:39, titulo:'Profes Soccer y Tennis LaP', area:'Chief of Staff', responsable:'Gaby', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:40, titulo:'Renta carrito Golf LaP', area:'Chief of Staff', responsable:'Gaby', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:41, titulo:'ZOHO / CAPI', area:'Chief of Staff', responsable:'Gaby', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:42, titulo:'Campañas BVRÓ – Moodboard nueva dirección', area:'POP Corporativo', responsable:'Gaby', prioridad:'Media', estado:'En proceso', fecha:'', tipo:'Tarea general', notas:'May(2) Jun(4) – feedback en carpeta compartida', top:false, flag:false},
  {id:43, titulo:'Cotización Sitios Web POP', area:'POP Corporativo', responsable:'Gaby', prioridad:'Media', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Entregable', notas:'Sin diseño gráfico – baja $10k+IVA', top:false, flag:true},
  {id:44, titulo:'Arquitectura de Marca POP', area:'POP Corporativo', responsable:'Enrique', prioridad:'Baja', estado:'En proceso', fecha:'', tipo:'Entregable', notas:'En hold con Larissa', top:false, flag:false},
  {id:45, titulo:'Rediseño páginas Web + lanzamiento 3 marcas', area:'POP Corporativo', responsable:'Enrique', prioridad:'Alta', estado:'En proceso', fecha:'', tipo:'Entregable', notas:'Actualizar Gantt', top:false, flag:false},
  {id:46, titulo:'Hat clips JVV – Pago finiquito Fork Caps', area:'POP Corporativo', responsable:'Practicante', prioridad:'Alta', estado:'En proceso', fecha:'2026-06-09', tipo:'Tarea general', notas:'Raúl Castro +52 81 3402 7686', top:false, flag:false},
  {id:47, titulo:'Tazas POP – Anticipo programación pago', area:'POP Corporativo', responsable:'Practicante', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'Acento Publicidad – pendiente muestras', top:false, flag:false},
  {id:48, titulo:'Revisión Moodboard RS + calendario Jun', area:'POP Corporativo', responsable:'Luis', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Entregable', notas:'Revisar con Nayeli BVRÓ', top:false, flag:false},
  {id:49, titulo:'Tarjetas Presentación Ventas – Autorizar muestra', area:'Proyectos', responsable:'Gaby', prioridad:'Alta', estado:'Pendiente', fecha:'', tipo:'Entregable', notas:'Zuma Impresores – Lynx 280gr', top:false, flag:false},
  {id:50, titulo:'Recepción muestra gafetes VINART', area:'POP Corporativo', responsable:'Practicante', prioridad:'Media', estado:'En proceso', fecha:'', tipo:'Tarea general', notas:'Solicitar a Pancho – ya en producción', top:false, flag:false},
  {id:51, titulo:'Liberación renders PTK – Render Inc.', area:'Proyectos', responsable:'Enrique', prioridad:'Alta', estado:'Pendiente', fecha:'', tipo:'Entregable', notas:'Solicitar altas proveedor → actualizar presentaciones', top:false, flag:false},
  {id:52, titulo:'Autorización O.T. Google ATK y PTK', area:'Proyectos', responsable:'Enrique', prioridad:'Alta', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Entregable', notas:'SP urgente + firmas → fondeo tarjetas', top:false, flag:true},
  {id:53, titulo:'Instalación Lona Mesh – torre grúa', area:'Proyectos', responsable:'Gaby', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'Coordinar con Kimie Monier y Humberto Delgado', top:false, flag:false},
  {id:54, titulo:'Revisión encuestas Compra/No compra', area:'Proyectos', responsable:'Gaby', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Entregable', notas:'Word enviado por correo', top:false, flag:false},
  {id:55, titulo:'Alta 3 encuestas en Zoho Survey', area:'Proyectos', responsable:'Practicante', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:56, titulo:'Liberar fichas instrucciones depósito clientes', area:'Proyectos', responsable:'Gaby', prioridad:'Alta', estado:'Pendiente', fecha:'', tipo:'Entregable', notas:'Enviadas por correo → cargar carpeta Ventas', top:true, flag:false},
  {id:57, titulo:'Promoción Mundial – 4 propuestas chat MKT', area:'Proyectos', responsable:'Practicante', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'', top:false, flag:false},
  {id:58, titulo:'Customer Journey – Implementar mejoras', area:'Proyectos', responsable:'Gaby', prioridad:'Alta', estado:'En proceso', fecha:'', tipo:'Entregable', notas:'Comentarios doc ER enviados', top:true, flag:false},
  {id:59, titulo:'Customer Journey – Lista compras Showroom', area:'Proyectos', responsable:'Gaby', prioridad:'Alta', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'Revisión scouting realizado. Autorizar compras', top:true, flag:false},
  {id:60, titulo:'Manual Propietario + Ops ÁTIKO', area:'Proyectos', responsable:'Enrique', prioridad:'Alta', estado:'En proceso', fecha:'', tipo:'Entregable', notas:'Esqueletos diseñados por Larissa – en hold', top:false, flag:false},
  {id:61, titulo:'Experiencia entrega unidades – cotizar materiales', area:'Proyectos', responsable:'Practicante', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'Materiales definidos + propuesta botella', top:false, flag:false},
  {id:62, titulo:'Instalar lona Capi – barda ÁTIKO', area:'Proyectos', responsable:'Gaby', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'Entregar a Humberto. Lona en bodega MKT', top:false, flag:false},
  {id:63, titulo:'Stickers carros – 100pz 10 modelos', area:'Proyectos', responsable:'Practicante', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'Diseños Larissa listos. $1,500 mxn', top:false, flag:false},
  {id:64, titulo:'Hablar con Larissa – definir fecha fin alcance', area:'Proyectos', responsable:'Enrique', prioridad:'Alta', estado:'Pendiente', fecha:'', tipo:'Junta a agendar', notas:'Todas las solicitudes en HOLD hasta definir', top:false, flag:false},
  {id:65, titulo:'Fichas obra colgada Casa Pop', area:'Pop Gallery', responsable:'Practicante', prioridad:'Baja', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'Después de que Rosy pinte todos los muros', top:false, flag:false},
  {id:66, titulo:'Compra pieza Polack – Pdte. firma ERG', area:'Pop Gallery', responsable:'Gaby', prioridad:'Alta', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Tarea general', notas:'Proveedor dado de alta. Pendiente transferencia', top:false, flag:true},
  {id:67, titulo:'Alex Fregoso – Autorización evento apertura', area:'Pop Gallery', responsable:'Enrique', prioridad:'Media', estado:'Pdte. aprobación Enrique', fecha:'', tipo:'Junta a agendar', notas:'10 invitados, él cubre bebidas. Lunes 6-8pm', top:false, flag:false},
  {id:68, titulo:'Evento clausura Alex Fregoso', area:'Pop Gallery', responsable:'Gaby', prioridad:'Alta', estado:'Pendiente', fecha:'2026-08-20', tipo:'Junta a agendar', notas:'Fecha tentativa – artista muy a la expectativa', top:false, flag:false},
  {id:69, titulo:'Programar jul/ago artista – contenido', area:'Pop Gallery', responsable:'Gaby', prioridad:'Media', estado:'Pendiente', fecha:'', tipo:'Tarea general', notas:'Campaña orgánica junio ya programada', top:false, flag:false},
  {id:70, titulo:'Publicar cápsulas 2 y 3 artista actual', area:'Pop Gallery', responsable:'Luis', prioridad:'Media', estado:'En proceso', fecha:'', tipo:'Tarea general', notas:'Videos en proceso con Larissa', top:false, flag:false},
];

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const db = getPool();
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id        SERIAL PRIMARY KEY,
        titulo    TEXT NOT NULL DEFAULT '',
        area      TEXT NOT NULL DEFAULT '',
        responsable TEXT NOT NULL DEFAULT '',
        prioridad TEXT NOT NULL DEFAULT 'Media',
        estado    TEXT NOT NULL DEFAULT 'Pendiente',
        fecha     TEXT NOT NULL DEFAULT '',
        tipo      TEXT NOT NULL DEFAULT 'Tarea general',
        notas     TEXT NOT NULL DEFAULT '',
        top       BOOLEAN NOT NULL DEFAULT FALSE,
        flag      BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const { rows: existing } = await db.query('SELECT COUNT(*) AS n FROM tasks');
    if (parseInt(existing[0].n) > 0) {
      res.status(200).json({ ok: true, message: 'DB already initialized. No changes made.', count: existing[0].n });
      return;
    }

    for (const t of SEED) {
      await db.query(
        `INSERT INTO tasks (titulo,area,responsable,prioridad,estado,fecha,tipo,notas,top,flag)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [t.titulo, t.area, t.responsable, t.prioridad, t.estado, t.fecha, t.tipo, t.notas, t.top, t.flag]
      );
    }

    res.status(200).json({ ok: true, message: `DB initialized with ${SEED.length} tasks.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
