import './App.css'
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./containers/layout"
import HomePage from "./pages/home-page"
import EvaluationDetail from "@/pages/evaluation-detail"
import EvaluationForm from "@/pages/evaluation-form"
import VisitForm from "@/pages/visit-form"
import NotFound from "./pages/not-found"

function App() {
  // localStorage.clear()
  useEffect(() => {
    const STORAGE_KEY = "evaluationFormData"

    const loadInitialData = async () => {
      const existing = localStorage.getItem(STORAGE_KEY)
      if (!existing) {
        try {
          const res = await fetch("/example_users_data_negative.json")
          const data = await res.json()
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
          console.log("Datos precargados en localStorage")
        } catch (error) {
          console.error("Error cargando los datos iniciales:", error)
        }
      }
    }

    loadInitialData()
  }, [])

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
