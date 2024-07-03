import "bootstrap/dist/css/bootstrap.min.css";
// ATTENZIONE CHE BOOTSTRAP DEVE ESSERE IMPORTATO PRIMA DEL NOSTRO CSS!
import "./App.scss";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import MenuList from "./components/MenuList";
import menu from "./data/menu.json";
import PastaDetails from "./components/PastaDetails";
import ClassComponent from "./components/ClassComponent";
// import Counter from "./components/Counter";

// ROUTING IN REACT

// per fare in modo di poter avere un cambio pagina in una SPA (Single Page Application) mi dovrò avvalere di un sistema che mi renderizzi in maniera
// condizionale i componenti a partire da un indirizzo URL, in modo da riflettere il caricamento del componente corretto

// per questo motivo abbiamo implementato il pacchetto react-router-dom che ci aiuterà a gestire le dinamiche di un cambio pagina "virtuale"
// sempre a partire dai segmenti presenti nella URL

// a questo punto dovremmo importare 3 componenti fondamentali per il funzionamento di questa meccanica: BroserRouter, Routes, Route.

// 1) BrowserRouter permette agli altri due di funzionare: lo inseriremo come CORNICE di TUTTO il contenuto di App.jsx
// 2) Subito dopo inseriremo il singolo componente Routes che serve a contenere le singole rotte. Routes può esistere SOLO DENTRO alla sua cornice BrowserRouter
// Con Routes delimiteremo solamente il contenuto che vogliamo effettivamente rendere DINAMICO (o visibile condizionalmente),
// quindi delle rotte singole che attiveranno il loro proprio componente.
// 3) Route quindi è un componente che può esistere solo dentro Routes e dovrà contenere il nostro componente da renderizzare per uno specifico path

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar claim="Niente secondi piatti" />
        <Routes>
          <Route path="/" element={<Home menu={menu} />} />
          <Route path="/prenotazioni" element={<ReservationList />} />
          <Route path="/prenota-tavolo" element={<ReservationForm />} />
          <Route path="/menu" element={<MenuList menu={menu} />} />

          {/* nel caso di questa rotta i : servono ad indicare che per attivare il componente PastaDetails ci dovrà essere un valore dopo /menu/dettagli/, 
          quindi un indirizzo composto da 3 elementi 
          
          1) /menu 
          2) /dettagli
          3) /id_dinamico - valore dinamico che può essere qualsiasi cosa, purché ci sia!

          */}

          <Route path="/menu/dettagli/:dishId" element={<PastaDetails menu={menu} />} />
          <Route path="/class-component/:dynamicId" element={<ClassComponent title="Epicode" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
