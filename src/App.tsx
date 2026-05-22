import './App.css'
import Footer from './components/dashboard/Footer'
import Header from './components/dashboard/Header'
import { Navbar } from './components/dashboard/Navbar'
import { DashboardSidebar } from './components/dashboard/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

function App() {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-rose-50">
          <DashboardSidebar />

          <div className="flex-1 w-full">
            <Navbar />
            <Header />
            <main className="p-8 flex-1"></main>
          </div>
        </div>
      </SidebarProvider>
      <Footer />
    </>
  )
}

export default App
