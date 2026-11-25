import { Route, Routes } from 'react-router-dom'
import Home from '../Frontend/Home'
import About from '../Frontend/About'
import CategoryPage from '../Frontend/CategoryPage'
import Contact from '../Frontend/Contact'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WhatsAppButton from '../../components/Misc/WhatsAppButton'

const Frontend = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='sport-wear' element={<CategoryPage categoryKey="sport-wear" />} />
                <Route path='fashion-wear' element={<CategoryPage categoryKey="fashion-wear" />} />
                <Route path='gym-wear' element={<CategoryPage categoryKey="gym-wear" />} />
                <Route path='outer-wear' element={<CategoryPage categoryKey="outer-wear" />} />
                <Route path='outer-wears' element={<CategoryPage categoryKey="outer-wear" />} />
                <Route path='contact' element={<Contact />} />
            </Routes>
            <Footer />
            <WhatsAppButton />
        </>
    )
}

export default Frontend