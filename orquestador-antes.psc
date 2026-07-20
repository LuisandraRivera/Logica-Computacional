Proceso OrquestadorLoT_Antes
	
	Definir temperaturaActual Como Real;
	Definir estadoVentanas, estadoAireAcondicionado, estadoCerraduras, estadoAlarmas Como Logico;
	Definir horaDelSistema Como Entero;
	
	Escribir "Ingrese la temperatura actual: ";
	Leer temperaturaActual;
	
	Escribir "Ingrese la hora del sistema (0-23): ";
	Leer horaDelSistema;
	
	Escribir "¿Las ventanas están abiertas? (Verdadero/Falso): ";
	Leer estadoVentanas;
	
	Escribir "¿El aire acondicionado está encendido? (Verdadero/Falso): ";
	Leer estadoAireAcondicionado;
	
	Escribir "¿Las cerraduras están puestas? (Verdadero/Falso): ";
	Leer estadoCerraduras;
	
	Escribir "¿La alarma está activa? (Verdadero/Falso): ";
	Leer estadoAlarmas;
	
	// Inconsistencia 1: temperatura alta sin ninguna ventilación activa, y el sistema no hace nada
	Si temperaturaActual > 25 y estadoVentanas = Falso y estadoAireAcondicionado = Falso Entonces
		Escribir "Aviso: temperatura alta sin ventilación activa. El sistema no toma ninguna acción al respecto.";
	FinSi
	
	// Inconsistencia 2: alarma activa sin que el sistema verifique ni ponga las cerraduras
	Si estadoAlarmas = Verdadero y estadoCerraduras = Falso Entonces
		Escribir "Aviso: alarma activa con cerraduras sin poner. El sistema no coloca las cerraduras ni corrige la situación.";
	FinSi
	
	// Inconsistencia 3: cerraduras puestas desactivan la alarma automáticamente (lógica contraria a la seguridad)
	Si estadoCerraduras = Verdadero Entonces
		estadoAlarmas <- Falso;
		Escribir "Cerraduras puestas. Alarma desactivada automáticamente.";
	FinSi
	
	Escribir "-------------------------------------------";
	Escribir "Estado final de los dispositivos:";
	Escribir "Temperatura: ", temperaturaActual;
	Escribir "Hora del sistema: ", horaDelSistema;
	Escribir "Ventanas abiertas: ", estadoVentanas;
	Escribir "Aire acondicionado encendido: ", estadoAireAcondicionado;
	Escribir "Cerraduras puestas: ", estadoCerraduras;
	Escribir "Alarma activa: ", estadoAlarmas;
	Escribir "-------------------------------------------";

FinProceso

