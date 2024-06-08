import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface UserState {
    id: number
    email: string
    fullName: string

}

const initialState: UserState = {
    id: 0,
    fullName: '',
    email: ''
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.fullName = action.payload.fullName

        },
        logoutAction: (state) => {
            state.id = 0,
                state.email = ''
            state.fullName = ''
        }
    }
})

export const { loginAction, logoutAction } = userSlice.actions
export default userSlice.reducer