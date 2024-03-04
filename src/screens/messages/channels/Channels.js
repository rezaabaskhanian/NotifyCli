import { StyleSheet,  View } from 'react-native'
import React from 'react'
import Section from '../template/MessageSection'
import {Notification} from '../mockData'
const Channels = () => {
  return (
    <Section data={Notification}/>
  )
}

export default Channels

const styles = StyleSheet.create({})