import React from 'react'
import Routes from './routes';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Unrecognized', 'componentWillMount', 'componentWillReceiveProps'])

export default function App() {
    return <Routes/>
}
