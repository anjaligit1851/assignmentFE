import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    },
    fetchProjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
  },
});

export const { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFailure, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
