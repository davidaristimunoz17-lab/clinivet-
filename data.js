/**
 * CliniVet AI - Base de Datos Clínica y Protocolos Éticos
 * Paciente de Muestra: Max (Chihuahua, 12 años, Macho)
 * Compatible con carga directa por script (file://) y como módulo ES6
 */

(function(root) {
  'use strict';

  const MANDATORY_AI_DISCLAIMER = "Recuerda 💡: La información proporcionada por esta IA tiene fines educativos y de apoyo. Ante cualquier duda o emergencia, busca siempre la supervisión de nuestro equipo veterinario.";

  const PATIENT_DATA = {
    id: "PAC-2024-0891",
    name: "Max",
    species: "Canino Doméstico",
    breed: "Chihuahua de pelo corto",
    age: "12 años",
    birthDate: "14/03/2012",
    lifeStage: "Geriátrico",
    sex: "Macho (Castrado)",
    weight: "3.2 kg",
    microchip: "981098102345678",
    bloodType: "DEA 1.1 (-)",
    tutor: {
      name: "Carlos Mendoza",
      phone: "+34 612 345 678",
      email: "carlos.mendoza@email.com",
      address: "Calle Los Robles 14, 2° B, Madrid"
    },
    assignedVet: {
      name: "Dra. Sofía Valenzuela",
      license: "Col. M.V. 8421",
      specialty: "Medicina Interna y Cirugía de Pequeños Animales",
      clinic: "Centro Médico Veterinario San Francisco"
    },
    clinicalAlerts: [
      {
        type: "warning",
        title: "Soplo cardíaco leve Grado II/VI",
        detail: "Monitoreo geriátrico semestral. Evitar sobreesfuerzo y vigilar frecuencia respiratoria en reposo."
      },
      {
        type: "info",
        title: "Plan Geriátrico Activo",
        detail: "Dieta renal preventiva y suplementación con condroprotectores articulares."
      }
    ],
    vitals: {
      temp: "38.2 °C",
      heartRate: "115 lpm",
      respiratoryRate: "24 rpm",
      bodyCondition: "5 / 9 (Ideal)",
      hydration: "Adecuada (Pliegue cutáneo < 1s)"
    }
  };

  const PROCEDURES_DATA = [
    {
      id: "proc-esterilizacion",
      date: "17-08-2020",
      displayDate: "17 de Agosto de 2020",
      title: "Esterilización (Orquiectomía Preventiva)",
      category: "Cirugía Mayor Ambulatoria",
      status: "Completado con Éxito",
      statusType: "success",
      veterinarian: "Dra. Sofía Valenzuela",
      badgeLabel: "Cirugía Preventiva",
      shortDescription: "Intervención quirúrgica electiva para prevención de hiperplasia prostática benigna y tumores testiculares en paciente canino adulto.",
      clinicalDetails: {
        "Técnica Quirúrgica": "Orquiectomía preescrotal abierta con ligadura triple por transfixión con monofilamento reabsorbible.",
        "Protocolo Anestésico": "Premedicación balanceada con Butorfanol/Dexmedetomidina + Inducción con Propofol + Mantenimiento anestésico por intubación endotraqueal con Isoflurano al 1.8%.",
        "Cierre Quirúrgico": "Sutura intradérmica subcuticular con Monocryl 4-0 (no requiere retiro de puntos externos).",
        "Constantes Intraoperatorias": "SpO2: 99%, Presión Arterial Media: 74 mmHg, Temperatura regulada con manta térmica."
      },
      aiAnalysis: {
        procedureTitle: "Esterilización (Orquiectomía Preventiva)",
        summary: "La cirugía de esterilización de Max concluyó sin incidencias. Se utilizó un protocolo anestésico de alta seguridad adaptado a su peso (3.2 kg) y raza. Max se encuentra en su fase postoperatoria inmediata y su completa recuperación dependerá del cumplimiento riguroso de las pautas de reposo y la administración exacta de sus medicamentos.",
        careGuide: [
          {
            step: "01",
            icon: "cone",
            title: "Uso continuo del collar isabelino o body protector",
            detail: "Max debe usar el collar isabelino o body quirúrgico las 24 horas del día durante 7 a 10 días continuos. El lamido constante de la herida puede introducir bacterias bucales e inflamar la línea de sutura intradérmica."
          },
          {
            step: "02",
            icon: "bed",
            title: "Reposo estricto en el hogar",
            detail: "Prohibir saltos hacia sofás, camas o subir escaleras. Acondicionar una camita a nivel de suelo en un lugar templado y sin corrientes de aire. Los paseos higiénicos deben ser de solo 5 minutos y siempre con correa corta."
          },
          {
            step: "03",
            icon: "bowl",
            title: "Alimentación e hidratación progresiva",
            detail: "Al llegar a casa, ofrecer primero pequeños sorbos de agua templada. Si no vomita tras 40 minutos, proporcionar un tercio de su porción de alimento húmedo o gastrointestinal. El apetito habitual debe restablecerse en 24 horas."
          },
          {
            step: "04",
            icon: "alert",
            title: "Monitoreo de signos de alarma médica",
            detail: "Comunícate de urgencia con la clínica si detectas: inflamación excesiva, enrojecimiento que se expande, sangrado continuo en la incisión, encías pálidas, vómitos repetidos o decaimiento severo que empeora."
          }
        ],
        medications: [
          {
            name: "Meloxicam Solución Oral (0.5 mg/ml)",
            classification: "Antiinflamatorio no esteroideo (AINE) y analgésico",
            dose: "0.3 ml el primer día; luego 0.15 ml cada 24 horas",
            frequency: "Cada 24 horas (una vez al día, preferentemente a la misma hora)",
            duration: "Durante 4 días consecutivos",
            instructions: "Administrar siempre mezclado con una pequeña porción de comida húmeda. Nunca dar en ayunas. Suspender de inmediato si se observan heces oscuras o vómito.",
            pillColor: "blue"
          },
          {
            name: "Cefalexina Suspensión Oral (250 mg / 5 ml)",
            classification: "Antibiótico bactericida profiláctico de amplio espectro",
            dose: "0.65 ml (equivalente a 20 mg/kg)",
            frequency: "Cada 12 horas (ej: 08:00 AM y 08:00 PM)",
            duration: "Durante 7 días completos",
            instructions: "No interrumpir el tratamiento aunque Max aparente una recuperación total. Agitar bien el frasco antes de dosificar con la jeringa dosificadora.",
            pillColor: "emerald"
          },
          {
            name: "Clorhexidina Solución Tópica 0.5%",
            classification: "Antiséptico cutáneo suave",
            dose: "Aplicar toques suaves con gasa estéril (1 unidad)",
            frequency: "Cada 12 horas tras regresar del paseo higiénico",
            duration: "Hasta la revisión del día 8",
            instructions: "Limpiar la zona suavemente sin frotar. Mantener la incisión completamente seca. No usar alcohol, yodo ni pomadas caseras.",
            pillColor: "cyan"
          }
        ],
        followUp: {
          date: "25-08-2020",
          type: "Control Postquirúrgico y Alta Médica Definitiva",
          location: "Consultorio Quirúrgico 1"
        },
        mandatoryDisclaimer: MANDATORY_AI_DISCLAIMER
      }
    },
    {
      id: "proc-vacunacion",
      date: "30-09-2021",
      displayDate: "30 de Septiembre de 2021",
      title: "Vacunación Anual (Polivalente + Antirrábica)",
      category: "Inmunización y Medicina Preventiva",
      status: "Inmunizado y Protegido",
      statusType: "info",
      veterinarian: "Dra. Sofía Valenzuela",
      badgeLabel: "Refuerzo Inmunológico",
      shortDescription: "Inmunización preventiva anual contra Parvovirus, Moquillo, Hepatitis infecciosa, Leptospirosis, Parainfluenza y Rabia canina.",
      clinicalDetails: {
        "Biológicos Administrados": "Vanguard Plus 5 L4 (Antígenos virales y bacterianos) + Defensor 3 (Antirrábica monovalente inactivada).",
        "Lotes y Caducidades": "Vanguard Lot: #VG-89021 (Vto: 12/2022) | Defensor Lot: #DF-11409 (Vto: 04/2023).",
        "Examen Físico Previo": "Paciente afebril (38.3 °C). Frecuencia cardíaca rítmica, mucosas normocoloreadas, ganglios submandibulares y poplíteos sin linfoadenomegalia.",
        "Vía de Aplicación": "Subcutánea en región interescapular y flanco lateral derecho."
      },
      aiAnalysis: {
        procedureTitle: "Vacunación Anual (Polivalente + Antirrábica)",
        summary: "Max ha recibido satisfactoriamente su esquema de refuerzo inmunológico anual. Las vacunas estimulan de forma controlada sus anticuerpos protectores. En las primeras 24 a 48 horas el organismo de Max procesará el estímulo biológico, por lo que requiere ciertos cuidados para asegurar su máximo bienestar.",
        careGuide: [
          {
            step: "01",
            icon: "moon",
            title: "Descanso y letargo leve esperado",
            detail: "Es completamente normal que Max se muestre más somnoliento de lo habitual o con ligero decaimiento en las primeras 24 horas. Es la respuesta natural del sistema inmunitario al procesar los antígenos."
          },
          {
            step: "02",
            icon: "shower",
            title: "Restricción de baños durante 7 días",
            detail: "No bañar a Max durante la semana posterior a la vacuna. Evita cambios térmicos bruscos que puedan comprometer la respuesta óptima de sus anticuerpos."
          },
          {
            step: "03",
            icon: "touch",
            title: "Cuidado de la zona de inyección",
            detail: "Puede formarse un pequeño nódulo o engrosamiento indoloro en el punto de punción interescapular. Esto es transitorio y se reabsorbe de forma espontánea en 2 a 3 semanas sin necesidad de masajearlo."
          },
          {
            step: "04",
            icon: "alert",
            title: "Signos de hipersensibilidad o alergia vacunal",
            detail: "Aunque muy poco frecuente, si observas hinchazón en la cara o párpados (angioedema), ronchas, vómito inmediato o dificultad para respirar, debes acudir de inmediato a urgencias veterinarias."
          }
        ],
        medications: [
          {
            name: "Manejo Conservador (Sin medicación de rutina)",
            classification: "Protocolo preventivo estándar",
            dose: "No medicar sin indicación médica expresa",
            frequency: "Monitoreo visual durante 48 horas",
            duration: "2 días",
            instructions: "Bajo ninguna circunstancia suministres fármacos humanos como paracetamol o ibuprofeno: causan toxicidad hepática y renal fulminante en caninos.",
            pillColor: "slate"
          }
        ],
        followUp: {
          date: "30-09-2022",
          type: "Refuerzo Inmunológico Anual y Chequeo Preventivo",
          location: "Área de Medicina Preventiva"
        },
        mandatoryDisclaimer: MANDATORY_AI_DISCLAIMER
      }
    },
    {
      id: "proc-profilaxis",
      date: "15-05-2023",
      displayDate: "15 de Mayo de 2023",
      title: "Profilaxis Dental Ultrasónica y Pulido",
      category: "Odontología Preventiva",
      status: "Completado",
      statusType: "success",
      veterinarian: "Dra. Sofía Valenzuela",
      badgeLabel: "Higiene Oral",
      shortDescription: "Destartraje supragingival y subgingival con ultrasonido bajo anestesia inhalatoria y monitoreo cardiovascular continuo.",
      clinicalDetails: {
        "Diagnóstico Odontológico": "Enfermedad periodontal Grado I-II sin pérdida ósea alveolar significativa.",
        "Técnica": "Cavitrón piezoeléctrico ultrasónico + Irrigación con Clorhexidina 0.12% + Pulido con pasta fluorada de grano fino.",
        "Monitoreo Especial": "Monitoreo electrocardiográfico continuo debido a su antecedente de soplo cardíaco Grado II/VI. Sin arritmias reportadas."
      },
      aiAnalysis: {
        procedureTitle: "Profilaxis Dental Ultrasónica y Pulido",
        summary: "La profilaxis dental de Max fue un éxito. Se eliminó el 100% del sarro bacteriano previniendo que las bacterias orales ingresen al torrente sanguíneo, lo cual es crítico para proteger la válvula mitral de su corazón.",
        careGuide: [
          {
            step: "01",
            icon: "bowl",
            title: "Dieta blanda y tibia por 48 horas",
            detail: "Ofrecer alimento húmedo o croquetas ablandadas con caldo tibio sin sal para evitar molestias en las encías recién tratadas."
          },
          {
            step: "02",
            icon: "heartbeat",
            title: "Cuidado de la salud cardíaca",
            detail: "La higiene oral previene bacteriemias que empeoran soplos cardíacos. Mantener a Max en ambiente relajado sin estrés."
          },
          {
            step: "03",
            icon: "brush",
            title: "Hábito de higiene en casa",
            detail: "A partir del 5° día, iniciar cepillado preventivo con gel enzimático de uso veterinario 3 veces por semana."
          }
        ],
        medications: [
          {
            name: "Gel Gingival Enzimático Veterinario",
            classification: "Antiséptico bucal enzimático",
            dose: "1 pequeña gota aplicada en encías superiores",
            frequency: "Cada 24 horas por las noches",
            duration: "Uso continuo",
            instructions: "Aplicar con gasa o dedo limpio. No requiere enjuague y tiene sabor palatable a ave.",
            pillColor: "cyan"
          }
        ],
        followUp: {
          date: "15-11-2023",
          type: "Revisión Semestral Periodontal y Cardíaca",
          location: "Consultorio 2"
        },
        mandatoryDisclaimer: MANDATORY_AI_DISCLAIMER
      }
    },
    {
      id: "proc-geriatrico",
      date: "12-10-2024",
      displayDate: "12 de Octubre de 2024",
      title: "Chequeo Geriátrico Semestral y Perfil Bioquímico",
      category: "Geriatría Canina Integral",
      status: "En Seguimiento Activo",
      statusType: "warning",
      veterinarian: "Dra. Sofía Valenzuela",
      badgeLabel: "Control Senior",
      shortDescription: "Evaluación integral de paciente canino senior: ecocardiografía Doppler, perfil renal (SDMA/Creatinina) y panel hepático.",
      clinicalDetails: {
        "Ecocardiograma Doppler": "Insuficiencia valvular mitral leve (Grado B1 ACVIM). No hay remodelado cardíaco ni congestión pulmonar en este estadio. No requiere inodilatadores aún.",
        "Laboratorio": "SDMA: 12 ug/dL (Normal < 14), Creatinina: 1.1 mg/dL, ALT/FAS: Rango fisiológico, Urianálisis: Densidad 1.032 adecuada.",
        "Plan de Manejo": "Continuar con dieta senior enriquecida con Omega 3 EPA/DHA y chequeo de presión arterial en 6 meses."
      },
      aiAnalysis: {
        procedureTitle: "Chequeo Geriátrico Semestral y Perfil Bioquímico",
        summary: "Los estudios de Max a sus 12 años revelan que sus riñones y funciones metabólicas están estables. Su corazón presenta el soplo mitral ya conocido pero clasificado en Estadio B1, lo que significa que el corazón mantiene un tamaño y bombeo adecuados sin necesidad de fármacos cardíacos por el momento.",
        careGuide: [
          {
            step: "01",
            icon: "heartbeat",
            title: "Monitoreo de frecuencia respiratoria mientras duerme",
            detail: "Contar cuántas veces sube y baja su pecho en un minuto mientras duerme profundamente. Lo normal es menos de 30 respiraciones por minuto. Si supera este valor sostenidamente, llamar a la clínica."
          },
          {
            step: "02",
            icon: "sun",
            title: "Protección térmica y paseos adaptados",
            detail: "Los perros senior son sensibles a los extremos de temperatura. Pasear en horarios templados, evitando el calor del mediodía o el frío intenso de la noche."
          },
          {
            step: "03",
            icon: "bone",
            title: "Soporte articular",
            detail: "Mantener alfombras antideslizantes en pisos de baldosa para evitar caídas o tensión en sus articulaciones traseras."
          }
        ],
        medications: [
          {
            name: "Suplemento Omega 3 de Alta Pureza (EPA/DHA)",
            classification: "Nutracéutico cardioprotector y antiinflamatorio articular",
            dose: "1 cápsula blanda de 500 mg",
            frequency: "Cada 24 horas",
            duration: "Tratamiento continuo",
            instructions: "Perforar la cápsula y verter el contenido sobre su comida habitual.",
            pillColor: "emerald"
          }
        ],
        followUp: {
          date: "12-04-2025",
          type: "Chequeo Semestral Geriátrico y Ecocardio Control",
          location: "Unidad de Cardiología Veterinaria"
        },
        mandatoryDisclaimer: MANDATORY_AI_DISCLAIMER
      }
    }
  ];

  const AI_FAQ_SIMULATOR = [
    {
      question: "¿Qué debo hacer si Max intenta quitarse el collar isabelino?",
      answer: "Es muy común que los perros se sientan incómodos los primeros dos días. Puedes probar sustituirlo temporalmente por un 'body' quirúrgico de algodón que cubra el abdomen sin apretar, o supervisarlo de cerca mientras descansa a tu lado. Bajo ninguna circunstancia lo dejes sin protección cuando esté solo o por la noche.",
      procedureId: "proc-esterilizacion"
    },
    {
      question: "¿Puede Max comer normalmente después de la anestesia?",
      answer: "Debes introducir el alimento de manera gradual. Dale solo un tercio de su ración normal, preferiblemente comida húmeda fácil de digerir. Si presenta náuseas o vómitos, retira el plato y espera un par de horas antes de reintentar.",
      procedureId: "proc-esterilizacion"
    },
    {
      question: "¿Es normal que duerma tanto tras la vacuna?",
      answer: "Sí, es completamente normal. El sistema inmunitario de Max está consumiendo energía para sintetizar anticuerpos. La somnolencia ligera o apatía suele resolverse por sí sola entre las 24 y 36 horas posteriores a la aplicación.",
      procedureId: "proc-vacunacion"
    },
    {
      question: "¿Qué hago si Max olvida una dosis de Meloxicam?",
      answer: "Si han pasado pocas horas, adminístrasela con un poco de comida. Si ya está cerca la siguiente toma, salta la dosis olvidada y continúa con el cronograma habitual. Nunca dupliques la dosis, ya que un exceso de antiinflamatorios puede dañar su mucosa estomacal o riñones.",
      procedureId: "proc-esterilizacion"
    }
  ];

  const ETHICAL_MANIFESTO = {
    title: "Compromiso Ético y Transparencia en Inteligencia Artificial Clínica",
    principles: [
      {
        id: "supervision",
        number: "01",
        title: "Supervisión Humana Obligatoria (Human-in-the-Loop)",
        tag: "Criterio Clínico No Delegable",
        description: "Nuestra IA no prescribe, no diagnostica de forma autónoma y no reemplaza la relación médico-paciente-tutor. Cada resumen, pauta de cuidado y recomendación emana de la historia clínica firmada por un médico veterinario colegiado."
      },
      {
        id: "transparencia",
        number: "02",
        title: "Transparencia y Explicabilidad Algorítmica",
        tag: "Comprensión para el Tutor",
        description: "Traducimos términos médicos complejos (como 'orquiectomía preescrotal') a un lenguaje empático, transparente y seguro para el tutor, permitiendo auditar en cualquier momento la fuente clínica original de cada indicación."
      },
      {
        id: "privacidad",
        number: "03",
        title: "Privacidad y Soberanía de Datos Clínicos",
        tag: "Anonimización y Cumplimiento RGPD",
        description: "Los historiales clínicos y datos sensibles de los tutores y pacientes están protegidos bajo cifrado de extremo a extremo. Los modelos de IA no entrenan de forma abierta con la información privada de tus mascotas."
      },
      {
        id: "aviso_estricto",
        number: "04",
        title: "Aviso de Seguridad en Cada Interacción",
        tag: "Protocolo de Seguridad Activo",
        description: "Toda respuesta emitida por la plataforma incluye de forma visible e inalterable el recordatorio ético de que la IA es una herramienta de apoyo y que las emergencias deben ser atendidas de inmediato por el equipo veterinario."
      }
    ]
  };

  const CliniVetData = {
    MANDATORY_AI_DISCLAIMER,
    PATIENT_DATA,
    PROCEDURES_DATA,
    AI_FAQ_SIMULATOR,
    ETHICAL_MANIFESTO
  };

  // Exponer a nivel global
  root.CliniVetData = CliniVetData;

  // Si se usa módulo ES6
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CliniVetData;
  }
})(typeof window !== 'undefined' ? window : this);
