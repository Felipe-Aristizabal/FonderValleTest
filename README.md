# Asesoramiento Fondervalle 

Formulario interactivo y visual para la evaluación de uso del crédito, diagnóstico financiero y diagnóstico comercial, desarrollado con React y TypeScript.

## 📋 Descripción

Esta aplicación permite recolectar información detallada sobre usuarios y sus empresas para analizar el impacto del crédito otorgado. Está diseñada para ser:

- ✅ **Responsiva y amigable**
- 🔁 **Reutilizable** gracias a componentes altamente modulares
- 📊 **Visualmente informativa** con gráficos y visualizaciones
- 💾 **Persistente localmente** mediante `localStorage`
- 📤 **Exportable** a formatos como Excel y PDF

## 🧱 Estructura de Componentes

### Formularios
- `VisitForm`: Formulario principal por visita, usando validación con Zod.
- `CreditEvaluation`: Evaluación del crédito.
  - Subcomponentes: `CreditUsageFields`, `ImprovementsFields`, `ResultsFields`, `FinancialRecordsFields`, `ResourceManagementFields`, `PaymentFields`, `SatisfactionFields`, `FutureCreditFields`
- `FinancialDiagnosis`: Diagnóstico financiero.
- `CommercialDiagnosis`: Diagnóstico comercial.

### Visualización de Datos
- `UsersList`: Lista de usuarios guardados desde `localStorage`.
- `ChartGroup`: Contenedor de gráficos con:
  - PieCharts: Satisfacción, pagos al día, uso del crédito.
  - BarCharts y LineCharts: Datos de ventas, uso del crédito, evolución temporal.

### Utilidades
- `exportUsersListToExcel`: Exporta los datos guardados en Excel.
- `html2canvas`: Captura visual de componentes para exportación en PDF.
- `formatThousands`: Utilidad para formatear valores numéricos con separadores.

## 📦 Tecnologías

- **React + TypeScript**
- **React Hook Form** + **Zod**
- **ShadCN UI** para componentes estilizados
- **Recharts** para gráficas
- **html2canvas** para exportar vistas
- **localStorage** para persistencia offline

## ▶️ Cómo iniciar

```bash
git clone https://github.com/tu-usuario/fondervalle-forms.git
cd fondervalle-forms
npm install
npm run dev
