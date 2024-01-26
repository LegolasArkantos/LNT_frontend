import { Provider } from "react-redux"
import { ReduxStore } from "../store/ReduxStore"

export const ReduxProvider = ({ children }) => {

    return (
        <Provider store={ReduxStore}>
            {children}
        </Provider>
    )
}

