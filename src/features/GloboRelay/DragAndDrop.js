import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TweetSaverTemplate from 'react-pure-components/dist/Templates/GloboRelay'

import {
  getTweetRedux,
  getTweetsFromApi,
  setPreloading
} from './tweetSlice'

export function TweetSaver() {
  const tweetRedux = useSelector(getTweetRedux)
  const [term, saveTerm] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPreloading(false))
  },[])

  return (
    <React.Fragment>
      {
        tweetRedux.controls.error && (
          <div style={{backgroundColor: "red", color: '#fff', padding: '3%'}}>
            {
              tweetRedux.controls.error
            }
          </div>
        )
      }
      <TweetSaverTemplate
        label={"Tweet Saver"}
        tweets={tweetRedux.tweets}
        {...tweetRedux.controls}
        savedTweets={tweetRedux.savedTweets}
        onEvent={e => {
        // console.log(e)
        switch (true) {
          case e.type === "onDragStart":
            // console.log("onDragStart", e.tweet)
            break
          case e.type === "onDrop":
            // console.log("onDrop")
            break
          case e.type === "onClick" && e.origin === "Button":
            dispatch(getTweetsFromApi(term))
            break
          case e.event === "onKeyUp" && e.origin === "Input":
            // console.log("save keyword twitter", e.data.value)
            saveTerm(e.data.value)
            break
          case e.event === "onKeyUpAction" && e.origin === "Input":
            // console.log("search for twitter", e.data.value)
            dispatch(getTweetsFromApi(term))
            break
        }
        }}
      />
    </React.Fragment>
  )
}
