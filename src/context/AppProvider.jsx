import AuthContext from './Auth'
import CartProvider from './CartContext'
import FavoritesProvider from './FavoritesContext'

const AppProvider = ({ children }) => {
    return (
        <AuthContext>
            <CartProvider>
                <FavoritesProvider>
                    {children}
                </FavoritesProvider>
            </CartProvider>
        </AuthContext>
    )
}

export default AppProvider