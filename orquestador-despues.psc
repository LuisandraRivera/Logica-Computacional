Proceso OrquestadorLoT
	Definir temperaturaActual Como Real;
	Definir ventanas, airesacondicionados, cerraduras, alarmas, estadoVentanas, estadoAireAcondicionado, estadoCerraduras, estadoAlarmas, incosistenciasDectectadas Como Logico;
	Definir i, opcion, indiceReporte, horas, temperaturas, horaDelSistema, ultimaHoraRegistrada, contadorInconsitencias, contadorConsistencias Como Entero;
	Definir preferenciaUsuario, ultimaPreferenciaRegistrada, desicionTomada, modoSeguridad Como Cadena;
	
	// Simulacion de sensores a traves de arreglos con 5 escenarios predefinidos
	Dimension horas[6];
	dimension temperaturas[6];
	dimension ventanas[6];
	dimension airesAcondicionados[6];
	dimension cerraduras[6];
	dimension alarmas[6];
	
	
	// 1er escenario para la simulacion de sensores: tarde calurosa, aire acondicionado encendido, y ventanas abiertas a la vez (inconsistencia)
	horas[1]<- 14;
	temperaturas[1] <- 30;
	ventanas[1] <- verdadero; //(verdadero: si, estan abiertas.  falso: no, estan cerradas)
	airesAcondicionados[1] <- Verdadero; //(verdadero: si, esta encendido.   falso: no, esta apagado)
	cerraduras[1] <- Verdadero; //(verdadero: si, estan puestas.   falso: no, estan sin poner)
	alarmas[1] <- falso; //(verdadero: si, estan activas.  falso: no, estan inactivas)
	
	// 2do escenario para la simulacion de sensores: noche, alarma activa, y cerraduras sin poner (inconsistencia)
	horas[2] <- 22;
	temperaturas[2] <- 20;
	ventanas[2] <- falso; //(verdadero: si, estan abiertas.  falso: no, estan cerradas)
	airesAcondicionados[2] <- falso; //(verdadero: si, esta encendido.   falso: no, esta apagado)
	cerraduras[2] <- falso; //(verdadero: si, estan puestas.   falso: no, estan sin poner)
	alarmas[2] <- Verdadero; //(verdadero: si, estan activas.  falso: no, estan inactivas)
	
	// 3er escenario para la simulacion de sensores: mañana, aire acondicionado apagado, ventanas abiertas (consistencia)
	horas[3] <- 8;
	temperaturas[3] <- 22;
	ventanas[3] <- verdadero; //(verdadero: si, estan abiertas.  falso: no, estan cerradas)
	airesAcondicionados[3] <- falso; //(verdadero: si, esta encendido.   falso: no, esta apagado)
	cerraduras[3] <- falso; //(verdadero: si, estan puestas.   falso: no, estan sin poner)
	alarmas[3] <- falso; //(verdadero: si, estan activas.  falso: no, estan inactivas)
	
	// 4to escenario para la simulacion de sensores: temperatura alta, ninguna ventilacion (inconsistencia)
	horas[4] <- 15;
	temperaturas[4] <- 28;
	ventanas[4] <- falso;  //(verdadero: si, estan abiertas.  falso: no, estan cerradas)
	airesAcondicionados[4] <- falso; //(verdadero: si, esta encendido.   falso: no, esta apagado)
	cerraduras[4] <- Verdadero; //(verdadero: si, estan puestas.   falso: no, estan sin poner)
	alarmas[4] <- falso; //(verdadero: si, estan activas.  falso: no, estan inactivas)
	
	// 5to escenario para la simulacion de sensores: alarma activa, cerraduras puestas (consistencia)
	horas[5] <- 23;
	temperaturas[5] <- 19;
	ventanas[5] <- Falso; //(verdadero: si, estan abiertas.  falso: no, estan cerradas)
	airesAcondicionados[5] <- falso; //(verdadero: si, esta encendido.   falso: no, esta apagado)
	cerraduras[5] <- verdadero; //(verdadero: si, estan puestas.   falso: no, estan sin poner)
	alarmas[5] <- Verdadero; //(verdadero: si, estan activas.  falso: no, estan inactivas)
	
	//Fase 1: recepción de datos
	Escribir "¿Cuál es tu preferencia para ventilar la casa? (Ventana/AireAcondicionado)";
	Leer preferenciaUsuario;
	Escribir "¿Qué modo de seguridad prefieres? (SeguridadAlta/Balanceada)";
	leer modoSeguridad;
	
	Escribir "¿Que reporte deseas consultar?";
	escribir "1) Reporte 1";
	escribir "2) Reporte 2";
	escribir "3) Reporte 3";
	escribir "4) Reporte 4";
	escribir "5) Reporte 5";
	leer opcion;
	Mientras opcion < 1 o opcion > 5 Hacer
		escribir "opcion invalida. Por favor selecciona un numero entre 1 o 5";
		leer opcion;
	FinMientras
	indiceReporte <- opcion;
	
	ultimaHoraRegistrada <- 0;
	ultimaPreferenciaRegistrada <- "";
	
	escribir "Sensor mostrando datos del reporte", indiceReporte, "...";
	temperaturaActual <- temperaturas[indiceReporte];
	estadoVentanas <- ventanas[indiceReporte];
	estadoAireAcondicionado <- airesAcondicionados[indiceReporte];
	estadoAlarmas <- alarmas[indiceReporte];
	horaDelSistema <- horas[indiceReporte];
	estadoCerraduras <- cerraduras[indiceReporte];
	
	//Fase 2: Aprendizaje de rutinas
	si horaDelSistema = ultimaHoraRegistrada Entonces
		Escribir "El sistema reconoce esta hora como habitual y se aplicará a tu preferencia: ", preferenciaUsuario;
	SiNo
		preferenciaUsuario = "AireAcondicionado";
		Escribir "Hora o preferencia no reconocida, por defecto se encenderá el aire acondicionado.";
	FinSi
	ultimaHoraRegistrada <- horaDelSistema;
	ultimaPreferenciaRegistrada <- preferenciaUsuario;
	//Fase 3: Evaluación de reglas logicas
	incosistenciasDectectadas <- Falso;
	desicionTomada <- "Sin novedades";
	contadorInconsitencias <- 0;
	contadorConsistencias <- 0;
	
	//Caso 1: Aire acondicionado y ventanas abiertas
	si estadoAireAcondicionado = Verdadero y estadoVentanas = Verdadero Entonces
		incosistenciasDectectadas <- Verdadero;
		contadorInconsitencias <- contadorInconsitencias +1;
		si preferenciaUsuario = "VentilacionNatural" Entonces
			estadoAireAcondicionado <- Falso; //(verdadero: si, esta encendido.   falso: no, esta apagado)
			desicionTomada <- "Inconsitencia: Aire acondicionado y ventanas abiertas a la vez. Aire acondicionado apagado, las ventanas se mantienen abiertas.";
		SiNo
			estadoVentanas <- Falso; //(verdadero: si, estan abiertas.   falso: no, estan cerradas)
			desicionTomada <- "Inconsistencia: Aire acondicionado y ventanas abiertas a las vez. Ventanas cerradas, el aire acondicionado se mantiene encendido.";
		FinSi
	SiNo
		contadorConsistencias <- contadorConsistencias +1;
		si estadoAireAcondicionado = Verdadero y estadoVentanas = Falso Entonces
			desicionTomada <- "Consistente: Aire acondicionado encendido con ventanas cerradas.";
		SiNo
			si estadoAireAcondicionado = Falso y estadoVentanas = Verdadero Entonces
				desicionTomada <- "Consitente: Ventanas abiertas con aire acondicionado apagado.";
			SiNo
				desicionTomada <- "Consitente: Aire acondicionado apagado y ventanas cerradas, casa sin ventilacion activa.";
			FinSi
		FinSi
	FinSi
	
	// Caso 2: Temperatura y ventilación
	si temperaturaActual>25 Entonces
		si estadoVentanas = Falso y estadoAireAcondicionado = Falso Entonces
			incosistenciasDectectadas <- Verdadero;
			contadorInconsitencias <- contadorInconsitencias +1;
			si preferenciaUsuario = "VentilacionNatural" Entonces
				estadoVentanas <- Verdadero; //(verdadero: si, estan abiertas.   falso: no, estan cerradas)
				desicionTomada <- "Inconsistencia: Temperatura alta sin ventilación. vetanas abiertas por temperatura alta.";
			SiNo
				estadoAireAcondicionado <- Verdadero; //(verdadero: si, esta encendido.   falso: no, esta apagado)
				desicionTomada <- "Inconsistencia: Temperatura alta sin ventilación. Aire acondicionado encendidido por temperatura alta.";
			FinSi
		SiNo
			si estadoVentanas = Verdadero y estadoAireAcondicionado = Falso Entonces
				contadorConsistencias <- contadorConsistencias +1;
				desicionTomada <- "Consistente: Tempreatura alta, las ventanas están abiertas para ventilar.";
			SiNo
				si estadoVentanas = Falso y estadoAireAcondicionado = Verdadero Entonces
					contadorConsistencias <- contadorConsistencias +1;
					desicionTomada <- " Consistente: Temperatura alta, el aire acondicionado ya esta encendido.";
				SiNo
					incosistenciasDectectadas <- Verdadero;
					contadorInconsitencias <- contadorInconsitencias +1;
					estadoVentanas <- Falso; //(verdadero: si, estan abiertas.   falso: no, estan cerradas)
					desicionTomada <- "Inconsitencia: Temperatura alta con aire acondicionado encendido y ventanas abiertas a la vez. Ventanas cerrandose para optimizar el aire.";
					
				FinSi
			FinSi
		FinSi
	SiNo
		si estadoVentanas = falso y estadoAireAcondicionado = falso Entonces
			contadorConsistencias <- contadorConsistencias +1;
			desicionTomada <- "Consitente: Temperatura normal, sin necesidad de ventilación.";
		SiNo
			contadorConsistencias <- contadorConsistencias +1;
			desicionTomada <- " Consistente: Temperatura normal, ventilación activa por preferencia del usuario.";
		FinSi
	FinSi
	
	//Caso 3: Alarmas activas con cerraduras sin poner
	si estadoAlarmas = Verdadero y estadoCerraduras = Falso  Entonces
		incosistenciasDectectadas <- Verdadero;
		contadorInconsitencias <- contadorInconsitencias +1;
		estadoCerraduras <- Verdadero; //(verdadero: si, estan puestas.   falso: no, estan sin poner)
		estadoVentanas <- falso; //(verdadero: si, estan abiertas.   falso: no, estan cerradas)
		desicionTomada <- "Inconsistencia: Alarma activa con cerraduras sin colocar. Cerraduras colocadas y ventanas cerradas como medidas de seguridad.";
	FinSi
	
	//Caso 4: Alarma inactiva y cerraduras sin poner
	si estadoAlarmas = Falso y estadoCerraduras = Falso  Entonces
		incosistenciasDectectadas <- Verdadero;
		contadorInconsitencias <- contadorInconsitencias +1;
		si modoSeguridad = "SeguridadAlta" Entonces
			estadoCerraduras <- verdadero; //(verdadero: si, estan puestas.   falso: no, estan sin poner)
			desicionTomada <- "Incositencia: Cerraduras sin colocar sin alarma activa. Cerraduras puestas por seguridad (modo seguridad alta).";
		SiNo
			desicionTomada<- "Inconsistencia: Cerraduras sin colocar sin alarma activa. Se mantienen abiertas por preferencia de modo balanceado, se recomienda revisar.";
		FinSi
		
	FinSi
	
	//Caso 5: Alarma activa con cerraduras puestas
	si estadoAlarmas = Verdadero y estadoCerraduras = Verdadero Entonces
		contadorConsistencias <- contadorConsistencias +1;
		desicionTomada <- "Consitente: Alarma activa y cerraduras puestas. Casa Segura.";
	FinSi
	
	//Fase 4 Registro y salida
	Escribir "-------------------------------------------";
	Escribir "Reporte del Operador LoT";
	Escribir "-------------------------------------------";
	Escribir "Temperatura actual: ", temperaturaActual;
	Escribir "Ventanas abiertas: ", estadoVentanas;
	Escribir "Aire acondicionado encendido: ", estadoAireAcondicionado;
	Escribir "Cerraduras puestas: ", estadoCerraduras;
	Escribir "Alarma activa: ", estadoAlarmas;
	Escribir "Hora del sistema: ", horaDelSistema;
	Escribir "-------------------------------------------";
	si incosistenciasDectectadas = Verdadero Entonces
		Escribir "Inconsistencia detectadas y corregidas.";
		Escribir "Desicion tomada: ", desicionTomada;
	SiNo
		Escribir "No se detectaron inconsistencias. Estado de la casa: consitente.";
	FinSi
	Escribir "-------------------------------------------";
	Escribir "Resumen del análisis: ";
	Escribir "Casos consitentes: ", contadorConsistencias;
	Escribir "Casos incosistentes (corregidos): ", contadorInconsitencias;
FinProceso


