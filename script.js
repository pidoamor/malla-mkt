// Créditos oficiales de cada ramo
const creditos = {
  'cpl1': 4,
  'mate': 5,
  'creatividad': 3,
  'historia': 3,
  'etica': 2,
  'eco': 3,
  'comunica': 3,
  'mkt': 3,
  'globa': 3,
  'cpl2': 4,
  'finanzas': 3,
  'procesos': 3,
  'seminario': 3,
  'antro': 3,
  'comportamiento': 3,
  'expresion': 3,
  'medios': 2,
  'informatica': 3,
  'segmen': 3,
  'estadistica': 4,
  'costos': 3,
  'sociologia': 3,
  'diseno1': 3,
  'dist_trade': 3,
  'mkt_innov': 3,
  'mate_mkt': 3,
  'econ': 3,
  'diseno2': 3,
  'est_cuali': 3,
  'cat_mgt_sales': 3,
  'gestion': 3,
  'mkt_tools': 3,
  'analisis': 3,
  'branding': 3,
  'mkt_precios': 3,
  'mkt_strat': 3,
  'media_rvn_strat': 3,
  'digital_mkt': 3,
  'legislacion': 3,
  'business': 3,
  'mkt_metrics': 3,
  'crm': 3,
  'digital_strat': 3,
  'campanas': 3,
  'comunica_des': 3,
  'seminario_avanzado': 3,
  'diseno_mkt': 3,
  'mkt_inno_ser': 3,
  'digital_project': 3,
  'mkt_b2b': 3,
  'inves_avanzada': 4,
  'mkt_decisions': 3,
  'etica_prof': 3,
  'inves_avanzada2': 3,
  'resp_sost': 3,
};

// Prerrequisitos de cada ramo (ramos que deben estar aprobados para desbloquear este)
const prerequisitos = {
  'procesos': ['comunica'],
  'antro': ['comunica'],
  'anatomia': ['biologia'],
  'fisiologia': ['biologia', 'fisica'],
  'biodesarrollo': ['biologia'],
  'histologia': ['biologia'],
  'investigacion1': ['mate', 'fisica'],
  'educacion2': ['educacion1'],
  'inmunologia': ['fisiologia'],
  'cs_sociales2': ['cs_sociales1'],
  'ingles2': ['ingles1'],
  'saludcom1': [],
  'fundamentos2': ['fisiologia', 'anatomia', 'histologia', 'integracion1'],
  'obstetricia1': ['fisiologia', 'anatomia', 'histologia', 'biodesarrollo', 'integracion1'],
  'neonatologia1': ['fisiologia', 'anatomia', 'histologia', 'biodesarrollo', 'integracion1'],
  'fisiologia_sis': ['fisiologia'],
  'agentes': ['fisiologia', 'anatomia', 'histologia'],
  'cs_sociales3': ['cs_sociales2'],
  'ingles3': ['ingles2'],
  'neonatologia2': ['neonatologia1', 'fisiologia_sis', 'agentes'],
  'obstetricia2': ['obstetricia1', 'fisiologia_sis'],
  'gineco1': ['histologia', 'fisiologia_sis'],
  'fisiopato': ['fisiologia_sis'],
  'infectologia': ['agentes'],
  'farmacologia': ['fisiologia_sis', 'bioquimica'],
  'integracion2': ['fisiologia_sis','fundamentos2'],
  'clinica_neonatal1': ['neonatologia2', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_partos1': ['obstetricia2', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_ap1': ['obstetricia2', 'gineco1', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_puerperio': ['obstetricia2', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_saludcom': ['integracion2'],
  'modulo1': [],
  'neonatologia3': ['farmacologia', 'fisiopato', 'obstetricia2'],
  'saludcom2': ['saludcom1'],
  'obstetricia_pat': ['obstetricia2', 'farmacologia', 'fisiopato'],
  'gestion1': ['investigacion1'],
  'investigacion2': ['investigacion1'],
  'enfermeria_mq': ['neonatologia3', 'obstetricia_pat'],
  'reproduccion': ['fisiologia_sis'],
  'gineco_pat': ['clinica_ap1'],
  'gestion2': ['gestion1'],
  'investigacion3': ['investigacion2'],
  'cs_sociales4': ['cs_sociales3'],
  'clinica_neonatal2': ['neonatologia3', 'enfermeria_mq'],
  'clinica_partos2': ['obstetricia_pat', 'enfermeria_mq'],
  'clinica_ap2': ['obstetricia_pat', 'gineco_pat', 'saludcom2'],
  'alto_riesgo': ['obstetricia_pat', 'enfermeria_mq'],
  'clinica_mq': ['gineco_pat', 'enfermeria_mq'],
  'modulo2': ['modulo1'],
  'seminario1': ['investigacion3'],
  'internado_neonatologia': ['clinica_neonatal2'],
  'internado_obstetricia': ['clinica_partos2', 'alto_riesgo'],
  'internado_ap': ['clinica_ap2'],
  'internado_gineco': ['clinica_mq'],
  'internado_neonatologia1': ['clinica_neonatal2'],
  'internado_obstetricia1': ['clinica_partos2', 'alto_riesgo'],
  'internado_ap1': ['clinica_ap2'],
  'internado_gineco1': ['clinica_mq'],
  'internado_electivo': [],
  'internado_electivo1': [],
  'seminario2': ['seminario1'],
  'ingles4': ['ingles3']
};

// Funciones para guardar y cargar progreso en localStorage
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
}

// Calcula el total de créditos de ramos aprobados
function calcularCreditosAprobados() {
  const aprobados = obtenerAprobados();
  return aprobados.reduce((sum, ramo) => sum + (creditos[ramo] || 0), 0);
}

// Actualiza qué ramos están desbloqueados o bloqueados según prerrequisitos y créditos especiales
function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();
  const totalCreditos = calcularCreditosAprobados();

  for (const [destino, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(destino);
    if (!elem) continue;

    // Verificar si se cumplen prerrequisitos normales
    let puedeDesbloquear = reqs.every(r => aprobados.includes(r));

    // Reglas especiales con créditos para ciertos módulos
    if (destino === 'modulo1') {
      puedeDesbloquear = totalCreditos >= 90;
    }
    if (destino === 'modulo2') {
      puedeDesbloquear = aprobados.includes('modulo1') && totalCreditos >= 170;
    }
    if (destino === 'internado_electivo' || destino === 'internado_electivo1') {
      puedeDesbloquear = totalCreditos >= 240;
    }

    if (!elem.classList.contains('aprobado')) {
      if (puedeDesbloquear) elem.classList.remove('bloqueado');
      else elem.classList.add('bloqueado');
    } else {
      // Si está aprobado, no debe estar bloqueado
      elem.classList.remove('bloqueado');
    }
  }
}

// Maneja el clic para aprobar o desaprobar un ramo (solo si no está bloqueado)
function aprobar(e) {
  const ramo = e.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  const aprobados = obtenerAprobados();
  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(ramo.id)) aprobados.push(ramo.id);
  } else {
    const idx = aprobados.indexOf(ramo.id);
    if (idx > -1) aprobados.splice(idx, 1);
  }
  guardarAprobados(aprobados);

  actualizarDesbloqueos();
}

// Al cargar la página, asignar eventos, cargar progreso y actualizar desbloqueos
window.addEventListener('DOMContentLoaded', () => {
  const todosRamos = document.querySelectorAll('.ramo');

  const aprobados = obtenerAprobados();
  todosRamos.forEach(ramo => {
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
    }
  });

  todosRamos.forEach(ramo => {
    ramo.addEventListener('click', aprobar);
  });

  actualizarDesbloqueos();
});
