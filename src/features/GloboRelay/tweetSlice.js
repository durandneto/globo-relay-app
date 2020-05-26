import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState: {
    savedTweets: [],
    term: '',
    tweets: [],
    controls: {
      loading: false,
      preloading: true,
      error: '',
    }
  },
  reducers: {
    setLoading: (state, action) => {
      state.controls.loading = action.payload
    },
    setPreloading: (state, action) => {
      state.controls.preloading = action.payload
    },
    setError: (state, action) => {
      state.controls.error = action.payload
    },
  },
})

export const { setLoading, setError, setPreloading, setTerm } = tweetSlice.actions

export const getTweetsFromApi = userName => dispatch => {
  // Make a request for a user with a given ID
  dispatch(setLoading(true))
  dispatch(setError(''))
  axios.get(`http://tweetsaver.herokuapp.com/?q=${userName}&count=10`)
  .then(response => {
    // handle success
    console.log(response)
    dispatch(setLoading(false))
  })
  .catch(error =>  {
    // handle error
    dispatch(setLoading(false))
    dispatch(setError(error.toString()))
    console.log(error)
  })
}
// get reducer
export const getTweetRedux = state => state.tweet

export default tweetSlice.reducer
