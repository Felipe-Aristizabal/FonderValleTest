import './App.css'
import { Routes, Route } from "react-router-dom"
import Layout from "./containers/layout"
import HomePage from "./pages/home-page"
import EvaluationDetail from "@/pages/evaluation-detail"
import EvaluationForm from "@/pages/evaluation-form"
import VisitForm from "@/pages/visit-form"
import NotFound from "./pages/not-found"

function App() {
  // localStorage.clear()
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="formulario" element={<EvaluationForm />} />
        <Route path="evaluaciones/:id" element={<EvaluationDetail />} />
        <Route path="evaluaciones/:id/visitas/:visitaNumero" element={<VisitForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
