import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Section from '../template/MessageSection'
import {Notification} from '../mockData'
const Notifications = () => {
  return (
    <Section data={Notification}/>
  )
}

export default Notifications

const styles = StyleSheet.create({})