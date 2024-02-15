import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Plan, PlansResponse } from "../../model/plans"
import { getAllParams } from "../../model/request"
import { getPlans } from "./plansAPI"
import { RootState } from "../../app/store"

interface PlansState {
  items: Plan[]
  page: number
  totalPages: number
  totalItems: number
  error: string | null | undefined
  loading: boolean
}

const initialState: PlansState = {
  items: [],
  page: 0,
  totalPages: 0,
  totalItems: 0,
  error: undefined,
  loading: false,
}

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addPlan: (state, action: PayloadAction<Plan>) => {
      state.items.push(action.payload)
    },
    removePlan: (state, action: PayloadAction<Plan>) => {
      state.items = state.items.filter((plan) => plan.id !== action.payload.id)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actionGetPlans.pending, (state) => {
        state.loading = true
      })
      .addCase(actionGetPlans.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.page = action.payload.page
        state.totalPages = action.payload.totalPages
        state.totalItems = action.payload.totalItems
      })
      .addCase(actionGetPlans.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const actionGetPlans = createAsyncThunk(
  "plans/getPlans",
  async (payload: getAllParams) => {
    const response = await getPlans(payload)
    return response.data as PlansResponse
  },
)

export const { addPlan, removePlan } = plansSlice.actions
export const selectPlans = (state: RootState) => state.plans.items
export const selectPlansError = (state: RootState) => state.plans.error

export default plansSlice.reducer
